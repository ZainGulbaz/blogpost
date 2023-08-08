import React from 'react'
import Fotter from './Fotter';
import Link from 'next/link';
import {FaCoins} from "react-icons/fa";
import Logo from '../Logo/page';
import dbConnect from '../../../lib/MongoConnect';
import User from '../../../lib/Models/User';
import { getSession } from '@auth0/nextjs-auth0';
import { UserInterface } from '@/utils/Interfaces';
import Post from '../../../lib/Models/Post';
import { delay } from '@/utils/CommonFunctios';
import { NextPage } from 'next';


interface IParams {
  text: string 
}

interface IProps {
  searchParams: IParams 
}




const Sidebar:NextPage<IProps> = async({ searchParams }) => {

  console.log(searchParams,"Query");
  await dbConnect();
  let session=await getSession();
  let user:UserInterface={
    sub:""
  }
  if(session)user=session.user;
  
  await delay(1000);
  let databaseUser= await User.findOne({userId:user.sub});

  let userPosts=await Post.find({userId:databaseUser?._id?.toString()});

  return (
    <div className='bg-gradient-to-b from-slate-800 to-cyan-800 h-full flex flex-col py-4 overflow-auto !w-1/5 fixed'>
     <div className='w-full flex flex-col gap-4 p-1 items-center'>
        <div>
      <Logo/>
        </div>
        <Link href='/post/new' className='w-full text-sm text-center text-white font-bold p-2 w-full bg-green-500 rounded-md cursor-pointer hover:bg-green-600 transition-color'>New Post</Link>
        <Link href="/tokens" className='text-white mt-2 flex gap-2 items-center cursor-pointer'>
            <FaCoins className="text-yellow-500"/>
            {databaseUser?.accessTokens} Coins Available
        </Link>
     </div>

<div className='flex-1 overflow-auto flex flex-col items-center gap-2 mt-4 px-2'>
{
          userPosts?.map(post=>(
            <Link href={"/post/"+post._id.toString()} className="bg-slate-700/30 font-bolder text-white p-2 w-full rounded-xl shadow-xl">{post?.topic}</Link>
          ))
        }
</div>
 <Fotter/>
    </div>
  )
}

export default Sidebar;