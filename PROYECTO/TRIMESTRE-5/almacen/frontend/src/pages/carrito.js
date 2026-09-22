import { Link } from 'react-router-dom';
const money = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

function Carrito({ items, setItems }) {
  const total = items.reduce((sum, item) => sum + Number(item.precio) * item.quantity, 0);
  const changeQuantity = (id, change) => setItems((current) => current.flatMap((item) => item.id_libro !== id ? [item] : item.quantity + change > 0 ? [{ ...item, quantity: item.quantity + change }] : []));
  return <section className="cart-page"><h1>Tu carrito</h1>{!items.length ? <div className="empty"><p>Aun no has agregado libros.</p><Link to="/">Ver catalogo</Link></div> : <><div className="cart-list">{items.map((item) => <article className="cart-item" key={item.id_libro}><div><h2>{item.titulo}</h2><p>{money.format(item.precio)} por unidad</p></div><div className="quantity"><button onClick={() => changeQuantity(item.id_libro, -1)}>-</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id_libro, 1)}>+</button></div><strong>{money.format(Number(item.precio) * item.quantity)}</strong></article>)}</div><aside className="cart-total"><span>Total</span><strong>{money.format(total)}</strong><p>El pago se registra desde el modulo de ventas.</p></aside></>}</section>;
}

export default Carrito;
