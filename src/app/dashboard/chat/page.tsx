'use client'
import { useRouter } from "next/navigation";
import ValidationOutput from "./ValidationOutput";
import { FaFileCsv } from "react-icons/fa";
import { useState, useRef } from "react";
import * as XLSX from 'xlsx'


import axios from "axios";
import ChatComponent from "./chat";
import { UserAuth } from "../../context/AuthContext";
import AuthComponent from "../../auth/page";

const Simulation = () => {
  // about gemini
  const {user,tokenLoading}:any = UserAuth()


  const [sumarizationText, setSumarizationText] = useState('')
  return tokenLoading ? (
          
<div className="items-center justify-center flex">
  <h3 className="my-5 text-2xl font-bold leading-tight text-white dark:text-white">
        Loading...
      </h3>
</div>
  ):!user ? (
     <AuthComponent  />
  ):(
      <div className="container flex ">
        <div className="-mx-4 items-center justify-center flex flex-wrap" style={{flexDirection:'row'}}>
         
        
 <div className="w-full  lg:w3/12 xl:w-4/12 z-50 sticky top-10">
          <ValidationOutput  />

          </div>


          <div className="w-full px-4 lg:w7/12 xl:w-8/12 z-50 sticky top-1">
          <ChatComponent  />
          </div>

{/* <div style={{height:250,width:2,backgroundColor:'grey',marginTop:100}}></div> */}


        </div>
      </div>
  );
};

export default Simulation;
