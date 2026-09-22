import { useMemo, useState } from 'react';

const defaultClients = [{ id_cliente: 1, nombre: 'María López', telefono: '300 000 0000', direccion: 'Bogotá' }];
const loadClients = () => JSON.parse(localStorage.getItem('venta-libros-panel-cliente') || JSON.stringify(defaultClients));

function Clientes() {
  const [clientes] = useState(loadClients);
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => clientes.filter((cliente) => Object.values(cliente).join(' ').toLowerCase().includes(search.toLowerCase())), [clientes, search]);

  return <section className="data-panel"><h2>Gestión de clientes</h2><label>Buscar<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Nombre, teléfono o ciudad" /></label><table><thead><tr><th>ID</th><th>Nombre</th><th>Teléfono</th><th>Ciudad</th></tr></thead><tbody>{filtered.map((cliente) => <tr key={cliente.id_cliente}><td>{cliente.id_cliente}</td><td>{cliente.nombre}</td><td>{cliente.telefono}</td><td>{cliente.direccion}</td></tr>)}{!filtered.length && <tr><td colSpan="4">No se encontraron clientes.</td></tr>}</tbody></table><p>Total: {filtered.length}</p></section>;
}

export default Clientes;
