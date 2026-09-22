# fronend-y-backend-venta-de-libros

#  Venta de Libros Digital

Sistema web para la **gestión de una librería y sus procesos de venta**, desarrollado como proyecto de formación en **Análisis y Desarrollo de Software**.

El proyecto integra un **frontend desarrollado en React**, un **backend desarrollado con Node.js y Express** y una **base de datos MySQL**, permitiendo administrar información de clientes, libros, autores, categorías, editoriales, ventas, pagos y usuarios.

---

##  Descripción del proyecto

**Venta de Libros Digital** es una aplicación web diseñada para administrar de manera organizada la información relacionada con una librería.

El sistema fue estructurado utilizando una arquitectura de tres capas:

```text
┌──────────────────────────────┐
│          FRONTEND            │
│           React              │
│        Puerto 3000           │
└──────────────┬───────────────┘
               │ HTTP / JSON
               ▼
┌──────────────────────────────┐
│           BACKEND            │
│       Node.js + Express      │
│        Puerto 5000           │
└──────────────┬───────────────┘
               │ SQL
               ▼
┌──────────────────────────────┐
│        BASE DE DATOS         │
│          MySQL               │
│         libreria             │
└──────────────────────────────┘
```

---

##  Objetivo general

Desarrollar una aplicación web que permita administrar la información de una librería y gestionar los principales procesos relacionados con libros, clientes, ventas y pagos mediante una arquitectura frontend, backend y base de datos.

---

##  Objetivos específicos

* Diseñar una interfaz web utilizando React.
* Crear una API REST utilizando Node.js y Express.
* Implementar operaciones CRUD.
* Conectar el backend con MySQL.
* Organizar la información mediante tablas relacionadas.
* Validar las relaciones entre las diferentes entidades.
* Permitir la creación, consulta y actualización de registros.
* Implementar mensajes de error controlados.
* Comprobar el funcionamiento completo de la aplicación.

---

#  Tecnologías utilizadas

### Frontend

* React
* JavaScript
* HTML5
* CSS3
* React Router
* Local Storage

### Backend

* Node.js
* Express
* JavaScript
* API REST
* MySQL2

### Base de datos

* MySQL
* XAMPP
* SQL

### Herramientas

* Visual Studio Code
* Git
* GitHub
* XAMPP
* Navegador web

---

#  Estructura del proyecto

```text
fronend-y-backend-venta-de-libros/
│
├── backend/
│   ├── RUTAS/
│   │   ├── CONTROLADORES/
│   │   │   └── crudController.js
│   │   │
│   │   └── MODULOS/
│   │       ├── autor.js
│   │       ├── categoria.js
│   │       ├── cliente.js
│   │       ├── detalle_venta.js
│   │       ├── editorial.js
│   │       ├── empleado.js
│   │       ├── libro.js
│   │       ├── libro_autor.js
│   │       ├── metodo_pago.js
│   │       ├── pago.js
│   │       ├── rol.js
│   │       ├── rol_usuario.js
│   │       ├── usuario.js
│   │       └── venta.js
│   │
│   ├── db.js
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── navbar.js
│   │   │
│   │   ├── pages/
│   │   │   ├── carrito.js
│   │   │   ├── catalogo.js
│   │   │   ├── clientes.js
│   │   │   └── modulo.js
│   │   │
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   │
│   ├── package.json
│   └── package-lock.json
│
├── Reporte_Tecnico_Venta_de_Libros.docx
├── crear_reporte.py
└── .gitignore
```

---

#  Base de datos

La aplicación utiliza una base de datos MySQL denominada:

```text
libreria
```

La estructura está organizada en diferentes grupos.

###  Personas y acceso

* `cliente`
* `empleado`
* `usuario`
* `rol`
* `rol_usuario`

###  Catálogo

* `categoria`
* `editorial`
* `autor`
* `libro`
* `libro_autor`

###  Ventas y pagos

* `venta`
* `detalle_venta`
* `metodo_pago`
* `pago`

---

#  Relaciones principales

