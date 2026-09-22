import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pool from './db.js';
import moduleRoutes from './RUTAS/MODULOS/index.js';
import authRoutes, { requireAuth } from './RUTAS/auth.js';


const app = express();//Permite inicilizar las aplicaciones y configurar las urls
const PORT = 5000;

app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000', 'http://127.0.0.1:3000'], credentials: true }));
app.use(express.json({ limit: '1mb' })); // Permite recibir JSON sin aceptar cargas excesivas
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', (req, res, next) => {
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) || req.path === '/login' || req.path === '/logout') return next();
  return requireAuth(req, res, next);
});

Object.entries(moduleRoutes).forEach(([name, router]) => {
  app.use('/api/' + name, router);
});

app.get('/', (req, res) => {
  res.json({
    nombre: 'API Venta de Libros Digital',
    estado: 'activa',
    documentacion: {
      salud: '/api/health',
      inicio_sesion: 'POST /api/login',
      modulos: Object.keys(moduleRoutes).map((name) => `/api/${name}`)
    }
  });
});

app.get('/api', (req, res) => {
  res.json({
    nombre: 'API Venta de Libros Digital',
    version: '1.0.0',
    estado: 'activa',
    recursos: Object.keys(moduleRoutes).map((name) => `/api/${name}`),
    autenticacion: 'POST /api/login'
  });
});

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected', timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Verificación de base de datos:', error.code || error.message);
    res.status(503).json({ status: 'unavailable', database: 'disconnected', code: error.code || 'DATABASE_ERROR' });
  }
});

app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    metodo: req.method,
    ruta: req.originalUrl
  });
});

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(400).json({ error: 'El cuerpo de la solicitud debe ser JSON válido' });
  }
  if (error.type === 'entity.too.large') {
    return res.status(413).json({ error: 'La solicitud supera el tamaño permitido' });
  }
  console.error('Error no controlado:', error.message);
  return res.status(500).json({ error: 'Error interno del servidor' });
});

const server = app.listen(PORT, () => {
  console.log(`Servidor del backend activo en http://localhost:${PORT}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`El puerto ${PORT} ya está en uso. Cierra el otro servidor o cambia PORT en .env.`);
    return;
  }
  console.error('No se pudo iniciar el servidor:', error.message);
});

async function closeServer(signal) {
  console.log(`\n${signal}: cerrando el servidor...`);
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}

process.once('SIGINT', () => closeServer('SIGINT'));
process.once('SIGTERM', () => closeServer('SIGTERM'));
