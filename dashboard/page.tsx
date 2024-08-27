'use client'
import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext';
import Community from '../DashboardComponent';
import { redirect } from 'next/navigation';



function page() {

    const { user, tokenLoading, isDark }:any = UserAuth();
    
    return (
        <div className={`${isDark ? 'bg-black text-white':'bg-white text-black'} p-4 flex b`} style={{ flexDirection: 'column', }}>
            {tokenLoading ? (
                <div className='h-full  items-center justify-center flex bg-white' style={{ flexDirection: 'column', }}>
               <h3 className=' text-3xl'>Loading...</h3>
               </div>

            ) : user ? (
                <div className='items-center justify-center flex' style={{ flexDirection: 'column', }}>
                <Community displayName={user.displayName} />
                </div>
            ) : redirect('/auth')}


        </div>
    )
}

export default page