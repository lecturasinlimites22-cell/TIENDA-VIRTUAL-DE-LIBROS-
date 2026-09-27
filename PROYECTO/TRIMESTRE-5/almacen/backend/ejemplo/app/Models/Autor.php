<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Autor extends Model
{
    use HasFactory;

    protected $table = 'autor';
    protected $primaryKey = 'id_autor';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
    ];

    public function libros()
    {
        return $this->belongsToMany(Libro::class, 'libro_autor', 'id_autor', 'id_libro');
    }
}