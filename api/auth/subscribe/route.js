const { NextResponse } = require("next/server")
import connect from '../../../lib/db'
import News_Subscribers from '../../../lib/model/news_subscribers.js'


export const POST = async (request) => {
    const body = await request.json()

    try {

        if (!body.email) {
            return new NextResponse(JSON.stringify({ response: 'Signin please' }, { status: 200 }))

        }

        const { email } = await News_Subscribers.findOne({ email: body.email })
        return new NextResponse(JSON.stringify({ response: 'Already Subscribed.' }, { status: 201 }))

    } catch (error) {
        await connect()
        const newSubscriber = new News_Subscribers(body)
        await newSubscriber.save()
        return new NextResponse(JSON.stringify({ response: 'Subscribed successfully.' }, { status: 201 }))
    }

}

