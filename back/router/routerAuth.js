const express = require('express');
const router = express.Router();
const controllerUsuario = require('../controller/controllerUsuario');

// Registro
router.post('/registro', controllerUsuario.registrarUsuario);
// Login
router.post('/login', controllerUsuario.loginUsuario);
// Recuperación de contraseña
router.post('/forgot-password', controllerUsuario.recuperarPassword);
// Resetear contraseña
router.post('/reset-password', controllerUsuario.resetearPassword);

module.exports = router;
