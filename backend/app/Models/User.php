<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class User extends Authenticatable
{
    use Notifiable;

    public $rememberTokenName = false;

    protected $fillable = [
        'name',
        'rut',
        'email',
        'password',
        'codigo_vendedor',
        'rol',
        'supervisor_id',
    ];

    protected $hidden = [
        'password',
    ];

    public function supervisor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'supervisor_id');
    }

    public function vendedores(): HasMany
    {
        return $this->hasMany(User::class, 'supervisor_id');
    }

    public function ventas(): HasMany
    {
        return $this->hasMany(Venta::class, 'vendedor_id');
    }

    public function aprobaciones(): HasMany
    {
        return $this->hasMany(Venta::class, 'aprobado_por_id');
    }

    public function isVendedor(): bool
    {
        return $this->rol === 'vendedor';
    }

    public function isSupervisor(): bool
    {
        return $this->rol === 'supervisor';
    }

    public function isBackOffice(): bool
    {
        return $this->rol === 'backoffice';
    }

    public function isAdmin(): bool
    {
        return $this->rol === 'admin';
    }

    public function isGerente(): bool
    {
        return $this->rol === 'gerente';
    }

    public function documentosCreados(): HasMany
    {
        return $this->hasMany(Documento::class, 'usuario_id');
    }
}
