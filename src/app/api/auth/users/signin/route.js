// const { NextResponse } = require("next/server")
// import { cookies } from 'next/headers'
// import connect from '../../../../lib/db'
// import User from '../../../../lib/model/user'
// import bcrypt from 'bcrypt'

// const ObjectId = require('mongoose').Types.ObjectId

// export const POST = async (request) => {
//     try {
//         const body = await request.json()
//         let { email } = body



//         await connect()
//         const actual_user = await User.find({ email })
//         const fullName = actual_user[0].fullName
//         const Email = actual_user[0].email
//         const about = actual_user[0].about
//         const power = actual_user[0].power
//         const authToken = actual_user[0].authtoken
//         // if (bcrypt.compareSync(body.password, actual_user[0].password)) {
//         cookies().set({
//             name: 'authToken',
//             value: actual_user[0].authtoken,
//             httpOnly: true,
//             path: '/',
//         })
//         let response_data = { fullName, Email, about, power, authToken }
//         return new NextResponse(JSON.stringify({ response: 'access granted', response_data }, { status: 201 }))

//         // } else return new NextResponse(JSON.stringify({ response: 'access denied', response_data: undefined }, { status: 300 }))

//     } catch (error) {
//         return new NextResponse("Error while logining user" + error, { status: 500 })

//     }
// }
