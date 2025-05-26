<?php

namespace App\Http\Controllers;

use App\Models\Funnel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FunnelController extends Controller
{
    // Listar todos los funnels del usuario autenticado
    public function index()
    {
        $funnels = Funnel::where('user_id', Auth::id())->get();
        return response()->json($funnels);
    }

    // Crear un nuevo funnel
    public function store(Request $request)
    {
        $data = $request->validate([
            'cliente_rut' => 'required|string',
            'cliente_razon_social' => 'required|string',
            'segmento' => 'required|string',
            'lineas_portadas' => 'required|integer',
            'lineas_nuevas' => 'required|integer',
            'equipos' => 'required|boolean',
            'q_equipos' => 'required|integer',
            'riesgo' => 'required|string',
            'probabilidad_cierre' => 'required|string',
            'fecha_proxima_accion' => 'nullable|date',
            'comentarios' => 'nullable|string',
            'contacto_nombre' => 'nullable|string',
            'contacto_telefono' => 'nullable|string',
            'contacto_mail' => 'nullable|email',
            'cesion' => 'boolean',
            'comuna' => 'nullable|string',
            'donante' => 'nullable|string',
        ]);

        $data['user_id'] = Auth::id();
        $data['total_lineas'] = $data['lineas_portadas'] + $data['lineas_nuevas'];

        $funnel = Funnel::create($data);

        return response()->json($funnel, 201);
    }

    // Mostrar un funnel
    public function show(Funnel $funnel)
    {
        return response()->json($funnel);
    }

    // Actualizar un funnel (ej. cambiar estado o comentarios)
    public function update(Request $request, Funnel $funnel)
    {
        $this->authorize('update', $funnel);

        $funnel->update($request->all());

        return response()->json($funnel);
    }

    // Eliminar (si se necesitara en algún punto)
    public function destroy(Funnel $funnel)
    {
        $this->authorize('delete', $funnel);

        $funnel->delete();

        return response()->json(['message' => 'Funnel eliminado']);
    }
}
