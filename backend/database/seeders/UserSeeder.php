<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Juan Vendedor',
            'email' => 'juan@crm.cl',
            'password' => Hash::make('password'),
            'rut' => '11.111.111-1',
            'role' => 'vendedor'
        ]);

        User::create([
            'name' => 'Ana Vendedora',
            'email' => 'ana@crm.cl',
            'password' => Hash::make('password'),
            'rut' => '22.222.222-2',
            'role' => 'vendedor'
        ]);

        User::create([
            'name' => 'Carlos Supervisor',
            'email' => 'super@crm.cl',
            'password' => Hash::make('password'),
            'rut' => '33.333.333-3',
            'role' => 'supervisor'
        ]);

        User::create([
            'name' => 'Paulina Bateman',
            'email' => 'paulina@crm.cl',
            'password' => Hash::make('password'),
            'rut' => '44.444.444-4',
            'role' => 'back_office'
        ]);

        User::create([
            'name' => 'Yasmin Baeza',
            'email' => 'yasmin@crm.cl',
            'password' => Hash::make('password'),
            'rut' => '55.555.555-5',
            'role' => 'back_office'
        ]);

        User::create([
            'name' => 'Don Jefe',
            'email' => 'jefe@crm.cl',
            'password' => Hash::make('password'),
            'rut' => '66.666.666-6',
            'role' => 'jefe'
        ]);
    }
}
