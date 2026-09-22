import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const labels = { autor: 'Autores', categoria: 'Categorías', cliente: 'Clientes', detalle_venta: 'Detalle de ventas', editorial: 'Editoriales', empleado: 'Empleados', libro: 'Libros', libro_autor: 'Libros y autores', metodo_pago: 'Métodos de pago', pago: 'Pagos', rol: 'Roles', rol_usuario: 'Roles de usuario', usuario: 'Usuarios', venta: 'Ventas' };
const primaryKeys = { autor: ['id_autor'], categoria: ['id_categoria'], cliente: ['id_cliente'], detalle_venta: ['id_detalle'], editorial: ['id_editorial'], empleado: ['id_empleado'], libro: ['id_libro'], libro_autor: ['id_libro', 'id_autor'], metodo_pago: ['id_metodo_pago'], pago: ['id_pago'], rol: ['id_rol'], rol_usuario: ['id_rol', 'id_usuario'], usuario: ['id_usuario'], venta: ['id_venta'] };
const fields = {
  autor: ['id_autor', 'nombre'], categoria: ['id_categoria', 'nombre', 'descripcion'], cliente: ['id_cliente', 'nombre', 'telefono', 'direccion'], editorial: ['id_editorial', 'nombre', 'pais'],
  libro: ['id_libro', 'titulo', 'precio', 'stock', 'id_categoria', 'id_editorial'], libro_autor: ['id_libro', 'id_autor'], usuario: ['id_usuario', 'username', 'password', 'correo'],
  empleado: ['id_empleado', 'nombre', 'apellido', 'telefono', 'cargo', 'id_usuario'], rol: ['id_rol', 'nombre', 'descripcion'], rol_usuario: ['id_rol', 'id_usuario'], metodo_pago: ['id_metodo_pago', 'nombre'],
  venta: ['id_venta', 'id_cliente', 'id_empleado', 'fecha', 'total'], detalle_venta: ['id_detalle', 'id_venta', 'id_libro', 'cantidad', 'precio_unitario'], pago: ['id_pago', 'id_venta', 'id_metodo_pago', 'monto', 'fecha_pago']
};
const relations = { empleado: { id_usuario: 'usuario' }, libro: { id_categoria: 'categoria', id_editorial: 'editorial' }, libro_autor: { id_libro: 'libro', id_autor: 'autor' }, rol_usuario: { id_rol: 'rol', id_usuario: 'usuario' }, venta: { id_cliente: 'cliente', id_empleado: 'empleado' }, detalle_venta: { id_venta: 'venta', id_libro: 'libro' }, pago: { id_venta: 'venta', id_metodo_pago: 'metodo_pago' } };
const fieldLabels = { id_autor: 'Autor', id_categoria: 'Categoría', id_cliente: 'Cliente', id_detalle: 'Detalle', id_editorial: 'Editorial', id_empleado: 'Empleado', id_libro: 'Libro', id_metodo_pago: 'Método de pago', id_pago: 'Pago', id_rol: 'Rol', id_usuario: 'Usuario', id_venta: 'Venta', cantidad: 'Cantidad', precio: 'Precio', precio_unitario: 'Precio unitario', monto: 'Monto', total: 'Total', nombre: 'Nombre', titulo: 'Título', username: 'Usuario', password: 'Contraseña', correo: 'Correo', direccion: 'Ciudad', telefono: 'Teléfono', fecha: 'Fecha y hora', fecha_pago: 'Fecha y hora de pago', stock: 'Existencias', descripcion: 'Descripción', pais: 'País', apellido: 'Apellido', cargo: 'Cargo' };
const numericFields = new Set(['cantidad', 'precio', 'precio_unitario', 'monto', 'total', 'stock']);
const nameFields = new Set(['nombre', 'apellido', 'cargo', 'pais']);
const titlePattern = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;
const usernamePattern = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+$/;
const dateTimeFields = new Set(['fecha', 'fecha_pago']);
const moneyFields = new Set(['precio', 'precio_unitario', 'monto', 'total']);
const namePattern = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'-]+$/;
const phonePattern = /^\d{7,10}$/;
const cityPattern = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'-]+$/;
const numberPattern = /^\d+$/;
const cityOptions = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Bucaramanga', 'Pereira', 'Manizales', 'Cartagena', 'Ibagué', 'Tunja'];
const paymentMethodOptions = ['Tarjeta', 'Transferencia', 'PSE', 'Efectivo', 'Billetera digital', 'Nequi', 'Daviplata', 'PayPal', 'Consignación bancaria', 'Crédito de tienda'];
const countryOptions = ['Colombia', 'Argentina', 'Brasil', 'Chile', 'Ecuador', 'España', 'Estados Unidos', 'México', 'Perú', 'Francia', 'Reino Unido'];
const apiUrl = 'http://localhost:5000/api';
const noRelations = {};

