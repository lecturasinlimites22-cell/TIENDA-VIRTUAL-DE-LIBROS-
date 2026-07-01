import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Foooter";
import Nav from "../components/Nav";
import { libros as librosBase } from "../data/libros";

function formatPrice(price) {
    return `$${Number(price).toFixed(Number(price) % 1 === 0 ? 0 : 2)}`;
}

function loadStorage(key, fallback) {
    if (typeof window === "undefined") return fallback;
    try {
        const saved = window.localStorage.getItem(key);
        return saved ? JSON.parse(saved) : fallback;
    } catch {
        return fallback;
    }
}

function saveStorage(key, value) {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // ignore localStorage write errors
    }
}

function Productos() {
    const [favoritos, setFavoritos] = useState(() => loadStorage("bookstore-favorites", [1, 3]));
    const [mensaje, setMensaje] = useState("");
    const [libros, setLibros] = useState(() => loadStorage("bookstore-books", librosBase));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => saveStorage("bookstore-favorites", favoritos), [favoritos]);
    useEffect(() => saveStorage("bookstore-books", libros), [libros]);

    useEffect(() => {
        async function cargarLibros() {
            try {
                setLoading(true);
                setError("");
                const respuesta = await fetch("/api/books");
                if (!respuesta.ok) throw new Error("No se pudo cargar");
                const datos = await respuesta.json();
                if (Array.isArray(datos) && datos.length) {
                    setLibros(datos);
                }
            } catch {
                setError("No fue posible cargar los libros desde la API. Se mostrará la información local.");
                setLibros(librosBase);
            } finally {
                setLoading(false);
            }
        }

        cargarLibros();
    }, []);

    function toggleFavorite(id) {
        setFavoritos((actuales) =>
            actuales.includes(id)
                ? actuales.filter((favoriteId) => favoriteId !== id)
                : [...actuales, id]
        );
    }

    return (
        <>
            <Header subtitle="Catalogo de libros digitales" />
            <Nav />

            <main>
                <section className="content-width">
                    <div className="toolbar">
                        <div>
                            <h2>Catalogo</h2>
                            <p>Explora libros disponibles y existencias.</p>
                        </div>
                        <span className="role-indicator">{libros.length} libros</span>
                    </div>

                    {mensaje && <p className="auth-feedback success">{mensaje}</p>}
                    {loading && <p className="auth-feedback">Cargando libros desde la simulación...</p>}
                    {error && <p className="auth-feedback error">{error}</p>}

                    <div className="books-grid">
                        {libros.map((libro) => {
                            const favorito = favoritos.includes(libro.id);

                            return (
                                <article className="book-card" key={libro.id}>
                                    <div className="book-cover">
                                        <span>{libro.categoria}</span>
                                        <strong>{libro.titulo}</strong>
                                    </div>
                                    <h3>{libro.titulo}</h3>
                                    <p>Editorial: {libro.editorial}</p>
                                    <p>Stock: {libro.stock}</p>
                                    <strong>{formatPrice(libro.precio)}</strong>
                                    <div className="card-actions">
                                        <button
                                            type="button"
                                            onClick={() => setMensaje(`Compra agregada: ${libro.titulo}`)}
                                        >
                                            Comprar
                                        </button>
                                        <button
                                            className="secondary-button"
                                            type="button"
                                            onClick={() => toggleFavorite(libro.id)}
                                        >
                                            {favorito ? "Quitar favorito" : "Agregar favorito"}
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Productos;
