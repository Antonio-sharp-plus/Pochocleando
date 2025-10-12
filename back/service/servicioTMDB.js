const repoTMDB = require('../repositorio/repositorioTMDB');

async function BuscarId(id, type) {
    try {
        let tipo = "";
        if(type === 'movie'){tipo = 'movie'}
        if(type === 'tv'){tipo = 'tv'}
        const datos = await repoTMDB.BuscarId(id, tipo);
        return datos;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function Trending() {
    try {
        const datos = await repoTMDB.Trending();
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarTodo(nombre) {
    try {
        const datos = await repoTMDB.BusquedaGeneral("ambos", nombre);
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarPelículas(nombre) {
    try {
        const datos = await repoTMDB.BusquedaGeneral("peliculas", nombre);
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarSeries(nombre) {
    try {
        const datos = await repoTMDB.BusquedaGeneral("series", nombre);
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarPelículasPopulares(page) {
    try {
        const datos = await repoTMDB.PelisPopulares(page);
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarPelículasValoradas(page) {
    try {
        const datos = await repoTMDB.PelisValoradas(page);
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarPelículasEstreno(page) {
    try {
        const datos = await repoTMDB.PelisEstreno(page);
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarPelículasAccion(page) {
    try {
        const datos = await repoTMDB.PelisAccion(page);
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarPelículasComedia(page) {
    try {
        const datos = await repoTMDB.PelisComedia(page);
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarPelículasDrama(page) {
    try {
        const datos = await repoTMDB.PelisDrama(page);
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarPelículasSciFi(page) {
    try {
        const datos = await repoTMDB.PelisSciFi(page);
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarSeriesPopulares(page) {
    try {
        const datos = await repoTMDB.SeriesPopulares(page);
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarSeriesValoradas(page) {
    try {
        const datos = await repoTMDB.SeriesValoradas(page);
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarSeriesComedia(page) {
    try {
        const datos = await repoTMDB.SeriesComedia(page);
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function BuscarSeriesDrama(page) {
    try {
        const datos = await repoTMDB.SeriesDrama(page);
        return datos.results;
    }
    catch {
        return console.log("No se obtuvieron los datos de la API");
    }
}

async function ObtenerProveedores(id, type, country = 'AR') {
    try {
        const datos = await repoTMDB.ObtenerProveedores(id, type);

        if (datos.results[country])
        { 
            respuesta = {'AR': datos.results[country]};    
        }
        else
        {
            respuesta = {'US': datos.results.US}; 
        }

        return respuesta;
    } 
    catch {
        return console.log("No se obtuvieron los datos de la API", error);
    }
}

    module.exports = {
    BuscarId,
    Trending,
    BuscarPelículas,
    BuscarPelículasAccion,
    BuscarPelículasComedia,
    BuscarPelículasDrama,
    BuscarPelículasEstreno,
    BuscarPelículasPopulares,
    BuscarPelículasSciFi,
    BuscarPelículasValoradas,
    BuscarSeries,
    BuscarSeriesComedia,
    BuscarSeriesDrama,
    BuscarSeriesPopulares,
    BuscarSeriesValoradas,
    BuscarTodo,
    ObtenerProveedores
}