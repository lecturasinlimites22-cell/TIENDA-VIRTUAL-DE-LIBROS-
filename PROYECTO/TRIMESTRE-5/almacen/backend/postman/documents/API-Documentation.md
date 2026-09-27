# 📚 Documentación de la API - Librería

> **Base URL:** `http://127.0.0.1:8000`  
> **Colección:** ejemplo  
> **Versión:** 1.0.0

---

## 📑 Tabla de Contenidos

1. [🔐 Autenticación](#-autenticación)
2. [👥 Usuarios](#-usuarios)
3. [🎭 Roles](#-roles)
4. [🔗 Rol-Usuario](#-rol-usuario)
5. [🛒 Ventas](#-ventas)
6. [💳 Pagos](#-pagos)
7. [💰 Métodos de Pago](#-métodos-de-pago)
8. [📋 Detalle de Venta](#-detalle-de-venta)
9. [📚 Libros](#-libros)
10. [✍️ Autores](#️-autores)
11. [📖 Libro-Autor](#-libro-autor)
12. [🏷️ Categorías](#️-categorías)
13. [👤 Clientes](#-clientes)
14. [🏢 Editoriales](#-editoriales)
15. [👨‍💼 Empleados](#-empleados)

---

## 🔐 Autenticación

> ⚠️ **Nota sobre autenticación:** Algunos endpoints requieren un **Bearer Token** en el encabezado de autorización. Para obtener el token, utiliza el endpoint de Login. Luego incluye el token en las solicitudes protegidas usando el encabezado:  
> `Authorization: Bearer {{token}}`

---

### Login

| Campo | Detalle |
|-------|---------|
| **Método** | ![POST](https://img.shields.io/badge/POST-0075FF?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/login` |
| **Descripción** | Autentica al usuario y retorna un token de acceso Bearer para usar en endpoints protegidos. |
| **Autenticación** | No requerida |

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "username": "admin",
  "password": "123"
}
```

---

## 👥 Usuarios

Módulo para la gestión completa de usuarios del sistema.

---

### ConsultarUsuarios

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/usuarios` |
| **Descripción** | Retorna la lista completa de todos los usuarios registrados en el sistema. |
| **Autenticación** | No requerida |

---

### ConsultarCodigo (usuario por ID)

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/usuarios/1` |
| **Descripción** | Retorna la información de un usuario específico según su ID. |
| **Autenticación** | No requerida |

---

### CrearUsuarios

| Campo | Detalle |
|-------|---------|
| **Método** | ![POST](https://img.shields.io/badge/POST-0075FF?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/usuarios` |
| **Descripción** | Crea un nuevo usuario en el sistema con los datos proporcionados. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_usuario": 20,
  "username": "user20",
  "password": "123456",
  "correo": "user20@gmail.com"
}
```

---

### ModificarUsuarios

| Campo | Detalle |
|-------|---------|
| **Método** | ![PUT](https://img.shields.io/badge/PUT-FD7E14?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/usuarios/20` |
| **Descripción** | Actualiza los datos de un usuario existente identificado por su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_usuario": 20,
  "username": "user20",
  "password": "123456",
  "correo": "user20@gmail.com"
}
```

---

### EliminarUsuario

| Campo | Detalle |
|-------|---------|
| **Método** | ![DELETE](https://img.shields.io/badge/DELETE-DC3545?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/usuarios/18` |
| **Descripción** | Elimina permanentemente un usuario del sistema según su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_usuario": 18,
  "username": "user18",
  "password": "123456",
  "correo": "user18@gmail.com"
}
```

---

## 🎭 Roles

Módulo para la gestión de roles del sistema.

---

### ConsultarRoles

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/roles` |
| **Descripción** | Retorna la lista completa de todos los roles disponibles en el sistema. |
| **Autenticación** | No requerida |

---

### ConsultarCodigo (rol por ID)

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/roles/1` |
| **Descripción** | Retorna la información de un rol específico según su ID. |
| **Autenticación** | No requerida |

---

### CrearRoles

| Campo | Detalle |
|-------|---------|
| **Método** | ![POST](https://img.shields.io/badge/POST-0075FF?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/roles` |
| **Descripción** | Crea un nuevo rol en el sistema con nombre y descripción. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_rol": "13",
  "nombre": "usuario",
  "descripcion": "comprador"
}
```

---

### ModificarRoles

| Campo | Detalle |
|-------|---------|
| **Método** | ![PUT](https://img.shields.io/badge/PUT-FD7E14?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/roles/13` |
| **Descripción** | Actualiza los datos de un rol existente identificado por su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_rol": "13",
  "nombre": "usuario",
  "descripcion": "comprador"
}
```

---

### EliminarRol

| Campo | Detalle |
|-------|---------|
| **Método** | ![DELETE](https://img.shields.io/badge/DELETE-DC3545?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/roles/11` |
| **Descripción** | Elimina permanentemente un rol del sistema según su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_rol": "11",
  "nombre": "admin",
  "descripcion": "vendedor"
}
```

---

## 🔗 Rol-Usuario

Módulo para gestionar la asignación de roles a usuarios.

---

### ConsultarRol-Usuario

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/rol-usuarios` |
| **Descripción** | Retorna la lista completa de todas las asignaciones de roles a usuarios. |
| **Autenticación** | No requerida |

---

### ConsultarCodigo (rol-usuario por ID)

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/rol-usuarios/1` |
| **Descripción** | Retorna la información de una asignación rol-usuario específica según su ID. |
| **Autenticación** | No requerida |

---

### CrearRol-Usuario

| Campo | Detalle |
|-------|---------|
| **Método** | ![POST](https://img.shields.io/badge/POST-0075FF?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/rol-usuarios` |
| **Descripción** | Crea una nueva asignación de rol a un usuario. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_rol": "13",
  "id_usuario": 20
}
```

---

### ModificarRol-Usuario

| Campo | Detalle |
|-------|---------|
| **Método** | ![PUT](https://img.shields.io/badge/PUT-FD7E14?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/rol-usuarios/13` |
| **Descripción** | Actualiza la asignación de rol-usuario existente identificada por su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_rol": "13",
  "id_usuario": "4"
}
```

---

### EliminarRol-Usuario

| Campo | Detalle |
|-------|---------|
| **Método** | ![DELETE](https://img.shields.io/badge/DELETE-DC3545?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/rol-usuarios/13` |
| **Descripción** | Elimina permanentemente una asignación de rol-usuario según su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_rol": "13",
  "id_usuario": "4"
}
```

---

## 🛒 Ventas

Módulo para la gestión de ventas de la librería.

---

### ConsultarVentas

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/ventas` |
| **Descripción** | Retorna la lista completa de todas las ventas registradas en el sistema. |
| **Autenticación** | No requerida |

---

### ConsultarCodigo (venta por ID)

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/ventas/16` |
| **Descripción** | Retorna la información de una venta específica según su ID. |
| **Autenticación** | No requerida |

**Ejemplo de respuesta:**
```json
{
  "id_venta": 16,
  "id_cliente": 16,
  "id_empleado": 16,
  "fecha": "2026-08-20 14:43:09",
  "total": "90000.00"
}
```

---

### CrearVenta

| Campo | Detalle |
|-------|---------|
| **Método** | ![POST](https://img.shields.io/badge/POST-0075FF?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/ventas` |
| **Descripción** | Registra una nueva venta en el sistema. Requiere autenticación Bearer Token. |
| **Autenticación** | ✅ **Bearer Token requerido:** `{{token}}` |

**Body (JSON):**
```json
{
  "id_cliente": null,
  "id_empleado": null,
  "fecha": "2026-08-26 11:21:15",
  "total": "25700.00"
}
```

---

### ModificarVenta

| Campo | Detalle |
|-------|---------|
| **Método** | ![PUT](https://img.shields.io/badge/PUT-FD7E14?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/ventas/21` |
| **Descripción** | Actualiza los datos de una venta existente identificada por su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_venta": 21,
  "id_cliente": null,
  "id_empleado": null,
  "fecha": "2026-08-26 11:21:15",
  "total": "30000.00"
}
```

---

### EliminarVenta

| Campo | Detalle |
|-------|---------|
| **Método** | ![DELETE](https://img.shields.io/badge/DELETE-DC3545?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/ventas/20` |
| **Descripción** | Elimina permanentemente una venta del sistema según su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_venta": 20,
  "id_cliente": null,
  "id_empleado": null,
  "fecha": "2026-08-26 11:21:15",
  "total": "25700.00"
}
```

---

## 💳 Pagos

Módulo para la gestión de pagos asociados a las ventas.

---

### ConsultarPago

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/pagos` |
| **Descripción** | Retorna la lista completa de todos los pagos registrados en el sistema. |
| **Autenticación** | No requerida |

---

### ConsultarCodigo (pago por ID)

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/pagos/16` |
| **Descripción** | Retorna la información de un pago específico según su ID. |
| **Autenticación** | No requerida |

**Ejemplo de respuesta:**
```json
{
  "id_pago": 16,
  "id_venta": 16,
  "id_metodo_pago": 16,
  "monto": "90000.00",
  "fecha_pago": "2026-08-20 14:43:09"
}
```

---

### CrearPago

| Campo | Detalle |
|-------|---------|
| **Método** | ![POST](https://img.shields.io/badge/POST-0075FF?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/pagos/17` |
| **Descripción** | Registra un nuevo pago asociado a una venta en el sistema. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_pago": 17,
  "id_venta": 21,
  "id_metodo_pago": 17,
  "monto": null,
  "fecha_pago": null
}
```

---

### ModificarPago

| Campo | Detalle |
|-------|---------|
| **Método** | ![PUT](https://img.shields.io/badge/PUT-FD7E14?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/pagos/17` |
| **Descripción** | Actualiza los datos de un pago existente identificado por su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_pago": 17,
  "id_venta": 21,
  "id_metodo_pago": null,
  "monto": null,
  "fecha_pago": null
}
```

---

### EliminarPago

| Campo | Detalle |
|-------|---------|
| **Método** | ![DELETE](https://img.shields.io/badge/DELETE-DC3545?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/pagos/17` |
| **Descripción** | Elimina permanentemente un pago del sistema según su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_pago": 17,
  "id_venta": 21,
  "id_metodo_pago": null,
  "monto": null,
  "fecha_pago": null
}
```

---

## 💰 Métodos de Pago

Módulo para la gestión de los métodos de pago disponibles.

---

### ConsultarMetodo-pago

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/metodos-pago` |
| **Descripción** | Retorna la lista completa de todos los métodos de pago disponibles en el sistema. |
| **Autenticación** | No requerida |

---

### CrearMetodo-pago

| Campo | Detalle |
|-------|---------|
| **Método** | ![POST](https://img.shields.io/badge/POST-0075FF?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/metodos-pago` |
| **Descripción** | Registra un nuevo método de pago en el sistema. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_metodo_pago": 17,
  "nombre": "Efectivo"
}
```

---

### ModificarMetodo-pago

| Campo | Detalle |
|-------|---------|
| **Método** | ![PUT](https://img.shields.io/badge/PUT-FD7E14?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/metodos-pago/17` |
| **Descripción** | Actualiza los datos de un método de pago existente identificado por su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_metodo_pago": 17,
  "nombre": "Nequi"
}
```

---

### EliminarMetodo-pago

| Campo | Detalle |
|-------|---------|
| **Método** | ![DELETE](https://img.shields.io/badge/DELETE-DC3545?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/metodos-pago/17` |
| **Descripción** | Elimina permanentemente un método de pago del sistema según su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_metodo_pago": 17,
  "nombre": "Nequi"
}
```

---

## 📋 Detalle de Venta

Módulo para la gestión de los detalles (ítems) de cada venta.

---

### ConsultarDetalle-Venta

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/detalles-venta` |
| **Descripción** | Retorna la lista completa de todos los detalles de venta registrados. |
| **Autenticación** | No requerida |

