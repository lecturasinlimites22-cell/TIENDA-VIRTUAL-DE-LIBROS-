function Header({ subtitle = "Accede rapido y seguro" }) {
    return (
        <header>
            <div className="site-brand">
                <img src="/logo-libros.png" alt="Logo Venta de Libros" />
                <h1>Venta de Libros</h1>
            </div>
            <p>{subtitle}</p>
        </header>
    );
}

export default Header;
