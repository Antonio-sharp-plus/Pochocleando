const usuarioService = require('../service/servicioUsuario');


function validarRegistro(body) {
  //console.log('Controller: validarRegistro', body); //para controlar errores
  const { email, password, username } = body;
  if (!email || !password || !username) {
    console.log('Controller: validarRegistro error', 'Todos los campos son requeridos'); //para controlar errores
    return false;
  }
  return email && password && username;
}

exports.registrarUsuario = async (req, res) => {
  //console.log('Controller: registrarUsuario', req.body) //para controlar erroes
  if (!validarRegistro(req.body)) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }
  try {
    await usuarioService.registrarUsuario(req.body);
    res.status(201).json({ mensaje: 'Usuario creado con éxito' });
  } catch (error) {
    //console.log('Controller registrarUsuario error', error) //para controlar errores
    res.status(400).json({ error: 'Error al registrar usuario', detalle: error.message });
  }
};

exports.loginUsuario = async (req, res) => {
  try {
    //console.log('Controller: loginUsuario', req.body) //para controlar errores
    const usuario = await usuarioService.buscarUsuarioPorEmail(req.body.email);
    if (!usuario) throw new Error('Usuario no encontrado');
    const token = await usuarioService.loginUsuario(req.body);
    const usuarioSinPassword = usuario.toObject();
    delete usuarioSinPassword.password;
    res.status(200).json({ mensaje: 'Login exitoso', token, usuario: usuarioSinPassword });
  } catch (error) {
    //console.log('Controller loginUsuario error', error) //para controlar errores
    res.status(401).json({ error: error.message });
  }
};

exports.recuperarPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'El email es requerido' });
  }

  try {
    const respuesta = await usuarioService.enviarEmailRecuperacion(email);
    return res.status(200).json({ mensaje: respuesta });
  } catch (error) {
    console.error('Error en recuperarPassword:', error);
    return res.status(500).json({ error: 'Error al procesar la recuperación de contraseña' });
  }
};

exports.resetearPassword = async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: 'Token y nueva contraseña son requeridos' });
  }

  try {
    const respuesta = await usuarioService.resetearPasswordConToken(token, password);
    res.status(200).json({ mensaje: respuesta });
  } catch (error) {
    console.error('Error al resetear contraseña:', error);
    res.status(400).json({ error: error.message });
  }
};