---

### ConsultarCodigo (detalle por ID)

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/detalles-venta/16` |
| **Descripción** | Retorna la información de un detalle de venta específico según su ID. |
| **Autenticación** | No requerida |

**Ejemplo de respuesta:**
```json
{
  "id_detalle": 16,
  "id_venta": 16,
  "id_libro": 16,
  "cantidad": 1,
  "precio_unitario": "90000.00"
}
```

---

### CrearDetalle-venta

| Campo | Detalle |
|-------|---------|
| **Método** | ![POST](https://img.shields.io/badge/POST-0075FF?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/detalles-venta` |
| **Descripción** | Registra un nuevo detalle de venta (ítem) asociado a una venta. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_detalle": 17,
  "id_venta": 17,
  "id_libro": null,
  "cantidad": 1,
  "precio_unitario": "90000.00"
}
```

---

### ModificarDetalle-venta

| Campo | Detalle |
|-------|---------|
| **Método** | ![PUT](https://img.shields.io/badge/PUT-FD7E14?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/detalles-venta/17` |
| **Descripción** | Actualiza los datos de un detalle de venta existente identificado por su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_detalle": 17,
  "id_venta": 17,
  "id_libro": null,
  "cantidad": 5,
  "precio_unitario": "100000.00"
}
```

---

### EliminarDetalle-venta

| Campo | Detalle |
|-------|---------|
| **Método** | ![DELETE](https://img.shields.io/badge/DELETE-DC3545?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/detalles-venta/17` |
| **Descripción** | Elimina permanentemente un detalle de venta del sistema según su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_detalle": 17,
  "id_venta": 17,
  "id_libro": null,
  "cantidad": 5,
  "precio_unitario": "100000.00"
}
```

---

## 📚 Libros

Módulo para la gestión del catálogo de libros de la librería.

---

### ConsultarLibro

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/libros` |
| **Descripción** | Retorna la lista completa de todos los libros disponibles en el catálogo. |
| **Autenticación** | No requerida |

