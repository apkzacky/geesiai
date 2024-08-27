const { NextResponse } = require("next/server")

// gemini
import { GoogleGenerativeAI } from "@google/generative-ai";

let chatLoading = false
// about gemini
const gemini_api_key = process.env.API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
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




// let response2 = `${result.response.candidates[0].content.parts[0].text}`
const chat = geminiModel.startChat({
    history: [],
    generationConfig: {
        maxOutputTokens: 4096,
    }
})

const handleMessage = async (message) => {
    try {
        chatLoading = true
        const result = await chat.sendMessageStream(message)
        const response = `${(await result.response).text()}`
        const answer = `here's summarized content: ${await response}`
        return answer;


    } catch (error) {
        return "[Connection-Error], Please check your internet connection and try again."
    }
}


export const POST = async (request) => {
    try {
        const body = await request.json()
        let { message } = body
        const result = await handleMessage(`Summarize the following PDF document in 2 sentences or less, here's the document: ${message}`)

        return new NextResponse(JSON.stringify({ 'result': result }), { status: 200 })

    } catch (error) {

        return new NextResponse(JSON.stringify({ 'result': error.message }), { status: 500 })

    }
}

