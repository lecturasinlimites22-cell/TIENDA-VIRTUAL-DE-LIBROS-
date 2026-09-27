<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class VentaControlador extends Controller
{
    private $tabla = 'venta';

    private $clave = 'id_venta';

    private function reglas()
    {
        return ['id_cliente' => 'nullable|integer', 'id_empleado' => 'nullable|integer', 'fecha' => 'nullable|date', 'total' => 'nullable|numeric'];
    }

    public function index()
    {
        $datos = DB::table($this->tabla)->get();

        return $datos->isEmpty() ? response()->json(['message' => 'No hay ventas registradas', 'status' => 404], 404) : response()->json($datos, 200);
    }

    public function store(Request $request)
    {
        $v = Validator::make($request->all(), $this->reglas());
        if ($v->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $v->errors(), 'status' => 400], 400);
        } $id = DB::table($this->tabla)->insertGetId($request->only('id_cliente', 'id_empleado', 'fecha', 'total'), $this->clave);

        return response()->json(['message' => 'Venta creada exitosamente', 'venta' => $this->dato($id), 'status' => 201], 201);
    }

    public function show($id_venta)
    {
        $dato = $this->dato($id_venta);

        return $dato ? response()->json($dato, 200) : response()->json(['message' => 'Venta no encontrada', 'status' => 404], 404);
    }

    public function update(Request $request, $id_venta)
    {
        if (! $this->dato($id_venta)) {
            return response()->json(['message' => 'Venta no encontrada', 'status' => 404], 404);
        } $v = Validator::make($request->all(), $this->reglas());
        if ($v->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $v->errors(), 'status' => 400], 400);
        } DB::table($this->tabla)->where($this->clave, $id_venta)->update($request->only('id_cliente', 'id_empleado', 'fecha', 'total'));

        return response()->json(['message' => 'Venta actualizada exitosamente', 'venta' => $this->dato($id_venta), 'status' => 200], 200);
    }

    public function destroy($id_venta)
    {
        return DB::table($this->tabla)->where($this->clave, $id_venta)->delete() ? response()->json(['message' => 'Venta eliminada exitosamente', 'status' => 200], 200) : response()->json(['message' => 'Venta no encontrada', 'status' => 404], 404);
    }

    private function dato($id)
    {
        return DB::table($this->tabla)->where($this->clave, $id)->first();
    }
}