El sistema utiliza claves primarias y claves foráneas para mantener la integridad de la información.

Algunas relaciones importantes son:

```text
Categoría ────────┐
                  │
Editorial ────────┼──> Libro <──> Autor
                  │
                  │
Cliente ──────────┐
                  ├──> Venta ───> Detalle de venta ───> Libro
Empleado ─────────┘
                         │
                         ▼
                        Pago
                         │
                         ▼
                   Método de pago
```

También se utilizan tablas intermedias para manejar relaciones de muchos a muchos, como:

* `libro_autor`
* `rol_usuario`

---

#  Backend

El backend fue desarrollado utilizando **Node.js + Express**.

Su función principal es recibir las solicitudes del frontend, validar la información, ejecutar las consultas SQL y devolver las respuestas en formato JSON.

## Funcionalidades implementadas

* API REST.
* Operaciones CRUD.
* Consulta de registros.
* Creación de registros.
* Actualización de registros.
* Eliminación controlada.
* Validación de relaciones.
* Manejo de errores de MySQL.
* Conexión mediante pool de MySQL.
* Endpoint de comprobación de estado.

### Endpoint de estado

```text
GET /api/health
```

Este endpoint permite comprobar que el servidor está funcionando y que existe conexión con la base de datos.

### Ejemplos de endpoints

```text
GET    /api/cliente
POST   /api/cliente
PUT    /api/cliente/:id
DELETE /api/cliente/:id
```

La misma estructura se utiliza para los diferentes módulos.

---

#  Frontend

El frontend fue desarrollado con **React**.

La interfaz permite acceder a diferentes módulos de la aplicación y administrar los registros mediante formularios y tablas.

Entre las funcionalidades implementadas se encuentran:

* Catálogo de libros.
* Carrito.
* Gestión de clientes.
* Gestión de módulos.
* Formularios.
* Listados.
* Edición de registros.
* Ocultar registros desde la interfaz.
* Carga de relaciones mediante listas desplegables.
* Actualización de información después de guardar.
* Uso de Local Storage para instantáneas e historial.

---

#  Flujo de funcionamiento

Una operación normal del sistema funciona de la siguiente manera:

1. El usuario ingresa al frontend.
2. React solicita información al backend.
3. Express recibe la solicitud.
4. El backend consulta MySQL.
5. MySQL devuelve la información.
6. Express responde mediante JSON.
7. React recibe los datos.
8. La interfaz actualiza la información mostrada.

Ejemplo:

```text
Usuario
   ↓
React
   ↓
API Express
   ↓
MySQL
   ↓
API Express
   ↓
React
   ↓
Usuario
```

---

#  Pruebas realizadas

Durante la revisión del proyecto se realizaron diferentes pruebas.

| Prueba                   | Resultado    |
| ------------------------ | ------------ |
| Estado de la API         | ✅ Verificado |
| Conexión con MySQL       | ✅ Verificado |
| Consulta de módulos      | ✅ Verificado |
| Creación de registros    | ✅ Verificado |
| Edición de registros     | ✅ Verificado |
| Validación de relaciones | ✅ Verificado |
| Manejo de errores        | ✅ Verificado |
| Claves compuestas        | ✅ Verificado |
| Frontend                 | ✅ Verificado |

---

#  Problemas solucionados

Durante el desarrollo y revisión se trabajó en diferentes aspectos técnicos:

### Conexión con MySQL

Se configuró la conexión del backend con la base de datos `libreria`.

### Relaciones entre tablas

Se implementaron validaciones para evitar referencias a registros inexistentes.

### Operaciones CRUD

Se organizaron controladores y rutas para facilitar las operaciones de consulta, creación y actualización.

### Claves compuestas

Se contemplaron las tablas:

```text
libro_autor
rol_usuario
```

que requieren más de un identificador para sus operaciones.

### Manejo de errores

Se agregaron respuestas controladas para situaciones como:

* Conexión rechazada.
* Registro relacionado inexistente.
* Registros con relaciones activas.
* Datos inválidos.

