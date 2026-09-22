<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PagoControlador extends Controller
{
    private $tabla = 'pago';

    private $clave = 'id_pago';

    private function reglas()
    {
        return ['id_venta' => 'required|integer', 'id_metodo_pago' => 'required|integer', 'monto' => 'required|numeric', 'fecha_pago' => 'nullable|date'];
    }

    public function index()
    {
        $datos = DB::table($this->tabla)->get();

        return $datos->isEmpty() ? response()->json(['message' => 'No hay pagos registrados', 'status' => 404], 404) : response()->json($datos, 200);
    }

    public function store(Request $request)
    {
        $v = Validator::make($request->all(), $this->reglas());
        if ($v->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $v->errors(), 'status' => 400], 400);
        } $id = DB::table($this->tabla)->insertGetId($request->only('id_venta', 'id_metodo_pago', 'monto', 'fecha_pago'), $this->clave);

        return response()->json(['message' => 'Pago creado exitosamente', 'pago' => $this->dato($id), 'status' => 201], 201);
    }

    public function show($id_pago)
    {
        $dato = $this->dato($id_pago);

        return $dato ? response()->json($dato, 200) : response()->json(['message' => 'Pago no encontrado', 'status' => 404], 404);
    }

    public function update(Request $request, $id_pago)
    {
        if (! $this->dato($id_pago)) {
            return response()->json(['message' => 'Pago no encontrado', 'status' => 404], 404);
        } $v = Validator::make($request->all(), $this->reglas());
        if ($v->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $v->errors(), 'status' => 400], 400);
        } DB::table($this->tabla)->where($this->clave, $id_pago)->update($request->only('id_venta', 'id_metodo_pago', 'monto', 'fecha_pago'));

        return response()->json(['message' => 'Pago actualizado exitosamente', 'pago' => $this->dato($id_pago), 'status' => 200], 200);
    }

    public function destroy($id_pago)
    {
        return DB::table($this->tabla)->where($this->clave, $id_pago)->delete() ? response()->json(['message' => 'Pago eliminado exitosamente', 'status' => 200], 200) : response()->json(['message' => 'Pago no encontrado', 'status' => 404], 404);
    }

    private function dato($id)
    {
        return DB::table($this->tabla)->where($this->clave, $id)->first();
    }
}
