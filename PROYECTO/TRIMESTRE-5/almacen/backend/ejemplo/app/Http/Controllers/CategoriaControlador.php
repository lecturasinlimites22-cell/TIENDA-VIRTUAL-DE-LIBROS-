<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CategoriaControlador extends Controller
{
    private $tabla = 'categoria';

    private $clave = 'id_categoria';

    public function index()
    {
        return $this->listar('categorias');
    }

    public function store(Request $request)
    {
        return $this->crear($request, ['nombre' => 'required|string|max:100', 'descripcion' => 'nullable|string|max:200'], 'Categoria', ['nombre', 'descripcion']);
    }

    public function show($id_categoria)
    {
        return $this->mostrar($id_categoria, 'Categoria');
    }

    public function update(Request $request, $id_categoria)
    {
        return $this->editar($request, $id_categoria, ['nombre' => 'required|string|max:100', 'descripcion' => 'nullable|string|max:200'], 'Categoria', ['nombre', 'descripcion']);
    }

    public function destroy($id_categoria)
    {
        return $this->eliminar($id_categoria, 'Categoria');
    }

    private function listar($plural)
    {
        $datos = DB::table($this->tabla)->get();

        return $datos->isEmpty() ? response()->json(['message' => "No hay {$plural} registradas", 'status' => 404], 404) : response()->json($datos, 200);
    }

    private function validar(Request $request, array $reglas)
    {
        $validator = Validator::make($request->all(), $reglas);

        return $validator->fails() ? response()->json(['message' => 'Error de validación', 'errors' => $validator->errors(), 'status' => 400], 400) : null;
    }

    private function crear(Request $request, array $reglas, $nombre, array $campos)
    {
        if ($error = $this->validar($request, $reglas)) {
            return $error;
        } $id = DB::table($this->tabla)->insertGetId($request->only($campos), $this->clave);

        return response()->json(['message' => "{$nombre} creada exitosamente", 'registro' => $this->dato($id), 'status' => 201], 201);
    }

    private function mostrar($id, $nombre)
    {
        $dato = $this->dato($id);

        return $dato ? response()->json($dato, 200) : response()->json(['message' => "{$nombre} no encontrada", 'status' => 404], 404);
    }

    private function editar(Request $request, $id, array $reglas, $nombre, array $campos)
    {
        if (! $this->dato($id)) {
            return response()->json(['message' => "{$nombre} no encontrada", 'status' => 404], 404);
        } if ($error = $this->validar($request, $reglas)) {
            return $error;
        } DB::table($this->tabla)->where($this->clave, $id)->update($request->only($campos));

        return response()->json(['message' => "{$nombre} actualizada exitosamente", 'registro' => $this->dato($id), 'status' => 200], 200);
    }

    private function eliminar($id, $nombre)
    {
        return DB::table($this->tabla)->where($this->clave, $id)->delete() ? response()->json(['message' => "{$nombre} eliminada exitosamente", 'status' => 200], 200) : response()->json(['message' => "{$nombre} no encontrada", 'status' => 404], 404);
    }

    private function dato($id)
    {
        return DB::table($this->tabla)->where($this->clave, $id)->first();
    }
}
