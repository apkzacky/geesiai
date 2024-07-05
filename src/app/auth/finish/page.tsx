import React from 'react'
import { auth } from '../../../auth'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import FinishAuth from '../../component/FinishAuth'
const page = async () => {
  const session = await auth()
  if (!session?.user) redirect("/")

  const finishSignIn = async () => {
  }

  
  let email = session?.user?.email
  let name = session?.user?.name
  let secreteID = '@12@0@#bf#4#$$7$*oh*i*09'
  let googleID = `${email}${name}${secreteID}`

  return (
    <div className='items-center justify-center flex flex-col pt-20'>
      

    <h3>Hi! {session?.user?.name}</h3>
    <p>Please finish the loging.</p>

      <div className='items-center justify-center flex mt-5 '>

         <FinishAuth name={session?.user.name} email={session?.user.email} image={session?.user.image} googleID={googleID} />
      </div>
    </div>
  )
}

export default page