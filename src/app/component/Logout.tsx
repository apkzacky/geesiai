'use client'
import React from 'react'
import { doLogout } from '../actions'
import { FaSignOutAlt } from 'react-icons/fa'
import axios from 'axios'
import { UserAuth } from '../context/AuthContext'

function Logout() {
  const {setUser}:any = UserAuth()
  function Logout(){
const EndPoint = '/api/auth/users'

     axios.get(`${EndPoint}/logout`)
        .then((response) => {
            setUser(null)
            doLogout()
        })
        .catch((error) => {
            console.log(error.message)
        })
  }
  return (
    <form action={Logout}>
    <button
      type='submit'
      className='btn bg-white hover:bg-white/90  text-secondary py-2 px-8 border-2 border-bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400  items-center justify-between flex' style={{borderRadius:50,marginTop:'5%',flexDirection:'row'}} name='action' value="google"><FaSignOutAlt size={20}/>Sign Out</button>

    </form>
  )
}

export default Logout