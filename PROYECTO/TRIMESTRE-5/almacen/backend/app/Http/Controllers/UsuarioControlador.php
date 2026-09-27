<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UsuarioControlador extends Controller
{
    private $tabla = 'usuario';
    private $clave = 'id_usuario';

    public function index()
    {
        return response()->json(DB::table($this->tabla)->select(
            'id_usuario', 'username', 'correo', 'nombre', 'telefono', 'direccion'
        )->get(), 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => ['required', 'string', 'max:50', Rule::unique($this->tabla, 'username')],
            'password' => 'required|string|min:6|max:255',
            'correo' => ['required', 'email', 'max:100', Rule::unique($this->tabla, 'correo')],
            'nombre' => 'nullable|string|max:100',
            'telefono' => 'nullable|string|max:15',
            'direccion' => 'nullable|string|max:150',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'Revisa los datos ingresados.', 'errors' => $validator->errors()], 422);
        }

        $id = DB::table($this->tabla)->insertGetId([
            'username' => $request->input('username'),
            'password' => Hash::make($request->input('password')),
            'correo' => $request->input('correo'),
            'nombre' => $request->input('nombre'),
            'telefono' => $request->input('telefono'),
            'direccion' => $request->input('direccion'),
        ], $this->clave);

        return response()->json(['message' => 'Usuario creado exitosamente', 'usuario' => $this->dato($id)], 201);
    }

    public function show($id_usuario)
    {
        $dato = $this->dato($id_usuario);
        return $dato ? response()->json($dato, 200) : response()->json(['message' => 'Usuario no encontrado'], 404);
    }

    public function update(Request $request, $id_usuario)
    {
        if (! $this->dato($id_usuario)) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $validator = Validator::make($request->all(), [
            'username' => ['sometimes', 'required', 'string', 'max:50', Rule::unique($this->tabla, 'username')->ignore($id_usuario, $this->clave)],
            'password' => 'sometimes|required|string|min:6|max:255',
            'correo' => ['sometimes', 'required', 'email', 'max:100', Rule::unique($this->tabla, 'correo')->ignore($id_usuario, $this->clave)],
            'nombre' => 'sometimes|nullable|string|max:100',
            'telefono' => 'sometimes|nullable|string|max:15',
            'direccion' => 'sometimes|nullable|string|max:150',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'Revisa los datos ingresados.', 'errors' => $validator->errors()], 422);
        }

        $datos = $request->only('username', 'password', 'correo', 'nombre', 'telefono', 'direccion');
        if (isset($datos['password'])) {
            $datos['password'] = Hash::make($datos['password']);
        }
        DB::table($this->tabla)->where($this->clave, $id_usuario)->update($datos);

        return response()->json(['message' => 'Usuario actualizado exitosamente', 'usuario' => $this->dato($id_usuario)], 200);
    }

    public function updateProfile(Request $request)
    {
        $user = auth('api')->user();
        if (! $user) {
            return response()->json(['message' => 'Inicia sesión para actualizar tu perfil.'], 401);
        }

        $id = $user->id_usuario;
        $validator = Validator::make($request->all(), [
            'username' => ['required', 'string', 'max:50', Rule::unique($this->tabla, 'username')->ignore($id, $this->clave)],
            'correo' => ['required', 'email', 'max:100', Rule::unique($this->tabla, 'correo')->ignore($id, $this->clave)],
            'nombre' => 'required|string|max:100',
            'telefono' => 'nullable|string|max:15',
            'direccion' => 'nullable|string|max:150',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'Revisa los datos ingresados.', 'errors' => $validator->errors()], 422);
        }

        DB::table($this->tabla)->where($this->clave, $id)->update($request->only(
            'username', 'correo', 'nombre', 'telefono', 'direccion'
        ));

        return response()->json([
            'success' => true,
            'message' => 'Perfil actualizado en la base de datos.',
            'usuario' => $this->dato($id),
        ], 200);
    }

    public function destroy($id_usuario)
    {
        return DB::table($this->tabla)->where($this->clave, $id_usuario)->delete()
            ? response()->json(['message' => 'Usuario eliminado exitosamente'], 200)
            : response()->json(['message' => 'Usuario no encontrado'], 404);
    }

    private function dato($id)
    {
        return DB::table($this->tabla)->select(
            'id_usuario', 'username', 'correo', 'nombre', 'telefono', 'direccion'
        )->where($this->clave, $id)->first();
    }
}