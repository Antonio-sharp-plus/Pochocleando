const servicioChatBot = require("../service/servicioChatBot");

async function LlamarChatbotController(req, res) {
    try {
        const prompt = req.body.prompt;
        const datos = await servicioChatBot.LlamarChatBotService(prompt);
        res.json({ recomendacion: datos, prompt: prompt });    
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    LlamarChatbotController
}