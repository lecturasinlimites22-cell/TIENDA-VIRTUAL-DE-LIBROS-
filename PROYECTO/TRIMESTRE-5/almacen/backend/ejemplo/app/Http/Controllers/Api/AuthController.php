<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\usuarioModelos;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validar los datos de entrada
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string|min:3',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = usuarioModelos::where('username', $request->username)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Usuario no encontrado'
            ], 401);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Contraseña incorrecta'
            ], 401);
        }
       
        try {
            // Generar el token JWT
            $token = app(\Tymon\JWTAuth\JWTAuth::class)->fromUser($user);
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'No se pudo crear el token'
            ], 500);
        }

        $user->load('roles');

        $responseData = [
            'success' => true,
            'data' => [
                'user' => [
                    'id_usuario' => $user->id_usuario,
                    'username' => $user->username,
                    'correo' => $user->correo,
                    'roles' => $user->roles->map(function ($rol) {
                        return [
                            'id_rol' => $rol->id_rol,
                            'nombre' => $rol->nombre,
                        ];
                    }),
                ]
            ],
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
        ];

        $cookie = Cookie::make(
        'jwt_token',
        $token,
        auth('api')->factory()->getTTL(),
        '/',
        null,
        false,
        true,
        false,
        'lax'
    );

    
 
   
        return response()->json($responseData)->withCookie($cookie);
    }

    public function logout(Request $request)
    {
        try {
            $jwt = app(\Tymon\JWTAuth\JWTAuth::class);

            // Intentar obtener el token desde el header Authorization
            $token = $jwt->setRequest($request)->getToken();

            if (!$token) {
                return response()->json([
                    'success' => false,
                    'message' => 'No hay sesión activa'
                ], 400);
            }

            // Invalidar el token en la blacklist
            $jwt->invalidate($token);

            $cookie = Cookie::forget('jwt_token');

            return response()->json([
                'success' => true,
                'message' => 'Sesión cerrada correctamente'
            ], 200)->withCookie($cookie);

        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Token inválido o ya expirado'
            ], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json([
                'success' => false,
                'message' => 'El token ya expiró'
            ], 401);
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'No se pudo cerrar la sesión: ' . $e->getMessage()
            ], 500);
        }
    }

    public function me()
    {
        $user = auth('api')->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Usuario no autenticado'
            ], 401);
        }

        $user->load('roles');

        return response()->json([
            'success' => true,
            'data' => [
                'user' => [
                    'id_usuario' => $user->id_usuario,
                    'username' => $user->username,
                    'correo' => $user->correo,
                    'roles' => $user->roles->map(function ($rol) {
                        return [
                            'id_rol' => $rol->id_rol,
                            'nombre' => $rol->nombre,
                        ];
                    }),
                ]
            ]
        ]);
    }

    public function refresh(Request $request)
    {
        try {
            $jwt = app(\Tymon\JWTAuth\JWTAuth::class);
                $token = $jwt->refresh($jwt->getToken());
            
            $cookie = Cookie::make(
                'jwt_token',
                $token,
                auth()->factory()->getTTL(),
                '/',
                null,
                false,
                true,
                false,
                'lax'
            );
            return response()->json([
                'success' => true,
                'data' => [
                    'token' => $token,
                    'token_type' => 'bearer',
                    'expires_in' => auth()->factory()->getTTL() * 60,
                ]
            ], 200)->withCookie($cookie);
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'No se pudo refrescar el token' . $e->getMessage()
            ], 500);
            }
    }

    //Fucion para ingresar con el login y contraseña, y generar el token JWT
}