---

### ConsultarCodigo (libro por ID)

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/libros/16` |
| **Descripción** | Retorna la información de un libro específico según su ID. |
| **Autenticación** | No requerida |

**Ejemplo de respuesta:**
```json
{
  "id_libro": 16,
  "titulo": "Sapiens",
  "precio": "75000.00",
  "stock": 7,
  "id_categoria": 3,
  "id_editorial": 16
}
```

---

### CrearLibro

| Campo | Detalle |
|-------|---------|
| **Método** | ![POST](https://img.shields.io/badge/POST-0075FF?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/libros` |
| **Descripción** | Registra un nuevo libro en el catálogo de la librería. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_libro": 18,
  "titulo": "El principito",
  "precio": "75000.00",
  "stock": 10,
  "id_categoria": null,
  "id_editorial": null
}
```

---

### ModificarLibro

| Campo | Detalle |
|-------|---------|
| **Método** | ![PUT](https://img.shields.io/badge/PUT-FD7E14?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/libros/17` |
| **Descripción** | Actualiza los datos de un libro existente identificado por su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_libro": 17,
  "titulo": "El principito",
  "precio": "75000.00",
  "stock": 25,
  "id_categoria": null,
  "id_editorial": null
}
```

---

### EliminarLibro

| Campo | Detalle |
|-------|---------|
| **Método** | ![DELETE](https://img.shields.io/badge/DELETE-DC3545?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/libros/17` |
| **Descripción** | Elimina permanentemente un libro del catálogo según su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_libro": 17,
  "titulo": "El principito",
  "precio": "75000.00",
  "stock": 25,
  "id_categoria": null,
  "id_editorial": null
}
```

---

## ✍️ Autores

Módulo para la gestión de los autores de los libros.

---

### CosultarAutor

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/autores` |
| **Descripción** | Retorna la lista completa de todos los autores registrados en el sistema. |
| **Autenticación** | No requerida |

