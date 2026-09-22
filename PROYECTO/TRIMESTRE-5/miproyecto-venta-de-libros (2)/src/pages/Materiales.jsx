import Header from "../components/Header";
import Footer from "../components/Foooter";
import Nav from "../components/Nav";
import { clientes, empleados, ventas } from "../data/libros";

function Materiales() {
    return (
        <>
            <Header subtitle="Modulo principal del sistema" />
            <Nav />

            <main>
                <section className="content-width">
                    <div className="toolbar">
                        <div>
                            <h2>Servicios de la libreria</h2>
                            <p>Funciones principales tomadas del proyecto de venta de libros digitales.</p>
                        </div>
                    </div>

                    <div className="stats-grid">
                        <article className="stat-box">
                            <small>Ventas</small>
                            <strong>{ventas.length} registros</strong>
                        </article>
                        <article className="stat-box">
                            <small>Clientes</small>
                            <strong>{clientes.length} clientes</strong>
                        </article>
                        <article className="stat-box">
                            <small>Empleados</small>
                            <strong>{empleados.length} empleados</strong>
                        </article>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Materiales;
