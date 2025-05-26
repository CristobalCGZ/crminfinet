// en src/types/Funnel.ts (o arriba en el componente)
export interface Funnel {
  id: number;
  cliente_rut: string;
  cliente_razon_social: string;
  segmento: string;
  lineas_portadas: number;
  lineas_nuevas: number;
  total_lineas: number;
  equipos: boolean;
  q_equipos: number;
  riesgo: string;
  probabilidad_cierre: string;
  fecha_proxima_accion: string;
  comentarios?: string;
  contacto_nombre: string;
  contacto_telefono: string;
  contacto_mail: string;
  comuna: string;
  donante: string;
  cesion: boolean;
}