const formatMoney = (value) => {
  if (value === null || value === undefined || value === '') return '';
  const number = Number(value);
  if (Number.isNaN(number)) return String(value);
  return `$${number.toLocaleString('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

const formatMoneyInput = (value) => {
  if (value === null || value === undefined || value === '') return '';
  const digits = String(value).replace(/[^\d]/g, '');
  if (!digits) return '';
  const number = Number(digits);
  if (Number.isNaN(number)) return '';
  return `$${number.toLocaleString('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

const parseMoneyInput = (value) => {
  if (value === null || value === undefined || value === '') return '';
  const digits = String(value).replace(/[^\d]/g, '');
  if (!digits) return '';
  const number = Number(digits);
  return Number.isNaN(number) ? '' : number;
};

const formatDateTime = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat('es-CO', { dateStyle: 'short', timeStyle: 'medium' }).format(date);
};

const toDateTimeInput = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 16);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
};
const initialData = {
  autor: [{ id_autor: 1, nombre: 'Gabriel García Márquez' }, { id_autor: 2, nombre: 'Antoine de Saint-Exupéry' }, { id_autor: 3, nombre: 'Isabel Allende' }, { id_autor: 4, nombre: 'Jorge Luis Borges' }, { id_autor: 5, nombre: 'Yuval Noah Harari' }],
  categoria: [{ id_categoria: 1, nombre: 'Novelas' }, { id_categoria: 2, nombre: 'Tecnología' }, { id_categoria: 3, nombre: 'Historia' }, { id_categoria: 4, nombre: 'Ciencia ficción' }, { id_categoria: 5, nombre: 'Desarrollo personal' }],
  cliente: [{ id_cliente: 1, nombre: 'María López', telefono: '300 000 0000', direccion: 'Bogotá' }, { id_cliente: 2, nombre: 'Carlos Ramírez', telefono: '301 234 5678', direccion: 'Medellín' }, { id_cliente: 3, nombre: 'Laura Gómez', telefono: '302 456 7890', direccion: 'Cali' }, { id_cliente: 4, nombre: 'Andrés Torres', telefono: '310 123 4567', direccion: 'Barranquilla' }, { id_cliente: 5, nombre: 'Sofía Martínez', telefono: '315 987 6543', direccion: 'Bucaramanga' }],
  editorial: [{ id_editorial: 1, nombre: 'Planeta' }, { id_editorial: 2, nombre: 'Pearson' }, { id_editorial: 3, nombre: 'Penguin Random House' }, { id_editorial: 4, nombre: 'Anagrama' }, { id_editorial: 5, nombre: 'Paidós' }],
  libro: [{ id_libro: 1, titulo: 'Cien años de soledad', id_categoria: 1, id_editorial: 1, precio: 49900, stock: 8 }, { id_libro: 2, titulo: 'JavaScript moderno', id_categoria: 2, id_editorial: 2, precio: 65000, stock: 5 }, { id_libro: 3, titulo: 'La casa de los espíritus', id_categoria: 1, id_editorial: 3, precio: 52900, stock: 12 }, { id_libro: 4, titulo: 'Ficciones', id_categoria: 4, id_editorial: 4, precio: 43500, stock: 7 }, { id_libro: 5, titulo: 'Sapiens', id_categoria: 3, id_editorial: 5, precio: 58900, stock: 10 }],
  libro_autor: [{ id_libro: 1, id_autor: 1 }, { id_libro: 2, id_autor: 2 }, { id_libro: 3, id_autor: 3 }, { id_libro: 4, id_autor: 4 }, { id_libro: 5, id_autor: 5 }],
  usuario: [{ id_usuario: 1, username: 'admin', password: '123', correo: 'admin@libreria.com' }, { id_usuario: 2, username: 'jlopez', password: '123', correo: 'juan.lopez@libreria.com' }, { id_usuario: 3, username: 'mcastro', password: '123', correo: 'maria.castro@libreria.com' }, { id_usuario: 4, username: 'carlosr', password: '123', correo: 'carlos.ramirez@email.com' }, { id_usuario: 5, username: 'laurag', password: '123', correo: 'laura.gomez@email.com' }],
  empleado: [{ id_empleado: 1, nombre: 'Administrador', telefono: '300 111 2233', id_usuario: 1 }, { id_empleado: 2, nombre: 'Juan López', telefono: '301 555 2200', id_usuario: 2 }, { id_empleado: 3, nombre: 'María Castro', telefono: '302 555 8800', id_usuario: 3 }, { id_empleado: 4, nombre: 'Diana Rojas', telefono: '310 555 1122', id_usuario: 2 }, { id_empleado: 5, nombre: 'Felipe Mora', telefono: '315 555 7744', id_usuario: 3 }],
  rol: [{ id_rol: 1, nombre: 'Administrador' }, { id_rol: 2, nombre: 'Cliente' }, { id_rol: 3, nombre: 'Empleado' }, { id_rol: 4, nombre: 'Supervisor' }, { id_rol: 5, nombre: 'Editor' }],
  rol_usuario: [{ id_rol: 1, id_usuario: 1 }, { id_rol: 3, id_usuario: 2 }, { id_rol: 3, id_usuario: 3 }, { id_rol: 2, id_usuario: 4 }, { id_rol: 2, id_usuario: 5 }],
  metodo_pago: [{ id_metodo_pago: 1, nombre: 'Tarjeta' }, { id_metodo_pago: 2, nombre: 'Transferencia' }, { id_metodo_pago: 3, nombre: 'PSE' }, { id_metodo_pago: 4, nombre: 'Efectivo' }, { id_metodo_pago: 5, nombre: 'Billetera digital' }],
  venta: [{ id_venta: 1, id_cliente: 1, id_empleado: 1, fecha: '2026-09-14', total: 49900 }, { id_venta: 2, id_cliente: 2, id_empleado: 2, fecha: '2026-09-13', total: 65000 }, { id_venta: 3, id_cliente: 3, id_empleado: 3, fecha: '2026-09-12', total: 52900 }, { id_venta: 4, id_cliente: 4, id_empleado: 2, fecha: '2026-09-11', total: 87000 }, { id_venta: 5, id_cliente: 5, id_empleado: 3, fecha: '2026-09-10', total: 58900 }],
  detalle_venta: [{ id_detalle: 1, id_venta: 1, id_libro: 1, cantidad: 1, precio: 49900 }, { id_detalle: 2, id_venta: 2, id_libro: 2, cantidad: 1, precio: 65000 }, { id_detalle: 3, id_venta: 3, id_libro: 3, cantidad: 1, precio: 52900 }, { id_detalle: 4, id_venta: 4, id_libro: 4, cantidad: 2, precio: 43500 }, { id_detalle: 5, id_venta: 5, id_libro: 5, cantidad: 1, precio: 58900 }],
  pago: [{ id_pago: 1, id_venta: 1, id_metodo_pago: 1, fecha: '2026-09-14', total: 49900 }, { id_pago: 2, id_venta: 2, id_metodo_pago: 2, fecha: '2026-09-13', total: 65000 }, { id_pago: 3, id_venta: 3, id_metodo_pago: 3, fecha: '2026-09-12', total: 52900 }, { id_pago: 4, id_venta: 4, id_metodo_pago: 1, fecha: '2026-09-11', total: 87000 }, { id_pago: 5, id_venta: 5, id_metodo_pago: 5, fecha: '2026-09-10', total: 58900 }]
};

