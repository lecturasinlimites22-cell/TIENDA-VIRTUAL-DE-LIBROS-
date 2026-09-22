<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Editorial extends Model
{
    use HasFactory;

    protected $table = 'editorial';
    protected $primaryKey = 'id_editorial';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'pais',
    ];

    public function libros()
    {
        return $this->hasMany(Libro::class, 'id_editorial', 'id_editorial');
    }
}