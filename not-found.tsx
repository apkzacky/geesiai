import React from 'react'

function page() {
  return (
    <div className='items-center justify-center flex flex-col pt-36'>
      <code className='md:text-3xl text-amber-400 text-center '>{JSON.stringify({'response':'invalid-request'})}</code>
    </div>
  )
}

export default page