<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class rolesModelos extends Model
{
    use HasFactory;

    protected $table = 'rol';
    public $timestamps = false;
    protected $primaryKey = 'id_rol';
    public $incrementing = true;
    protected $keyType = 'int';
    protected $fillable = [
        'nombre',
        'descripcion'
    ];

    public function usuarios()
    {
        return $this->belongsToMany(
            usuarioModelos::class,
            'rol_usuario',
            'id_rol',
            'id_usuario'
        );
    }
}