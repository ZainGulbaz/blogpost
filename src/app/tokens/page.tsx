"use client";
import React from 'react'
import Axios from "axios";
import { toast } from 'react-hot-toast';
import { APIResponse } from '@/utils/Interfaces';
import { useRouter } from 'next/navigation';
import {FaCoins} from "react-icons/fa";

const Tokens = ({searchParams}:{searchParams:{success:string,error:string}}) => {
  console.log(searchParams.success);
  let router= useRouter();
  const handleAddTokens=async()=>{
    const toastId=toast.loading("Creating Stripe checkout....");  
    try{
    let res= await Axios.post('/api/addtokens',{
      href:window.location.origin
    });
    let apiRes:APIResponse=res.data;
    console.log(apiRes);
    if(apiRes.statusCode==200)
    {
      router.push(apiRes.data.checkout.url);
      router.refresh();
    }
    else{
      toast.error(apiRes.message[0]);
    }
    }
    catch(err){
      toast.error("The tokens cannot be added");
      console.log(err);
    }
    finally{
      toast.remove(toastId);
    }
  }
  return (
    <div className='flex flex-col items-center justify-center  h-full w-full gap-8'>
      <button className='btn bg-green-400 w-lg p-4 rounded-xl hover:bg-green-500 transition-color' onClick={handleAddTokens}>Get Tokens</button>
      {(searchParams.error || searchParams.success) && <div>
        <h4 className='flex gap-4 items-center text-3xl'>
          <FaCoins className={`${searchParams.success?"text-yellow-800":"text-red-600"}`} size="40px"/> {searchParams.success? "Tokens has been added successfully" :"Tokens cannot be added successfully"}
        </h4>
      </div>}

    </div>
    
  )
}

export default Tokens;