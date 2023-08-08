import React, {ReactNode } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const Applayout = ({children}:{children:ReactNode}) => {
  return (
    <div className='grid grid-cols-12 h-screen max-h-screen'>
        
        <div className='col-span-2 h-screen'><Sidebar/></div>
        <div className='col-span-10'>{children}</div>
        </div>
  )
}

export default Applayout;