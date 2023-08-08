"use client";
import React from 'react'
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0/client';

const Fotter = () => {
    const{user,error,isLoading}=useUser();
    if(isLoading) return<>Loading....</>
  return (
    <div className='w-full p-1 pt-2 border-t-[1px] border-gray-500'>
       {(user)?<div className='flex gap-2 items-center'>
            <div>
                <Image className=' rounded-full' src={user?.picture+""} height={40} width={40} alt='user picture'/>
            </div>
            <div className='text-white text-sm'>
                <h5 >{user?.email}</h5>
                <a href="/api/auth/logout">Logout</a>
            </div>
        </div>:<a href="api/auth/login">Login</a>
}
    </div>
  )
}

export default Fotter