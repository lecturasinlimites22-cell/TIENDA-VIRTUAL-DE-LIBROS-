function Header({ subtitle = "Accede rapido y seguro", showBrand = true }) {
    return (
        <header>
            <div className="site-brand">
                {showBrand && <iframe className="brand-logo" src="/logo%20.html" title="Logo Venta de Libros" />}
                <h1>Venta de Libros Digital</h1>
            </div>
            <p>{subtitle}</p>
        </header>
    );
}

export default Header;
