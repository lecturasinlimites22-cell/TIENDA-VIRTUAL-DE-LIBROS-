<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class RolUsuarioControlador extends Controller
{
    private $tabla = 'rol_usuario';

    private $clave = 'id_rol';

    private function reglas()
    {
        return ['id_rol' => 'required|integer', 'id_usuario' => 'required|integer'];
    }

    public function index()
    {
        $datos = DB::table($this->tabla)->get();

        return $datos->isEmpty() ? response()->json(['message' => 'No hay relaciones rol-usuario registradas', 'status' => 404], 404) : response()->json($datos, 200);
    }

    public function store(Request $request)
    {
        $v = Validator::make($request->all(), $this->reglas());
        if ($v->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $v->errors(), 'status' => 400], 400);
        } DB::table($this->tabla)->insert($request->only('id_rol', 'id_usuario'));

        return response()->json(['message' => 'Relacion rol-usuario creada exitosamente', 'status' => 201], 201);
    }

    public function show($id_rol)
    {
        $dato = DB::table($this->tabla)->where($this->clave, $id_rol)->first();

        return $dato ? response()->json($dato, 200) : response()->json(['message' => 'Relacion rol-usuario no encontrada', 'status' => 404], 404);
    }

    public function update(Request $request, $id_rol)
    {
        if (! DB::table($this->tabla)->where($this->clave, $id_rol)->first()) {
            return response()->json(['message' => 'Relacion rol-usuario no encontrada', 'status' => 404], 404);
        } $v = Validator::make($request->all(), $this->reglas());
        if ($v->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $v->errors(), 'status' => 400], 400);
        } DB::table($this->tabla)->where($this->clave, $id_rol)->update($request->only('id_usuario'));

        return response()->json(['message' => 'Relacion rol-usuario actualizada exitosamente', 'status' => 200], 200);
    }

    public function destroy($id_rol)
    {
        return DB::table($this->tabla)->where($this->clave, $id_rol)->delete() ? response()->json(['message' => 'Relacion rol-usuario eliminada exitosamente', 'status' => 200], 200) : response()->json(['message' => 'Relacion rol-usuario no encontrada', 'status' => 404], 404);
    }
}
