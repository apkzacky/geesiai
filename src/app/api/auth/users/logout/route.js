import { cookies } from 'next/headers'
const { NextResponse } = require("next/server")


export const GET = async () => {

    try {
        cookies().delete('authToken')
        return new NextResponse(JSON.stringify({ 'response': 'You Loged out.' }), { status: 200 })
    } catch (error) {
        return new NextResponse(JSON.stringify({ 'response': error.message }), { status: 500 })

    }
}



// export const POST = async () => {

//     try {
//         const body = await request.json()


//         return new NextResponse(JSON.stringify({ 'response': body.email }), { status: 200 })
//     } catch (error) {
//         return new NextResponse(JSON.stringify({ 'response': error.message }), { status: 500 })

//     }
// }

