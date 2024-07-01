'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import Image from 'next/image'
import { FaUser, FaUserAstronaut } from 'react-icons/fa'
import axios from 'axios'
import { useRouter } from 'next/navigation'


const NavBar = () => {
    const {push} = useRouter()
  
        
    const EndPoint2 = '/api/users'
    const { logOut, googleSignIn, count, user, setUser, usage }:any = UserAuth();
    // const user = true
// MX Player
    // let  = UserAuth()
    const [loading, setLoading] = useState(true);

    const handleSignIn = async () => {
        // console.log('login pressed')
        try {
            await googleSignIn();
        } catch (error) {
            alert(error);
        }
    };






    const logOut_Mongodb = () => {
        axios.get(`${EndPoint2}/logout`)
        .then((response) => {
            push("/")
            setUser(null)
        })
                    .catch((error) => {
                        console.log(error.message)
                    } )
                  
    }

        const handleSignOut = async () => {
        try {
            await logOut();
            logOut_Mongodb()
        } catch (error) {
            console.log(error);
        }
    };




    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 50));
            setLoading(false);
        };
        checkAuthentication();
    }, [user]);

    return (
        <>
          <div className="justify-center items-center flex bg-gradient-to-r from-black via-primary/60  to-black py-2 rounded"  >
            <p className=" text-center">&copy; Geesi AI - 0.1V</p>

          </div> 
        <div className="navbar  border-t-primary/60  sticky z-50 top-0 bg-[#000] box-border shadow-white " >

            <div className="navbar-start ">

                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li className='my-1'><Link href="/">Home</Link></li>
                        <li className='my-1'><Link href="/dashboard/chat">Chatting</Link></li>
                        <li className='my-1'><Link href="/dashboard/simulate">Exam Simulation</Link></li>
                        <li className='my-1'><Link href="/dashboard/summarize">Exam Summarization</Link></li>
                        <li className='bg-primary/60 rounded my1'><Link href="/">Watch AD (SOON)</Link></li>
                     
                    </ul>

                </div>

 {/* header */}
                    <div className='items-center flex navbar-center mr-5 ' style={{ flexDirection: 'column' }}>
                     
                        <Link href="/" className=''>
                        <h1 className="text-white text-2xl md:text-2xl text-center pl-5  font-[600] " style={{letterSpacing:2}}>
       
        <span className="text-white inline-block  bg-clip-text">Geesi AI</span></h1>
                </Link>
                
          
                        
                    </div>
            </div>


      


            <div className="navbar-end">

                {loading ? (
                    <span className="loading loading-ring loading- text-primary/60 mt-0 pt-0 size-16"></span>

                ) : !user ? (

                  <Link href="/auth">
                      <button className='btn btn-black border-primary  py-0 text-white' style={{borderRadius:50}}>Get Start</button>
                  </Link>

                ) : (

<>

<h1 className='text-1xl font-bold pr-2'>{usage == null ? '':`usage: ${usage}`}</h1>

                    <div className="dropdown dropdown-end">
                    <Link href="/profile">
                        <div 
                        
                        tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
 <div className="w-10 rounded-full">
                            
                                <Image src={user.photoURL}
                                    width={100}
                                    alt='profile'
                                    height={24}
                                />
                                </div>

                        </div>
                        </Link>
                        {/* <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3  p-2 shadow bg-base-100 rounded-box w-72 ">
                            <li>
                                <a href='/profile' className="justify-between">
                                    Account
                                    <span className="badge text-secondary">Danger Zone</span>
                                </a>
                            </li>
                            <li><a><Link href="/auth/auth-reset">Edit My Grade</Link></a></li>
                            <li onClick={handleSignOut}><a>Logout</a></li>
                        </ul> */}
                    </div>
                </>
                )}
            </div>


        </div>
       
        </>
    )
}

export default NavBar