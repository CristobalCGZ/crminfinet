<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Venta;

class VentaPolicy
{
    public function view(User $user, Venta $venta): bool
    {
        return
            $user->isAdmin() ||
            $user->isGerente() ||
            ($user->isSupervisor() && $venta->supervisor_id === $user->id) ||
            ($user->isBackOffice()) ||
            ($user->isVendedor() && $venta->vendedor_id === $user->id);
    }
}
