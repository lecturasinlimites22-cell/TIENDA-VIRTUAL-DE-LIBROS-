<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class EditorialControlador extends Controller
{
    private $tabla = 'editorial';

    private $clave = 'id_editorial';

    private function reglas()
    {
        return ['nombre' => 'required|string|max:100', 'pais' => 'nullable|string|max:50'];
    }

    public function index()
    {
        $datos = DB::table($this->tabla)->get();

        return $datos->isEmpty() ? response()->json(['message' => 'No hay editoriales registradas', 'status' => 404], 404) : response()->json($datos, 200);
    }

    public function store(Request $request)
    {
        $v = Validator::make($request->all(), $this->reglas());
        if ($v->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $v->errors(), 'status' => 400], 400);
        } $id = DB::table($this->tabla)->insertGetId($request->only('nombre', 'pais'), $this->clave);

        return response()->json(['message' => 'Editorial creada exitosamente', 'editorial' => $this->dato($id), 'status' => 201], 201);
    }

    public function show($id_editorial)
    {
        $dato = $this->dato($id_editorial);

        return $dato ? response()->json($dato, 200) : response()->json(['message' => 'Editorial no encontrada', 'status' => 404], 404);
    }

    public function update(Request $request, $id_editorial)
    {
        if (! $this->dato($id_editorial)) {
            return response()->json(['message' => 'Editorial no encontrada', 'status' => 404], 404);
        } $v = Validator::make($request->all(), $this->reglas());
        if ($v->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $v->errors(), 'status' => 400], 400);
        } DB::table($this->tabla)->where($this->clave, $id_editorial)->update($request->only('nombre', 'pais'));

        return response()->json(['message' => 'Editorial actualizada exitosamente', 'editorial' => $this->dato($id_editorial), 'status' => 200], 200);
    }

    public function destroy($id_editorial)
    {
        return DB::table($this->tabla)->where($this->clave, $id_editorial)->delete() ? response()->json(['message' => 'Editorial eliminada exitosamente', 'status' => 200], 200) : response()->json(['message' => 'Editorial no encontrada', 'status' => 404], 404);
    }

    private function dato($id)
    {
        return DB::table($this->tabla)->where($this->clave, $id)->first();
    }
}