---

#  Ocultar vs. eliminar

Una característica importante del proyecto es la diferencia entre **ocultar** y **eliminar**.

### Ocultar

El botón **Ocultar** solamente retira el registro de la vista del frontend.

Los datos continúan existiendo en MySQL.

### Eliminar

La operación `DELETE` intenta eliminar realmente el registro de la base de datos.

Si existen relaciones con otras tablas, MySQL puede impedir la eliminación para proteger la integridad referencial.

---

#  Local Storage

El frontend utiliza `Local Storage` como apoyo para guardar información relacionada con las vistas e historial.

Estas instantáneas **no reemplazan la base de datos MySQL**.

La información principal y persistente del sistema se mantiene en:

```text
MySQL → libreria
```

---

# ▶ Instalación y ejecución

## 1. Clonar el repositorio

```bash
git clone https://github.com/David02-11/fronend-y-backend-venta-de-libros.git
```

Entrar al proyecto:

```bash
cd fronend-y-backend-venta-de-libros
```

---

## 2. Configurar MySQL

Abrir **XAMPP** y activar:

```text
MySQL
```

Crear o importar la base de datos:

```text
libreria
```

---

## 3. Instalar dependencias del backend

```bash
cd backend
npm install
```

Configurar las variables de entorno localmente mediante un archivo `.env`.

Ejemplo de configuración:

```env
DB_HOST=localhost
DB_USER=root
DB_NAME=libreria
PORT=5000
```

> No publicar contraseñas reales ni archivos `.env` en GitHub.

---

## 4. Ejecutar el backend

Desde la carpeta `backend`:

```bash
npm run dev
```

El backend estará disponible en:

```text
http://localhost:5000
```

Para comprobarlo:

```text
http://localhost:5000/api/health
```

---

## 5. Instalar dependencias del frontend

Abrir otra terminal:

```bash
cd frontend
npm install
```

---

## 6. Ejecutar el frontend

```bash
npm start
```

La aplicación estará disponible en:

```text
http://localhost:3000
```

---

#  Seguridad

El proyecto utiliza un `.gitignore` para evitar publicar archivos sensibles o innecesarios.

Se excluyen principalmente:

```text
.env
.env.*
node_modules/
build/
dist/
.vscode/
.idea/
```

Las credenciales de conexión a MySQL deben mantenerse únicamente en el entorno local.

---

#  Documentación

Dentro del proyecto se incluye:

```text
Reporte_Tecnico_Venta_de_Libros.docx
```

Este documento contiene información técnica sobre:

* Arquitectura.
* Backend.
* Frontend.
* Base de datos.
* Pruebas.
* Errores y soluciones.
* Ejecución local.
* Recomendaciones.

---

#  Estado actual del proyecto

**Estado:** 🟢 Proyecto funcional en ambiente local.

Se completó:

* ✅ Estructura frontend.
* ✅ Estructura backend.
* ✅ Conexión con MySQL.
* ✅ API REST.
* ✅ CRUD.
* ✅ Módulos de administración.
* ✅ Relaciones entre tablas.
* ✅ Validación de errores.
* ✅ Interfaz React.
* ✅ Carrito y catálogo.
* ✅ Gestión de clientes.
* ✅ Local Storage.
* ✅ Pruebas funcionales.
* ✅ Documentación técnica.
* ✅ Publicación del proyecto en GitHub.

---

#  Mejoras futuras

Como siguientes etapas del proyecto se pueden implementar:

*  Sistema completo de autenticación.
*  Permisos según roles.
*  Panel administrativo.
*  Estadísticas de ventas.
*  Generación de facturas.
*  Búsqueda avanzada de libros.
*  Diseño responsive mejorado.
*  Despliegue en un servidor.
*  Mejoras de seguridad.
*  Auditoría de operaciones.

---

#  Autor

**Jonathan David Benavides Rodríguez**

Proyecto académico de desarrollo de software.

---

#  Licencia

Proyecto desarrollado con fines académicos y educativos.
