'use client'
import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext';
import AuthComponent from '../auth/page';
import Community from '../DashboardComponent';



function page() {

    const { user, tokenLoading }:any = UserAuth();
    
    return (
        <div className='p-4 flex ' style={{ flexDirection: 'column', }}>
            {tokenLoading ? (
                <div className='items-center justify-center flex' style={{ flexDirection: 'column', }}>
               <h3 className='text-white text-3xl'>Loading...</h3>
               </div>

            ) : user ? (
                <div className='items-center justify-center flex' style={{ flexDirection: 'column', }}>
                <Community displayName={user.displayName} />
                </div>
            ) : (
                <AuthComponent />
            )}


        </div>
    )
}

export default page