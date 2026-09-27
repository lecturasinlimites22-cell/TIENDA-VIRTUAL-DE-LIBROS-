<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class EmpleadoControlador extends Controller
{
    private $tabla = 'empleado';

    private $clave = 'id_empleado';

    private function reglas()
    {
        return ['nombre' => 'required|string|max:100', 'apellido' => 'nullable|string|max:100', 'telefono' => 'nullable|string|max:15', 'cargo' => 'nullable|string|max:50', 'id_usuario' => 'nullable|integer'];
    }

    public function index()
    {
        $datos = DB::table($this->tabla)->get();

        return $datos->isEmpty() ? response()->json(['message' => 'No hay empleados registrados', 'status' => 404], 404) : response()->json($datos, 200);
    }

    public function store(Request $request)
    {
        $v = Validator::make($request->all(), $this->reglas());
        if ($v->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $v->errors(), 'status' => 400], 400);
        } $id = DB::table($this->tabla)->insertGetId($request->only('nombre', 'apellido', 'telefono', 'cargo', 'id_usuario'), $this->clave);

        return response()->json(['message' => 'Empleado creado exitosamente', 'empleado' => $this->dato($id), 'status' => 201], 201);
    }

    public function show($id_empleado)
    {
        $dato = $this->dato($id_empleado);

        return $dato ? response()->json($dato, 200) : response()->json(['message' => 'Empleado no encontrado', 'status' => 404], 404);
    }

    public function update(Request $request, $id_empleado)
    {
        if (! $this->dato($id_empleado)) {
            return response()->json(['message' => 'Empleado no encontrado', 'status' => 404], 404);
        } $v = Validator::make($request->all(), $this->reglas());
        if ($v->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $v->errors(), 'status' => 400], 400);
        } DB::table($this->tabla)->where($this->clave, $id_empleado)->update($request->only('nombre', 'apellido', 'telefono', 'cargo', 'id_usuario'));

        return response()->json(['message' => 'Empleado actualizado exitosamente', 'empleado' => $this->dato($id_empleado), 'status' => 200], 200);
    }

    public function destroy($id_empleado)
    {
        return DB::table($this->tabla)->where($this->clave, $id_empleado)->delete() ? response()->json(['message' => 'Empleado eliminado exitosamente', 'status' => 200], 200) : response()->json(['message' => 'Empleado no encontrado', 'status' => 404], 404);
    }

    private function dato($id)
    {
        return DB::table($this->tabla)->where($this->clave, $id)->first();
    }
}
