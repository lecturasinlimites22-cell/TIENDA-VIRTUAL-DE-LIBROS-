<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LibroAutor extends Model
{
    use HasFactory;

    protected $table = 'libro_autor';
    protected $primaryKey = 'id_libro';
    public $timestamps = false;
    public $incrementing = false;

    protected $fillable = [
        'id_libro',
        'id_autor',
    ];

    public function libro()
    {
        return $this->belongsTo(Libro::class, 'id_libro', 'id_libro');
    }

    public function autor()
    {
        return $this->belongsTo(Autor::class, 'id_autor', 'id_autor');
    }
}