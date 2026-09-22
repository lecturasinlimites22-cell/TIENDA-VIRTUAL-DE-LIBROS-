import { useMemo, useState } from 'react';

const defaultBooks = [{ id_libro: 1, titulo: 'Cien años de soledad', id_categoria: 1, precio: 49900, stock: 8 }, { id_libro: 2, titulo: 'JavaScript moderno', id_categoria: 2, precio: 65000, stock: 5 }];
const defaultCategories = [{ id_categoria: 1, nombre: 'Novelas' }, { id_categoria: 2, nombre: 'Tecnología' }];
const load = (key, fallback) => JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
const money = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

function Catalogo({ onAdd = () => {} }) {
  const [books] = useState(() => load('venta-libros-panel-libro', defaultBooks));
  const [categories] = useState(() => load('venta-libros-panel-categoria', defaultCategories));
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [selectedBookId, setSelectedBookId] = useState(null);
  const categoryName = Object.fromEntries(categories.map((item) => [item.id_categoria, item.nombre]));
  const filtered = useMemo(() => books.filter((book) => (!search || book.titulo.toLowerCase().includes(search.toLowerCase())) && (!category || String(book.id_categoria) === category)), [books, search, category]);

  return <section className="data-panel"><div className="hero"><p>LIBRERÍA DIGITAL</p><h1>Catálogo de libros</h1><span>Información guardada localmente en este navegador.</span></div><div className="catalog-tools"><input aria-label="Buscar libros" placeholder="Buscar por título" value={search} onChange={(event) => setSearch(event.target.value)} /><select aria-label="Filtrar por categoría" value={category} onChange={(event) => setCategory(event.target.value)}><option value="">Todas las categorías</option>{categories.map((item) => <option key={item.id_categoria} value={item.id_categoria}>{item.nombre}</option>)}</select></div><p className="catalog-count">{filtered.length} libros disponibles</p><div className="book-grid">{filtered.map((book) => <article className="book-card" key={book.id_libro} onClick={() => setSelectedBookId(book.id_libro)}><div className="book-cover"><span>LIBRO DIGITAL</span><strong>{book.titulo}</strong></div><p className="book-category">{categoryName[book.id_categoria] || 'Sin categoría'}</p><h2>{book.titulo}</h2><p className="book-price">{money.format(book.precio)}</p><p className={book.stock > 0 ? 'stock' : 'stock sold-out'}>{book.stock > 0 ? `${book.stock} disponibles` : 'Agotado'}</p>{selectedBookId === book.id_libro && <button type="button" disabled={!book.stock} onClick={(event) => { event.stopPropagation(); onAdd(book); }}>Agregar al carrito</button>}</article>)}</div></section>;
}

export default Catalogo;
