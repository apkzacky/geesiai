const { NextResponse } = require("next/server")
import connect from '../../../lib/db'
import User from '../../../lib/model/user'
import jwt from 'jsonwebtoken'


// gemini
import { GoogleGenerativeAI } from "@google/generative-ai";
import { cookies } from 'next/headers';

const ObjectId = require('mongoose').Types.ObjectId
let chatLoading = false


let image = false

// about gemini
const gemini_api_key = process.env.API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const googleAI2 = new GoogleGenerativeAI(gemini_api_key);

const geminiConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputTokens: 4096,
};

const geminiModel = googleAI.getGenerativeModel({
    model: "gemini-pro",
    geminiConfig,
});

const model = googleAI2.getGenerativeModel({ model: 'gemini-1.5-flash' })

export const GET = async (request) => {


    try {



        const { searchParams } = new URL(request.url);
        const authToken = searchParams.get("authtoken")
        const power_rest = 25

        // const {  } = await User.findOne({ _id })
        const { email, fullName } = jwt.decode(authToken, process.env.MY_SECRET)


        const { token, _id, power, about, profilePicture } = await User.findOne({ email })

        try {

            const user = jwt.verify(token, process.env.MY_SECRET)

        } catch (error) {

            // expired
            if (error.message === "jwt expired") {
                const token = jwt.sign({ email, fullName }, process.env.MY_SECRET, { expiresIn: "1d" })
                // update the token
                await User.findByIdAndUpdate(
                    _id, // find by id
                    { token: token },
                    { new: true }
                );
                //update the power
                const updatedUser = await User.findOneAndUpdate(
                    { _id: new ObjectId(_id) },
                    { power: power_rest },
                    { new: true }
                )
                return new NextResponse(JSON.stringify({ 'usage': power_rest, 'token': token }), { status: 200 })



            } else return new NextResponse(JSON.stringify({ response: "invalid user ID" + error }), { status: 400 })

        }


        return new NextResponse(JSON.stringify({ 'usage': power, 'fullName': fullName, 'email': email, 'about': about, 'photoURL': profilePicture }), { status: 200 })



    } catch (error) {
        return new NextResponse(JSON.stringify({ 'usage': '?', message: 'Invalid UserID' + error }), { status: 500 })

    }










}










const getId = async (token) => {

    try {
        // const {  } = await User.findOne({ _id })
        const { email } = jwt.decode(token, process.env.MY_SECRET)
        const { _id } = await User.findOne({ email })

        return { _id }
    } catch (error) {
        return error.message
    }

}


const handlePowerReset = async (id, message) => {
    let _id = id
    try {

        await connect()

        const { email, fullName } = await User.findOne({ _id })
        const token = jwt.sign({ email, fullName }, process.env.MY_SECRET, { expiresIn: "1d" })
        const power_rest = 25


        // update the token
        await User.findByIdAndUpdate(
            _id, // find by id
            { token: token },
            { new: true }
        );
        //update the power
        const updatedUser = await User.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { power: power_rest },
            { new: true }
        )


        // const updatedUser2 = await User.findOneAndUpdate(
        //     { _id: new ObjectId(id) },
        //     // { power: 5 },
        //     { token: 'token' },
        //     { new: true }
        // )

        return power_rest - 1



    } catch (error) {
        return "Error reseting user." + error.message

    }
}

// let response2 = `${result.response.candidates[0].content.parts[0].text}`
const chat = geminiModel.startChat({
    history: [],
    generationConfig: {
        maxOutputTokens: 4096,
    }
})

const handleMessage = async (message, inputType, imageBase64, imageType, aboutq) => {
    try {
        if (inputType === 'vision') {

            const imageParts = {
                'inlineData': { 'data': imageBase64, 'mimeType': imageType }
            }

            const prompt = `${message}. and make sure the response statement should be ${aboutq}`
            const result = await model.generateContent([prompt, imageParts])
            const response = await result.response
            const text = response.text()
            return text

        }

        if (inputType === 'text') {

            chatLoading = true
            const result = await chat.sendMessageStream(message)
            const response = `${(await result.response).text()}`
            const answer = `${await response}`
            return answer;
        }


    } catch (error) {
        return "error"
    }
}

const handlePowerDecrement = async (id, message, inputType, imageBase64, imageType, aboutq) => {

    let _id = id
    try {
        let response_message = await handleMessage(message, inputType, imageBase64, imageType, aboutq)

        await connect()

        let { power } = await User.findOne({ _id })

        if (power >= 1) {

            // await User.findByIdAndUpdate(
            //     _id, // find by id
            //     { 'power': power - 1 } // reduce by 1
            // );

            if (response_message !== "error") {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: new ObjectId(id) },
                    { power: power - 1 },
                    { new: true }
                )
            } else {
                response_message = "[Connection-Error], Please check your internet connection and try again."
            }

            return { 'usage': power - 1, 'response': response_message }
        } else return { 'usage': 0, 'response': "Your usage is 0, to get more FREE-usage please come back after 24/hours for (5-usage) OR watch AD for (5/5), if you want unlimited usage please use subscription version." }


    } catch (error) {
        return { 'response': "[Connection-Error], Please check your internet connection and try again." }

    }
}

export const POST = async (request) => {
    try {
        const body = await request.json()
        let { message, authToken, inputType, imageBase64, imageType, aboutq } = body
        const { _id } = await getId(authToken)
        let userId = _id

        if (!message) {
            return new NextResponse(JSON.stringify({ response: "message is required." }), { status: 400 })
        }

        if (!userId) {
            return new NextResponse(JSON.stringify({ response: "ID is required" }), { status: 400 })
        }

        if (!ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ response: "invalid user ID" }), { status: 400 })
        }








        try {
            // getting token
            const { token } = await User.findOne(
                { _id: new ObjectId(userId) }
            )
            const user = jwt.verify(token, process.env.MY_SECRET)

        } catch (error) {

            // expired
            if (error.message === "jwt expired") {
                let reset = await handlePowerReset(userId, message)

                let result = await handlePowerDecrement(userId, message, inputType, imageBase64, imageType, aboutq)

                return new NextResponse(JSON.stringify({ 'result': result, 'reset': reset, 'exp': true, }), { status: 200 })

            } else return new NextResponse(JSON.stringify({ response: "invalid user ID" }), { status: 400 })

        }


        let result = await handlePowerDecrement(userId, message, inputType, imageBase64, imageType, aboutq)

        return new NextResponse(JSON.stringify({ 'result': result, 'exp': false, }), { status: 200 })


    } catch (error) {
        return new NextResponse("Error while getting response user" + error.message, { status: 500 })

    }
}