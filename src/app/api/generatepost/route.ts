import { NextRequest, NextResponse } from "next/server";
import { GeneratePostBody, UserInterface,PromptResponse } from "@/utils/Interfaces";
import Post from "../../../../lib/Models/Post";
import User from "../../../../lib/Models/User";
import openaiAPI from "@/utils/OpenAIConfig";
import { getSession } from "@auth0/nextjs-auth0";
import dbConnect from "../../../../lib/MongoConnect";
import { ObjectId } from "mongoose";
export const POST = async (req: NextRequest) => {
  let statusCode = 200,
    message = [],
    data = {};
    
  try {
    await dbConnect();
   
    let session= await getSession();
    let user:UserInterface={
      sub:""
    }
    if(session)user=session.user;
    else{
      statusCode=403;
      message.push("You are not authorized to access this api");
      return;
    } 
   
    let databaseUser=await validateUser(user.sub+"");

   
    if(databaseUser===false || databaseUser?.accessTokens<1){
      statusCode=404;
      message.push("Sorry you are out of tokens");
      return;
    }

    let isDebited= await debitTokens(databaseUser._id);
    if(!isDebited){
      statusCode=400;
      message.push("Error in debit tokens");
      return;
    }


    const{topic,keywords}:GeneratePostBody=await req.json();

    let res=await openaiAPI.createCompletion({
        temperature:0,
        model:"text-davinci-003",
        max_tokens:3600,
        prompt:`Write a detailed description about ${topic}. It should be SEO firendly and includes following comma separated keywords ${keywords}. The response should be in html with title and meta description.
        The response should be following json:.
        {"postContent":post content goes here,"title":title goes here,"metaDescription":meta description goes here}`
    });

  
    let promptResponse:PromptResponse={
      postContent:"",
      title:"",
      metaDescription:""
    };
    
    if(res.data.choices[0].text) promptResponse=JSON.parse(res.data.choices[0].text.replaceAll("\n",""));
    
    
    // data={
    //     promptResponse
    // }

    let newPost= new Post({
      ...promptResponse,
      keywords,
      topic,
      userId:databaseUser._id
    });

    let savedPost= await newPost.save();

    data={postId:savedPost?._id?.toString()};
    message.push("The post is generated successfully");
    return;
  } catch (err: any) {
    console.log(err);
    statusCode = 400;
    message.push("The post was not generated successfully");
    message.push(err.message);
  } finally {
    return NextResponse.json({
      statusCode,
      message,
      data,
    });
  }
};

const validateUser=async(userId:string)=>{
 
 try{
    let user= await User.findOne({userId});
    if(user) return user;
    else return false;
 }
 
 catch(err:any)
 {
  throw new Error(err);
 }

}

const debitTokens=async(_id:ObjectId)=>{
  try{
   let updatedUser= await User.findByIdAndUpdate({_id:_id},{
    $inc:{
      accessTokens:-10
    }
   });
   return updatedUser;
  }
  catch(err:any)
  {
   throw new Error(err); 
  }
}