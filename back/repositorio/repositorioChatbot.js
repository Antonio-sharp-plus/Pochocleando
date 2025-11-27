require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function LlamarChatBot(prompt){
    try{
        const chatbot = new GoogleGenerativeAI("AIzaSyCyqtBJAO3zcRT_Q6QMnqa4Qr3oddZ0yHo")
        const model = chatbot.getGenerativeModel({model: "gemini-2.5-flash"})

        const respuesta = await model.generateContent(prompt)
        // Extraer solo el texto de la respuesta
        const textoRespuesta = respuesta.response.text()
        //console.log('Respuesta del chatbot:', textoRespuesta)
        
        return textoRespuesta
    }
    catch (error){
        console.log("Hubo un error:", error.message)
        throw error
    }
}

module.exports = {
    LlamarChatBot
}
