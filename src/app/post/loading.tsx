"use client";

import React, { useEffect } from "react";
import "../../styles/loader.css";

const loading = () => {
  useEffect(() => {
    return () => {
      const delay = new Date().getTime() + 500;
      while (delay - new Date().getTime() > 0) {}
    };
  },[]);
  return(
  <div className="h-screen flex justify-center md:items-center">
    <div className="lds-hourglass"></div>
  </div> )
  
};

export default loading;