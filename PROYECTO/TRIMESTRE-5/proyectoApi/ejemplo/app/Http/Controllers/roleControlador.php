<?php

namespace App\Http\Controllers;

use App\Models\rolesModelos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class roleControlador extends Controller
{
    public function index()
    {
        $Roles = rolesModelos::all();

        if ($Roles->isEmpty()) {
            return response()->json([
                'message' => 'No hay roles registrados',
                'status' => 404,
            ], 404);
        }

        return response()->json($Roles, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required',
            'descripcion' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors(),
                'status' => 400,
            ], 400);
        }

        $rol = rolesModelos::create([
            'nombre' => $request->input('nombre'),
            'descripcion' => $request->input('descripcion'),
        ]);

        return response()->json([
            'message' => 'Rol creado exitosamente',
            'rol' => $rol,
            'status' => 201,
        ], 201);
    }

    public function show($id)
    {
        $rol = rolesModelos::find($id);

        if (! $rol) {
            return response()->json([
                'message' => 'Rol no encontrado',
                'status' => 404,
            ], 404);
        }

        return response()->json($rol, 200);
    }

    public function update(Request $request, $id)
    {
        $rol = rolesModelos::find($id);

        if (! $rol) {
            return response()->json([
                'message' => 'Rol no encontrado',
                'status' => 404,
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'nombre' => 'required',
            'descripcion' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors(),
                'status' => 400,
            ], 400);
        }

        $rol->nombre = $request->input('nombre');
        $rol->descripcion = $request->input('descripcion');
        $rol->save();

        return response()->json([
            'message' => 'Rol actualizado exitosamente',
            'rol' => $rol,
            'status' => 200,
        ], 200);
    }

    public function destroy($id)
    {
        $rol = rolesModelos::find($id);

        if (! $rol) {
            return response()->json([
                'message' => 'Rol no encontrado',
                'status' => 404,
            ], 404);
        }

        $rol->delete();

        return response()->json([
            'message' => 'Rol eliminado exitosamente',
            'status' => 200,
        ], 200);
    }
}
