<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class MetodoPagoControlador extends Controller
{
    private $tabla = 'metodo_pago';

    private $clave = 'id_metodo_pago';

    private function reglas()
    {
        return ['nombre' => 'required|string|max:50'];
    }

    public function index()
    {
        $datos = DB::table($this->tabla)->get();

        return $datos->isEmpty() ? response()->json(['message' => 'No hay metodos de pago registrados', 'status' => 404], 404) : response()->json($datos, 200);
    }

    public function store(Request $request)
    {
        $v = Validator::make($request->all(), $this->reglas());
        if ($v->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $v->errors(), 'status' => 400], 400);
        } $id = DB::table($this->tabla)->insertGetId($request->only('nombre'), $this->clave);

        return response()->json(['message' => 'Metodo de pago creado exitosamente', 'metodo_pago' => $this->dato($id), 'status' => 201], 201);
    }

    public function show($id_metodo_pago)
    {
        $dato = $this->dato($id_metodo_pago);

        return $dato ? response()->json($dato, 200) : response()->json(['message' => 'Metodo de pago no encontrado', 'status' => 404], 404);
    }

    public function update(Request $request, $id_metodo_pago)
    {
        if (! $this->dato($id_metodo_pago)) {
            return response()->json(['message' => 'Metodo de pago no encontrado', 'status' => 404], 404);
        } $v = Validator::make($request->all(), $this->reglas());
        if ($v->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $v->errors(), 'status' => 400], 400);
        } DB::table($this->tabla)->where($this->clave, $id_metodo_pago)->update($request->only('nombre'));

        return response()->json(['message' => 'Metodo de pago actualizado exitosamente', 'metodo_pago' => $this->dato($id_metodo_pago), 'status' => 200], 200);
    }

    public function destroy($id_metodo_pago)
    {
        return DB::table($this->tabla)->where($this->clave, $id_metodo_pago)->delete() ? response()->json(['message' => 'Metodo de pago eliminado exitosamente', 'status' => 200], 200) : response()->json(['message' => 'Metodo de pago no encontrado', 'status' => 404], 404);
    }

    private function dato($id)
    {
        return DB::table($this->tabla)->where($this->clave, $id)->first();
    }
}
