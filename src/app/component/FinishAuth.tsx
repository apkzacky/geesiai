'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { UserAuth } from '../context/AuthContext'

function FinishAuth(props) {

    const EndPoint = '/api/auth/users/'
    const {push} = useRouter()
    const [resonseMessage, setResonseMessage]:any = useState(null)
    const {setUser,setusage, setAuthToken }:any = UserAuth()
    // let user = true
    const [status,setStatus]= useState(null)
    const [loading, setLoading] = useState(false);



        const Signup = () => {
        

            setLoading(true)
            let fullName = props.name
            let email = props.email
            let googleID = props.googleID
            let profilePicture = props.image
            let aboutStatement = '1_Statement 5_Or_Less 10_Or_Less 50_Or_Less'
            let about = `${aboutStatement}`.split(' ')
            let secretSignupkey = "@@$$^jfs%@@09sjs!9873sd8422@@&5431fk@$%&*"

            axios.post(`${EndPoint}`, {fullName, email, profilePicture, googleID, about, secretSignupkey})
                        .then((response) => {
                          
                           setStatus(200)
                           setResonseMessage(response.data.response)
                            setUser({'displayName':response.data.authToken.fullName,'email':response.data.authToken.email, 'photoURL':props.image, 'about':about});
                            setusage(response.data.authToken.power)
                            setAuthToken(response.data.authToken.authtoken)
                            push("/dashboard")

                            
                          })
                          .catch((error) => {
                            setStatus(404)
                            setResonseMessage(`Something want wrong, Please try again.\n${error.message}`)
                        } )
                        .finally(() => {
                            setLoading(false)
                          })

     

      
        }

  return (
      <div className='items-center justify-center flex flex-col'>
        <p>{resonseMessage}</p>
         <button onClick={() => {
        Signup()
       }} className='btn btn-primary border-primary  py-0 text-white' style={{borderRadius:50}}>{loading ? 'Finishing...':'Finish'}</button>
      </div>
  )
}

export default FinishAuth