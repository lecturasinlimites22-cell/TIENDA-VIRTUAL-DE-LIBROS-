import { Link } from 'react-router-dom';

function Navbar({ onLogout = () => {} }) {
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
      sessionStorage.removeItem('admin-token');
      sessionStorage.removeItem('admin-session');
      onLogout();
    }
  };

  return <nav className="site-nav"><Link className="brand" to="/"><iframe className="brand-logo" src="/logo%20.html" title="Logo Venta de Libros Digital" />Venta de Libros Digital</Link><div className="nav-links"><Link to="/">Inicio</Link><Link to="/modulos/cliente">Clientes</Link><Link to="/modulos/libro">Libros</Link><Link to="/modulos/venta">Ventas</Link><Link to="/modulos/pago">Pagos</Link><button className="logout-button" type="button" onClick={logout}>Cerrar sesion</button></div></nav>;
}

export default Navbar;
