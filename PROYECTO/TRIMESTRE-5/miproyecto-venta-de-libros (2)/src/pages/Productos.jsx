import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Foooter";
import Nav from "../components/Nav";
import { libros } from "../data/libros";

function formatPrice(price) {
    return `$${Number(price).toFixed(Number(price) % 1 === 0 ? 0 : 2)}`;
}

function Productos() {
    const [favoritos, setFavoritos] = useState([1, 3]);
    const [mensaje, setMensaje] = useState("");

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
