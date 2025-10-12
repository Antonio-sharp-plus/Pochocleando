const servicioTMDB = require('../service/servicioTMDB');

async function BuscarId(req, res){
    try{
        const id = req.params.id;
        const tipo = req.params.tipo;
        const datos = await servicioTMDB.BuscarId(id, tipo);
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarTodo(req, res) {
    try {
        const nombre = req.params.nombre;
        const datos = await servicioTMDB.BuscarTodo(nombre);
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function Trending(req, res) {
    try {
        const datos = await servicioTMDB.Trending();
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarPelículas(req, res, nombre) {
    try {
        const nombre = req.params.nombre;
        const datos = await servicioTMDB.BuscarPelículas(nombre);
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarSeries(req, res, nombre) {
    try {
        const nombre = req.params.nombre;
        const datos = await servicioTMDB.BuscarSeries(nombre);
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarPelículasPopulares(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const datos = await servicioTMDB.BuscarPelículasPopulares(page);
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarPelículasValoradas(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const datos = await servicioTMDB.BuscarPelículasValoradas(page);
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarPelículasEstreno(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const datos = await servicioTMDB.BuscarPelículasEstreno(page);
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarPelículasAccion(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const datos = await servicioTMDB.BuscarPelículasAccion(page);
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarPelículasComedia(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const datos = await servicioTMDB.BuscarPelículasComedia(page);
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarPelículasDrama(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const datos = await servicioTMDB.BuscarPelículasDrama(page);
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarPelículasSciFi(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const datos = await servicioTMDB.BuscarPelículasSciFi(page);
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarSeriesPopulares(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const datos = await servicioTMDB.BuscarSeriesPopulares(page);
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarSeriesValoradas(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const datos = await servicioTMDB.BuscarSeriesValoradas(page);
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarSeriesComedia(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const datos = await servicioTMDB.BuscarSeriesComedia(page);
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function BuscarSeriesDrama(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const datos = await servicioTMDB.BuscarSeriesDrama(page);
        res.json(datos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function ObtenerProveedores(req, res) {
    try {
        const id = req.params.id;
        const tipo = req.params.tipo;
        const country = req.query.country || 'AR';
        const datos = await servicioTMDB.ObtenerProveedores(id, tipo, country);
        res.json(datos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    BuscarId,
    Trending,
    BuscarTodo,
    BuscarPelículas,
    BuscarSeries,
    BuscarPelículasAccion,
    BuscarPelículasComedia,
    BuscarPelículasDrama,
    BuscarPelículasEstreno,
    BuscarPelículasPopulares,
    BuscarPelículasSciFi,
    BuscarPelículasValoradas,
    BuscarSeriesComedia,
    BuscarSeriesDrama,
    BuscarSeriesPopulares,
    BuscarSeriesValoradas,
    ObtenerProveedores
}