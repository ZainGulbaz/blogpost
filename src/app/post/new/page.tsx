"use client";
import React, { useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { toast } from "react-hot-toast";
import Axios from "axios";
import { APIResponse, GeneratePostBody } from "@/utils/Interfaces";
import { useRouter } from "next/navigation";

export default withPageAuthRequired(() => {
  const router= useRouter();

  const handleGeneratePost = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      event.preventDefault();
      let target: any = event.target;
      const topic = target.elements["topic"]?.value+"";
      const keywords = target.elements["keywords"]?.value+"";

      //validation
      if (topic?.trim()?.length == 0) {
        toast.error("Topic Field could not be empty");
        return;
      } else if (keywords?.trim()?.length == 0) {
        toast.error("Keywords Field could not be empty");
        return;
      }

      let body:GeneratePostBody={
         topic,
         keywords
      }
      
      const promiseId= toast.loading("Your post is being generated....");
      let res = await Axios.post("/api/generatepost", body);
      let apiRes:APIResponse=res.data;
      if(apiRes.statusCode==200)
      {
        router.push("/post/"+apiRes.data.postId);
        router.refresh();
        toast.dismiss(promiseId);
      }
      else{
        toast.dismiss(promiseId);
        toast.error(apiRes.message[0]);
      }
    } catch (err) {
      console.log(err);
      toast.error("Blog post cannot be generated");
    }
  };
  return (
    <div className="p-4">
      <div className="w-full flex justify-center mb-8">
        <form onSubmit={handleGeneratePost} className="flex flex-col gap-4 w-3/4">
          <div className="flex flex-col">
            <label>
              <strong>Enter the topic for post</strong>
            </label>
            <textarea
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Best toursit destination...."
              id="topic"
              name="topic"
            />
          </div>
          <div className="flex flex-col">
            <label>
              <strong>Enter the keywords for post</strong>
            </label>
            <textarea
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tourism, destination, beaches...."
              id="keywords"
              name="keywords"
            />
          </div>
          <button
            className="btn bg-green-500 w-full rounded-xl font-bolder hover:bg-green-600 py-2"
            type="submit"
          >
            Generate Post 
          </button>
        </form>
      </div>
    </div>
  );
});
