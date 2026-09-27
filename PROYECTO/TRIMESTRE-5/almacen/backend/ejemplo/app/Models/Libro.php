<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Libro extends Model
{
    use HasFactory;

    protected $table = 'libro';
    protected $primaryKey = 'id_libro';
    public $timestamps = false;

    protected $fillable = [
        'titulo',
        'precio',
        'stock',
        'id_categoria',
        'id_editorial',
    ];

    protected $casts = [
        'precio' => 'decimal:2',
        'stock' => 'integer',
    ];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'id_categoria', 'id_categoria');
    }

    public function editorial()
    {
        return $this->belongsTo(Editorial::class, 'id_editorial', 'id_editorial');
    }

    public function autores()
    {
        return $this->belongsToMany(Autor::class, 'libro_autor', 'id_libro', 'id_autor');
    }

    public function detallesVenta()
    {
        return $this->hasMany(DetalleVenta::class, 'id_libro', 'id_libro');
    }
}