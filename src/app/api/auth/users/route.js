const { NextResponse } = require("next/server")
import { cookies } from 'next/headers'
import connect from '../../../lib/db'
import User from '../../../lib/model/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const ObjectId = require('mongoose').Types.ObjectId




const getId = async (token) => {

    try {
        // const {  } = await User.findOne({ _id })
        const { email } = jwt.decode(token, process.env.MY_SECRET)
        const { _id } = await User.findOne({ email })

        return _id
    } catch (error) {
        return error.message
    }

}


export const GET = async () => {

    try {
        await connect()
        const users = await User.find()
        return new NextResponse(JSON.stringify({ response: "UN-AUTHORIZED ACCESS" }), { status: 200 })
    } catch (error) {
        return new NextResponse("Error in fetching users" + error, { status: 500 })
    }
}


// export const POST = async (request) => {
//     try {
//         const body = await request.json()
//         let { authtoken } = body


//         cookies().set({
//             name: 'authToken',
//             value: authtoken,
//             httpOnly: true,
//             path: '/',
//         })
//         return new NextResponse(JSON.stringify({ authtoken }), { status: 200 })


//     } catch (error) {
//         return new NextResponse("Error in creating user" + error, { status: 500 })

//     }
// }


export const POST = async (request) => {
    try {
        const body = await request.json()
        let { email, fullName, secretSignupKey, profilePicture, googleID, about } = body

        const Addition_GoogleID = "8422@@&5431fk@$%&*"
        let googleID_secret = `${googleID}${Addition_GoogleID}`


        // if (secretSignupKey !== old_SecretSignupKey) {
        //     return new NextResponse(JSON.stringify({ response: "Access Denied" }), { status: 300 })

        // }


        await connect()

        const user = await User.findOne({ email: email })
        if (!user) {
            await connect()


            // hashing the password
            // const salt = bcrypt.genSaltSync(10);
            // let password = bcrypt.hashSync(body.password, salt)


            let power = 25
            const token = jwt.sign({ email, fullName, power }, process.env.MY_SECRET, { expiresIn: "1d" })
            const authtoken = jwt.sign({ email, fullName, power }, process.env.MY_SECRET, { expiresIn: "365d" })

            let data = { email, fullName, power, authtoken, token, profilePicture, 'googleID': googleID_secret, about }
            // let data2 = { ...data, authtoken }
            const newUser = new User(data)
            await newUser.save()


            cookies().set({
                name: 'authToken',
                value: authtoken,
                httpOnly: true,
                path: '/',
            })

            return new NextResponse(JSON.stringify({ response: "You're successfully signup.", 'authToken': data }, { status: 201 }))
        } else {

            await connect()
            const { about, fullName, power, authToken, googleID } = await User.findOne({ email: email })



            const Addition_GoogleID = "8422@@&5431fk@$%&*"
            let googleID_secret = `${body.googleID}${Addition_GoogleID}`


            if (googleID === googleID_secret) {
                cookies().set({
                    name: 'authToken',
                    value: authToken,
                    httpOnly: true,
                    path: '/',
                })
                return new NextResponse(JSON.stringify({ response: `Welcome back`, 'authToken': { email, about, fullName, power, authToken, googleID } }, { status: 201 }))
            } else {
                return new NextResponse(JSON.stringify({ response: 'UN-AUTHORIZED ACCESS' }, { status: 300 }))
            }
        }







    } catch (error) {
        return new NextResponse("Error in creating user" + error, { status: 500 })

    }
}

export const PATCH = async (request) => {

    try {
        const body = await request.json()
        const { authToken, old_password, new_password } = body


        const { email } = jwt.decode(authToken, process.env.MY_SECRET)
        const { password } = await User.findOne({ email })
        const userId = await getId(authToken)


        if (!authToken || !new_password || !old_password) {
            return new NextResponse(JSON.stringify({ response: "AuthToken, new_password & old_password is required" }), { status: 400 })
        }

        if (!ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ response: "invalid user ID" }), { status: 400 })
        }


        if (bcrypt.compareSync(old_password, password)) {


            // hashing the password
            const salt = bcrypt.genSaltSync(10);
            let hashed_password = bcrypt.hashSync(new_password, salt)



            await connect()

            const updatedUser = await User.findOneAndUpdate(
                { _id: new ObjectId(userId) },
                { password: hashed_password },
                { new: true }
            )

            if (!updatedUser) {
                return new NextResponse(JSON.stringify({ response: "user not found, password did not updated." }), { status: 400 })

            }

            return new NextResponse(JSON.stringify({ response: "password reseted successfully." }), { status: 200 })
        } else {
            return new NextResponse(JSON.stringify({ response: "Old password is not correct." }), { status: 200 })

        }




    } catch (error) {
        return new NextResponse(JSON.stringify({ response: "Error reseting passwrod.", error }), { status: 500 })

    }
}


// export const DELETE = async (request) => {
//     try {

//         const { searchParams } = new URL(request.url);

//         const token = searchParams.get("authtoken")
//         const userId = await getId(token)

//         //validating userID

//         if (!userId) {
//             return new NextResponse(JSON.stringify({
//                 response: 'User ID is required',
//             }, { status: 400 }))
//         }
//         if (!ObjectId.isValid(userId)) {
//             return new NextResponse(JSON.stringify({ response: "invalid user ID" }), { status: 400 })
//         }

//         await connect()

//         const deletedUser = await User.findByIdAndDelete(
//             // new ObjectId(userId)
//             { _id: new ObjectId(userId) }

//         )


//         //checking if user is found and deleted
//         if (!deletedUser) {
//             return new NextResponse(JSON.stringify({ response: "user not found." }), { status: 404 })

//         }

//         cookies().delete('authToken')
//         return new NextResponse(JSON.stringify({ response: "account deleted successfully." }), { status: 200 })




//     } catch (error) {
//         return new NextResponse(JSON.stringify({ response: "Error deleting user.", error }), { status: 500 })

//     }
// }