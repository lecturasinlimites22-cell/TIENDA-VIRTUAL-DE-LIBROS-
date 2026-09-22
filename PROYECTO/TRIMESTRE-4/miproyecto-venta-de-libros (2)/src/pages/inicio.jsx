import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Foooter";
import Nav from "../components/Nav";
import { clientes as clientesBase, empleados as empleadosBase, libros as librosBase, ventas } from "../data/libros.js.example";

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
        username: "admin",
        email: "admin@gmail.com",
        password: "123",
        phone: "3000000001",
        city: "Bogota",
    },
];

function formatPrice(price) {
    const numericPrice = Number(price);
    const fractionDigits = Number.isInteger(numericPrice) ? 0 : 2;
    return `$${numericPrice.toLocaleString("es-CO", {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: 2,
    })}`;
}

function normalizeValue(value) {
    return String(value || "").trim().toLowerCase();
}

function normalizeRole(role) {
    const value = String(role || "").trim().toLowerCase();
    if (["administrador", "admin", "1"].includes(value)) {
        return "Administrador";
    }
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : "Usuario";
}

function getBookDescription(book) {
    if (book.descripcion || book.description) {
        return book.descripcion || book.description;
    }

    return `Una lectura de ${String(book.categoria || "literatura").toLowerCase()} publicada por ${book.editorial || "nuestra libreria"}. Conoce la historia, las ideas y los personajes de ${book.titulo}.`;
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

import portadas from '../assets/portadas';

const coverPhotos = [
    portadas[1],
    portadas[2],
    portadas[3],
    portadas[4],
    portadas[5],
    portadas[6],
    portadas[7],
    portadas[8],
    portadas[9],
    portadas[10],
    portadas[11],
    portadas[12],
    portadas[13],
    portadas[14],
    portadas[15],
    portadas[16],
    portadas[17],
    portadas[18],
    portadas[19],
    portadas[20],
    portadas[21],
    portadas[22],
    portadas[23],
    portadas[24],
    portadas[25],
    portadas[26],
    portadas[27],
    portadas[28],
    portadas[29],
    portadas[30],
];

const coverThemes = {
    "Novelas": ["#9b3e50", "#251444", "✦"],
    "Tecnología": ["#006d91", "#141a4d", "</>"],
    "Negocios y Finanzas": ["#9b6700", "#3d163b", "$"],
    "Educación": ["#0b7a72", "#17375d", "✎"],
    "Infantil": ["#b2417e", "#37348c", "☀"],
    "Ciencia Ficción": ["#3a48ad", "#130d3b", "◌"],
    "Romance": ["#bf3c6b", "#55214b", "♥"],
    "Misterio": ["#4b466c", "#111426", "?"],
    "Historia": ["#915b28", "#3a2434", "⌛"],
    "Diseño": ["#7750b7", "#113c5d", "◒"],
    "Idiomas": ["#2477a7", "#1d2854", "A"],
    "Desarrollo Personal": ["#287c66", "#24446c", "↑"],
};

function BookCover({ book, className = "" }) {
    const [from, to, symbol] = coverThemes[book.categoria] || ["#006d91", "#24154c", "✦"];
    const photo = book.portada || (!book.apiOnly ? coverPhotos[(Number(book.id) - 1) % coverPhotos.length] : null);
    return (
        <div className={`book-cover-art ${className}`.trim()} style={{ "--cover-from": from, "--cover-to": to }} role="img" aria-label={`Portada de ${book.titulo}`}>
            <img className="cover-photo" src={photo} alt="" aria-hidden="true" loading="lazy" onError={(event) => event.currentTarget.classList.add("is-unavailable")} />
            <div className="book-cover-illustration">
                <span className="cover-symbol" aria-hidden="true">{symbol}</span>
                <span className="cover-category">{book.categoria}</span>
                <small>{book.editorial}</small>
            </div>
        </div>
    );
}

function getOrderNumber() {
    const now = new Date();
    return `LB-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function getRandomPin() {
    return String(Math.floor(100000 + Math.random() * 900000));
}

function getAuthToken() {
    return `${Math.random().toString(36).slice(2)}.${Math.random().toString(36).slice(2)}`;
}

const STORAGE_PREFIX = "bookstore-";
const ADMIN_APP_URL = "http://localhost:3000";
const API_BASE = "http://localhost:5000/api";

function getStorageKey(key) {
    return `${STORAGE_PREFIX}${key}`;
}

function loadFromStorage(key, fallback) {
    if (typeof window === "undefined") return fallback;
    try {
        const stored = window.localStorage.getItem(getStorageKey(key));
        return stored ? JSON.parse(stored) : fallback;
    } catch {
        return fallback;
    }
}

function loadArrayFromStorage(key, fallback) {
    const stored = loadFromStorage(key, null);
    return Array.isArray(stored) && stored.length ? stored : fallback;
}

function saveToStorage(key, value) {
    if (typeof window === "undefined") return;
    try {
        const storageKey = getStorageKey(key);
        if (value === null || value === undefined) {
            window.localStorage.removeItem(storageKey);
            return;
        }
        window.localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
        // ignore storage errors
    }
}

function normalizeTitle(title) {
    return String(title || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase();
}

function normalizeApiBook(book) {
    const apiTitle = normalizeTitle(book.titulo);
    const localBook = librosBase.find((item) => normalizeTitle(item.titulo) === apiTitle);
    return {
        ...localBook,
        ...book,
        id: Number(book.id_libro ?? book.id),
        apiOnly: !localBook,
        titulo: book.titulo || localBook?.titulo || "Libro sin titulo",
        precio: Number(book.precio ?? localBook?.precio ?? 0),
        stock: Number(book.stock ?? localBook?.stock ?? 0),
        categoria: book.categoria || localBook?.categoria || "Sin categoria",
        editorial: book.editorial || localBook?.editorial || "Sin editorial",
        descripcion: book.descripcion || book.description || localBook?.descripcion || localBook?.description || "",
    };
}

function mergeApiBooks(data) {
    const apiBooks = (Array.isArray(data) ? data : data.libro || []).map(normalizeApiBook);
    const apiBooksByTitle = new Map(apiBooks.map((book) => [normalizeTitle(book.titulo), book]));
    const localBooks = librosBase.map((book) => apiBooksByTitle.get(normalizeTitle(book.titulo)) || book);
    const localTitles = new Set(localBooks.map((book) => normalizeTitle(book.titulo)));
    const mergedBooks = [...localBooks, ...apiBooks.filter((book) => !localTitles.has(normalizeTitle(book.titulo)))];
    const usedIds = new Set();
    let nextId = mergedBooks.reduce((highest, book) => {
        const id = Number(book.id);
        return Number.isInteger(id) ? Math.max(highest, id) : highest;
    }, 0) + 1;

    return mergedBooks.map((book) => {
        const id = Number(book.id);
        if (Number.isInteger(id) && !usedIds.has(id)) {
            usedIds.add(id);
            return { ...book, id };
        }

        while (usedIds.has(nextId)) nextId += 1;
        usedIds.add(nextId);
        return { ...book, id: nextId++ };
    });
}

function Inicio({ initialScreen = "home", initialAuthMode = "login" }) {
    const [authMode, setAuthMode] = useState(initialAuthMode);
    const [screen, setScreen] = useState(initialScreen);
    const [menuAbierto, setMenuAbierto] = useState(false);

    const [feedback, setFeedback] = useState("");
    const [session, setSession] = useState(() => loadFromStorage("session", null));
    const [accounts, setAccounts] = useState(() => loadArrayFromStorage("accounts", cuentasBase));
    const [books, setBooks] = useState(() => mergeApiBooks(loadFromStorage("books", librosBase)));
    const [cartItems, setCartItems] = useState(() => loadFromStorage("cart", []));
    const [selectedCategory, setSelectedCategory] = useState(() => loadFromStorage("selectedCategory", "Todos"));
    const [favorites, setFavorites] = useState(() => loadFromStorage("favorites", [1, 3]));
    const [clientes, setClientes] = useState(() => loadArrayFromStorage("clientes", clientesBase));
    const [empleados, setEmpleados] = useState(() => loadArrayFromStorage("empleados", empleadosBase));
    const [chatMessages, setChatMessages] = useState(() => loadFromStorage("chatMessages", []));
    const [selectedWhatsAppNumber, setSelectedWhatsAppNumber] = useState("573001234567");
    const [downloadAccess, setDownloadAccess] = useState(() => loadFromStorage("downloadAccess", []));
    const [pendingDownload, setPendingDownload] = useState(() => loadFromStorage("pendingDownload", null));

    const whatsappNumbers = [
        { id: "soporte", label: "Soporte", number: "573125712998" },
        { id: "ventas", label: "Ventas", number: "573123264885" },
    ];
    
    useEffect(() => {
        async function loadApiData() {
            const endpoints = [
                {
                    url: `${API_BASE}/libro?limit=100`,
                    setter: setBooks,
                    fallback: librosBase,
                    transform: mergeApiBooks,
                },
                { url: `${API_BASE}/cliente`, setter: setClientes, fallback: clientesBase },
                { url: `${API_BASE}/empleado`, setter: setEmpleados, fallback: empleadosBase },
                { url: `${API_BASE}/usuario`, setter: setAccounts, fallback: cuentasBase },
            ];

            const results = await Promise.all(
                endpoints.map(async ({ url, transform }) => {
                    try {
                        const response = await fetch(url, {
                            cache: 'no-store',
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP ${response.status} ${response.statusText}`);
                        }

                        const contentType = response.headers.get("content-type") || "";

                        if (!contentType.includes("application/json")) {
                            const text = await response.text();
                            throw new Error(
                                `Expected JSON but received ${contentType || "unknown"}: ${text.slice(0, 120)}`
                            );
                        }

                        const data = await response.json();
                        return {
                            success: true,
                            data: transform ? transform(data) : data,
                        };
                    } catch (error) {
                        // La API puede no estar iniciada en el puerto esperado.
                        // En ese caso usamos los datos locales del proyecto.
                        return {
                            success: false,
                            error,
                        };
                    }
                })
            );

            results.forEach((result, index) => {
                const { setter, fallback } = endpoints[index];
                if (result.success && Array.isArray(result.data) && result.data.length) {
                    setter(result.data);
                } else {
                    setter(fallback);
                }
            });

            setFeedback('');
        }

        loadApiData();
    }, []);

    const [pendingDownloadEmail, setPendingDownloadEmail] = useState(() => loadFromStorage("pendingDownloadEmail", ""));
    const [verificationBook, setVerificationBook] = useState(() => loadFromStorage("verificationBook", null));
    const [searchTerm, setSearchTerm] = useState(() => loadFromStorage("searchTerm", ""));
    const [searchQuery, setSearchQuery] = useState(() => loadFromStorage("searchQuery", ""));
    const [searchRestoreCategory, setSearchRestoreCategory] = useState(() => loadFromStorage("searchRestoreCategory", "Todos"));
    const [selectedBank, setSelectedBank] = useState(() => loadFromStorage("selectedBank", ""));
    const [paymentCompleted, setPaymentCompleted] = useState(() => loadFromStorage("paymentCompleted", false));
    const [lastPurchase, setLastPurchase] = useState(() => loadFromStorage("lastPurchase", null));
    const [selectedBook, setSelectedBook] = useState(() => loadFromStorage("selectedBook", null));
    const [termsAccepted, setTermsAccepted] = useState(() => loadFromStorage("termsAccepted", false));
    const [postAuthScreen, setPostAuthScreen] = useState(() => loadFromStorage("postAuthScreen", null));

    useEffect(() => {
        saveToStorage("session", session);
        saveToStorage("token", session?.token || null);
        saveToStorage("accounts", accounts);
        saveToStorage("books", books);
        saveToStorage("cart", cartItems);
        saveToStorage("selectedCategory", selectedCategory);
        saveToStorage("favorites", favorites);
        saveToStorage("clientes", clientes);
        saveToStorage("empleados", empleados);
        saveToStorage("chatMessages", chatMessages);
        saveToStorage("downloadAccess", downloadAccess);
        saveToStorage("pendingDownload", pendingDownload);
        saveToStorage("pendingDownloadEmail", pendingDownloadEmail);
        saveToStorage("verificationBook", verificationBook);
        saveToStorage("searchTerm", searchTerm);
        saveToStorage("searchQuery", searchQuery);
        saveToStorage("searchRestoreCategory", searchRestoreCategory);
        saveToStorage("selectedBank", selectedBank);
        saveToStorage("paymentCompleted", paymentCompleted);
        saveToStorage("lastPurchase", lastPurchase);
        saveToStorage("selectedBook", selectedBook);
        saveToStorage("termsAccepted", termsAccepted);
        saveToStorage("paymentMethod", paymentCompleted ? (lastPurchase?.method || "") : "");
        saveToStorage("paymentDetailUsed", paymentCompleted ? (lastPurchase?.detail || "") : "");
        saveToStorage("postAuthScreen", postAuthScreen);
    }, [
        session,
        accounts,
        books,
        cartItems,
        selectedCategory,
        favorites,
        clientes,
        empleados,
        chatMessages,
        downloadAccess,
        pendingDownload,
        pendingDownloadEmail,
        verificationBook,
        searchTerm,
        searchQuery,
        searchRestoreCategory,
        selectedBank,
        paymentCompleted,
        lastPurchase,
        selectedBook,
        termsAccepted,
        postAuthScreen,
    ]);
    const loginTime = useMemo(() => {
        const date = new Date();
        return {
            date: new Intl.DateTimeFormat("es-CO", { day: "2-digit", month: "short", year: "numeric" }).format(date),
            time: new Intl.DateTimeFormat("es-CO", { hour: "numeric", minute: "2-digit" }).format(date),
        };
    }, []);
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

    function openAdminModule(module) {
        window.location.assign(`${ADMIN_APP_URL}/modulos/${module}`);
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

    function renderHomeScreen() {
    return (
        <main>
            <section className="home-books">

                {menuAbierto && (
                    <aside className="menu-libros">
                        <button className="menu-close-button" type="button" aria-label="Cerrar menú" onClick={() => setMenuAbierto(false)}>
                            <span aria-hidden="true">×</span>
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
                                <button
                                    type="button"
                                    className="book-cover-button"
                                    onClick={() => {
                                        setSelectedBook(book);
                                        openScreen("book-detail");
                                    }}
                                    aria-label={`Ver detalles de ${book.titulo}`}
                                >
                                    <BookCover book={book} className="featured-cover" />
                                </button>
                                <h3>{book.titulo}</h3>
                                <p>{book.categoria} • {book.editorial}</p>
                                <strong>{formatPrice(book.precio)}</strong>
                                <span>{book.stock > 0 ? "Disponible" : "Agotado"}</span>
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
    setScreen("logout-success");
    saveToStorage("session", null);
    saveToStorage("token", null);
}
    async function handleLogin(event) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const username = String(form.get("username") || "").trim();
        const password = String(form.get("password") || "");
        const normalizedUsername = normalizeValue(username);
        const isAdminLogin =
            (normalizedUsername === "admin" || normalizedUsername === "admin@gmail.com") &&
            password === "123";

        let account = null;

        if (isAdminLogin) {
            const adminAccount = cuentasBase.find((item) => normalizeValue(item.role) === "administrador");
            if (adminAccount) {
                account = { ...adminAccount };
            }
        }

        if (!account) {
            try {
                const response = await fetch("/api/users");
                if (response.ok) {
                    const users = await response.json();
                    const apiAccount = users.find(
                        (user) =>
                            (user.email === username || user.username === username) &&
                            user.password === password
                    );
                    if (apiAccount) {
                        account = {
                            ...apiAccount,
                            role: normalizeRole(apiAccount.role),
                            username: apiAccount.username || apiAccount.email || username,
                        };
                    }
                }
            } catch (error) {
                console.error("No se pudo validar con la API", error);
            }
        }

        if (!account) {
            account = accounts.find(
                (item) =>
                    normalizeValue(item.username) === normalizedUsername ||
                    normalizeValue(item.email) === normalizedUsername
            );

            if (account && account.password !== password) {
                account = null;
            }
        }

        if (!account && isAdminLogin) {
            const adminAccount = cuentasBase.find((item) => item.role === "Administrador");
            if (adminAccount) {
                account = { ...adminAccount };
            }
        }

        if (account) {
            const normalizedRole = normalizeRole(account.role);
            const accountWithToken = { ...account, role: normalizedRole, token: account.token || getAuthToken() };
            const accountExists = accounts.some(
                (item) =>
                    normalizeValue(item.username) === normalizeValue(account.username) ||
                    normalizeValue(item.email) === normalizeValue(account.email)
            );
            const nextAccounts = accountExists
                ? accounts.map((item) =>
                      normalizeValue(item.username) === normalizeValue(account.username) ||
                      normalizeValue(item.email) === normalizeValue(account.email)
                          ? accountWithToken
                          : item
                  )
                : [...accounts, accountWithToken];

            setSession(accountWithToken);
            setAccounts(nextAccounts);
            saveToStorage("session", accountWithToken);
            saveToStorage("token", accountWithToken.token);
            saveToStorage("accounts", nextAccounts);
            if (normalizedRole === "Administrador") {
                window.location.assign(`${ADMIN_APP_URL}/`);
                return;
            }
            const nextScreen = postAuthScreen || "user";
            setScreen(nextScreen);
            setPostAuthScreen(null);
            return;
        }

        setFeedback("Credenciales invalidas. Prueba con admin / 123 o admin@gmail.com / 123.");
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

        let createdAccount = newAccount;
        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newAccount),
            });
            if (response.ok) {
                createdAccount = await response.json();
                setFeedback("Cuenta creada y registrada en la API.");
            } else {
                throw new Error(`HTTP ${response.status}`);
            }
        } catch (error) {
            console.error(error);
            setFeedback("Cuenta creada localmente. Activa la API para persistirla.");
            if (!createdAccount.id) {
                createdAccount = { ...createdAccount, id: Date.now() };
            }
        }

        setAccounts((current) => [...current, createdAccount]);
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

        const accountWithToken = { ...createdAccount, token: getAuthToken() };
        setSession(accountWithToken);
        setAccounts((current) => {
            const nextAccounts = [...current, accountWithToken];
            saveToStorage("accounts", nextAccounts);
            return nextAccounts;
        });
        saveToStorage("session", accountWithToken);
        saveToStorage("token", accountWithToken.token);
        const nextScreen = postAuthScreen || "user";
        setScreen(nextScreen);
        setPostAuthScreen(null);
    }

    async function addBook(event) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const newBook = {
            titulo: form.get("titulo"),
            precio: Number(form.get("precio")).toFixed(2),
            stock: Number(form.get("stock")),
            id_categoria: 1,
            id_editorial: 1,
        };

        try {
            const response = await fetch(`${API_BASE}/libro`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newBook),
            });
            if (response.ok) {
                const responseData = await response.json();
                const created = normalizeApiBook(responseData.libro || responseData);
                setBooks((current) => [...current, created]);
                setFeedback(`Libro "${created.titulo}" agregado y guardado en la API.`);
            } else {
                throw new Error(`HTTP ${response.status}`);
            }
        } catch (error) {
            console.error(error);
            const fallbackBook = {
                id: books.length ? Math.max(...books.map((item) => item.id)) + 1 : 1,
                ...newBook,
            };
            setBooks((current) => [...current, fallbackBook]);
            setFeedback(`Libro "${fallbackBook.titulo}" agregado localmente. Activa la API para persistirlo.`);
        }

        event.currentTarget.reset();
    }

    async function deleteBook(id) {
        try {
            const response = await fetch(`${API_BASE}/libro/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            setFeedback("Libro eliminado y sincronizado con la API.");
        } catch (error) {
            console.error(error);
            setFeedback("Libro eliminado localmente. Activa la API para sincronizar los cambios.");
        }

        setBooks((current) => current.filter((book) => book.id !== id));
        setFavorites((current) => current.filter((favoriteId) => favoriteId !== id));
    }

    async function editBook(id) {
        const book = books.find((item) => item.id === id);
        if (!book) return;
        const title = window.prompt("Nuevo titulo del libro:", book.titulo);
        if (!title) return;
        const price = window.prompt("Nuevo precio del libro:", String(book.precio));
        if (price === null || Number.isNaN(Number(price))) return;

        const updatedBook = {
            ...book,
            titulo: title,
            precio: Number(price).toFixed(2),
            id_libro: id,
        };
        try {
            const response = await fetch(`${API_BASE}/libro/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedBook),
            });
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const responseData = await response.json();
            const remoteBook = normalizeApiBook(responseData.libro || responseData);
            setBooks((current) => current.map((item) => (item.id === id ? remoteBook : item)));
            setFeedback("Libro actualizado y sincronizado con la API.");
        } catch (error) {
            console.error(error);
            setBooks((current) => current.map((item) => (item.id === id ? updatedBook : item)));
            setFeedback("Libro actualizado localmente. Activa la API para sincronizarlo.");
        }
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

        const targetNumber = whatsappNumbers.find((item) => item.number === selectedWhatsAppNumber)?.number || whatsappNumbers[0].number;
        const targetLabel = whatsappNumbers.find((item) => item.number === selectedWhatsAppNumber)?.label || "Soporte";
        const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(text)}`;

        window.open(whatsappUrl, "_blank", "noopener,noreferrer");

        setChatMessages((current) => [
            ...current,
            { type: "user", text },
            { type: "agent", text: `Gracias por tu mensaje. Se abrirá WhatsApp para enviarlo a ${targetLabel}.` },
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
                    <div className="login-brand compact-login-brand">
                        <iframe className="login-mark" src="/logo%20.html" title="Logo Venta de Libros" />
                        <div>
                            <h2>Venta de Libros Digital</h2>
                            <p>Inicia sesión o regístrate para entrar a la tienda.</p>
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

    function renderLogoutSuccessScreen() {
        return (
            <main className="logout-success-shell">
                <section className="logout-success-panel">
                    <div className="logout-kicker">Venta de Libros Digital</div>
                    <h1 className="logout-title">Sesión cerrada con éxito</h1>
                    <p className="logout-subtitle">Tu acceso de usuario se cerró correctamente.</p>
                    <button
                        className="logout-success-button"
                        type="button"
                        onClick={() => {
                            setScreen("login");
                            setAuthMode("login");
                            setFeedback("");
                        }}
                    >
                        Iniciar sesión
                    </button>
                </section>
            </main>
        );
    }

    function renderUserHome() {
        return renderHomeScreen();
    }

    function renderServicesScreen() {
        return (
            <main>
                <section className="content-width">
                    {renderSectionHeader({ title: "Servicios", subtitle: "Todo lo que necesitas para elegir, comprar y disfrutar tus libros." })}
                    <div className="menu-grid">
                        <button className="menu-card" type="button" onClick={() => openScreen("catalog")}>
                            <h3>Catálogo digital</h3>
                            <p>Explora todos los libros disponibles.</p>
                        </button>
                        <button className="menu-card" type="button" onClick={() => openScreen("payments")}>
                            <h3>Compra segura</h3>
                            <p>Consulta los métodos de pago disponibles.</p>
                        </button>
                        <a className="menu-card" href="https://wa.me/573125712998?text=Hola%2C%20necesito%20ayuda%20con%20la%20tienda." target="_blank" rel="noreferrer">
                            <h3>Atención por WhatsApp</h3>
                            <p>Recibe ayuda directa de nuestro equipo.</p>
                        </a>
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
                            <button className="secondary-button admin-action-button" type="button" onClick={() => openScreen("user")}>Vista usuario</button>
                        </div>
                    </div>

                    <div className="menu-grid admin-menu-grid">
                        <button className="menu-card" type="button" onClick={() => openAdminModule("libro")}>
                            <span className="menu-icon">LIB</span>
                            <h3>Libros</h3>
                            <p>Agregar, editar y eliminar registros del catalogo.</p>
                        </button>
                        <button className="menu-card" type="button" onClick={() => openAdminModule("venta")}>
                            <span className="menu-icon">VEN</span>
                            <h3>Ventas</h3>
                            <p>Consulta historico de ventas registradas.</p>
                        </button>
                        <button className="menu-card" type="button" onClick={() => openScreen("admin-sales")}>
                            <span className="menu-icon">PED</span>
                            <h3>Pedidos</h3>
                            <p>Revisa los pedidos registrados en el sistema.</p>
                        </button>
                        <button className="menu-card" type="button" onClick={() => openAdminModule("empleado")}>
                            <span className="menu-icon">EMP</span>
                            <h3>Empleados</h3>
                            <p>Listado del personal de la libreria.</p>
                        </button>
                        <button className="menu-card" type="button" onClick={() => openAdminModule("cliente")}>
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
                                    <button
                                        type="button"
                                        className="book-cover-button"
                                        onClick={() => {
                                            setSelectedBook(book);
                                            openScreen("book-detail");
                                        }}
                                        aria-label={`Ver detalles de ${book.titulo}`}
                                    >
                                        <BookCover book={book} className="catalog-cover" />
                                    </button>
                                    <h3>{book.titulo}</h3>
                                    <p>Editorial: {book.editorial}</p>
                                    <p>Stock: {book.stock}</p>
                                    <strong>{formatPrice(book.precio)}</strong>
                                    <div className="card-actions">
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
                    <div className="book-detail-header">
                        <div>
                            <h1>Simulación de {selectedBook.titulo}</h1>
                        </div>
                        <button type="button" className="book-detail-back" onClick={() => openScreen("home")}>Volver</button>
                    </div>

                    <div className="book-detail-card">
                        <div className="book-detail-cover-wrap">
                            <BookCover book={selectedBook} className="detail-cover" />
                        </div>

                        <div className="book-detail-summary">
                            <h2>{selectedBook.titulo}</h2>
                            <p className="book-detail-meta">{selectedBook.categoria} • {selectedBook.editorial}</p>
                            <strong>{formatPrice(selectedBook.precio)}</strong>
                            <p>Stock disponible: {selectedBook.stock}</p>
                            <p className="book-detail-description">
                                {getBookDescription(selectedBook)}
                            </p>
                        </div>

                        <div className="book-detail-actions">
                            <button type="button" onClick={() => addToCart(selectedBook)}>Agregar al carrito</button>
                            <button type="button" className="secondary-button" onClick={() => downloadBook(selectedBook)}>
                                Descargar
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
                            <small>Correo</small>
                            <strong>{session?.email}</strong>
                        </article>
                        <article className="stat-box">
                            <small>Ciudad</small>
                            <strong>{session?.city}</strong>
                        </article>
                        <article className="stat-box">
                            <small>Hora de ingreso</small>
                            <strong className="login-time"><span>{loginTime.date}</span><span>{loginTime.time}</span></strong>
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

        const orderNumber = getOrderNumber();
        const purchasedBooks = pendingDownload
            ? [pendingDownload]
            : cartDetails.map(({ book }) => book).filter(Boolean);
        const purchaseItems = purchasedBooks.map((book) => ({
            id: book.id,
            title: book.titulo,
            qty: cartDetails.find((item) => item.book.id === book.id)?.qty || 1,
            price: book.precio,
        }));
        const purchaseTotal = purchasedBooks.reduce((sum, book) => sum + book.precio * (cartDetails.find((item) => item.book.id === book.id)?.qty || 1), 0);

        setLastPurchase({
            orderNumber,
            items: purchaseItems,
            total: purchaseTotal,
            method: title,
            detail: paymentDetail,
            email: session?.email || "",
            date: new Date().toLocaleDateString("es-CO"),
        });

        if (purchasedBooks.length) {
            setDownloadAccess((current) => {
                const next = [...current];
                purchasedBooks.forEach((book) => {
                    const pin = getRandomPin();
                    const accessEntry = {
                        bookId: book.id,
                        email: pendingDownloadEmail || session?.email || "",
                        pin,
                    };
                    const index = next.findIndex((item) => item.bookId === book.id);
                    if (index >= 0) {
                        next[index] = accessEntry;
                    } else {
                        next.push(accessEntry);
                    }
                });
                return next;
            });
            setVerificationBook(purchasedBooks[0]);
        }

        if (!pendingDownload) {
            setCartItems([]);
        }
        const purchasedBook = purchasedBooks[0] || null;
        setSelectedBook(purchasedBook);
        setPendingDownload(null);
        setPendingDownloadEmail("");
        setSelectedBank("");
        setPaymentCompleted(true);
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
                                        const newPin = getRandomPin();
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
                            <h3>Correo</h3>
                            <p>contacto@libreria.com</p>
                        </article>
                        {whatsappNumbers.map((item) => (
                            <a
                                key={item.id}
                                className="menu-card"
                                href={`https://wa.me/${item.number}`}
                                target="_blank"
                                rel="noreferrer"
                                style={{ textDecoration: "none" }}
                            >
                                <h3>WhatsApp · {item.label}</h3>
                                <p>{item.number}</p>
                            </a>
                        ))}
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
                        <div className="chat-select-wrap">
                            <label htmlFor="whatsapp-contact">Enviar a:</label>
                            <select
                                id="whatsapp-contact"
                                value={selectedWhatsAppNumber}
                                onChange={(event) => setSelectedWhatsAppNumber(event.target.value)}
                            >
                                {whatsappNumbers.map((item) => (
                                    <option key={item.id} value={item.number}>
                                        {item.label} - {item.number}
                                    </option>
                                ))}
                            </select>
                        </div>
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
        "logout-success": renderLogoutSuccessScreen(),
        user: renderUserHome(),
        services: renderServicesScreen(),
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

    const hideChrome = screen === "login" || screen === "logout-success";

    return (
        <>
            {!hideChrome && (
                <Header
                    subtitle={screen === "login" ? "Portal de acceso" : "Sistema de venta de libros digitales"}
                    showBrand={screen !== "login"}
                />
            )}
            {!hideChrome && (
                <Nav
                    menuAbierto={menuAbierto}
                    setMenuAbierto={setMenuAbierto}
                    isLoggedIn={isAuthenticated}
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
                    onLogout={logout}
                />
            )}
            {screens[screen] || screens.login}
            {!hideChrome && <Footer />}
        </>
    );
}

export default Inicio;
