'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { UserAuth } from '../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import {doSocialLogin} from '../actions'
import { useRouter } from 'next/navigation'


function AuthComponent() {
    let theme:any = "dark"
    const EndPoint = '/api/auth/users'

    const [passwords, setPasswords] = useState(null)
    const [resonseMessage, setResonseMessage]:any = useState(null)
    const [email, setEmail] = useState(null)
    const [fullName, setFullName] = useState(null)
    const {setUser,setusage, setAuthToken,user }:any = UserAuth()
    // let user = true
    const [status,setStatus]= useState(null)
    const [loading, setLoading] = useState(true);

    const {push} = useRouter()

const handleChange = (e) => {
        const { name, value } = e.target
        
        // setPasswords({ ...passwords, [name]: value })
        setEmail({ ...email, [name]: value })
        setFullName({ ...fullName, [name]: value })


      
    }

    const signup = () => {
      
            setLoading(true)
            
           
 
            let profilePicture = '' // magic link
            let aboutStatement = '1_Statement 5_Or_Less 10_Or_Less 50_Or_Less'
            let about = `${aboutStatement}`.split(' ')
            let googleID = "@@$$^jfs%@@09sjs!9873sd8422@@&5431fk@$%&*"
      
            axios.post(`${EndPoint}`, {'fullName':fullName.fullName, 'email':email.email, profilePicture, googleID,about})
                        .then((response) => {
                          
                           setStatus(200)
                           setResonseMessage(response.data.response)
                            setUser({'displayName':response.data.authToken.fullName,'email':response.data.authToken.email, 'photoURL':profilePicture, 'about':about});
                            setusage(response.data.authToken.power)
                            setAuthToken(response.data.authToken.authtoken)
                            push("/dashboard")

                            
                          })
                          .catch((error) => {
                            setStatus(404)
                            setResonseMessage(`${error.message}`)
                        } )
                        .finally(() => {
                            setLoading(false)
                          })

     

      
        }
        
    


    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 50));
            setLoading(false);
        };
        checkAuthentication();
    }, [user]);
    return (
        <div className='items-center flex justify-center columns-1' style={{ marginTop: '5%',flexDirection:'column' }}>

  

            {loading ? (
                <p>loading...</p>
            ) :(
                <div className='items-center bg-[#fff] justify-center flex border border-[#fff] rounded-box flex-wrap p-10' style={{ flexDirection: 'column',  }}>




                    <p className=' text-black  font-semibold  text-4xl pb-5'>Sign In</p>
   {resonseMessage ?  <p className=' text-red-500 p-5 pb-10 text-2xl'>{resonseMessage}</p>:null}

 {/* <form action={signup} className='items-center justify-center flex-col flex'> */}


<div className='items-center justify-center flex flex-col w-full'>
    
    <input
           type='text'
        className=' bg-white my-3 input-bordered py-3 px-6 text-left flex-row    border-2  items-center text-base-100  justify-between  rounded-box flex font-semibold w-full' name='fullName' placeholder='Your Name' required={false} onChange={handleChange} />
     <input
         type='email'
      className=' bg-white input-bordered py-3 px-6 text-left flex-row w-full   border-2  items-center text-base-100  justify-between  rounded-box flex font-semibold ' name='email' onChange={handleChange} placeholder='Email Address' required={false} />


       <button
          type='button'
         onClick={() => signup()}
      className=' bg-primary input-bordered hover:bg-primary/90 py-3 my-3 w-full  px-12 flex-col text-center     border-2  items-center text-white  justify-between  rounded-box flex font-semibold ' name='action' value="google"> <p className='mx-3'>Sign In with Email</p></button>




      <p className='my-4 top-border'>---------- or -----------</p>
</div>








       <button
         type='button'
         onClick={() => signup()}
      className=' bg-white  hover:bg-white/90 py-3 px-6 text-center flex-row    border-2  items-center text-base-100  justify-between  rounded-box flex font-semibold ' name='action' value="google"><FcGoogle size={24}/> <p className='mx-3'>Sign In with Google</p></button>
                                            

                                            
                                            
                                            {/* </form> */}

                </div>
            )}





        </div>
    )
}

export default AuthComponent