const additionalData = {
  autor: [{ id_autor: 6, nombre: 'Mary Shelley' }, { id_autor: 7, nombre: 'Julio Cortázar' }, { id_autor: 8, nombre: 'Ada Lovelace' }, { id_autor: 9, nombre: 'Stephen King' }, { id_autor: 10, nombre: 'Chimamanda Ngozi Adichie' }],
  categoria: [{ id_categoria: 6, nombre: 'Poesía' }, { id_categoria: 7, nombre: 'Negocios' }, { id_categoria: 8, nombre: 'Educación' }, { id_categoria: 9, nombre: 'Biografías' }, { id_categoria: 10, nombre: 'Fantasía' }],
  cliente: [{ id_cliente: 6, nombre: 'Diego Herrera', telefono: '300 765 4321', direccion: 'Pereira' }, { id_cliente: 7, nombre: 'Valentina Cruz', telefono: '301 987 1234', direccion: 'Manizales' }, { id_cliente: 8, nombre: 'Mateo Silva', telefono: '302 321 4567', direccion: 'Cartagena' }, { id_cliente: 9, nombre: 'Camila Díaz', telefono: '310 678 9012', direccion: 'Ibagué' }, { id_cliente: 10, nombre: 'Nicolás Vega', telefono: '315 246 8101', direccion: 'Tunja' }],
  editorial: [{ id_editorial: 6, nombre: 'Alfaguara' }, { id_editorial: 7, nombre: 'Tusquets' }, { id_editorial: 8, nombre: 'O Reilly Media' }, { id_editorial: 9, nombre: 'Salamandra' }, { id_editorial: 10, nombre: 'Seix Barral' }],
  libro: [{ id_libro: 6, titulo: 'Frankenstein', id_categoria: 4, id_editorial: 6, precio: 46500, stock: 9 }, { id_libro: 7, titulo: 'Rayuela', id_categoria: 1, id_editorial: 7, precio: 47500, stock: 6 }, { id_libro: 8, titulo: 'Fundamentos de programación', id_categoria: 2, id_editorial: 8, precio: 72000, stock: 15 }, { id_libro: 9, titulo: 'El resplandor', id_categoria: 4, id_editorial: 9, precio: 54000, stock: 4 }, { id_libro: 10, titulo: 'Americanah', id_categoria: 1, id_editorial: 10, precio: 51000, stock: 11 }],
  libro_autor: [{ id_libro: 6, id_autor: 6 }, { id_libro: 7, id_autor: 7 }, { id_libro: 8, id_autor: 8 }, { id_libro: 9, id_autor: 9 }, { id_libro: 10, id_autor: 10 }],
  usuario: [{ id_usuario: 6, username: 'diegoh', password: '123', correo: 'diego.herrera@email.com' }, { id_usuario: 7, username: 'valec', password: '123', correo: 'valentina.cruz@email.com' }, { id_usuario: 8, username: 'mateos', password: '123', correo: 'mateo.silva@email.com' }, { id_usuario: 9, username: 'camilad', password: '123', correo: 'camila.diaz@email.com' }, { id_usuario: 10, username: 'nicolasv', password: '123', correo: 'nicolas.vega@email.com' }],
  empleado: [{ id_empleado: 6, nombre: 'Paula León', telefono: '316 555 2211', id_usuario: 2 }, { id_empleado: 7, nombre: 'Ricardo Gil', telefono: '317 555 2211', id_usuario: 3 }, { id_empleado: 8, nombre: 'Natalia Ruiz', telefono: '318 555 2211', id_usuario: 2 }, { id_empleado: 9, nombre: 'Sergio Pardo', telefono: '319 555 2211', id_usuario: 3 }, { id_empleado: 10, nombre: 'Elena Vivas', telefono: '320 555 2211', id_usuario: 1 }],
  rol: [{ id_rol: 6, nombre: 'Lector' }, { id_rol: 7, nombre: 'Vendedor' }, { id_rol: 8, nombre: 'Gestor de inventario' }, { id_rol: 9, nombre: 'Contador' }, { id_rol: 10, nombre: 'Soporte' }],
  rol_usuario: [{ id_rol: 2, id_usuario: 6 }, { id_rol: 2, id_usuario: 7 }, { id_rol: 2, id_usuario: 8 }, { id_rol: 2, id_usuario: 9 }, { id_rol: 2, id_usuario: 10 }],
  metodo_pago: [{ id_metodo_pago: 6, nombre: 'Nequi' }, { id_metodo_pago: 7, nombre: 'Daviplata' }, { id_metodo_pago: 8, nombre: 'PayPal' }, { id_metodo_pago: 9, nombre: 'Consignación bancaria' }, { id_metodo_pago: 10, nombre: 'Crédito de tienda' }],
  venta: [{ id_venta: 6, id_cliente: 6, id_empleado: 4, fecha: '2026-09-09', total: 46500 }, { id_venta: 7, id_cliente: 7, id_empleado: 5, fecha: '2026-09-08', total: 47500 }, { id_venta: 8, id_cliente: 8, id_empleado: 6, fecha: '2026-09-07', total: 72000 }, { id_venta: 9, id_cliente: 9, id_empleado: 7, fecha: '2026-09-06', total: 54000 }, { id_venta: 10, id_cliente: 10, id_empleado: 8, fecha: '2026-09-05', total: 51000 }],
  detalle_venta: [{ id_detalle: 6, id_venta: 6, id_libro: 6, cantidad: 1, precio: 46500 }, { id_detalle: 7, id_venta: 7, id_libro: 7, cantidad: 1, precio: 47500 }, { id_detalle: 8, id_venta: 8, id_libro: 8, cantidad: 1, precio: 72000 }, { id_detalle: 9, id_venta: 9, id_libro: 9, cantidad: 1, precio: 54000 }, { id_detalle: 10, id_venta: 10, id_libro: 10, cantidad: 1, precio: 51000 }],
  pago: [{ id_pago: 6, id_venta: 6, id_metodo_pago: 6, fecha: '2026-09-09', total: 46500 }, { id_pago: 7, id_venta: 7, id_metodo_pago: 7, fecha: '2026-09-08', total: 47500 }, { id_pago: 8, id_venta: 8, id_metodo_pago: 8, fecha: '2026-09-07', total: 72000 }, { id_pago: 9, id_venta: 9, id_metodo_pago: 9, fecha: '2026-09-06', total: 54000 }, { id_pago: 10, id_venta: 10, id_metodo_pago: 10, fecha: '2026-09-05', total: 51000 }]
};

