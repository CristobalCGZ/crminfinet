<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Venta extends Model
{
    protected $fillable = [
        'tipo',
        'vendedor_id',
        'supervisor_id',
        'aprobado_por_id',
        'estado',
        'datos_empresa',
        'datos_moviles',
        'datos_fijos',
        'documentos_adjuntos',
    ];

    protected $casts = [
        'datos_empresa' => 'array',
        'datos_moviles' => 'array',
        'datos_fijos' => 'array',
        'documentos_adjuntos' => 'array',
    ];

    public function vendedor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'vendedor_id');
    }

    public function supervisor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'supervisor_id');
    }

    public function aprobadoPor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'aprobado_por_id');
    }

    public function documentos(): HasMany
    {
        return $this->hasMany(Documento::class);
    }

}
