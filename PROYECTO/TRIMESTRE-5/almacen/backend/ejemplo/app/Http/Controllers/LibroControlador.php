<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class LibroControlador extends Controller
{
    private $tabla = 'libro';

    private $clave = 'id_libro';

    private function reglas()
    {
        return ['titulo' => 'required|string|max:100', 'precio' => 'required|numeric', 'stock' => 'required|integer', 'id_categoria' => 'nullable|integer', 'id_editorial' => 'nullable|integer'];
    }

    public function index()
    {
        $datos = DB::table($this->tabla)->get();

        return $datos->isEmpty() ? response()->json(['message' => 'No hay libros registrados', 'status' => 404], 404) : response()->json($datos, 200);
    }

    public function store(Request $request)
    {
        $v = Validator::make($request->all(), $this->reglas());
        if ($v->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $v->errors(), 'status' => 400], 400);
        } $id = DB::table($this->tabla)->insertGetId($request->only('titulo', 'precio', 'stock', 'id_categoria', 'id_editorial'), $this->clave);

        return response()->json(['message' => 'Libro creado exitosamente', 'libro' => $this->dato($id), 'status' => 201], 201);
    }

    public function show($id_libro)
    {
        $dato = $this->dato($id_libro);

        return $dato ? response()->json($dato, 200) : response()->json(['message' => 'Libro no encontrado', 'status' => 404], 404);
    }

    public function update(Request $request, $id_libro)
    {
        if (! $this->dato($id_libro)) {
            return response()->json(['message' => 'Libro no encontrado', 'status' => 404], 404);
        } $v = Validator::make($request->all(), $this->reglas());
        if ($v->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $v->errors(), 'status' => 400], 400);
        } DB::table($this->tabla)->where($this->clave, $id_libro)->update($request->only('titulo', 'precio', 'stock', 'id_categoria', 'id_editorial'));

        return response()->json(['message' => 'Libro actualizado exitosamente', 'libro' => $this->dato($id_libro), 'status' => 200], 200);
    }

    public function destroy($id_libro)
    {
        return DB::table($this->tabla)->where($this->clave, $id_libro)->delete() ? response()->json(['message' => 'Libro eliminado exitosamente', 'status' => 200], 200) : response()->json(['message' => 'Libro no encontrado', 'status' => 404], 404);
    }

    private function dato($id)
    {
        return DB::table($this->tabla)->where($this->clave, $id)->first();
    }
}