Object.entries(additionalData).forEach(([module, rows]) => initialData[module].push(...rows));

const storageKey = (module) => `venta-libros-panel-${module}`;
const seedVersionKey = (module) => `venta-libros-panel-seed-version-${module}`;
const seedVersion = '4';
const copy = (value) => JSON.parse(JSON.stringify(value));
const getRows = (module) => {
  const saved = localStorage.getItem(storageKey(module));
  let rows;
  try {
    rows = saved ? JSON.parse(saved) : copy(initialData[module] || []);
  } catch {
    rows = copy(initialData[module] || []);
  }

  // No reutilizar una caché dañada: evita tablas con botones pero sin datos.
  const keys = primaryKeys[module] || [];
  const hasValidShape = Array.isArray(rows) && rows.every((row) => (
    row && typeof row === 'object' && keys.every((key) => row[key] !== undefined && row[key] !== null && row[key] !== '')
  ));
  if (!hasValidShape) {
    localStorage.removeItem(storageKey(module));
    localStorage.removeItem(seedVersionKey(module));
    return copy(initialData[module] || []);
  }

  if (!saved || localStorage.getItem(seedVersionKey(module)) === seedVersion) return rows;
  const identity = (row) => keys.map((key) => String(row[key])).join(':');
  const existing = new Set(rows.map(identity));
  const additions = (initialData[module] || []).filter((row) => !existing.has(identity(row)));
  const nextRows = additions.length ? [...rows, ...copy(additions)] : rows;
  localStorage.setItem(storageKey(module), JSON.stringify(nextRows));
  localStorage.setItem(seedVersionKey(module), seedVersion);
  return nextRows;
};
const putRows = (module, rows) => localStorage.setItem(storageKey(module), JSON.stringify(rows));
const fieldLabel = (field) => fieldLabels[field] || field.replaceAll('_', ' ');
const optionText = (row) => row.nombre || row.titulo || row.username || String(Object.values(row)[0] ?? '');

