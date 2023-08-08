'use client';
import Logo from "@/components/Logo/page";
import HomeImage from "../../assets/home.avif";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
 return(
 <div className="h-screen w-screen absolute flex justify-center items-center">

  <Image src={HomeImage} alt="AI" className="absolute" fill/>

  <div className="flex flex-col justify-center items-center px-1  text-white gap-4 z-10 pt-10 pb-1 pl-2  bg-slate-800/70 w-2/5 overflow-break rounded-xl"> 
    <Logo/>
    <span>We are a SaaS that provides a world class service to write SEO optimized blog posts driven by Artificial Intelligence. </span>

    <Link className='w-full text-sm text-center text-white font-bold p-2 w-full bg-green-500 rounded-md cursor-pointer hover:bg-green-600 transition-color' href='/post'>Begin</Link>
  </div>
 
 </div>
 )
}
