'use client'

import React from 'react'
import Hero from './Hero'
import AboutSectionOne from './about/AboutSectionOne'
import Contact from './Contact'
import Video from './Video'
import AboutSectionTwo from './about/AboutSectionTwo'
import Features from './component/Features'
import ScrollToTop from './ScrollToTop'
import { UserAuth } from './context/AuthContext'

function page() {
    const { logOut, googleSignIn, user, setUser, usage, isDark }:any = UserAuth();
  
  return (
<div className={`items-center justify-center flex md:px-20 ${isDark ? 'bg-[#000]':'bg-[#fff]'}`} style={{flexDirection:'column'}} data-theme={isDark ? 'dark':'light'} >

   
      <Hero />
      <Video />
      <Features />
      <AboutSectionTwo />
      <AboutSectionOne />
      <Contact />
      <ScrollToTop />


</div>
  )
}

export default page

// 'use client'
// import React from 'react'

// import axios from "axios";
// import { useState, useEffect } from "react";

// function page() {
//   useEffect(() => {

//     var postData = {"data":{"type":"user","attributes":{"email":"flasdjfkl@gmlai.com","phone":"251953184057","role":256,"tenant":"smfi"}}}


//   const headers = {
      
// 'Content-Length': '119',
// 'Sec-Ch-Ua': '',
// 'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
// 'X-Content-Type-Options': 'nosniff',
// 'Sec-Ch-Ua-Mobile': '?0',
// 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.141 Safari/537.36',
// 'X-Frame-Options': 'sameorigin',
// 'Content-Type': 'application/json',
// 'Accept': 'application/json, text/plain, */*',
// 'X-Secured-Header': 'MPzwGG0ak7n9iBWi3jHK7gY4Sw7FUrCfVq45eMuOA7M=;70g1+l3M8LmkzvxcGXWw4yNGrvkyUYPb1XKEGzi1+I4=',
// 'X-Xss-Protection': '1; mode=block',
// 'Sec-Ch-Ua-Platform': '',
// 'Origin': 'localhost',
// 'Sec-Fetch-Site': 'same-site',
// 'Sec-Fetch-Mode': 'cors',
// 'Sec-Fetch-Dest': 'empty',
// 'Referer': 'https://wallet.sahal-mfi.com/',
// 'Accept-Encoding': 'gzip, deflate',
// 'Accept-Language': 'en-US,en;q=0.9',
// 'Connection': 'close',
// 'Access-Control-Allow-Origin': '*',

//   }


// // const headers = {
// //   'Origin': 'http://localhost:3000',
// //   'Host': 'apigateway.sahal-mfi.com',
// //   'Content-Type': 'application/json',
// //   'Authorization': 'JWT fefege...'
// // }


// axios.post('https://apigateway.sahal-mfi.com/api/v1/um/user/generate-otp', postData, {headers})
// .then((res) => {
//   console.log("RESPONSE RECEIVED: ", res.response.data);
// })
// .catch((err) => {
//   console.log("AXIOS ERROR: ", err.response.data);
// })
//   })
//   return (
//     <div>page</div>
//   )
// }

// export default page