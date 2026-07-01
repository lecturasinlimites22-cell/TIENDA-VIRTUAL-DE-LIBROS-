import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Foooter";
import Nav from "../components/Nav";
import { clientes as clientesBase, empleados as empleadosBase, libros as librosBase, ventas } from "../data/libros";

const cuentasBase = [
    {
        role: "Usuario",
        name: "Usuario Demo",
        username: "demo.usuario",
        email: "demo@libreria.com",
        password: "123456",
        phone: "3000000000",
        city: "Bogota",
    },
    {
        role: "Administrador",
        name: "Admin Libreria",
        username: "admin.libreria",
        email: "admin@libreria.com",
        password: "123456",
        phone: "3000000001",
        city: "Bogota",
    },
];

function formatPrice(price) {
    return `$${Number(price).toFixed(Number(price) % 1 === 0 ? 0 : 2)}`;
}

function normalizeValue(value) {
    return String(value || "").trim().toLowerCase();
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
        // ignore storage errors
    }
}

function BookIcon() {
    return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
            <path d="M14 12h34a4 4 0 0 1 4 4v36a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
            <path d="M20 18h24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M20 26h24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M20 34h24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
    );
}

function Inicio({ initialScreen = "home", initialAuthMode = "login" }) {
    const startsLoggedIn = !["home", "login"].includes(initialScreen);

    const [authMode, setAuthMode] = useState(initialAuthMode);
    const [screen, setScreen] = useState(initialScreen);
    const [menuAbierto, setMenuAbierto] = useState(false);

    const [feedback, setFeedback] = useState("");
    const [session, setSession] = useState(() => {
        if (typeof window === "undefined") {
            return startsLoggedIn ? cuentasBase[0] : null;
        }

        try {
            const saved = window.localStorage.getItem("bookstore-session");
            if (saved) return JSON.parse(saved);
        } catch {
            // ignore invalid storage value
        }

        return startsLoggedIn ? cuentasBase[0] : null;
    });
    const [accounts, setAccounts] = useState(() => loadStorage("bookstore-accounts", cuentasBase));
    const [books, setBooks] = useState(() => loadStorage("bookstore-books", librosBase));
    const [cartItems, setCartItems] = useState(() => {
        if (typeof window === "undefined") return [];
        try {
            const saved = window.localStorage.getItem("bookstore-cart");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [selectedCategory, setSelectedCategory] = useState(() => loadStorage("bookstore-selectedCategory", "Todos"));
    const [favorites, setFavorites] = useState(() => loadStorage("bookstore-favorites", [1, 3]));
    const [clientes, setClientes] = useState(() => loadStorage("bookstore-clientes", clientesBase));
    const [empleados, setEmpleados] = useState(() => loadStorage("bookstore-empleados", empleadosBase));
    const [chatMessages, setChatMessages] = useState(() => loadStorage("bookstore-chatMessages", []));
    const [downloadAccess, setDownloadAccess] = useState(() => loadStorage("bookstore-downloadAccess", []));
    const [pendingDownload, setPendingDownload] = useState(() => loadStorage("bookstore-pendingDownload", null));
    const [pendingDownloadEmail, setPendingDownloadEmail] = useState(() => loadStorage("bookstore-pendingDownloadEmail", ""));
    const [verificationBook, setVerificationBook] = useState(() => loadStorage("bookstore-verificationBook", null));
    const [searchTerm, setSearchTerm] = useState(() => loadStorage("bookstore-searchTerm", ""));
    const [searchQuery, setSearchQuery] = useState(() => loadStorage("bookstore-searchQuery", ""));
    const [searchRestoreCategory, setSearchRestoreCategory] = useState(() => loadStorage("bookstore-searchRestoreCategory", "Todos"));
    const [selectedBank, setSelectedBank] = useState(() => loadStorage("bookstore-selectedBank", ""));
    const [paymentCompleted, setPaymentCompleted] = useState(() => loadStorage("bookstore-paymentCompleted", false));
    const [paymentMethod, setPaymentMethod] = useState(() => loadStorage("bookstore-paymentMethod", ""));
    const [paymentDetailUsed, setPaymentDetailUsed] = useState(() => loadStorage("bookstore-paymentDetailUsed", ""));
    const [lastPurchase, setLastPurchase] = useState(() => loadStorage("bookstore-lastPurchase", null));
    const [selectedBook, setSelectedBook] = useState(() => loadStorage("bookstore-selectedBook", null));
    const [termsAccepted, setTermsAccepted] = useState(() => loadStorage("bookstore-termsAccepted", false));
    const [postAuthScreen, setPostAuthScreen] = useState(() => loadStorage("bookstore-postAuthScreen", null));

    useEffect(() => saveStorage("bookstore-session", session), [session]);
    useEffect(() => saveStorage("bookstore-accounts", accounts), [accounts]);
    useEffect(() => saveStorage("bookstore-books", books), [books]);
    useEffect(() => saveStorage("bookstore-cart", cartItems), [cartItems]);
    useEffect(() => saveStorage("bookstore-selectedCategory", selectedCategory), [selectedCategory]);
    useEffect(() => saveStorage("bookstore-favorites", favorites), [favorites]);
    useEffect(() => saveStorage("bookstore-clientes", clientes), [clientes]);
    useEffect(() => saveStorage("bookstore-empleados", empleados), [empleados]);
    useEffect(() => saveStorage("bookstore-chatMessages", chatMessages), [chatMessages]);
    useEffect(() => saveStorage("bookstore-downloadAccess", downloadAccess), [downloadAccess]);
    useEffect(() => saveStorage("bookstore-pendingDownload", pendingDownload), [pendingDownload]);
    useEffect(() => saveStorage("bookstore-pendingDownloadEmail", pendingDownloadEmail), [pendingDownloadEmail]);
    useEffect(() => saveStorage("bookstore-verificationBook", verificationBook), [verificationBook]);
    useEffect(() => saveStorage("bookstore-searchTerm", searchTerm), [searchTerm]);
    useEffect(() => saveStorage("bookstore-searchQuery", searchQuery), [searchQuery]);
    useEffect(() => saveStorage("bookstore-searchRestoreCategory", searchRestoreCategory), [searchRestoreCategory]);
    useEffect(() => saveStorage("bookstore-selectedBank", selectedBank), [selectedBank]);
    useEffect(() => saveStorage("bookstore-paymentCompleted", paymentCompleted), [paymentCompleted]);
    useEffect(() => saveStorage("bookstore-paymentMethod", paymentMethod), [paymentMethod]);
    useEffect(() => saveStorage("bookstore-paymentDetailUsed", paymentDetailUsed), [paymentDetailUsed]);
    useEffect(() => saveStorage("bookstore-lastPurchase", lastPurchase), [lastPurchase]);
    useEffect(() => saveStorage("bookstore-selectedBook", selectedBook), [selectedBook]);
    useEffect(() => saveStorage("bookstore-termsAccepted", termsAccepted), [termsAccepted]);
    useEffect(() => saveStorage("bookstore-postAuthScreen", postAuthScreen), [postAuthScreen]);

    useEffect(() => {
        async function cargarDatosIniciales() {
            try {
                const [respuestaUsuarios, respuestaLibros, respuestaClientes, respuestaEmpleados] = await Promise.all([
                    fetch("/api/user"),
                    fetch("/api/books"),
                    fetch("/api/clients"),
                    fetch("/api/employees"),
                ]);

                if (respuestaUsuarios.ok) {
                    const usuariosApi = await respuestaUsuarios.json();
                    const cuentasApi = Array.isArray(usuariosApi)
                        ? usuariosApi.map((usuario) => ({
                            id: usuario.id,
                            role: usuario.rol === 1 ? "Administrador" : "Usuario",
                            name: usuario.name || usuario.nombre || usuario.email?.split("@")[0] || "Usuario",
                            username: usuario.username || usuario.email?.split("@")[0] || `usuario${usuario.id}`,
                            email: usuario.email,
                            password: usuario.password,
                            phone: usuario.phone || "",
                            city: usuario.city || "",
                        }))
                        : [];
                    if (cuentasApi.length) {
                        setAccounts(cuentasApi);
                    }
                }

                if (respuestaLibros.ok) {
                    const librosApi = await respuestaLibros.json();
                    if (Array.isArray(librosApi) && librosApi.length) {
                        setBooks(librosApi.map((libro) => ({ ...libro, precio: Number(libro.precio), stock: Number(libro.stock) })));
                    }
                }

                if (respuestaClientes.ok) {
                    const clientesApi = await respuestaClientes.json();
                    if (Array.isArray(clientesApi) && clientesApi.length) {
                        setClientes(clientesApi);
                    }
                }

                if (respuestaEmpleados.ok) {
                    const empleadosApi = await respuestaEmpleados.json();
                    if (Array.isArray(empleadosApi) && empleadosApi.length) {
                        setEmpleados(empleadosApi);
                    }
                }
            } catch {
                // Se mantiene el contenido local si la API no responde.
            }
        }

        cargarDatosIniciales();
    }, []);

    const now = useMemo(() => new Date().toLocaleString("es-CO"), []);
    const isAuthenticated = Boolean(session);
    const sidebarCategories = [
        "Novelas",
        "Educación",
        "Tecnología",
        "Negocios y Finanzas",
        "Desarrollo Personal",
        "Romance",
        "Misterio",
        "Ciencia Ficción",
        "Historia",
        "Idiomas",
        "Diseño",
        "Infantil",
    ];
    const bankOptions = [
        "Bancolombia",
        "Davivienda",
        "Banco de Bogotá",
        "BBVA",
        "Banco Falabella",
        "Scotiabank Colpatria",
        "Banco Popular",
        "Colpatria",
        "Bancoomeva",
    ];

    const filterButtons = [
        {
            label: "Todos",
            value: "Todos",
            action: () => {
                setSelectedCategory("Todos");
                setSearchTerm("");
                setSearchQuery("");
            },
        },
        {
            label: "Más Vendidos",
            value: "Más Vendidos",
            action: () => {
                setSelectedCategory("Más Vendidos");
                setSearchTerm("");
                setSearchQuery("");
            },
        },
    ];
    const topSellingBooks = books.filter((book) => [1, 2, 4, 5].includes(book.id));
    const categoryPattern = (category) => {
        switch (category) {
            case "Novelas":
                return /novela/i;
            case "Educación":
            case "Educacion":
                return /educa/i;
            case "Tecnología":
            case "Tecnologia":
                return /tecnolog/i;
            case "Negocios y Finanzas":
                return /negoci/i;
            case "Desarrollo Personal":
                return /desarrollo personal/i;
            case "Romance":
                return /romance/i;
            case "Misterio":
                return /misterio/i;
            case "Ciencia Ficción":
                return /ciencia/i;
            case "Historia":
                return /historia/i;
            case "Idiomas":
                return /idiom/i;
            case "Diseño":
                return /diseñ|disen/i;
            case "Infantil":
                return /infantil/i;
            default:
                return null;
        }
    };

    const filteredBooks = books.filter((book) => {
        const normalizedQuery = normalizeValue(searchQuery);
        const matchesSearch = !normalizedQuery || [book.titulo, book.categoria, book.editorial].some((value) => normalizeValue(value).includes(normalizedQuery));

        const matchesCategory =
            selectedCategory === "Todos" ||
            (selectedCategory === "Más Vendidos" && topSellingBooks.includes(book)) ||
            (categoryPattern(selectedCategory) && categoryPattern(selectedCategory).test(book.categoria));

        return matchesCategory && matchesSearch;
    });
    const favoriteBooks = books.filter((book) => favorites.includes(book.id));
    const cartDetails = cartItems.map((item) => ({
        ...item,
        book: books.find((book) => book.id === item.bookId),
    })).filter((item) => item.book);
    const cartTotal = cartDetails.reduce((total, item) => total + item.book.precio * item.qty, 0);

    function openScreen(nextScreen) {
        setFeedback("");
        setScreen(nextScreen);
    }

    function resetCatalogView() {
        setSearchTerm("");
        setSearchQuery("");
        setSelectedCategory(searchRestoreCategory || "Todos");
        setSearchRestoreCategory("Todos");
        setScreen("home");
    }

    function handleSearchSubmit(event) {
        event.preventDefault();
        const normalizedTerm = searchTerm.trim();
        if (normalizedTerm) {
            setSearchRestoreCategory(selectedCategory);
            setSearchQuery(normalizedTerm);
            setSelectedCategory("Todos");
        } else {
            setSearchQuery("");
            setSelectedCategory(searchRestoreCategory || "Todos");
            setSearchRestoreCategory("Todos");
        }
        setScreen("home");
    }

    function handleSearchClear() {
        setSearchTerm("");
        setSearchQuery("");
        setSelectedCategory(searchRestoreCategory || "Todos");
        setSearchRestoreCategory("Todos");
        setScreen("home");
    }

    function addToCart(book) {
        setSelectedBook(book);
        setCartItems((current) => {
            const existing = current.find((item) => item.bookId === book.id);
            if (existing) {
                return current.map((item) =>
                    item.bookId === book.id ? { ...item, qty: item.qty + 1 } : item
                );
            }
            return [...current, { bookId: book.id, qty: 1 }];
        });
        setPaymentCompleted(false);
        setFeedback(`Se agregó "${book.titulo}" al carrito.`);
        setScreen("cart");
    }

    function removeFromCart(bookId) {
        setCartItems((current) => current.filter((item) => item.bookId !== bookId));
        setFeedback("Libro eliminado del carrito.");
    }

    function clearCart() {
        setCartItems([]);
        setFeedback("Carrito vaciado.");
    }

    function createDownloadFile(book) {
        const content = `Libro: ${book.titulo}\nEditorial: ${book.editorial}\nCategoria: ${book.categoria}\nPrecio: ${formatPrice(book.precio)}\n\nEste contenido se entrega luego de verificar el PIN de seguridad.`;
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${book.titulo.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.txt`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    }

    function downloadBook(book) {
        setSelectedBook(book);
        if (!isAuthenticated) {
            setPendingDownload(book);
            setPostAuthScreen("payments");
            setFeedback("Inicia sesión para continuar con la compra y recibir el PIN de descarga.");
            setAuthMode("login");
            setScreen("login");
            return;
        }

        const access = downloadAccess.find((item) => item.bookId === book.id);
        if (access) {
            setVerificationBook(book);
            setFeedback(`Se envio un PIN a ${session?.email} para abrir el libro.`);
            setScreen("download-verification");
            return;
        }

        setPendingDownload(book);
        setPendingDownloadEmail(session?.email || "");
        setPaymentCompleted(false);
        setSelectedBook(book);
        setFeedback(`Debes pagar antes de descargar "${book.titulo}".`);
        setScreen("payments");
    }

    function completeDownloadPayment(email) {
        if (!pendingDownload) return;
        const recipient = String(email || pendingDownloadEmail || session?.email || "").trim();
        if (!recipient) {
            setFeedback("Ingresa un correo valido para recibir el PIN de descarga.");
            return;
        }

        const pin = String(Math.floor(100000 + Math.random() * 900000));
        setDownloadAccess((current) => [
            ...current,
            { bookId: pendingDownload.id, pin, purchasedAt: new Date().toISOString(), email: recipient },
        ]);
        setVerificationBook(pendingDownload);
        setPendingDownload(null);
        setPendingDownloadEmail("");
        setFeedback(`Compra exitosa. Se envio un PIN a ${recipient}.`);
        setScreen("download-verification");
    }

   function renderHomeScreen() {
    return (
        <main>
            <section className="home-books">

                {menuAbierto && (
                    <aside className="menu-libros">
                        <button className="menu-close-button" type="button" onClick={() => setMenuAbierto(false)}>
                            ✕
                        </button>
                        <ul>
                            {sidebarCategories.map((category) => (
                                <li
                                    key={category}
                                    className={selectedCategory === category ? "activo" : ""}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        setSearchTerm("");
                                        setSearchQuery("");
                                        setMenuAbierto(false);
                                    }}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </aside>
                )}
                <div className="banner-libros">
                    <span className="home-kicker">Venta de Libros Digitales</span>
                    <h2>Encuentra tu próxima lectura</h2>
                    <p>Compra y descarga libros digitales de tecnología, educación, negocios, desarrollo personal, novelas y mucho más.</p>
                    <div className="book-highlights">
                        {filterButtons.map((filter) => (
                            <button
                                key={filter.value}
                                type="button"
                                className={filter.value !== "Inicio" && selectedCategory === filter.value ? "active-filter" : ""}
                                onClick={filter.action}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                    <div className="featured-books">
                        {filteredBooks.map((book) => (
                            <article className="featured-card" key={book.id}>
                                <div className="featured-cover">
                                    <BookIcon />
                                </div>
                                <h3>{book.titulo}</h3>
                                <p>{book.categoria} • {book.editorial}</p>
                                <strong>{formatPrice(book.precio)}</strong>
                                <span>{book.stock > 0 ? "Disponible" : "Agotado"}</span>
                                <div className="card-actions">
                                    <button className="card-action" type="button" onClick={() => addToCart(book)}>
                                        Agregar al carrito
                                    </button>
                                    <button className="secondary-button" type="button" onClick={() => downloadBook(book)}>
                                        Descargar
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

            </section>
        </main>
    );
}


function logout() {
    setSession(null);
    setAuthMode("login");
    setFeedback("");
    setScreen("login");
}
    function handleLogin(event) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const username = form.get("username");
        const password = form.get("password");
        const account = accounts.find(
            (item) => normalizeValue(item.username) === normalizeValue(username) && item.password === password
        );

        if (account) {
            setSession(account);
            const nextScreen = postAuthScreen || (account.role === "Administrador" ? "admin" : "user");
            setScreen(nextScreen);
            setPostAuthScreen(null);
            return;
        }

        setFeedback("Credenciales invalidas. Administrador: admin.libreria / 123456. Usuario demo: demo.usuario / 123456.");
    }

async function handleRegister(event) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const name = String(form.get("name") || "").trim();
        const email = String(form.get("email") || "").trim();
        const phone = String(form.get("phone") || "").trim();
        const city = String(form.get("city") || "").trim();
        const username = String(form.get("username") || "").trim();
        const password = String(form.get("password") || "");
        const confirmPassword = String(form.get("confirmPassword") || "");

        if (!/^\d{10}$/.test(phone)) {
            setFeedback("El celular debe tener 10 digitos.");
            return;
        }

        if (password.length < 6) {
            setFeedback("La contrasena debe tener al menos 6 caracteres.");
            return;
        }

        if (password !== confirmPassword) {
            setFeedback("Las contrasenas no coinciden.");
            return;
        }

        const cleanUsername = normalizeValue(username).replace(/[^a-z0-9.]/g, "") || "usuario.demo";
        const uniqueUsername = accounts.some((item) => normalizeValue(item.username) === cleanUsername)
            ? `${cleanUsername}${accounts.length + 1}`
            : cleanUsername;
        const uniqueEmail = accounts.some((item) => normalizeValue(item.email) === normalizeValue(email))
            ? `${uniqueUsername}@libreria.com`
            : email;
        const newAccount = {
            role: "Usuario",
            name,
            username: uniqueUsername,
            email: uniqueEmail,
            password,
            phone,
            city,
        };

        try {
            const respuesta = await fetch("/api/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...newAccount,
                    rol: 2,
                }),
            });

            if (respuesta.ok) {
                const usuarioCreado = await respuesta.json();
                setAccounts((current) => [...current, { ...newAccount, id: usuarioCreado.id }]);
            } else {
                setAccounts((current) => [...current, newAccount]);
            }
        } catch {
            setAccounts((current) => [...current, newAccount]);
        }

        setClientes((current) => [
            ...current,
            {
                id: current.length ? Math.max(...current.map((item) => item.id)) + 1 : 1,
                nombre: name,
                usuario: uniqueUsername,
                correo: uniqueEmail,
                telefono: phone,
                direccion: city,
            },
        ]);

        setSession(newAccount);
        const nextScreen = postAuthScreen || "user";
        setScreen(nextScreen);
        setPostAuthScreen(null);
    }

    async function addBook(event) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const nuevoLibro = {
            id: Date.now(),
            titulo: form.get("titulo"),
            precio: Number(form.get("precio")),
            stock: Number(form.get("stock")),
            categoria: form.get("categoria"),
            editorial: form.get("editorial"),
        };

        try {
            const respuesta = await fetch("/api/books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoLibro),
            });
            if (respuesta.ok) {
                const libroCreado = await respuesta.json();
                setBooks((current) => [...current, libroCreado]);
            } else {
                setBooks((current) => [...current, nuevoLibro]);
            }
        } catch {
            setBooks((current) => [...current, nuevoLibro]);
        }

        event.currentTarget.reset();
    }

    async function deleteBook(id) {
        try {
            await fetch(`/api/books/${id}`, { method: "DELETE" });
        } catch {
            // Se ignora si la API no responde.
        }
        setBooks((current) => current.filter((book) => book.id !== id));
        setFavorites((current) => current.filter((favoriteId) => favoriteId !== id));
    }

    async function editBook(id) {
        const book = books.find((item) => item.id === id);
        if (!book) return;
        const title = window.prompt("Nuevo titulo del libro:", book.titulo);
        if (!title) return;

        const libroActualizado = { ...book, titulo: title };

        try {
            await fetch(`http://localhost:3000/books/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(libroActualizado),
            });
        } catch {
            // Se ignora si la API no responde.
        }

        setBooks((current) => current.map((item) => (item.id === id ? libroActualizado : item)));
    }

    function toggleFavorite(id) {
        setFavorites((current) =>
            current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id]
        );
    }

    function sendChatMessage(event) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const text = String(form.get("message") || "").trim();
        if (!text) return;
        setChatMessages((current) => [
            ...current,
            { type: "user", text },
            { type: "agent", text: "Gracias por tu mensaje. Esta es una respuesta de demostracion del chat de contacto." },
        ]);
        event.currentTarget.reset();
    }

    function renderTable(items, columns, emptyText = "No hay registros disponibles.") {
        if (!items.length) {
            return (
                <tbody>
                    <tr>
                        <td colSpan={columns.length}>{emptyText}</td>
                    </tr>
                </tbody>
            );
        }

        return (
            <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        {columns.map((column) => (
                            <td key={column.key}>{column.render ? column.render(item) : item[column.key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        );
    }

    function renderLoginScreen() {
        return (
            <main className="page-shell">
                <section className="panel-box login-panel">
                    <div className="login-brand">
                        <img className="login-logo" src="/logo-libros.png" alt="Venta de Libros" />
                        <div>
                            <h2>Venta de Libros</h2>
                            <p>Inicia sesion o registrate para entrar al modulo principal.</p>
                        </div>
                    </div>

                    <div className="auth-switch">
                        <button className={authMode === "login" ? "active" : ""} type="button" onClick={() => setAuthMode("login")}>
                            Iniciar Sesion
                        </button>
                        <button className={authMode === "registro" ? "active" : ""} type="button" onClick={() => setAuthMode("registro")}>
                            Registro
                        </button>
                    </div>

                    {authMode === "login" ? (
                        <form className="login-form" onSubmit={handleLogin}>
                            <div className="grupo-input">
                                <label>Usuario</label>
                                <input
                                    name="username"
                                    defaultValue="demo.usuario"
                                    required
                                />
                            </div>
                            <div className="grupo-input">
                                <label>Contrasena</label>
                                <input name="password" type="password" defaultValue="123456" required />
                            </div>
                            <button className="login-submit" type="submit">Entrar al modulo principal</button>
                        </form>
                    ) : (
                        <form className="login-form" onSubmit={handleRegister}>
                            <div className="grupo-input">
                                <label>Nombre completo</label>
                                <input name="name" placeholder="Ingresa tu nombre completo" required />
                            </div>
                            <div className="register-grid">
                                <div className="grupo-input">
                                    <label>Correo</label>
                                    <input name="email" type="email" placeholder="nombre@correo.com" required />
                                </div>
                                <div className="grupo-input">
                                    <label>Usuario</label>
                                    <input name="username" placeholder="usuario.demo" required />
                                </div>
                                <div className="grupo-input">
                                    <label>Celular</label>
                                    <input name="phone" maxLength="10" placeholder="3001234567" required />
                                </div>
                                <div className="grupo-input">
                                    <label>Ciudad</label>
                                    <input name="city" placeholder="Bogota" required />
                                </div>
                            </div>
                            <div className="grupo-input">
                                <label>Contrasena</label>
                                <input name="password" type="password" placeholder="Minimo 6 caracteres" required />
                            </div>
                            <div className="grupo-input">
                                <label>Confirmar contrasena</label>
                                <input name="confirmPassword" type="password" required />
                            </div>
                            <button className="login-submit" type="submit">Crear cuenta y continuar</button>
                        </form>
                    )}

                    {feedback && <p className="auth-feedback error">{feedback}</p>}
                    <p className="login-helper">El administrador solo inicia sesion. El registro crea cuentas de usuario.</p>
                </section>
            </main>
        );
    }

    function renderUserHome() {
        return (
            <main>
                <section className="content-width">
                    <div className="toolbar">
                        <div>
                            <h2>Modulo principal</h2>
                            <p>{`Has iniciado como ${session?.role.toLowerCase()} con el usuario ${session?.username}.`}</p>
                        </div>
                        <button type="button" onClick={logout}>Cerrar sesion</button>
                    </div>

                    <div className="stats-grid">
                        <article className="stat-box">
                            <small>Sesion</small>
                            <strong>{session?.username}</strong>
                        </article>
                        <article className="stat-box">
                            <small>Hora de ingreso</small>
                            <strong>{now}</strong>
                        </article>
                        <article className="stat-box">
                            <small>Catalogo</small>
                            <strong>{books.length} libros</strong>
                        </article>
                    </div>
                </section>
            </main>
        );
    }

    function renderAdminHome() {
        return (
            <main>
                <section className="content-width">
                    <div className="toolbar">
                        <div>
                            <h2>Panel de Administracion</h2>
                            <p>Gestiona libros, ventas, empleados y clientes.</p>
                        </div>
                        <div className="toolbar-actions">
                            <button className="secondary-button" type="button" onClick={() => openScreen("user")}>Vista usuario</button>
                            <button type="button" onClick={logout}>Cerrar sesion</button>
                        </div>
                    </div>

                    <div className="menu-grid admin-menu-grid">
                        <button className="menu-card" type="button" onClick={() => openScreen("admin-books")}>
                            <span className="menu-icon">LIB</span>
                            <h3>Libros</h3>
                            <p>Agregar, editar y eliminar registros del catalogo.</p>
                        </button>
                        <button className="menu-card" type="button" onClick={() => openScreen("admin-sales")}>
                            <span className="menu-icon">VEN</span>
                            <h3>Ventas</h3>
                            <p>Consulta historico de ventas registradas.</p>
                        </button>
                        <button className="menu-card" type="button" onClick={() => openScreen("admin-employees")}>
                            <span className="menu-icon">EMP</span>
                            <h3>Empleados</h3>
                            <p>Listado del personal de la libreria.</p>
                        </button>
                        <button className="menu-card" type="button" onClick={() => openScreen("admin-clients")}>
                            <span className="menu-icon">CLI</span>
                            <h3>Clientes</h3>
                            <p>Usuarios y datos de contacto.</p>
                        </button>
                    </div>
                </section>
            </main>
        );
    }

    function renderSectionHeader({ title, subtitle, backTo = "user" }) {
        return (
            <div className="toolbar">
                <div>
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                </div>
                <button type="button" onClick={() => openScreen(backTo)}>Volver</button>
            </div>
        );
    }

    function renderBooksTable({ admin = false } = {}) {
        return (
            <div className="table-shell">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Titulo</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Categoria</th>
                            <th>Editorial</th>
                            {admin && <th>Acciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.titulo}</td>
                                <td>{formatPrice(book.precio)}</td>
                                <td>{book.stock}</td>
                                <td>{book.categoria}</td>
                                <td>{book.editorial}</td>
                                {admin && (
                                    <td>
                                        <div className="table-actions">
                                            <button className="secondary-button" type="button" onClick={() => editBook(book.id)}>Editar</button>
                                            <button className="danger-button" type="button" onClick={() => deleteBook(book.id)}>Eliminar</button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    function renderCatalogScreen() {
        return (
            <main>
                <section className="content-width">
                    {renderSectionHeader({ title: "Catalogo de libros", subtitle: "Explora libros disponibles y agrega favoritos." })}
                    <div className="books-grid">
                        {books.map((book) => {
                            const isFavorite = favorites.includes(book.id);
                            return (
                                <article className="book-card" key={book.id}>
                                    <div className="book-cover">
                                        <span>{book.categoria}</span>
                                        <strong>{book.titulo}</strong>
                                    </div>
                                    <h3>{book.titulo}</h3>
                                    <p>Editorial: {book.editorial}</p>
                                    <p>Stock: {book.stock}</p>
                                    <strong>{formatPrice(book.precio)}</strong>
                                    <div className="card-actions">
                                        <button type="button" onClick={() => addToCart(book)}>Agregar al carrito</button>
                                        <button className="secondary-button" type="button" onClick={() => downloadBook(book)}>
                                            Descargar
                                        </button>
                                        <button className="secondary-button" type="button" onClick={() => {
                                            setSelectedBook(book);
                                            openScreen("book-detail");
                                        }}>
                                            Ver libro
                                        </button>
                                        <button className="secondary-button" type="button" onClick={() => toggleFavorite(book.id)}>
                                            {isFavorite ? "Quitar favorito" : "Agregar favorito"}
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                    {feedback && <p className="auth-feedback success">{feedback}</p>}
                </section>
            </main>
        );
    }

    function renderSimpleTableScreen({ title, subtitle, columns, items, backTo = "user" }) {
        return (
            <main>
                <section className="content-width">
                    {renderSectionHeader({ title, subtitle, backTo })}
                    <div className="table-shell">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    {columns.map((column) => <th key={column.key}>{column.label}</th>)}
                                </tr>
                            </thead>
                            {renderTable(items, columns)}
                        </table>
                    </div>
                </section>
            </main>
        );
    }

    function renderBookDetailScreen() {
        if (!selectedBook) {
            return (
                <main>
                    <section className="content-width">
                        {renderSectionHeader({ title: "Libro no encontrado", subtitle: "Selecciona un libro para ver la simulación." })}
                        <div className="panel-box">
                            <p>No se encontró el libro seleccionado.</p>
                            <button type="button" onClick={() => openScreen("home")}>Volver al inicio</button>
                        </div>
                    </section>
                </main>
            );
        }

        return (
            <main>
                <section className="content-width">
                    {renderSectionHeader({ title: `Simulación de ${selectedBook.titulo}`, subtitle: "Detalle del libro y opciones de compra." })}
                    <div className="book-detail-card">
                        <div className="book-detail-summary">
                            <h2>{selectedBook.titulo}</h2>
                            <p className="book-detail-meta">{selectedBook.categoria} • {selectedBook.editorial}</p>
                            <strong>{formatPrice(selectedBook.precio)}</strong>
                            <p>Stock disponible: {selectedBook.stock}</p>
                            <p className="book-detail-description">
                                Esta es una simulación de compra digital. Incluye acceso inmediato al libro, envío de PIN de descarga y opción de pago con tarjeta o PSE.
                            </p>
                        </div>
                        <div className="book-detail-actions">
                            <button type="button" onClick={() => addToCart(selectedBook)}>Agregar al carrito</button>
                            <button type="button" className="secondary-button" onClick={() => {
                                if (!isAuthenticated) {
                                    setPostAuthScreen("payments");
                                    setFeedback("Debes iniciar sesión antes de pagar.");
                                    setAuthMode("login");
                                    setScreen("login");
                                    return;
                                }
                                setPendingDownload(selectedBook);
                                setPendingDownloadEmail(session?.email || "");
                                setPaymentCompleted(false);
                                setScreen("payments");
                            }}>
                                Ir a pagar
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    function renderProfileScreen() {
        return (
            <main>
                <section className="content-width">
                    {renderSectionHeader({ title: "Perfil", subtitle: "Informacion de la cuenta activa." })}
                    <div className="stats-grid">
                        <article className="stat-box">
                            <small>Nombre</small>
                            <strong>{session?.name}</strong>
                        </article>
                        <article className="stat-box">
                            <small>Rol</small>
                            <strong>{session?.role}</strong>
                        </article>
                        <article className="stat-box">
                            <small>Correo</small>
                            <strong>{session?.email}</strong>
                        </article>
                        <article className="stat-box">
                            <small>Ciudad</small>
                            <strong>{session?.city}</strong>
                        </article>
                    </div>
                </section>
            </main>
        );
    }

    function renderCartScreen() {
        return (
            <main>
                <section className="content-width">
                    {renderSectionHeader({ title: "Carrito de compras", subtitle: "Revisa tus libros antes de pagar." })}
                    {feedback && <p className="auth-feedback success">{feedback}</p>}
                    {cartDetails.length ? (
                        <div className="cart-grid">
                            <div className="cart-items">
                                {cartDetails.map(({ book, qty }) => (
                                    <article className="cart-item" key={book.id}>
                                        <div>
                                            <h3>{book.titulo}</h3>
                                            <p>{book.categoria} • {book.editorial}</p>
                                            <small>{qty} unidad{qty > 1 ? "es" : ""}</small>
                                        </div>
                                        <div className="cart-item-actions">
                                            <strong>{formatPrice(book.precio * qty)}</strong>
                                            <button className="secondary-button" type="button" onClick={() => removeFromCart(book.id)}>
                                                Quitar
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                            <aside className="cart-summary">
                                <div className="summary-box">
                                    <h3>Total</h3>
                                    <strong>{formatPrice(cartTotal)}</strong>
                                    <button
                                        type="button"
                                        className="secondary-button"
                                        onClick={clearCart}
                                    >
                                        Vaciar carrito
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (!isAuthenticated) {
                                                setPostAuthScreen("payments");
                                                setFeedback("Debes iniciar sesión para continuar con el proceso de compra.");
                                                setAuthMode("login");
                                                setScreen("login");
                                                return;
                                            }
                                            openScreen("payments");
                                        }}
                                    >Ir a pagar</button>
                                </div>
                            </aside>
                        </div>
                    ) : (
                        <div className="empty-cart">
                            <p>No tienes libros en el carrito.</p>
                            <button type="button" onClick={() => openScreen("home")}>Seguir comprando</button>
                        </div>
                    )}
                </section>
            </main>
        );
    }

    function handlePaymentSubmit(event, title) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const paymentDetail = String(form.get("payment-detail") || "").trim();
        const detailLabel = title === "PSE" ? "un banco" : "un número de tarjeta";

        if (!paymentDetail) {
            setFeedback(`Ingresa ${detailLabel} para confirmar el pago simulado con ${title}.`);
            return;
        }

        const orderNumber = `LB-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`;
        const purchaseItems = pendingDownload
            ? [{
                id: pendingDownload.id,
                title: pendingDownload.titulo,
                qty: 1,
                price: pendingDownload.precio,
            }]
            : cartDetails.map(({ book, qty }) => ({
                id: book.id,
                title: book.titulo,
                qty,
                price: book.precio,
            }));
        const purchaseTotal = pendingDownload ? pendingDownload.precio : cartTotal;

        setLastPurchase({
            orderNumber,
            items: purchaseItems,
            total: purchaseTotal,
            method: title,
            detail: paymentDetail,
            email: session?.email || "",
            date: new Date().toLocaleDateString("es-CO"),
        });

        if (!pendingDownload) {
            setCartItems([]);
        }
        const purchasedBook = pendingDownload || books.find((book) => book.id === cartDetails[0]?.bookId) || null;
        setSelectedBook(purchasedBook);
        setPendingDownload(null);
        setPendingDownloadEmail("");
        setSelectedBank("");
        setPaymentCompleted(true);
        setPaymentMethod(title);
        setPaymentDetailUsed(paymentDetail);
        setFeedback(`Pago exitoso. Simulación de pago con ${title} aprobada.`);
        setScreen("payments");
    }

    function renderPaymentsScreen() {
        if (!isAuthenticated) {
            return (
                <main>
                    <section className="content-width">
                        {renderSectionHeader({ title: "Pagos", subtitle: "Debes iniciar sesión para continuar con el pago." })}
                        <div className="panel-box">
                            <p>Para que el pago y la descarga funcionen, ingresa con tu usuario o crea una cuenta.</p>
                            <button type="button" onClick={() => { setAuthMode("login"); setScreen("login"); }}>
                                Iniciar sesión
                            </button>
                        </div>
                    </section>
                </main>
            );
        }

        return (
            <main>
                <section className="content-width">
                    {renderSectionHeader({ title: "Pagos", subtitle: cartDetails.length ? "Completa tu compra." : "Agrega libros al carrito para pagar." })}
                    <p className="payment-note">Esta sección es una demostración de pago; no se generan transacciones reales.</p>
                    {paymentCompleted && lastPurchase && !cartDetails.length && !pendingDownload ? (
                        <div className="purchase-success-card">
                            <h3>Pago realizado con éxito</h3>
                            <p className="purchase-summary-text">Número de pedido: <strong>{lastPurchase.orderNumber}</strong></p>
                            <p className="purchase-summary-text">Correo: <strong>{lastPurchase.email}</strong></p>
                            <p className="purchase-summary-text">Método de pago: <strong>{lastPurchase.method}</strong></p>
                            <p className="purchase-summary-text">Total pagado: <strong>{formatPrice(lastPurchase.total)}</strong></p>
                            <div className="purchase-book-list">
                                {lastPurchase.items.map((item) => (
                                    <p key={item.id}>Libro: <strong>{item.title}</strong> ({item.qty} unidad{item.qty > 1 ? "es" : ""})</p>
                                ))}
                            </div>
                            <div className="purchase-actions">
                                <button type="button" onClick={() => {
                                    const firstBook = books.find((book) => book.id === lastPurchase.items[0]?.id);
                                    if (firstBook) {
                                        setSelectedBook(firstBook);
                                        setPaymentCompleted(false);
                                        setFeedback("");
                                        openScreen("book-detail");
                                    } else {
                                        openScreen("home");
                                    }
                                }}>
                                    Mostrar libro
                                </button>
                                <button type="button" onClick={() => {
                                    const firstBook = books.find((book) => book.id === lastPurchase.items[0]?.id);
                                    if (firstBook) {
                                        createDownloadFile(firstBook);
                                        setFeedback("Descarga iniciada para el libro comprado.");
                                    }
                                }}>
                                    Descargar
                                </button>
                            </div>
                        </div>
                    ) : pendingDownload ? (
                        <div className="payment-grid">
                            {feedback && <p className="auth-feedback success">{feedback}</p>}
                            <article className="payment-card" key="summary">
                                <h3>Libro seleccionado</h3>
                                <p>Libro: <strong>{pendingDownload.titulo}</strong></p>
                                <p>Precio: <strong>{formatPrice(pendingDownload.precio)}</strong></p>
                                <p>Completa los datos para simular el pago y recibir el PIN de descarga.</p>
                            </article>
                            {[
                                ["Tarjeta", "Pago con tarjeta debito o credito."],
                                ["PSE", "Transferencia desde banco."],
                            ].map(([title, text]) => (
                                <article className="payment-card" key={title}>
                                    <div className="payment-card-header">
                                        <h3>{title}</h3>
                                        <span className="payment-card-badge">Demo</span>
                                    </div>
                                    <p className="payment-card-text">{text}</p>
                                    <p className="payment-demo-label">Simulación de pago - modo demo</p>
                                    <form className="mini-form" onSubmit={(event) => handlePaymentSubmit(event, title)}>
                                        <label className="payment-field-label" htmlFor={`payment-email-${title}`}>
                                            Correo electrónico
                                        </label>
                                        <input
                                            id={`payment-email-${title}`}
                                            type="email"
                                            value={pendingDownloadEmail}
                                            onChange={(event) => setPendingDownloadEmail(event.target.value)}
                                            placeholder={session?.email || "correo@ejemplo.com"}
                                            required
                                        />
                                        {title === "PSE" ? (
                                            <label className="payment-field-label" htmlFor={`payment-${title}`}>
                                                Banco receptor
                                            </label>
                                        ) : (
                                            <label className="payment-field-label" htmlFor={`payment-${title}`}>
                                                Número de tarjeta
                                            </label>
                                        )}
                                        {title === "PSE" ? (
                                            <select
                                                id={`payment-${title}`}
                                                name="payment-detail"
                                                value={selectedBank}
                                                onChange={(event) => setSelectedBank(event.target.value)}
                                                required
                                            >
                                                <option value="">Selecciona tu banco</option>
                                                {bankOptions.map((bank) => (
                                                    <option key={bank} value={bank}>{bank}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                id={`payment-${title}`}
                                                name="payment-detail"
                                                placeholder="Ingresa los 16 dígitos"
                                                inputMode="numeric"
                                                required
                                            />
                                        )}
                                        <button type="submit">Confirmar demo</button>
                                    </form>
                                </article>
                            ))}
                        </div>
                    ) : cartDetails.length ? (
                        <div className="payment-grid">
                            {feedback && <p className="auth-feedback success">{feedback}</p>}
                            {[
                                ["Tarjeta", "Pago con tarjeta debito o credito."],
                                ["PSE", "Transferencia desde banco."],
                            ].map(([title, text]) => (
                                <article className="payment-card" key={title}>
                                    <div className="payment-card-header">
                                        <h3>{title}</h3>
                                        <span className="payment-card-badge">Demo</span>
                                    </div>
                                    <p className="payment-card-text">{text}</p>
                                    <p className="payment-demo-label">Simulación de pago - modo demo</p>
                                    <form className="mini-form" onSubmit={(event) => handlePaymentSubmit(event, title)}>
                                        {title === "PSE" ? (
                                            <label className="payment-field-label" htmlFor={`payment-${title}`}>
                                                Banco receptor
                                            </label>
                                        ) : (
                                            <label className="payment-field-label" htmlFor={`payment-${title}`}>
                                                Número de tarjeta
                                            </label>
                                        )}
                                        {title === "PSE" ? (
                                            <select
                                                id={`payment-${title}`}
                                                name="payment-detail"
                                                value={selectedBank}
                                                onChange={(event) => setSelectedBank(event.target.value)}
                                                required
                                            >
                                                <option value="">Selecciona tu banco</option>
                                                {bankOptions.map((bank) => (
                                                    <option key={bank} value={bank}>{bank}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                id={`payment-${title}`}
                                                name="payment-detail"
                                                placeholder="Ingresa los 16 dígitos"
                                                inputMode="numeric"
                                                required
                                            />
                                        )}
                                        <button type="submit">Confirmar demo</button>
                                    </form>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-cart">
                            <p>Aún no agregaste libros al carrito.</p>
                            <button type="button" onClick={() => openScreen("home")}>Volver a inicio</button>
                        </div>
                    )}
                </section>
            </main>
        );
    }

    function renderDownloadVerificationScreen() {
        const book = verificationBook && books.find((item) => item.id === verificationBook.id);
        const access = book && downloadAccess.find((item) => item.bookId === book.id);

        function verifyPin(event) {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            const pin = String(form.get("pin") || "").trim();

            if (!access || access.pin !== pin) {
                setFeedback("PIN incorrecto. Verifica el codigo enviado a tu correo.");
                return;
            }

            setFeedback(`PIN verificado. Descargando "${book.titulo}".`);
            createDownloadFile(book);
            setVerificationBook(null);
            setScreen("home");
        }

        return (
            <main>
                <section className="content-width">
                    {renderSectionHeader({ title: "Verificacion de descarga", subtitle: book ? `Ingresa el PIN enviado a ${session?.email}` : "Selecciona un libro para descargar." })}
                    <div className="panel-box">
                        {book ? (
                            <>
                                <p>Libro: <strong>{book.titulo}</strong></p>
                                <p>Editorial: {book.editorial}</p>
                                <p>Correo de envio: <strong>{access?.email || session?.email}</strong></p>
                                <p className="pin-simulation">PIN simulado: <strong>{access?.pin || "(pago pendiente)"}</strong></p>
                                <form className="login-form" onSubmit={verifyPin}>
                                    <div className="grupo-input">
                                        <label>PIN de descarga</label>
                                        <input name="pin" placeholder="Ej. 123456" maxLength={6} required />
                                    </div>
                                    <button type="submit">Verificar PIN y abrir libro</button>
                                </form>
                                <button className="secondary-button" type="button" onClick={() => {
                                    if (book) {
                                        const newPin = String(Math.floor(100000 + Math.random() * 900000));
                                        setDownloadAccess((current) =>
                                            current.map((item) =>
                                                item.bookId === book.id ? { ...item, pin: newPin } : item
                                            )
                                        );
                                        setFeedback(`Se reenvio un nuevo PIN a ${session?.email}.`);
                                    }
                                }}>
                                    Reenviar PIN al correo
                                </button>
                            </>
                        ) : (
                            <p>No hay libro activo para verificar.</p>
                        )}
                    </div>
                </section>
            </main>
        );
    }

    function renderSupportScreen() {
        return (
            <main>
                <section className="content-width">
                    {renderSectionHeader({ title: "Contactos", subtitle: "Canales de ayuda al usuario." })}
                    <div className="menu-grid">
                        <article className="menu-card">
                            <h3>Linea de atencion</h3>
                            <p>300 000 0000</p>
                        </article>
                        <article className="menu-card">
                            <h3>Correo</h3>
                            <p>contacto@libreria.com</p>
                        </article>
                        <button className="menu-card" type="button" onClick={() => openScreen("chat")}>
                            <h3>Chat</h3>
                            <p>Abrir chat de contacto en linea.</p>
                        </button>
                    </div>
                </section>
            </main>
        );
    }

    function renderTermsScreen() {
        return (
            <main>
                <section className="content-width terms-page">
                    {renderSectionHeader({ title: "Terminos y condiciones", subtitle: "Por favor lea y acepte las condiciones antes de usar el servicio." })}

                    {!termsAccepted && (
                        <div className="terms-notice">
                            <p>Este aviso de términos y condiciones aparecerá cada vez que actualice la página.</p>
                            <button type="button" className="primary-button" onClick={() => setTermsAccepted(true)}>
                                Aceptar
                            </button>
                        </div>
                    )}

                    <article className="panel-box terms-box">
                        <h3>Uso del servicio</h3>
                        <p>
                            Al usar esta plataforma de venta de libros digitales, usted acepta que los contenidos adquiridos se entregan en formato descargable.
                            No somos responsables por el uso que se haga de los archivos descargados ni por problemas de compatibilidad en dispositivos externos.
                        </p>
                        <h3>Pagos y seguridad</h3>
                        <p>
                            Los pagos simulados son parte de la demostración y no implican transacciones reales. La informacion proporcionada durante la compra debe ser veraz.
                            En caso de solicitar PIN por correo, el acceso se otorga una vez que se verifica el codigo ingresado.
                        </p>
                        <h3>Privacidad</h3>
                        <p>
                            Los datos registrados en su cuenta se usan únicamente para procesar pedidos y mejorar la experiencia de usuario.
                            No compartimos informacion personal con terceros fuera de esta demostracion.
                        </p>
                        <h3>Registro y cuentas</h3>
                        <p>
                            Es necesario iniciar sesion para ver el perfil y completar las compras. Si no tiene una cuenta, registrese para continuar.
                        </p>
                        <h3>Limitaciones</h3>
                        <p>
                            Este sitio es una demostracion funcional del proceso de compra y descarga. No garantiza la disponibilidad real del producto fuera del entorno de prueba.
                        </p>
                    </article>
                </section>
            </main>
        );
    }

    function renderChatScreen() {
        return (
            <main>
                <section className="content-width">
                    {renderSectionHeader({ title: "Chat de contacto", subtitle: "Conversacion de demostracion.", backTo: "support" })}
                    <div className="panel-box chat-shell">
                        <div className="chat-messages">
                            {chatMessages.map((message, index) => (
                                <div className={`chat-bubble ${message.type}`} key={`${message.type}-${index}`}>
                                    {message.text}
                                </div>
                            ))}
                        </div>
                        <form className="chat-input-row" onSubmit={sendChatMessage}>
                            <input name="message" placeholder="Escribe un mensaje para la demo" />
                            <button type="submit">Enviar</button>
                        </form>
                    </div>
                </section>
            </main>
        );
    }

    function renderAdminBooksScreen() {
        return (
            <main>
                <section className="content-width">
                    {renderSectionHeader({ title: "Gestion de libros", subtitle: "Agrega nuevos titulos y administra el catalogo.", backTo: "admin" })}
                    <form className="panel-box book-form-grid" onSubmit={addBook}>
                        <div className="register-grid">
                            <div className="grupo-input">
                                <label>Titulo</label>
                                <input name="titulo" required />
                            </div>
                            <div className="grupo-input">
                                <label>Precio</label>
                                <input name="precio" type="number" min="0" step="0.01" required />
                            </div>
                            <div className="grupo-input">
                                <label>Stock</label>
                                <input name="stock" type="number" min="0" required />
                            </div>
                            <div className="grupo-input">
                                <label>Categoria</label>
                                <input name="categoria" required />
                            </div>
                            <div className="grupo-input">
                                <label>Editorial</label>
                                <input name="editorial" required />
                            </div>
                        </div>
                        <button type="submit">Agregar libro</button>
                    </form>
                    {renderBooksTable({ admin: true })}
                </section>
            </main>
        );
    }

    const screens = {
        home: renderHomeScreen(),
        login: renderLoginScreen(),
        user: renderUserHome(),
        admin: renderAdminHome(),
        catalog: renderCatalogScreen(),
        "book-detail": renderBookDetailScreen(),
        orders: renderSimpleTableScreen({
            title: "Pedidos",
            subtitle: "Historial de compras de demostracion.",
            items: ventas,
            columns: [
                { key: "id", label: "Pedido" },
                { key: "fecha", label: "Fecha" },
                { key: "total", label: "Total", render: (item) => formatPrice(item.total) },
                { key: "cliente", label: "Cliente" },
                { key: "empleado", label: "Atendido por" },
            ],
        }),
        favorites: renderSimpleTableScreen({
            title: "Favoritos",
            subtitle: "Libros guardados por el usuario.",
            items: favoriteBooks,
            columns: [
                { key: "id", label: "ID" },
                { key: "titulo", label: "Titulo" },
                { key: "categoria", label: "Categoria" },
                { key: "editorial", label: "Editorial" },
            ],
        }),
        profile: isAuthenticated ? renderProfileScreen() : renderLoginScreen(),
        cart: renderCartScreen(),
        payments: renderPaymentsScreen(),
        support: renderSupportScreen(),
        terms: renderTermsScreen(),
        chat: renderChatScreen(),
        "download-verification": renderDownloadVerificationScreen(),
        "admin-books": renderAdminBooksScreen(),
        "admin-sales": renderSimpleTableScreen({
            title: "Ventas",
            subtitle: "Registros de ventas realizadas.",
            backTo: "admin",
            items: ventas,
            columns: [
                { key: "id", label: "ID" },
                { key: "fecha", label: "Fecha" },
                { key: "total", label: "Total", render: (item) => formatPrice(item.total) },
                { key: "cliente", label: "Cliente" },
                { key: "empleado", label: "Empleado" },
            ],
        }),
        "admin-employees": renderSimpleTableScreen({
            title: "Empleados",
            subtitle: "Personal registrado en la libreria.",
            backTo: "admin",
            items: empleados,
            columns: [
                { key: "id", label: "ID" },
                { key: "nombre", label: "Nombre" },
                { key: "apellido", label: "Apellido" },
                { key: "cargo", label: "Cargo" },
                { key: "usuario", label: "Usuario" },
            ],
        }),
        "admin-clients": renderSimpleTableScreen({
            title: "Clientes",
            subtitle: "Clientes registrados en la demostracion.",
            backTo: "admin",
            items: clientes,
            columns: [
                { key: "id", label: "ID" },
                { key: "nombre", label: "Nombre" },
                { key: "usuario", label: "Usuario" },
                { key: "correo", label: "Correo" },
                { key: "telefono", label: "Telefono" },
                { key: "direccion", label: "Ciudad" },
            ],
        }),
    };

    return (
        <>
            <Header subtitle={screen === "login" ? "Portal de acceso" : "Sistema de venta de libros digitales"} />
            <Nav
                menuAbierto={menuAbierto}
                setMenuAbierto={setMenuAbierto}
                isLoggedIn={isAuthenticated}
                onLogout={logout}
                searchTerm={searchTerm}
                onSearchTermChange={setSearchTerm}
                onSearchSubmit={handleSearchSubmit}
                onSearchClear={handleSearchClear}
                onHomeClick={() => {
                    setSelectedCategory("Todos");
                    setSearchTerm("");
                    setSearchQuery("");
                    setScreen("home");
                }}
            />
            {screens[screen] || screens.login}
            <Footer />
        </>
    );
}

export default Inicio;