---

### CosultarCodigo (autor por ID)

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/autores/16` |
| **Descripción** | Retorna la información de un autor específico según su ID. |
| **Autenticación** | No requerida |

**Ejemplo de respuesta:**
```json
{
  "id_autor": 16,
  "nombre": "Yuval Noah Harari"
}
```

---

### CrearAutores

| Campo | Detalle |
|-------|---------|
| **Método** | ![POST](https://img.shields.io/badge/POST-0075FF?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/autores` |
| **Descripción** | Registra un nuevo autor en el sistema. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_autor": 17,
  "nombre": "Antoine de Saint-Exupéry"
}
```

---

### ModificarAutor

| Campo | Detalle |
|-------|---------|
| **Método** | ![PUT](https://img.shields.io/badge/PUT-FD7E14?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/autores/17` |
| **Descripción** | Actualiza los datos de un autor existente identificado por su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_autor": 17,
  "nombre": "Antoine Marie Jean-Baptiste Roger de Saint-Exupéry"
}
```

---

### EliminarAutor

| Campo | Detalle |
|-------|---------|
| **Método** | ![DELETE](https://img.shields.io/badge/DELETE-DC3545?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/autores/17` |
| **Descripción** | Elimina permanentemente un autor del sistema según su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_autor": 17,
  "nombre": "Antoine Marie Jean-Baptiste Roger de Saint-Exupéry"
}
```

---

## 📖 Libro-Autor

Módulo para gestionar la relación entre libros y sus autores.

---

### ConsutarLibro-Autor

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/libro-autores` |
| **Descripción** | Retorna la lista completa de todas las relaciones libro-autor registradas. |
| **Autenticación** | No requerida |

