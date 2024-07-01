const { NextResponse } = require("next/server")

// gemini
import { GoogleGenerativeAI } from "@google/generative-ai";
import { format, isObject } from "util";
import { isStringObject } from "util/types";

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

const handleMessage = async (lesson, examType, noquestion) => {
    try {
        chatLoading = true
        if (examType === "True/False") {
            let sample = '[{"id":"1", "question":"what is biology", "A":"True", "B":"False", "Answer":"True"}]'
            const result = await chat.sendMessageStream(`generate ${noquestion} ${examType} exam questions, using this content ${lesson} and return the all the response only like this format not anything else, here's the format: ${sample}.`)
            const response = `${(await result.response).text()}`
            const answer = `${await response}`

            return answer


        } else {
            let sample = '[{"id":"1", "question":"what is biology", "A":"somathing1", "B":"something2","C":"somathing3", "D":"something4", "Answer":"B"}]'
            const result = await chat.sendMessageStream(`generate ${noquestion} ${examType} exam questions, using this content ${lesson} and return the all the response only like this format not anything else, here's the format: ${sample}.`)
            const response = `${(await result.response).text()}`
            const answer = `${await response}`

            return answer

        }




    } catch (error) {
        return "Error"
    }
}


export const POST = async (request) => {
    try {
        const body = await request.json()
        let { lesson, examType, noquestion } = body
        const result = await handleMessage(lesson, examType, noquestion)
        if (result === "Error") {


            return new NextResponse(JSON.stringify({ 'result': result }), { status: 200 })

        } else {
            // const response = JSON.parse(result);


            return new NextResponse(JSON.stringify({ result: result }), { status: 200 })
        }


    } catch (error) {

        return new NextResponse(JSON.stringify({ 'result': error.message }), { status: 500 })

    }
}

