<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UsuarioControlador extends Controller
{
    private $tabla = 'usuario';

    private $clave = 'id_usuario';

    private function reglas()
    {
        return ['username' => 'required|string|max:50', 'password' => 'required|string|max:255', 'correo' => 'nullable|email|max:100'];
    }

    public function index()
    {
        $datos = DB::table($this->tabla)->get();

        return $datos->isEmpty() ? response()->json([
            'message' => 'No hay usuarios registrados', 
        'status' => 404], 404) : response()->json($datos, 200);
    }

    public function store(Request $request)
    {
        $v = Validator::make($request->all(), $this->reglas());
        if ($v->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $v->errors(), 'status' => 400], 400);
        } $id = DB::table($this->tabla)->insertGetId($request->only('username', 'password', 'correo'), $this->clave);

        return response()->json(['message' => 'Usuario creado exitosamente', 'usuario' => $this->dato($id), 'status' => 201], 201);
    }

    public function show($id_usuario)
    {
        $dato = $this->dato($id_usuario);

        return $dato ? response()->json($dato, 200) : response()->json(['message' => 'Usuario no encontrado', 'status' => 404], 404);
    }

    public function update(Request $request, $id_usuario)
    {
        if (! $this->dato($id_usuario)) {
            return response()->json(['message' => 'Usuario no encontrado', 'status' => 404], 404);
        } $v = Validator::make($request->all(), $this->reglas());
        if ($v->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $v->errors(), 'status' => 400], 400);
        } DB::table($this->tabla)->where($this->clave, $id_usuario)->update($request->only('username', 'password', 'correo'));

        return response()->json(['message' => 'Usuario actualizado exitosamente', 'usuario' => $this->dato($id_usuario), 'status' => 200], 200);
    }

    public function destroy($id_usuario)
    {
        return DB::table($this->tabla)->where($this->clave, $id_usuario)->delete() ? response()->json(['message' => 'Usuario eliminado exitosamente', 'status' => 200], 200) : response()->json(['message' => 'Usuario no encontrado', 'status' => 404], 404);
    }

    private function dato($id)
    {
        return DB::table($this->tabla)->where($this->clave, $id)->first();
    }
}
