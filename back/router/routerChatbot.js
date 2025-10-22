const express = require('express');
const router = express.Router();
const controllerChatbot = require('../controller/controllerChatbot');

router.post('/', controllerChatbot.LlamarChatbotController);

module.exports = router;