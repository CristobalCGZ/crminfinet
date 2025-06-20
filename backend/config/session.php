<?php

use Illuminate\Support\Str;

return [

    'driver' => env('SESSION_DRIVER', 'database'),

    'lifetime' => (int) env('SESSION_LIFETIME', 60),

    'expire_on_close' => true,

    'encrypt' => env('SESSION_ENCRYPT', false),

    'connection' => env('SESSION_CONNECTION'),

    'table' => env('SESSION_TABLE', 'sessions'),

    'store' => env('SESSION_STORE'),

    'lottery' => [2, 100],

    'cookie' => env(
        'SESSION_COOKIE',
        Str::slug(env('APP_NAME', 'laravel'), '_').'_session'
    ),

    'path' => env('SESSION_PATH', '/'),

    'domain' => 'localhost',

    'secure' => false,

    'http_only' => env('SESSION_HTTP_ONLY', true),

    'same_site' => 'lax',

    'partitioned' => env('SESSION_PARTITIONED_COOKIE', false),

];
