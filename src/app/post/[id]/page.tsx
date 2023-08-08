"use client";
import React, { useState, useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Axios from "axios";
import { useRouter } from "next/router";
import { APIResponse } from "@/utils/Interfaces";
import { toast } from "react-hot-toast";

export default withPageAuthRequired(
  ({ params }: { params: { id: string } }) => {
    const [post, setPost] = useState({
      title:"",
      metaDescription:"",
      keywords:"",
      postContent:""
    });
    useEffect(() => {
      fetchPost();
    }, []);
    const fetchPost = async () => {
      try {
        let res = await Axios.get("/api/getpost/" + params.id);
        let apiRes: APIResponse = res.data;
        if (apiRes.statusCode == 200) {
          setPost(apiRes.data.post);
        } else {
          toast.error(apiRes.message[0]);
        }
      } catch (err) {
        toast.error("We cannot fetch the post at the moment");
      }
    };
    return <div>

          <div className="w-3/4 mx-auto h-full py-8">
            <div className="w-full bg-stone-200 py-2 px-2 font-bold text-sm">SEO title and Meta Description</div>
            <div className="mt-4 border-2 border-stone-100 rounded-xl p-4">

              <div className="text-blue-600 font-bold text-xl">{post?.title}</div>
              <p className="text-sm">{post?.metaDescription}</p>
            </div>

            <div className="w-full bg-stone-200 py-2 px-2 font-bold text-sm mt-12">Keywords</div>
            <div className="mt-4 border-2 border-stone-100 rounded-xl p-2 gap-2 flex flex-wrap">
                     {post?.keywords?.split(",")?.map(keyword=>(
                      <div className="p-2 bg-slate-800 text-white text-sm font-bold rounded-full">#{keyword}</div>
                     ))}
             </div>

             <div className="w-full bg-stone-200 py-2 px-2 font-bold text-sm mt-12">Blog Post</div>

             <div className="mt-4 border-2 border-stone-100 rounded-xl p-4">
             <div className="text-black font-bold text-4xl mb-8">{post?.title}</div>
             <div dangerouslySetInnerHTML={{__html:post?.postContent}}/>

             </div>

          </div>



    </div>;
  }
);
