'use client'
import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext';
import Image from 'next/image'
import AuthComponent from '../auth/page';
import Logout from '../component/Logout';
import { redirect } from 'next/navigation';


const page = () => {

    const { user, tokenLoading } = UserAuth();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 50));
            setLoading(false);
        };
        checkAuthentication();
    }, [user]);
    // console.log(user)




    return (
        <div className='p-4 flex ' style={{ flexDirection: 'column', }}>
            {tokenLoading ? (
                <div className='items-center justify-center flex  flex-wrap p-5'>

                    <span class="loading loading-ring loading- text-primary size-24"></span>

                </div>

            ) : user ? (
                <div className='items-center justify-center flex' style={{ flexDirection: 'column', }}>

                    <Image alt='' src={user.photoURL} width={100} height={100} className='rounded-5 my-3 rounded-full' />
                    <div className='items-center justify-center flex ' style={{ flexDirection: 'column' }}>
                        {/* {userDeleted ? (
                            <p className='text-success'>{ResonseMessage}</p>

                        ) : (
                        )} */}
                        <h1 className='text-white font-bold' style={{ fontSize: '150%' }}>Hi! <span style={{}}> {user.displayName}</span>
                        </h1>


                        <Logout />


                    </div>
                </div>
            ) : redirect('/auth')}


        </div>
    )
}

export default page