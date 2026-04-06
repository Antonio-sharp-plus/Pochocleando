const repositorioUsuarios = require('../repositorio/repositorioUsuario');
const jwt = require('jsonwebtoken');
const tokenJSON = process.env.JWT_SECRET;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { Resend } = require("resend");

require('dotenv').config();
const server_cloudflare = process.env.CLOUDFLARE
const mail_user = process.env.MAIL_USER
const mail_password = process.env.MAIL_PASSWORD


const resend = new Resend(process.env.RESEND_KEY);

exports.registrarUsuario = async (data) => {
  try {
    return await repositorioUsuarios.crearUsuario(data);
  } catch (error) {
    throw new Error('Error al registrar usuario:', error.message);
  }
};

exports.loginUsuario = async ({ email, password }) => {
  try {
    const usuario = await repositorioUsuarios.buscarUsuarioPorEmail(email); // ✅
    if (!usuario) throw new Error('Usuario no encontrado');

    const esValida = await usuario.compararPassword(password);
    if (!esValida) throw new Error('Contraseña incorrecta');

    return jwt.sign({ id: usuario._id, email: usuario.email }, tokenJSON, { expiresIn: '2h' });
  } catch (error) {
    throw new Error(error.message || 'Error al iniciar sesión');
  }
};

exports.buscarUsuarioPorEmail = async (email) => {
  return await repositorioUsuarios.buscarUsuarioPorEmail(email); 
};

exports.enviarEmailRecuperacion = async (email) => {
  const usuario = await repositorioUsuarios.buscarUsuarioPorEmail(email);

  if (!usuario) {
    // Para seguridad, NO lanzar error.
    // Simplemente salir.
    return;
  }

  const token = crypto.randomBytes(20).toString('hex');
  const expiracion = Date.now() + 3600000;

  await repositorioUsuarios.actualizarTokenRecuperacion(email, token, expiracion);

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Recupera tu contraseña de Pochocleando!!',
    html: `
      <p>Click here to reset your password</p>
      <a href="${server_cloudflare}/recuperarpassword?token=${token}">Restablecer contraseña</a>
      <p>Si no solicitaste este cambio, ignorá este mensaje.</p>
    `
  });
};


exports.resetearPasswordConToken = async (token, nuevaPassword) => {
  const usuario = await repositorioUsuarios.buscarUsuarioPorToken(token);
  if (!usuario) {
    throw new Error('Token inválido o expirado');
  }

  const nuevaPasswordHasheada = await bcrypt.hash(nuevaPassword, 10);

  const usuarioActualizado = await repositorioUsuarios.actualizarPassword(token, nuevaPasswordHasheada);
  if (!usuarioActualizado) {
    throw new Error('No se pudo actualizar la contraseña');
  }

  return 'Contraseña actualizada correctamente';
};
