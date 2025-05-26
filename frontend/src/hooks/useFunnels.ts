import { useState } from 'react';
import axios from '@/api/axiosConfig';

interface Funnel {
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

const useFunnels = () => {
  const [data, setData] = useState<Funnel[]>([]);
  const [resumen, setResumen] = useState<Resumen | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchFunnels = async (filtros: Filtros) => {
    try {
      setLoading(true);
      console.log('Intentando obtener funnels con cookies:', document.cookie);
      const response = await axios.get('/api/funnels', {
        params: filtros,
        withCredentials: true,
      });
      setData(response.data.funnels);
      setResumen(response.data.resumen);
    } catch (error) {
      console.error('Error al obtener funnels:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    resumen,
    loading,
    fetchFunnels,
  };
};

export default useFunnels;
