import { useEffect, useState } from 'react';
import { HashRouter, Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import Navbar from './components/navbar';
import Modulo from './pages/modulo';
import './App.css';
import './admin-theme.css';

const modules = [
  ['cliente', 'Clientes', 'Consulta los clientes registrados.', '/modulos/cliente'],
  ['libro', 'Libros', 'Explora el catalogo y el inventario.', '/modulos/libro'],
  ['venta', 'Ventas', 'Revisa las ventas realizadas.', '/modulos/venta'],
  ['detalle_venta', 'Detalle de ventas', 'Consulta los libros incluidos en cada venta.', '/modulos/detalle_venta'],
  ['pago', 'Pagos', 'Revisa los pagos registrados.', '/modulos/pago'],
  ['metodo_pago', 'Metodos de pago', 'Consulta los medios de pago disponibles.', '/modulos/metodo_pago'],
  ['categoria', 'Categorias', 'Organiza los libros por categoria.', '/modulos/categoria'],
  ['autor', 'Autores', 'Consulta los autores del catalogo.', '/modulos/autor'],
  ['editorial', 'Editoriales', 'Consulta las editoriales registradas.', '/modulos/editorial'],
  ['libro_autor', 'Libros y autores', 'Relacion entre los libros y sus autores.', '/modulos/libro_autor'],
  ['empleado', 'Empleados', 'Consulta el personal registrado.', '/modulos/empleado'],
  ['usuario', 'Usuarios', 'Consulta las cuentas de acceso.', '/modulos/usuario'],
  ['rol', 'Roles', 'Consulta los roles del sistema.', '/modulos/rol'],
  ['rol_usuario', 'Roles de usuario', 'Consulta la asignacion de roles.', '/modulos/rol_usuario'],
];

function Inicio() {
  return (
    <section className="home-panel">
      <p className="eyebrow">VENTA DE LIBROS DIGITAL</p>
      <h1>Bienvenido a tu libreria digital</h1>
      <p className="home-copy">
        Selecciona una opcion para administrar toda la informacion de tu negocio.
      </p>
      <div className="module-grid">
        {modules.map(([module, title, description, path]) => (
          <Link className="module-card" to={path} key={module}>
            <span className="card-icon">{title[0]}</span>
            <h2>{title}</h2>
            <p>{description}</p>
            <b>Ver informacion</b>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ModuloRoute() {
  const { modulo } = useParams();
  // Al cambiar de tarjeta se crea un módulo nuevo y no queda estado de la vista anterior.
  return <Modulo key={modulo} />;
}

function AdminSession({ children }) {
  const [view, setView] = useState('loading');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const queryToken = new URLSearchParams(window.location.search).get('token');
    const mustLogout = new URLSearchParams(window.location.search).get('logout') === '1';
    if (mustLogout) {
      sessionStorage.removeItem('admin-session');
      sessionStorage.removeItem('admin-token');
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.hash}`);
      setView('login');
      return;
    }
    if (queryToken) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.hash}`);
    }
    const hasValidSession = sessionStorage.getItem('admin-session') && sessionStorage.getItem('admin-token');
    if (!hasValidSession) {
      sessionStorage.removeItem('admin-session');
      sessionStorage.removeItem('admin-token');
    }
    setView(hasValidSession ? 'panel' : 'login');
  }, []);

  const login = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Usuario o contraseña incorrectos.');
      if (String(result.usuario?.rol || '').toLowerCase() !== 'administrador') {
        throw new Error('Esta cuenta no tiene acceso al panel administrativo.');
      }
      sessionStorage.setItem('admin-session', 'admin-local-session');
      sessionStorage.setItem('admin-token', result.token);
      setView('panel');
    } catch (loginError) {
      setError(loginError.message || 'No fue posible iniciar sesión.');
    }
  };
  const logout = async () => {
    try {
      await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(sessionStorage.getItem('admin-token') ? { Authorization: `Bearer ${sessionStorage.getItem('admin-token')}` } : {}),
        },
      });
    } catch (logoutError) {
      console.warn('No fue posible cerrar la sesión en la API:', logoutError);
    } finally {
      sessionStorage.removeItem('admin-session');
      sessionStorage.removeItem('admin-token');
      setUsername('');
      setPassword('');
      setError('');
      setView('logout-success');
    }
  };

  if (view === 'loading') return null;
  if (view === 'panel') return children(logout);
  if (view === 'logout-success') {
    return (
      <main className="admin-logout-shell">
        <section className="admin-logout-confirmation">
          <p className="eyebrow">PANEL ADMINISTRATIVO</p>
          <h1>Sesión cerrada con éxito</h1>
          <p>Tu acceso de administrador se cerró correctamente.</p>
          <button type="button" onClick={() => setView('login')}>Iniciar sesión</button>
        </section>
      </main>
    );
  }

  return (
    <main className="session-locked">
      <iframe className="login-logo" src="/logo%20.html" title="Logo Venta de Libros Digital" />
      <p className="eyebrow">PANEL ADMINISTRATIVO</p>
      <h1>Iniciar sesión</h1>
      <p>Ingresa como administrador para acceder a los módulos.</p>
      <form className="admin-login-form" onSubmit={login}>
        <label>
          Usuario
          <input
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Usuario"
            required
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Contraseña"
            required
          />
        </label>
        {error && <p className="login-error" role="alert">{error}</p>}
        <button type="submit">Iniciar sesión como administrador</button>
      </form>
    </main>
  );
}

function App() {
  return (
    <HashRouter>
      <AdminSession>
        {(logout) => (
          <>
            <Navbar onLogout={logout} />
            <main className="app-container">
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/clientes" element={<Navigate to="/modulos/cliente" replace />} />
                <Route path="/modulos/:modulo" element={<ModuloRoute />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </>
        )}
      </AdminSession>
    </HashRouter>
  );
}

export default App;
