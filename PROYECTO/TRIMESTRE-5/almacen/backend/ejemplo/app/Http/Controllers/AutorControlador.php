<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AutorControlador extends Controller
{
    private $tabla = 'autor';

    private $clave = 'id_autor';

    public function index()
    {
        $autores = DB::table($this->tabla)->get();

        return $autores->isEmpty()
            ? response()->json(['message' => 'No hay autores registrados', 'status' => 404], 404)
            : response()->json($autores, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), ['nombre' => 'required|string|max:100']);
        if ($validator->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors(), 'status' => 400], 400);
        }
        $id = DB::table($this->tabla)->insertGetId($request->only('nombre'), $this->clave);

        return response()->json(['message' => 'Autor creado exitosamente', 'autor' => $this->showData($id), 'status' => 201], 201);
    }

    public function show($id_autor)
    {
        $registro = $this->showData($id_autor);

        return $registro ? response()->json($registro, 200) : response()->json(['message' => 'Autor no encontrado', 'status' => 404], 404);
    }

    public function update(Request $request, $id_autor)
    {
        if (! $this->showData($id_autor)) {
            return response()->json(['message' => 'Autor no encontrado', 'status' => 404], 404);
        }
        $validator = Validator::make($request->all(), ['nombre' => 'required|string|max:100']);
        if ($validator->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors(), 'status' => 400], 400);
        }
        DB::table($this->tabla)->where($this->clave, $id_autor)->update($request->only('nombre'));

        return response()->json(['message' => 'Autor actualizado exitosamente', 'autor' => $this->showData($id_autor), 'status' => 200], 200);
    }

    public function destroy($id_autor)
    {
        $eliminado = DB::table($this->tabla)->where($this->clave, $id_autor)->delete();

        return $eliminado ? response()->json(['message' => 'Autor eliminado exitosamente', 'status' => 200], 200) : response()->json(['message' => 'Autor no encontrado', 'status' => 404], 404);
    }

    private function showData($id)
    {
        return DB::table($this->tabla)->where($this->clave, $id)->first();
    }
}
