base_url = 'https://api.themoviedb.org/3';
api_key = '0794702ad2b0918f600e5733c7ee0dea';
lenguaje = 'es-ES';

async function BuscarId(id, tipo){
    const response = await fetch(`${base_url}/${tipo}/${id}?api_key=${api_key}&language=${lenguaje}`);
    return response.json();
}

async function BusquedaGeneral(tipo, query) {

    if (tipo === "peliculas") {
        const response = await fetch(`${base_url}/search/movie?query=${query}&api_key=${api_key}&language=${lenguaje}`)
        return response.json();
    } else if (tipo === "series") {
        const response = await fetch(`${base_url}/search/tv?query=${query}&api_key=${api_key}&language=${lenguaje}`)
        return response.json();
    } else {
        const response = await fetch(`${base_url}/search/multi?query=${query}&api_key=${api_key}&language=${lenguaje}`)
        return response.json();
    }

}

async function Trending() {
    const response = await fetch(`${base_url}/trending/all/week?api_key=${api_key}&language=${lenguaje}`);
    return response.json();
}


async function PelisPopulares(page = 1) {
    console.log('repositorioTMDB - page:', page); // BORRAR LUEGO
    const response = await fetch(`${base_url}/movie/popular?api_key=${api_key}&language=${lenguaje}&page=${page}`)
    return response.json();
}

async function PelisValoradas(page = 1) {
    const response = await fetch(`${base_url}/movie/top_rated?api_key=${api_key}&language=${lenguaje}&page=${page}`)
    return response.json();
}

async function PelisEstreno(page = 1) {
    const response = await fetch(`${base_url}/movie/upcoming?api_key=${api_key}&language=${lenguaje}&page=${page}`)
    return response.json();
}

async function PelisAccion(page = 1) {
    const response = await fetch(`${base_url}/discover/movie?api_key=${api_key}&language=${lenguaje}&with_genres=28&page=${page}`)
    return response.json();
}

async function PelisComedia(page = 1) {
    const response = await fetch(`${base_url}/discover/movie?api_key=${api_key}&language=${lenguaje}&with_genres=35&page=${page}`)
    return response.json();
}

async function PelisDrama(page = 1) {
    const response = await fetch(`${base_url}/discover/movie?api_key=${api_key}&language=${lenguaje}&with_genres=18&page=${page}`)
    return response.json();
}

async function PelisSciFi(page = 1) {
    const response = await fetch(`${base_url}/discover/movie?api_key=${api_key}&language=${lenguaje}&with_genres=878&page=${page}`)
    return response.json();
}

async function SeriesPopulares(page = 1) {
    const response = await fetch(`${base_url}/tv/popular?api_key=${api_key}&language=${lenguaje}&page=${page}`)
    return response.json();
}

async function SeriesValoradas(page = 1) {
    const response = await fetch(`${base_url}/tv/top_rated?api_key=${api_key}&language=${lenguaje}&page=${page}`)
    return response.json();
}

async function SeriesComedia(page = 1) {
    const response = await fetch(`${base_url}/discover/tv?api_key=${api_key}&language=${lenguaje}&with_genres=35&page=${page}`)
    return response.json();
}

async function SeriesDrama(page = 1) {
    const response = await fetch(`${base_url}/discover/tv?api_key=${api_key}&language=${lenguaje}&with_genres=18&page=${page}`)
    return response.json();
}

async function ObtenerProveedores(id, tipo) {
    const response = await fetch(`${base_url}/${tipo}/${id}/watch/providers?api_key=${api_key}`);
    return response.json();
}

module.exports = {
    BuscarId,
    BusquedaGeneral,
    Trending,
    PelisPopulares,
    PelisValoradas,
    PelisEstreno,
    PelisAccion,
    PelisComedia,
    PelisDrama,
    PelisSciFi,
    SeriesPopulares,
    SeriesValoradas,
    SeriesComedia,
    SeriesDrama,
    ObtenerProveedores
}

