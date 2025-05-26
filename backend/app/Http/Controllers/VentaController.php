<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Venta;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class VentaController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user();

        $data = $request->all();

        $venta = new Venta();

        $venta->tipo = $data['tipoVenta'];
        $venta->rut_empresa = $data['rutEmpresa'] ?? $data['rutEmpresaF'];
        $venta->nombre_empresa = $data['nombreEmpresa'] ?? $data['empresa'];
        $venta->rut_rrll = $data['rutRRLL'] ?? $data['rrllRut'];
        $venta->nombre_rrll = $data['nombreRRLL'] ?? $data['rrll'];
        $venta->telefono = $data['telefono'] ?? $data['numero'];
        $venta->correo = $data['correo'];
        $venta->direccion_comercial = $data['direccionComercial'] ?? $data['direccion'];
        $venta->direccion_despacho = $data['direccionDespacho'] ?? null;
        $venta->nombre_contacto_despacho = $data['nombreContactoDespacho'] ?? null;
        $venta->telefono_contacto_despacho = $data['telefonoContactoDespacho'] ?? null;
        $venta->detalle_servicio = $data['detalleServicio'] ?? null;
        $venta->portabilidad = $data['portabilidad'] ?? null;
        $venta->numeros_portar = $data['numerosPortar'] ?? $data['numeroPortabilidad'] ?? null;
        $venta->equipos = $data['equipos'] ?? null;
        $venta->folio = $data['folio'] ?? null;
        $venta->tecnologia = $data['tecnologia'] ?? null;
        $venta->producto = $data['producto'] ?? null;
        $venta->adicionales = $data['adicionales'] ?? null;
        $venta->oferta = $data['oferta'] ?? null;
        $venta->numero = $data['numero'] ?? null;
        $venta->numero_portabilidad = $data['numeroPortabilidad'] ?? null;
        $venta->contacto_tecnico = $data['contactoTecnico'] ?? null;
        $venta->fono_contacto = $data['fonoContacto'] ?? null;
        $venta->fecha_agenda = $data['fechaAgenda'] ?? null;
        $venta->hora_agenda = $data['horaAgenda'] ?? null;

        $venta->rut_vendedor = $user->rut_vendedor;
        $venta->nombre_vendedor = $user->name;
        $venta->codigo_vendedor = $user->codigo_vendedor;

        $venta->save();

        return response()->json(['message' => 'Venta registrada exitosamente']);
    }

    public function show($id)
    {
        $venta = Venta::with(['vendedor', 'supervisor', 'aprobadoPor', 'documentos.usuario'])->findOrFail($id);

        if (Gate::denies('view', $venta)) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        return response()->json([
            'id' => $venta->id,
            'tipo' => $venta->tipo,
            'estado' => $venta->estado,
            'fecha_creacion' => $venta->created_at->format('Y-m-d H:i:s'),
            'empresa' => $venta->datos_empresa,
            'datos_moviles' => $venta->tipo === 'movil' ? $venta->datos_moviles : null,
            'datos_fijos' => $venta->tipo === 'fijo' ? $venta->datos_fijos : null,
            'vendedor' => [
                'id' => $venta->vendedor->id,
                'nombre' => $venta->vendedor->name,
                'codigo' => $venta->vendedor->codigo_vendedor,
                'rut' => $venta->vendedor->rut,
            ],
            'supervisor' => $venta->supervisor ? [
                'id' => $venta->supervisor->id,
                'nombre' => $venta->supervisor->name,
            ] : null,
            'aprobado_por' => $venta->aprobadoPor ? [
                'id' => $venta->aprobadoPor->id,
                'nombre' => $venta->aprobadoPor->name,
            ] : null,
            'documentos' => $venta->documentos->map(function ($doc) {
                return [
                    'id' => $doc->id,
                    'nombre' => $doc->nombre,
                    'tipo' => $doc->tipo,
                    'path' => $doc->path,
                    'subido_por' => $doc->usuario ? $doc->usuario->name : null,
                    'fecha' => $doc->created_at->format('Y-m-d H:i'),
                ];
            }),
        ]);
    }

    public function index(Request $request)
    {
        $user = $request->user();

        $tipo = $request->get('tipo', 'todas');
        $anio = $request->get('anio', now()->year);
        $mes = $request->get('mes', now()->month);
        $busqueda = $request->get('busqueda', '');

        $query = Venta::query()
            ->whereYear('created_at', $anio)
            ->whereMonth('created_at', $mes);

        if ($tipo !== 'todas') {
            $query->where('tipo', $tipo);
        }

        if ($user && $user->rol === 'vendedor') {
            $query->where('codigo_vendedor', $user->codigo_vendedor);
        }

        if ($busqueda) {
            $query->where(function ($q) use ($busqueda) {
                $q->where('nombre_empresa', 'like', "%$busqueda%")
                  ->orWhere('rut_empresa', 'like', "%$busqueda%");
            });
        }

        $ventas = $query->get();

        $mesActual = $ventas->count();
        $ultimosTresMeses = Venta::query()
            ->when($tipo !== 'todas', fn($q) => $q->where('tipo', $tipo))
            ->whereBetween('created_at', [
                Carbon::now()->subMonths(2)->startOfMonth(),
                Carbon::now()->endOfMonth()
            ])
            ->when($user && $user->rol === 'vendedor', fn($q) => $q->where('codigo_vendedor', $user->codigo_vendedor))
            ->count();

        $ticketPromedio = $ventas->count() ? round($ventas->count()) : 0;

        $ranking = 0;
        if ($user && $user->rol === 'vendedor') {
            $rankingQuery = Venta::select('codigo_vendedor', DB::raw('COUNT(*) as total'))
                ->whereYear('created_at', $anio)
                ->whereMonth('created_at', $mes)
                ->groupBy('codigo_vendedor')
                ->orderByDesc('total')
                ->get();

            foreach ($rankingQuery as $index => $v) {
                if ($v->codigo_vendedor === $user->codigo_vendedor) {
                    $ranking = $index + 1;
                    break;
                }
            }
        }

        return response()->json([
            'ventas' => $ventas,
            'resumen' => [
                'mesActual' => $mesActual,
                'ultimosTresMeses' => $ultimosTresMeses,
                'ranking' => $ranking,
                'ticketPromedio' => $ticketPromedio,
            ]
        ]);
    }
}
