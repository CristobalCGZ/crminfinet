<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * Las URIs que deben ser excluidas de verificación CSRF.
     */
    protected $except = [
        'api/login',
    ];
}
