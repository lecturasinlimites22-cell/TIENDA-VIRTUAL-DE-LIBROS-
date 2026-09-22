<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class DetalleVentaControlador extends Controller
{
    private $tabla = 'detalle_venta';

    private $clave = 'id_detalle';

    private function reglas()
    {
        return ['id_venta' => 'required|integer', 'id_libro' => 'required|integer', 'cantidad' => 'required|integer', 'precio_unitario' => 'required|numeric'];
    }

    public function index()
    {
        $datos = DB::table($this->tabla)->get();

        return $datos->isEmpty() ? response()->json(['message' => 'No hay detalles de venta registrados', 'status' => 404], 404) : response()->json($datos, 200);
    }

    public function store(Request $request)
    {
        $v = Validator::make($request->all(), $this->reglas());
        if ($v->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $v->errors(), 'status' => 400], 400);
        } $id = DB::table($this->tabla)->insertGetId($request->only('id_venta', 'id_libro', 'cantidad', 'precio_unitario'), $this->clave);

        return response()->json(['message' => 'Detalle de venta creado exitosamente', 'detalle' => $this->dato($id), 'status' => 201], 201);
    }

    public function show($id_detalle)
    {
        $dato = $this->dato($id_detalle);

        return $dato ? response()->json($dato, 200) : response()->json(['message' => 'Detalle de venta no encontrado', 'status' => 404], 404);
    }

    public function update(Request $request, $id_detalle)
    {
        if (! $this->dato($id_detalle)) {
            return response()->json(['message' => 'Detalle de venta no encontrado', 'status' => 404], 404);
        } $v = Validator::make($request->all(), $this->reglas());
        if ($v->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $v->errors(), 'status' => 400], 400);
        } DB::table($this->tabla)->where($this->clave, $id_detalle)->update($request->only('id_venta', 'id_libro', 'cantidad', 'precio_unitario'));

        return response()->json(['message' => 'Detalle de venta actualizado exitosamente', 'detalle' => $this->dato($id_detalle), 'status' => 200], 200);
    }

    public function destroy($id_detalle)
    {
        return DB::table($this->tabla)->where($this->clave, $id_detalle)->delete() ? response()->json(['message' => 'Detalle de venta eliminado exitosamente', 'status' => 200], 200) : response()->json(['message' => 'Detalle de venta no encontrado', 'status' => 404], 404);
    }

    private function dato($id)
    {
        return DB::table($this->tabla)->where($this->clave, $id)->first();
    }
}
