import { Link, NavLink } from "react-router-dom";

function UserIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="7" r="4" />
            <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        </svg>
    );
}

function HeartIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
        </svg>
    );
}

function TruckIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 6h11v10H3z" />
            <path d="M14 10h4l3 3v3h-7z" />
            <path d="M2 10h5" />
            <path d="M1 13h6" />
            <circle cx="7" cy="18" r="2" />
            <circle cx="18" cy="18" r="2" />
        </svg>
    );
}

function CartIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H7" />
            <circle cx="10" cy="21" r="1.4" />
            <circle cx="18" cy="21" r="1.4" />
        </svg>
    );
}

function SearchIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 5 5" />
        </svg>
    );
}

function MenuIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h16" />
        </svg>
    );
}

function Nav({ menuAbierto, setMenuAbierto, isLoggedIn, searchTerm, onSearchTermChange, onSearchSubmit, onSearchClear, onHomeClick }) {
    return (
        <nav className="store-nav" aria-label="Navegacion principal">
            <div className="nav-topbar">
                <NavLink to="/contactos">Contactos</NavLink>
                <NavLink to="/productos">Catalogo</NavLink>
                <NavLink to="/materiales">Servicios</NavLink>
                <NavLink to="/terminos">Terminos y condiciones</NavLink>
            </div>

            <div className="nav-mainbar">

                <button
                    type="button"
                    className="menu-button"
                    onClick={() => setMenuAbierto(!menuAbierto)}
                >
                    <MenuIcon />
                </button>

                <NavLink
                    className={({ isActive }) => `inicio-link${isActive ? " active" : ""}`}
                    to="/"
                    onClick={() => {
                        setMenuAbierto(false);
                        if (onHomeClick) onHomeClick();
                    }}
                >
                    <strong>INICIO</strong>
                </NavLink>

                <form className="search-box" onSubmit={onSearchSubmit}>
                    <label htmlFor="site-search" className="sr-only">
                        Buscar libros
                    </label>

                    <input
                        id="site-search"
                        type="search"
                        placeholder="Que estas buscando hoy?"
                        value={searchTerm}
                        onChange={(event) => {
                            const nextValue = event.target.value;
                            onSearchTermChange(nextValue);
                            if (!nextValue.trim()) {
                                onSearchClear();
                            }
                        }}
                    />

                    <button type="submit" aria-label="Buscar">
                        <SearchIcon />
                    </button>
                </form>

                <div className="nav-actions">
                    {isLoggedIn && <Link to="/perfil"><UserIcon /></Link>}
                    <Link to="/favoritos"><HeartIcon /></Link>
                    <Link to="/pedidos"><TruckIcon /></Link>
                    <Link to="/carrito"><CartIcon /></Link>
                </div>

            </div>
        </nav>
    );
}

export default Nav;