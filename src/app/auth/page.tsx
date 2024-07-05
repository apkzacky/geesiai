'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { UserAuth } from '../context/AuthContext';
import { FaGoogle } from 'react-icons/fa';
import {doSocialLogin} from '../actions'


function AuthComponent() {
    let theme:any = "dark"
    const EndPoint = 'http://localhost:5000/api/user/signup'

    const [passwords, setPasswords] = useState(null)
    const [resonseMessage, setResonseMessage]:any = useState(null)
    
    const {  user }:any = UserAuth()
    // let user = true
    const [status,setStatus]= useState(null)
    const [loading, setLoading] = useState(true);


const handleChange = (e) => {
        const { name, value } = e.target
        
        setPasswords({ ...passwords, [name]: value })
      
    }

    const signup = () => {
         if(passwords.password1 == passwords.password2) {
            
                let email = user.email
                let password = passwords.password1
 
                // save to MongoDBAltas
                let fullName = user.displayName
          

                axios.post(`${EndPoint}`, { fullName, email, password})
                    .then((response) => {
                       setStatus(200)
                        setResonseMessage(response.data.response)
                        localStorage.setItem('token', response.data.token)
                    })
                    .catch((error) => {
                        setStatus(404)
                        setResonseMessage(error.message)
                      } )
                    .finally(() => setLoading(false))

         }
            
        else setResonseMessage('password and comfirmation password should be the same.')


      
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
                <div className='items-center justify-center flex  flex-wrap p-5' style={{ flexDirection: 'column',  }}>




                    <p className=' text-white font-bold pb-2 text-4xl'>Hi there!</p>
                    {/* <p className=' text-white/50 pb-10 text-2xl'>{'Sign In to get started!'}</p> */}


  
                                            <form action={doSocialLogin} className='items-center justify-center flex-col flex'>
                                                <button
                                                type='submit'
                                                className='btn bg-white hover:bg-white/90  text-secondary py-2 px-10 border-2 border-bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400  items-center justify-between flex' style={{borderRadius:50,marginTop:'5%',flexDirection:'row'}} name='action' value="google"><FaGoogle size={20}/>Sign In With Google</button>
                                            

                                            
                                            
                                            </form>

                </div>
            )}





        </div>
    )
}

export default AuthComponent