---

### CosultarCodigo (libro-autor por ID)

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/libro-autores/16` |
| **Descripción** | Retorna la información de una relación libro-autor específica según su ID. |
| **Autenticación** | No requerida |

**Ejemplo de respuesta:**
```json
{
  "id_libro": 16,
  "id_autor": 16
}
```

---

### CrearLibro-Autor

| Campo | Detalle |
|-------|---------|
| **Método** | ![POST](https://img.shields.io/badge/POST-0075FF?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/libro-autores` |
| **Descripción** | Crea una nueva relación entre un libro y un autor. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_libro": 19,
  "id_autor": 19
}
```

---

### ModificarLibro-Autor

| Campo | Detalle |
|-------|---------|
| **Método** | ![PUT](https://img.shields.io/badge/PUT-FD7E14?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/libro-autores/18` |
| **Descripción** | Actualiza una relación libro-autor existente identificada por su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_libro": 19,
  "id_autor": 19
}
```

---

### EliminarLibro-Autor

| Campo | Detalle |
|-------|---------|
| **Método** | ![DELETE](https://img.shields.io/badge/DELETE-DC3545?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/libro-autores/18` |
| **Descripción** | Elimina permanentemente una relación libro-autor del sistema según su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_libro": 18,
  "id_autor": 18
}
```

---

## 🏷️ Categorías

Módulo para la gestión de las categorías de libros.

---

### ConsultarCategoria

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/categorias` |
| **Descripción** | Retorna la lista completa de todas las categorías de libros disponibles. |
| **Autenticación** | No requerida |

---

### ConsultarCodigo (categoría por ID)

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/categorias/16` |
| **Descripción** | Retorna la información de una categoría específica según su ID. |
| **Autenticación** | No requerida |

**Ejemplo de respuesta:**
```json
{
  "id_categoria": 16,
  "nombre": "Literatura",
  "descripcion": "Obras clásicas"
}
```

---

### CrearCategoria

| Campo | Detalle |
|-------|---------|
| **Método** | ![POST](https://img.shields.io/badge/POST-0075FF?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/categorias` |
| **Descripción** | Registra una nueva categoría de libros en el sistema. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_categoria": 17,
  "nombre": "Literatura",
  "descripcion": "infantil y juvenil"
}
```

---

### ModificarCategoria

| Campo | Detalle |
|-------|---------|
| **Método** | ![PUT](https://img.shields.io/badge/PUT-FD7E14?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/categorias/17` |
| **Descripción** | Actualiza los datos de una categoría existente identificada por su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_categoria": 17,
  "nombre": "Literatura",
  "descripcion": "infantil y juvenil"
}
```

---

### EliminarCategoria

| Campo | Detalle |
|-------|---------|
| **Método** | ![DELETE](https://img.shields.io/badge/DELETE-DC3545?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/categorias/18` |
| **Descripción** | Elimina permanentemente una categoría del sistema según su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_categoria": 18,
  "nombre": "Literatura",
  "descripcion": "infantil y juvenil"
}
```

---

## 👤 Clientes

Módulo para la gestión de los clientes de la librería.

---

### ConsultarCliente

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/clientes` |
| **Descripción** | Retorna la lista completa de todos los clientes registrados en el sistema. |
| **Autenticación** | No requerida |

