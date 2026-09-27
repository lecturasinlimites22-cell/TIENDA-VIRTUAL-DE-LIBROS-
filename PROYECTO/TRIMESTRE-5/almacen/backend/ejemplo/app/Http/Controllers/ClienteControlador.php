<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ClienteControlador extends Controller
{
    private $tabla = 'cliente';

    private $clave = 'id_cliente';

    private function reglas()
    {
        return ['nombre' => 'required|string|max:100', 'telefono' => 'nullable|string|max:15', 'direccion' => 'nullable|string|max:150'];
    }

    public function index()
    {
        $datos = DB::table($this->tabla)->get();

        return $datos->isEmpty() ? response()->json(['message' => 'No hay clientes registrados', 'status' => 404], 404) : response()->json($datos, 200);
    }

    public function store(Request $request)
    {
        $v = Validator::make($request->all(), $this->reglas());
        if ($v->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $v->errors(), 'status' => 400], 400);
        } $id = DB::table($this->tabla)->insertGetId($request->only('nombre', 'telefono', 'direccion'), $this->clave);

        return response()->json(['message' => 'Cliente creado exitosamente', 'cliente' => $this->dato($id), 'status' => 201], 201);
    }

    public function show($id_cliente)
    {
        $dato = $this->dato($id_cliente);

        return $dato ? response()->json($dato, 200) : response()->json(['message' => 'Cliente no encontrado', 'status' => 404], 404);
    }

    public function update(Request $request, $id_cliente)
    {
        if (! $this->dato($id_cliente)) {
            return response()->json(['message' => 'Cliente no encontrado', 'status' => 404], 404);
        } $v = Validator::make($request->all(), $this->reglas());
        if ($v->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $v->errors(), 'status' => 400], 400);
        } DB::table($this->tabla)->where($this->clave, $id_cliente)->update($request->only('nombre', 'telefono', 'direccion'));

        return response()->json(['message' => 'Cliente actualizado exitosamente', 'cliente' => $this->dato($id_cliente), 'status' => 200], 200);
    }

    public function destroy($id_cliente)
    {
        return DB::table($this->tabla)->where($this->clave, $id_cliente)->delete() ? response()->json(['message' => 'Cliente eliminado exitosamente', 'status' => 200], 200) : response()->json(['message' => 'Cliente no encontrado', 'status' => 404], 404);
    }

    private function dato($id)
    {
        return DB::table($this->tabla)->where($this->clave, $id)->first();
    }
}
