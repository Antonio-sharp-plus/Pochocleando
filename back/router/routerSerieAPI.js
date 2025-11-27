const express = require("express");
const router = express.Router();
const controllerAPI = require("../controller/controllerAPI");

router.get('/buscar', controllerAPI.BuscarSeries);
router.get('/populares', controllerAPI.BuscarSeriesPopulares);
router.get('/comedia', controllerAPI.BuscarSeriesComedia);
router.get('/drama', controllerAPI.BuscarSeriesDrama);
router.get('/valoradas', controllerAPI.BuscarSeriesValoradas);

module.exports = router;