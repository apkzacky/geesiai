const { NextResponse } = require("next/server")
import connect from '../../../lib/db'
import Feedback from '../../../lib/model/feedback'




export const POST = async (request) => {
    try {
        const body = await request.json()
        await connect()


        const newFeedback = new Feedback(body)
        await newFeedback.save()



        return new NextResponse(JSON.stringify({ response: 'feedback sent.' }, { status: 201 }))
    } catch (error) {
        return new NextResponse("Error in sending feedback" + error, { status: 500 })

    }
}

