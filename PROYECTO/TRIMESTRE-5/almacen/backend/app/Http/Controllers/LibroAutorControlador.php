<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class LibroAutorControlador extends Controller
{
    private $tabla = 'libro_autor';

    private $clave = 'id_libro';

    private function reglas()
    {
        return ['id_libro' => 'required|integer', 'id_autor' => 'required|integer'];
    }

    public function index()
    {
        $datos = DB::table($this->tabla)->get();

        return $datos->isEmpty() ? response()->json(['message' => 'No hay relaciones libro-autor registradas', 'status' => 404], 404) : response()->json($datos, 200);
    }

    public function store(Request $request)
    {
        $v = Validator::make($request->all(), $this->reglas());
        if ($v->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $v->errors(), 'status' => 400], 400);
        } DB::table($this->tabla)->insert($request->only('id_libro', 'id_autor'));

        return response()->json(['message' => 'Relacion libro-autor creada exitosamente', 'status' => 201], 201);
    }

    public function show($id_libro)
    {
        $dato = DB::table($this->tabla)->where($this->clave, $id_libro)->first();

        return $dato ? response()->json($dato, 200) : response()->json(['message' => 'Relacion libro-autor no encontrada', 'status' => 404], 404);
    }

    public function update(Request $request, $id_libro)
    {
        if (! DB::table($this->tabla)->where($this->clave, $id_libro)->first()) {
            return response()->json(['message' => 'Relacion libro-autor no encontrada', 'status' => 404], 404);
        } $v = Validator::make($request->all(), $this->reglas());
        if ($v->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $v->errors(), 'status' => 400], 400);
        } DB::table($this->tabla)->where($this->clave, $id_libro)->update($request->only('id_autor'));

        return response()->json(['message' => 'Relacion libro-autor actualizada exitosamente', 'status' => 200], 200);
    }

    public function destroy($id_libro)
    {
        return DB::table($this->tabla)->where($this->clave, $id_libro)->delete() ? response()->json(['message' => 'Relacion libro-autor eliminada exitosamente', 'status' => 200], 200) : response()->json(['message' => 'Relacion libro-autor no encontrada', 'status' => 404], 404);
    }
}
