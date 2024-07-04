import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
function page() {
  
  return (

    <div className='p-2 items-center justify-center flex bg-black' >


      <div className='items-center justify-center flex mt-26 flex-wrap p-5' style={{ flexDirection: 'column', paddingTop: '0%', }}>



















        {/* header */}
        <div className='items-center flex  ' style={{ flexDirection: 'column' }}>
        
           
             <Image
                            src="/icon-black.png"
                            alt="Vercel Logo"
                            // className="dark:invert"
                            width={170}
                            height={24}
                            priority
                        />
         
          <div className="hero-content text-center">
             <div className="max-w-2xl">
              <p className="pb-3 text-white text-center">Geesi AI is Designed to make studying easier and more interactive, Developed by Zacky (ApkZacky) Founder of ApkZacky apps,
our app offers personalized assistance across various subjects. Whether you're tacking tough math problem, exploring history, or enhancing language skills, our app is here to guide you. Get instant explanations, detailed answers, all while enjoying a seamless, user-frienly experience. Elevate your education with cutting-edge AI technology at your fingertips.<br/><span className='text-success mt-5'>Contact US: apkzacky@gmail.com</span>
</p>





            </div>
          </div>
        </div>







      </div>




      {/* <p>welcome to sual.ai</p> */}
    </div>
  )
}

export default page