---

### ConsultarCodigo (cliente por ID)

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/clientes/16` |
| **Descripción** | Retorna la información de un cliente específico según su ID. |
| **Autenticación** | No requerida |

**Ejemplo de respuesta:**
```json
{
  "id_cliente": 16,
  "nombre": "Mateo Vargas",
  "telefono": "3156666666",
  "direccion": "Popayán"
}
```

---

### CrearCliente

| Campo | Detalle |
|-------|---------|
| **Método** | ![POST](https://img.shields.io/badge/POST-0075FF?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/clientes` |
| **Descripción** | Registra un nuevo cliente en el sistema de la librería. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_cliente": 17,
  "nombre": "Juan Perez",
  "telefono": "31244568798",
  "direccion": "Colombia"
}
```

---

### ModificarCliente

| Campo | Detalle |
|-------|---------|
| **Método** | ![PUT](https://img.shields.io/badge/PUT-FD7E14?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/clientes/17` |
| **Descripción** | Actualiza los datos de un cliente existente identificado por su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_cliente": 17,
  "nombre": "Juan Perez",
  "telefono": "31244568798",
  "direccion": "Cordoba"
}
```

---

### EliminarCliente

| Campo | Detalle |
|-------|---------|
| **Método** | ![DELETE](https://img.shields.io/badge/DELETE-DC3545?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/clientes/17` |
| **Descripción** | Elimina permanentemente un cliente del sistema según su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_cliente": 17,
  "nombre": "Juan Perez",
  "telefono": "31244568798",
  "direccion": "Cordoba"
}
```

---

## 🏢 Editoriales

Módulo para la gestión de las editoriales de los libros.

---

### ConsultarEditorial

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/editoriales` |
| **Descripción** | Retorna la lista completa de todas las editoriales registradas en el sistema. |
| **Autenticación** | No requerida |

---

### ConsultarCodigo (editorial por ID)

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/editoriales/16` |
| **Descripción** | Retorna la información de una editorial específica según su ID. |
| **Autenticación** | No requerida |

**Ejemplo de respuesta:**
```json
{
  "id_editorial": 16,
  "nombre": "Penguin Random House",
  "pais": "Estados Unidos"
}
```

---

### CrearEditorial

| Campo | Detalle |
|-------|---------|
| **Método** | ![POST](https://img.shields.io/badge/POST-0075FF?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/editoriales` |
| **Descripción** | Registra una nueva editorial en el sistema. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_editorial": 17,
  "nombre": "Anagrama",
  "pais": "España"
}
```

---

### ModificarEditorial

| Campo | Detalle |
|-------|---------|
| **Método** | ![PUT](https://img.shields.io/badge/PUT-FD7E14?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/editoriales/17` |
| **Descripción** | Actualiza los datos de una editorial existente identificada por su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_editorial": 17,
  "nombre": "Norma",
  "pais": "España"
}
```

---

### EliminarEditorial

| Campo | Detalle |
|-------|---------|
| **Método** | ![DELETE](https://img.shields.io/badge/DELETE-DC3545?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/editoriales/17` |
| **Descripción** | Elimina permanentemente una editorial del sistema según su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_editorial": 17,
  "nombre": "Norma",
  "pais": "España"
}
```

---

## 👨‍💼 Empleados

Módulo para la gestión de los empleados de la librería.

---

### ConsultarEmpleado

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/empleados` |
| **Descripción** | Retorna la lista completa de todos los empleados registrados en el sistema. |
| **Autenticación** | No requerida |

