const express = require("express");
const router = express.Router();
const controllerAPI = require("../controller/controllerAPI");

router.get('/buscar', controllerAPI.BuscarPelículas);
router.get('/populares', controllerAPI.BuscarPelículasPopulares);
router.get('/valoradas', controllerAPI.BuscarPelículasValoradas);
router.get('/estrenos', controllerAPI.BuscarPelículasEstreno);
router.get('/accion', controllerAPI.BuscarPelículasAccion);
router.get('/comedia', controllerAPI.BuscarPelículasComedia);
router.get('/drama', controllerAPI.BuscarPelículasDrama);
router.get('/scifi', controllerAPI.BuscarPelículasSciFi);

module.exports = router;