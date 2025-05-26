<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Documento;
use App\Models\Venta;
use Illuminate\Support\Facades\Gate;

class DocumentoController extends Controller
{
    public function store(Request $request, $ventaId)
    {
        $venta = Venta::findOrFail($ventaId);

        if (Gate::denies('update', $venta)) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $request->validate([
            'archivo' => 'required|file|max:10240', // Máx 10MB
            'nombre' => 'required|string|max:255',
            'tipo' => 'nullable|string|max:50',
        ]);

        $path = $request->file('archivo')->store('documentos', 'public');

        $documento = Documento::create([
            'venta_id' => $venta->id,
            'usuario_id' => auth()->id(),
            'nombre' => $request->nombre,
            'tipo' => $request->tipo,
            'path' => $path,
        ]);

        return response()->json([
            'message' => 'Documento subido correctamente',
            'documento' => $documento
        ]);
    }

    public function index($ventaId)
    {
        $venta = Venta::with('documentos.usuario')->findOrFail($ventaId);

        if (Gate::denies('view', $venta)) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        return response()->json(
            $venta->documentos->map(function ($doc) {
                return [
                    'id' => $doc->id,
                    'nombre' => $doc->nombre,
                    'tipo' => $doc->tipo,
                    'url' => asset('storage/' . $doc->path),
                    'subido_por' => $doc->usuario->name ?? 'N/A',
                    'fecha' => $doc->created_at->format('Y-m-d H:i'),
                ];
            })
        );
    }
}
