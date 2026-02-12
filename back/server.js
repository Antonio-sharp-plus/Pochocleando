const express = require('express');
const mongo = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //envia los req.body como JSON

// rutas API
const peliculasRouter = require('./router/routerPeliAPI');
const seriesRouter = require('./router/routerSerieAPI');
const generalRouter = require('./router/routergeneralAPI');
const authRouter = require('./router/routerAuth');
const favoritosRouter = require('./router/routerFavoritos');
const resenasRouter = require('./router/routerResenas');
const chatbotRouter = require('./router/routerChatbot');


// variables de entorno

// en process.env.PORT está el puerto definido automáticamente por Beanstalk
const port = process.env.PORT || 3000;
const nombre_db = process.env.MONGO_NAME;
const contra_db = process.env.MONGO_PASSWORD;
const server_cloudflare = process.env.CLOUDFLARE


// comento HOSTNAME para evitar conflictos con Beanstalk
// descomentar en caso de presentar para BACKEND
// const HOSTNAME = '127.0.0.1';

const connection_string = `mongodb+srv://${nombre_db}:${contra_db}@pochocleando.axbmjib.mongodb.net/pochocleando`;

app.use(cors({
  // * no es recomendable en producción
  // en un array colocar el dominio de amplify y luego http://localhost:4200
  // origin: ['https://pochocleando.com.ar', 'http://localhost:4200', server_cloudflare || '*'],
  origin: server_cloudflare,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'X-Request-ID']
}));

// routers de las paginas
app.use('/api', generalRouter);
app.use('/api/pelicula', peliculasRouter);
app.use('/api/series', seriesRouter);
app.use('/api/auth', authRouter);
app.use('/api/favoritos', favoritosRouter);
app.use('/api/resenas', resenasRouter);
app.use('/api/chatbot', chatbotRouter);

// conexion a la base de datos
mongo.connect(connection_string)
.then(console.log("Conectado a DB en Atlas"))
.catch(err => console.error("Error de conexión:", err));

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor'
  });
});


// ATENCIÓN
// este app.listen es tal como vimos en BACKEND, pero es necesario cambiarlo para NUBE
// descomentarlo en caso de querer presentar el trabajo en BACKEND
// app.listen(PORT, HOSTNAME, () => {
//   console.log(`Servidor en http://${HOSTNAME}:${PORT}/`);
// });


// ATENCIÓN
// este app.listen evita conflictos con NUBE
// comentar en caso de presentar en BACKEND
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`)
});

// mensaje para comprobar funcionamiento de API
app.get('/', (req, res) => {
  res.send('💥 Sí, la API responde OK 💥');
});