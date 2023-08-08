"use client";
import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import Axios from "axios";
import { APIResponse } from "@/utils/Interfaces";
import { toast } from "react-hot-toast";

export default withPageAuthRequired(() => {
  const router = useRouter();
  React.useEffect(() => {
    callLoginApi();
  }, []);
  const callLoginApi = async () => {
    const toastId=toast.loading("Authenticating...");
    try {
      let res = await Axios.post("/api/login");
      let apiRes: APIResponse = res.data;
      if ((apiRes.statusCode == 200)) {
        router.push("/post/new");
      } else {
        throw new Error(apiRes.message[0]);
      }
    } catch (err) {
      toast.error("The login was not successfull");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
    finally{
      toast.remove(toastId);
    }
  };
  return <div>Waiting....</div>;
});
