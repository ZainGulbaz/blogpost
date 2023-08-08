"use client";

import React, { useEffect } from "react";
import "../styles/loader.css";

const loading = () => {
  return(
  <div className="h-screen flex justify-center md:items-center">
    <div className="lds-hourglass"></div>
  </div> )
  
};

export default loading;