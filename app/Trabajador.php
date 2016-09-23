<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Trabajador extends Model
{
    protected $table = 'trabajadores';

    protected $fillable = ['cedula', 'nombre', 'apellido', 'email', 'activo', 'cargo_id'];

    protected $casts = [
        'activo' => 'boolean',
    ];

    public function cargo()
    {
        return $this->belongsTo(Cargo::class, 'cargo_id');
    }
}