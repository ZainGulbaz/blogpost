import { NextRequest, NextResponse } from "next/server"
import User from "../../../../../lib/Models/User";
import Post from "../../../../../lib/Models/Post";
import dbConnect from "../../../../../lib/MongoConnect";
import { getSession } from "@auth0/nextjs-auth0";
import { UserInterface } from "@/utils/Interfaces";
import mongoose from "mongoose";

export const GET=async(req:NextRequest)=>
{
    let message=[],data={},statusCode=200;
    try{
         await dbConnect();
         let session=await getSession();
         let user:UserInterface={
          sub:""
         };
         let postId=req.nextUrl.pathname.split("/").slice(-1)?.[0];
        
         if(session) user=session.user;
         let databaseUser=await User.findOne({
          userId:user.sub
         });

         let post=await Post.findOne({
           userId:databaseUser._id.toString(),
           _id:new mongoose.mongo.ObjectId(postId)
         });

         data={post};
         message.push("The post is fetched successfully");
         statusCode=200; 
    }
    catch(err:any)
    {
        statusCode=400;
        message.push("An error occurred while fetching the post",err.message);
    }
    finally{
      return NextResponse.json({
        statusCode,message,data
      })

    }

}