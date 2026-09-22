import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { createHash, timingSafeEqual } from 'node:crypto';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_COOKIE = 'venta_libros_token';

if (!JWT_SECRET) throw new Error('JWT_SECRET debe estar definido en el archivo .env');

// Los navegadores abren las URL con GET. Esta respuesta confirma que la API
// está disponible sin permitir que las credenciales viajen en la URL.
router.get('/login', (req, res) => {
  res.json({
    ok: true,
    message: 'API de inicio de sesión disponible',
    metodo_requerido: 'POST',
    ruta: '/api/login',
    cuerpo: { username: 'admin', password: '123' }
  });
});

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function createToken(usuario) {
  return jwt.sign(
    { id_usuario: usuario.id_usuario, username: usuario.username, rol: usuario.rol || 'Usuario' },
    JWT_SECRET,
    { expiresIn: '2h' }
  );
}

function readToken(req) {
  const authorization = req.headers.authorization || '';
  if (authorization.startsWith('Bearer ')) return authorization.slice(7);
  return req.cookies?.[TOKEN_COOKIE];
}

export function requireAuth(req, res, next) {
  const token = readToken(req);
  if (!token) return res.status(401).json({ ok: false, message: 'Debes iniciar sesión' });
  try {
    req.usuario = jwt.verify(token, JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ ok: false, message: 'Sesión inválida o vencida' });
  }
}

function secureEquals(value, stored) {
  const current = Buffer.from(value);
  const expected = Buffer.from(stored);
  return current.length === expected.length && timingSafeEqual(current, expected);
}

async function passwordMatches(password, storedPassword) {
  if (storedPassword.startsWith('$2')) return bcrypt.compare(password, storedPassword);
  return secureEquals(sha256(password), storedPassword);
}

// Acepta los hashes SHA-256 de libreria venta.sql y los hashes bcrypt que ya
// pudieran existir en una base de datos anterior.
router.post('/login', async (req, res) => {
  const { username, password } = req.body ?? {};

  if (typeof username !== 'string' || typeof password !== 'string' || !username.trim() || !password) {
    return res.status(400).json({
      ok: false,
      message: 'username y password son obligatorios'
    });
  }

  try {
    const [rows] = await pool.execute(
      `SELECT u.id_usuario, u.username, u.correo, u.password, r.nombre AS rol
       FROM usuario u
       LEFT JOIN rol_usuario ru ON ru.id_usuario = u.id_usuario
       LEFT JOIN rol r ON r.id_rol = ru.id_rol
       WHERE u.username = ? OR u.correo = ?
       LIMIT 1`,
      [username.trim(), username.trim()]
    );

    if (rows.length === 0 || !(await passwordMatches(password, rows[0].password))) {
      return res.status(401).json({ ok: false, message: 'Usuario o contraseña incorrectos' });
    }

    const { password: _password, ...usuario } = rows[0];
    const token = createToken(usuario);
    res.cookie(TOKEN_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 2 * 60 * 60 * 1000,
      secure: false
    });
    return res.json({ ok: true, message: 'Inicio de sesión correcto', usuario, token });
  } catch (error) {
    console.error('Error de inicio de sesión:', error.code || error.message);
    return res.status(503).json({
      ok: false,
      message: 'No fue posible conectar con la base de datos',
      code: error.code || 'DATABASE_ERROR'
    });
  }
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ ok: true, usuario: req.usuario });
});

router.post('/logout', (req, res) => {
  res.clearCookie(TOKEN_COOKIE, { httpOnly: true, sameSite: 'lax', secure: false });
  res.json({ ok: true, message: 'Sesión cerrada correctamente' });
});

export default router;
