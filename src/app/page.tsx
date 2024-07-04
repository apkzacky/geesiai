import React from 'react'
import Hero from './Hero'
import AboutSectionOne from './about/AboutSectionOne'
import ScrollUp from './component/Common/ScrollUp'
import Contact from './Contact'
import Video from './Video'
import AboutSectionTwo from './about/AboutSectionTwo'
import Features from './component/Features'
function page() {
  
  return (
<div className='items-center justify-center flex md:px-20' style={{flexDirection:'column'}}>

    <ScrollUp />
      <Hero />
      <Video />
      
      <Features />
      <AboutSectionTwo />

      <AboutSectionOne />
      <Contact />

</div>
  )
}

export default page