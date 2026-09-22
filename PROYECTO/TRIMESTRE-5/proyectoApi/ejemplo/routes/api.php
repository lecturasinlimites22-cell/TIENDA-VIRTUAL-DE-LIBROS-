<?php

use App\Http\Controllers\AutorControlador;
use App\Http\Controllers\CategoriaControlador;
use App\Http\Controllers\ClienteControlador;
use App\Http\Controllers\DetalleVentaControlador;
use App\Http\Controllers\EditorialControlador;
use App\Http\Controllers\EmpleadoControlador;
use App\Http\Controllers\LibroAutorControlador;
use App\Http\Controllers\LibroControlador;
use App\Http\Controllers\MetodoPagoControlador;
use App\Http\Controllers\PagoControlador;
use App\Http\Controllers\roleControlador;
use App\Http\Controllers\RolUsuarioControlador;
use App\Http\Controllers\UsuarioControlador;
use App\Http\Controllers\VentaControlador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//rutas publicas (no requieren autenticacion)
Route::post('/login', [AuthController::class, 'login']);

//rutas protegidas (requieren autenticacion con JWT)
Route::middleware(['jwt.auth'])->group(function () {

//rutas de autenticacion
    Route::post('/logout', [AuthController::class, 'logout']); 
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/refresh', [AuthController::class, 'refresh']);



// RUTAS DE ROLES
Route::get('/roles', [roleControlador::class, 'index']);
Route::post('/roles', [roleControlador::class, 'store']);
Route::get('/roles/{id_rol}', [roleControlador::class, 'show']);
Route::put('/roles/{id_rol}', [roleControlador::class, 'update']);
Route::delete('/roles/{id_rol}', [roleControlador::class, 'destroy']);

// RUTAS DE USUARIOS
Route::get('/usuarios', [UsuarioControlador::class, 'index']);
Route::post('/usuarios', [UsuarioControlador::class, 'store']);
Route::get('/usuarios/{id_usuario}', [UsuarioControlador::class, 'show']);
Route::put('/usuarios/{id_usuario}', [UsuarioControlador::class, 'update']);
Route::delete('/usuarios/{id_usuario}', [UsuarioControlador::class, 'destroy']);

// RUTAS DE AUTORES
Route::get('/autores', [AutorControlador::class, 'index']);
Route::post('/autores', [AutorControlador::class, 'store']);
Route::get('/autores/{id_autor}', [AutorControlador::class, 'show']);
Route::put('/autores/{id_autor}', [AutorControlador::class, 'update']);
Route::delete('/autores/{id_autor}', [AutorControlador::class, 'destroy']);

// RUTAS DE CATEGORIAS
Route::get('/categorias', [CategoriaControlador::class, 'index']);
Route::post('/categorias', [CategoriaControlador::class, 'store']);
Route::get('/categorias/{id_categoria}', [CategoriaControlador::class, 'show']);
Route::put('/categorias/{id_categoria}', [CategoriaControlador::class, 'update']);
Route::delete('/categorias/{id_categoria}', [CategoriaControlador::class, 'destroy']);

// RUTAS DE CLIENTES
Route::get('/clientes', [ClienteControlador::class, 'index']);
Route::post('/clientes', [ClienteControlador::class, 'store']);
Route::get('/clientes/{id_cliente}', [ClienteControlador::class, 'show']);
Route::put('/clientes/{id_cliente}', [ClienteControlador::class, 'update']);
Route::delete('/clientes/{id_cliente}', [ClienteControlador::class, 'destroy']);

// RUTAS DE DETALLE DE VENTA
Route::get('/detalles-venta', [DetalleVentaControlador::class, 'index']);
Route::post('/detalles-venta', [DetalleVentaControlador::class, 'store']);
Route::get('/detalles-venta/{id_detalle}', [DetalleVentaControlador::class, 'show']);
Route::put('/detalles-venta/{id_detalle}', [DetalleVentaControlador::class, 'update']);
Route::delete('/detalles-venta/{id_detalle}', [DetalleVentaControlador::class, 'destroy']);

// RUTAS DE EDITORIALES
Route::get('/editoriales', [EditorialControlador::class, 'index']);
Route::post('/editoriales', [EditorialControlador::class, 'store']);
Route::get('/editoriales/{id_editorial}', [EditorialControlador::class, 'show']);
Route::put('/editoriales/{id_editorial}', [EditorialControlador::class, 'update']);
Route::delete('/editoriales/{id_editorial}', [EditorialControlador::class, 'destroy']);

// RUTAS DE EMPLEADOS
Route::get('/empleados', [EmpleadoControlador::class, 'index']);
Route::post('/empleados', [EmpleadoControlador::class, 'store']);
Route::get('/empleados/{id_empleado}', [EmpleadoControlador::class, 'show']);
Route::put('/empleados/{id_empleado}', [EmpleadoControlador::class, 'update']);
Route::delete('/empleados/{id_empleado}', [EmpleadoControlador::class, 'destroy']);

// RUTAS DE LIBROS
Route::get('/libros', [LibroControlador::class, 'index']);
Route::post('/libros', [LibroControlador::class, 'store']);
Route::get('/libros/{id_libro}', [LibroControlador::class, 'show']);
Route::put('/libros/{id_libro}', [LibroControlador::class, 'update']);
Route::delete('/libros/{id_libro}', [LibroControlador::class, 'destroy']);

// RUTAS DE LIBRO-AUTOR
Route::get('/libro-autores', [LibroAutorControlador::class, 'index']);
Route::post('/libro-autores', [LibroAutorControlador::class, 'store']);
Route::get('/libro-autores/{id_libro}', [LibroAutorControlador::class, 'show']);
Route::put('/libro-autores/{id_libro}', [LibroAutorControlador::class, 'update']);
Route::delete('/libro-autores/{id_libro}', [LibroAutorControlador::class, 'destroy']);

// RUTAS DE METODOS DE PAGO
Route::get('/metodos-pago', [MetodoPagoControlador::class, 'index']);
Route::post('/metodos-pago', [MetodoPagoControlador::class, 'store']);
Route::get('/metodos-pago/{id_metodo_pago}', [MetodoPagoControlador::class, 'show']);
Route::put('/metodos-pago/{id_metodo_pago}', [MetodoPagoControlador::class, 'update']);
Route::delete('/metodos-pago/{id_metodo_pago}', [MetodoPagoControlador::class, 'destroy']);

// RUTAS DE PAGOS
Route::get('/pagos', [PagoControlador::class, 'index']);
Route::post('/pagos', [PagoControlador::class, 'store']);
Route::get('/pagos/{id_pago}', [PagoControlador::class, 'show']);
Route::put('/pagos/{id_pago}', [PagoControlador::class, 'update']);
Route::delete('/pagos/{id_pago}', [PagoControlador::class, 'destroy']);

// RUTAS DE ROL-USUARIO
Route::get('/rol-usuarios', [RolUsuarioControlador::class, 'index']);
Route::post('/rol-usuarios', [RolUsuarioControlador::class, 'store']);
Route::get('/rol-usuarios/{id_rol}', [RolUsuarioControlador::class, 'show']);
Route::put('/rol-usuarios/{id_rol}', [RolUsuarioControlador::class, 'update']);
Route::delete('/rol-usuarios/{id_rol}', [RolUsuarioControlador::class, 'destroy']);

// RUTAS DE VENTAS
Route::get('/ventas', [VentaControlador::class, 'index']);
Route::post('/ventas', [VentaControlador::class, 'store']);
Route::get('/ventas/{id_venta}', [VentaControlador::class, 'show']);
Route::put('/ventas/{id_venta}', [VentaControlador::class, 'update']);
Route::delete('/ventas/{id_venta}', [VentaControlador::class, 'destroy']);

});