---

### ConsultarCodigo (empleado por ID)

| Campo | Detalle |
|-------|---------|
| **Método** | ![GET](https://img.shields.io/badge/GET-28A745?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/empleados/16` |
| **Descripción** | Retorna la información de un empleado específico según su ID. |
| **Autenticación** | No requerida |

**Ejemplo de respuesta:**
```json
{
  "id_empleado": 16,
  "nombre": "Julian",
  "apellido": "Vargas",
  "telefono": "3216666666",
  "cargo": "Cajero",
  "id_usuario": 16
}
```

---

### CrearEmpleado

| Campo | Detalle |
|-------|---------|
| **Método** | ![POST](https://img.shields.io/badge/POST-0075FF?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/empleados` |
| **Descripción** | Registra un nuevo empleado en el sistema de la librería. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_empleado": 19,
  "nombre": "Andres",
  "apellido": "Felipe",
  "telefono": "312457859",
  "cargo": "Comprador",
  "id_usuario": null
}
```

---

### ModificarEmpleado

| Campo | Detalle |
|-------|---------|
| **Método** | ![PUT](https://img.shields.io/badge/PUT-FD7E14?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/empleados/18` |
| **Descripción** | Actualiza los datos de un empleado existente identificado por su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_empleado": 18,
  "nombre": "Andres",
  "apellido": "Felipe",
  "telefono": "312457859",
  "cargo": "Gerente",
  "id_usuario": null
}
```

---

### EliminarEmpleado

| Campo | Detalle |
|-------|---------|
| **Método** | ![DELETE](https://img.shields.io/badge/DELETE-DC3545?style=flat-square&logoColor=white) |
| **URL** | `http://127.0.0.1:8000/api/empleados/18` |
| **Descripción** | Elimina permanentemente un empleado del sistema según su ID. |
| **Autenticación** | No requerida |

**Body (JSON):**
```json
{
  "id_empleado": 18,
  "nombre": "Andres",
  "apellido": "Felipe",
  "telefono": "312457859",
  "cargo": "Gerente",
  "id_usuario": null
}
```

---

## 🔑 Resumen de Autenticación

| Endpoint | Autenticación requerida |
|----------|------------------------|
| Login | ❌ No requerida |
| Todos los endpoints de Usuarios | ❌ No requerida |
| Todos los endpoints de Roles | ❌ No requerida |
| Todos los endpoints de Rol-Usuario | ❌ No requerida |
| ConsultarVentas, ConsultarCodigo, ModificarVenta, EliminarVenta | ❌ No requerida |
| **CrearVenta** | ✅ **Bearer Token** (`{{token}}`) |
| Todos los endpoints de Pagos | ❌ No requerida |
| Todos los endpoints de Métodos de Pago | ❌ No requerida |
| Todos los endpoints de Detalle de Venta | ❌ No requerida |
| Todos los endpoints de Libros | ❌ No requerida |
| Todos los endpoints de Autores | ❌ No requerida |
| Todos los endpoints de Libro-Autor | ❌ No requerida |
| Todos los endpoints de Categorías | ❌ No requerida |
| Todos los endpoints de Clientes | ❌ No requerida |
| Todos los endpoints de Editoriales | ❌ No requerida |
| Todos los endpoints de Empleados | ❌ No requerida |

> 💡 **Cómo usar el Bearer Token:**  
> 1. Realiza una solicitud al endpoint de **Login** con tus credenciales.  
> 2. Copia el token recibido en la respuesta.  
> 3. En los endpoints que requieren autenticación, agrega el encabezado:  
>    `Authorization: Bearer <tu_token_aquí>`  
>    O usa la variable de entorno `{{token}}` si ya está configurada en tu entorno de Postman.

---

*Documentación generada para la colección **ejemplo** — API Librería*