function Modulo() {
  const { modulo } = useParams();
  const moduleFields = fields[modulo] || [];
  const keys = primaryKeys[modulo] || [];
  const relationMap = relations[modulo] || noRelations;
  const [data, setData] = useState(() => getRows(modulo));
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [message, setMessage] = useState('');
  const [referenceRows, setReferenceRows] = useState({});
  useEffect(() => {
    let active = true;
    setData(getRows(modulo));
    setEditing(null);
    setForm({});
    setMessage('');

    fetch(`${apiUrl}/${modulo}?limit=100`)
      .then((response) => {
        if (!response.ok) throw new Error('No se pudo consultar la base de datos');
        return response.json();
      })
      .then((payload) => {
        if (!Array.isArray(payload[modulo])) throw new Error('La respuesta de la base de datos no contiene registros válidos');
        const rows = payload[modulo];
        if (!active) return;
        setData(rows);
        putRows(modulo, rows);
      })
      .catch(() => {
        if (active) setMessage('Mostrando datos locales: no fue posible conectar con la base de datos.');
      });

    return () => { active = false; };
  }, [modulo]);
  useEffect(() => {
    let active = true;
    const tables = [...new Set(Object.values(relationMap))];
    if (!tables.length) {
      setReferenceRows({});
      return () => { active = false; };
    }

    Promise.all(tables.map(async (table) => {
      const response = await fetch(`${apiUrl}/${table}?limit=100`);
      if (!response.ok) throw new Error(`No se pudo consultar ${table}`);
      const payload = await response.json();
      return [table, Array.isArray(payload[table]) ? payload[table] : []];
    }))
      .then((entries) => {
        if (active) setReferenceRows(Object.fromEntries(entries));
      })
      .catch(() => {
        if (active) setReferenceRows({});
      });

    return () => { active = false; };
  }, [modulo, relationMap]);
  const references = useMemo(() => Object.fromEntries(Object.entries(relationMap).map(([field, table]) => [field, referenceRows[table] || getRows(table)])), [relationMap, referenceRows]);
  const displayFields = moduleFields.filter((field) => field !== 'password');
  const rowId = (row) => keys.map((key) => String(row[key])).join(':');
  const recordUrl = (row) => `${apiUrl}/${modulo}/${keys.map((key) => encodeURIComponent(row[key])).join('/')}`;
  const saveRows = (next) => { setData(next); putRows(modulo, next); };
  const displayValue = (field, row) => {
    if (moneyFields.has(field)) return formatMoney(row[field]);
    if (dateTimeFields.has(field)) return formatDateTime(row[field]);
    const related = (references[field] || []).find((item) => String(Object.values(item)[0]) === String(row[field]));
    return related ? optionText(related) : String(row[field] ?? '');
  };
  const openForm = (row) => { const formFields = row ? moduleFields.filter((field) => !keys.includes(field)) : moduleFields.filter((field) => keys.length > 1 || !keys.includes(field)); setEditing(row || 'new'); setForm(Object.fromEntries(formFields.map((field) => [field, row?.[field] ?? '']))); setMessage(''); };
  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const save = async (event) => {
    event.preventDefault();
    const record = { ...form };
    const emptyField = formFields.find((field) => String(record[field] ?? '').trim() === '');
    if (emptyField) {
      setMessage(`El campo ${fieldLabel(emptyField)} es obligatorio.`);
      return;
    }
    const invalidName = formFields.find((field) => nameFields.has(field) && !namePattern.test(String(record[field]).trim()));
    if (invalidName) {
      setMessage(`${fieldLabel(invalidName)} solo puede contener letras, espacios, apóstrofes o guiones.`);
      return;
    }
    if (formFields.includes('titulo') && !titlePattern.test(String(record.titulo).trim())) {
      setMessage('El título solo puede contener letras y espacios, sin números ni símbolos.');
      return;
    }
    if (formFields.includes('descripcion') && !titlePattern.test(String(record.descripcion).trim())) {
      setMessage('La descripción solo puede contener letras y espacios, sin números ni símbolos.');
      return;
    }
    if (formFields.includes('username') && !usernamePattern.test(String(record.username).trim())) {
      setMessage('El usuario solo puede contener letras, sin números ni símbolos.');
      return;
    }
    if (formFields.includes('password') && String(record.password).length < 6) {
      setMessage('La contraseña es obligatoria y debe tener mínimo 6 caracteres.');
      return;
    }
    if (formFields.includes('telefono') && !phonePattern.test(String(record.telefono).trim())) {
      setMessage('El teléfono debe contener únicamente entre 7 y 10 números.');
      return;
    }
    if (formFields.includes('direccion') && !cityPattern.test(String(record.direccion).trim())) {
      setMessage('La ciudad solo puede contener letras, espacios, apóstrofes o guiones.');
      return;
    }
    const invalidNumber = formFields.find((field) => numericFields.has(field) && !moneyFields.has(field) && !numberPattern.test(String(record[field]).trim()));
    if (invalidNumber) {
      setMessage(`${fieldLabel(invalidNumber)} debe contener únicamente números.`);
      return;
    }
    Object.keys(record).forEach((field) => {
      if (record[field] === undefined || record[field] === '') return;
      if (moneyFields.has(field)) {
        const parsed = parseMoneyInput(record[field]);
        record[field] = parsed === '' ? '' : Number(parsed);
        return;
      }
      if (numericFields.has(field)) {
        record[field] = Number(record[field]);
      }
    });
    const token = sessionStorage.getItem('admin-token');
    try {
      const isNew = editing === 'new';
      const targetUrl = isNew ? `${apiUrl}/${modulo}` : recordUrl(editing);
      const response = await fetch(targetUrl, {
        method: isNew ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: 'include',
        body: JSON.stringify(record),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'No fue posible guardar el registro en la base de datos.');
      const refreshed = await fetch(`${apiUrl}/${modulo}?limit=100`);
      const payload = await refreshed.json();
      const rows = Array.isArray(payload[modulo]) ? payload[modulo] : [];
      saveRows(rows);
      setMessage(isNew ? 'Registro creado y sincronizado con la tienda.' : 'Registro actualizado y sincronizado con la tienda.');
      setEditing(null);
    } catch (saveError) {
      const fallback = editing === 'new'
        ? (() => {
          const nextRecord = { ...record };
          if (keys.length === 1) { const key = keys[0]; nextRecord[key] = Math.max(0, ...data.map((row) => Number(row[key]) || 0)) + 1; }
          return [...data, nextRecord];
        })()
        : data.map((row) => rowId(row) === rowId(editing) ? { ...row, ...record } : row);
      saveRows(fallback);
      setMessage(`Guardado localmente: ${saveError.message}`);
      setEditing(null);
    }
  };
  const remove = async (row) => {
    if (!window.confirm('¿Deseas eliminar este registro de la base de datos?')) return;
    setMessage('');
    try {
      const token = sessionStorage.getItem('admin-token');
      if (!token) throw new Error('Tu sesión administrativa expiró. Inicia sesión nuevamente para eliminar registros.');
      const response = await fetch(recordUrl(row), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || result.message || 'No fue posible eliminar el registro.');
      saveRows(data.filter((item) => rowId(item) !== rowId(row)));
      setMessage('Registro eliminado de la base de datos.');
    } catch (deleteError) {
      setMessage(deleteError.message || 'No fue posible eliminar el registro de la base de datos.');
    }
  };
  const formFields = editing ? (editing === 'new' ? moduleFields.filter((field) => keys.length > 1 || !keys.includes(field)) : moduleFields.filter((field) => !keys.includes(field))) : [];
  return (
    <section className="data-panel">
      <Link className="back-link" to="/">← Volver al inicio</Link>
      <h1>{labels[modulo] || 'Módulo'}</h1>
      <p>{data.length} registros guardados localmente</p>
      <button type="button" onClick={() => openForm(null)}>Nuevo registro</button>
      {message && <p className="panel-message">{message}</p>}
      {editing && (
        <form className="record-form" onSubmit={save}>
          <h2>{editing === 'new' ? 'Crear registro' : 'Editar registro'}</h2>
          {formFields.map((field) => (
            <label key={field}>
              {fieldLabel(field)}
              {relationMap[field] ? (
                <select required value={form[field] ?? ''} onChange={(event) => updateField(field, event.target.value)}>
                  <option value="">Selecciona una opción</option>
                  {(references[field] || []).map((row) => <option key={String(Object.values(row)[0])} value={Object.values(row)[0]}>{optionText(row)}</option>)}
                </select>
              ) : modulo === 'cliente' && field === 'direccion' ? (
                <select required value={form[field] ?? ''} onChange={(event) => updateField(field, event.target.value)}>
                  <option value="">Selecciona una ciudad</option>
                  {cityOptions.map((city) => <option key={city} value={city}>{city}</option>)}
                </select>
              ) : modulo === 'metodo_pago' && field === 'nombre' ? (
                <select required value={form[field] ?? ''} onChange={(event) => updateField(field, event.target.value)}>
                  <option value="">Selecciona un método de pago</option>
                  {paymentMethodOptions.map((method) => <option key={method} value={method}>{method}</option>)}
                </select>
              ) : modulo === 'editorial' && field === 'pais' ? (
                <select required value={form[field] ?? ''} onChange={(event) => updateField(field, event.target.value)}>
                  <option value="">Selecciona un país</option>
                  {countryOptions.map((country) => <option key={country} value={country}>{country}</option>)}
                </select>
              ) : (
                <input
                  required
                  type={field === 'password' ? 'password' : field === 'telefono' ? 'tel' : dateTimeFields.has(field) ? 'datetime-local' : moneyFields.has(field) ? 'text' : numericFields.has(field) ? 'number' : 'text'}
                  inputMode={field === 'telefono' || numericFields.has(field) ? 'numeric' : undefined}
                  pattern={field === 'username' ? usernamePattern.source : field === 'titulo' || field === 'descripcion' ? titlePattern.source : field === 'direccion' ? cityPattern.source : nameFields.has(field) ? namePattern.source : field === 'telefono' ? phonePattern.source : numericFields.has(field) && !moneyFields.has(field) ? numberPattern.source : undefined}
                  minLength={field === 'password' ? 6 : undefined}
                  autoComplete={field === 'correo' ? 'email' : field === 'telefono' ? 'tel' : undefined}
                  placeholder={field === 'direccion' ? 'Ej.: Bogotá' : field === 'password' ? 'Mínimo 6 caracteres' : undefined}
                  value={dateTimeFields.has(field) ? toDateTimeInput(form[field]) : moneyFields.has(field) ? formatMoneyInput(form[field]) : field === 'telefono' ? String(form[field] ?? '').replace(/\D/g, '') : form[field] ?? ''}
                  onChange={(event) => {
                    const rawValue = event.target.value;
                    const nextValue = moneyFields.has(field)
                        ? formatMoneyInput(rawValue)
                      : field === 'telefono'
                        ? rawValue.replace(/\D/g, '').slice(0, 10)
                      : field === 'titulo'
                        ? rawValue.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]/g, '')
                      : field === 'descripcion'
                        ? rawValue.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]/g, '')
                      : field === 'username'
                        ? rawValue.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/g, '')
                      : numericFields.has(field)
                        ? rawValue.replace(/\D/g, '')
                      : nameFields.has(field) || field === 'direccion'
                        ? rawValue.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'-]/g, '')
                        : rawValue;
                    updateField(field, nextValue);
                  }}
                />
              )}
            </label>
          ))}
          <div className="form-actions">
            <button type="submit">Guardar</button>
            <button type="button" className="secondary-button" onClick={() => setEditing(null)}>Cancelar</button>
          </div>
        </form>
      )}
      <div className="table-wrap">
        <table>
          <thead><tr>{displayFields.map((field) => <th key={field}>{fieldLabel(field)}</th>)}<th>Acciones</th></tr></thead>
          <tbody>{data.map((row) => <tr key={rowId(row)}>{displayFields.map((field) => <td key={field}>{displayValue(field, row)}</td>)}<td className="row-actions"><button type="button" onClick={() => openForm(row)}>Editar</button><button type="button" className="danger-button" onClick={() => remove(row)}>Eliminar</button></td></tr>)}</tbody>
        </table>
      </div>
      {!data.length && <p>No hay registros para mostrar.</p>}
    </section>
  );
}

export default Modulo;
