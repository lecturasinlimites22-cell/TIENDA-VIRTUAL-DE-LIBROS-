<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class usuarioModelos extends Authenticatable implements JWTSubject
{
    use HasFactory;

    protected $table = 'usuario';
    public $timestamps = false;
    protected $primaryKey = 'id_usuario';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'id_usuario',
        'username',
        'password',
        'correo'
    ];

    protected $hidden = [
        'password'
    ];

    // Relación con roles a través de rol_usuario
    public function roles()
    {
        return $this->belongsToMany(
            rolesModelos::class,
            'rol_usuario',
            'id_usuario',
            'id_rol'
        );
    }

    // JWT
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'id_usuario' => $this->id_usuario,
            'username' => $this->username,
            'correo' => $this->correo,
            'roles' => $this->roles->pluck('nombre')->toArray(),
        ];
    }
}