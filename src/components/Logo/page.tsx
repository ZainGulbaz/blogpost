import React from 'react'
import {FaBrain} from "react-icons/fa";

const Logo = () => {
  return (
    <div className='flex gap-4'>
        <h4 className='text-3xl font-bold text-white font-heading'>AI Blog</h4>
        <FaBrain size="40px" className="text-white"/>
    </div>
  )
}

export default Logo