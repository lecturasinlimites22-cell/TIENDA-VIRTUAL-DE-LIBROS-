<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RolUsuario extends Model
{
    use HasFactory;

    protected $table = 'rol_usuario';
    protected $primaryKey = 'id_rol';
    public $timestamps = false;
    public $incrementing = false;

    protected $fillable = [
        'id_rol',
        'id_usuario',
    ];

    public function rol()
    {
        return $this->belongsTo(rolesModelos::class, 'id_rol', 'id_rol');
    }

    public function usuario()
    {
        return $this->belongsTo(usuarioModelos::class, 'id_usuario', 'id_usuario');
    }
}