import { useState } from 'react';
import axios from '@/api/axiosConfig';

interface Venta {
  id: number;
  cliente: string;
  fecha: string;
  tipo: 'fijo' | 'movil';
  estado: string;
  monto: number;
}

interface Resumen {
  mesActual: number;
  ultimosTresMeses: number;
  ranking: number;
  ticketPromedio: number;
}

interface Filtros {
  tipo: 'todas' | 'fijo' | 'movil';
  anio: string;
  mes: string;
  busqueda: string;
}

const useVentas = () => {
  const [data, setData] = useState<Venta[]>([]);
  const [resumen, setResumen] = useState<Resumen | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchVentas = async (filtros: Filtros) => {
    try {
      setLoading(true);
      console.log('Intentando obtener ventas con cookies:', document.cookie);
      const response = await axios.get('/api/ventas', {
        params: filtros,
        withCredentials: true,
      });
      setData(response.data.ventas);
      setResumen(response.data.resumen);
    } catch (error) {
      console.error('Error al obtener ventas:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    resumen,
    loading,
    fetchVentas,
  };
};

export default useVentas;
