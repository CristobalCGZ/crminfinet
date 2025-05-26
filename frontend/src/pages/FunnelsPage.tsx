// src/pages/FunnelsPage.tsx
import { useEffect, useState } from 'react';
import { Table, Card, Row, Col, Statistic, Space, Select, Input, Button } from 'antd';
import MainLayout from '@/layout/MainLayout';
import FunnelModal from '@/components/FunnelModal';
import api from '@/api/axiosConfig';
import type { Funnel } from '@/types/Funnel';


const { Option } = Select;

export default function FunnelsPage() {
  const [funnels, setFunnels] = useState<Funnel[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  const fetchFunnels = async () => {
    setLoading(true);
    try {
      const res = await api.get('/funnels');
      setFunnels(res.data);
    } catch (err) {
      console.error('Error al cargar funnels', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFunnels();
  }, []);

  const filtered = funnels.filter((f) =>
    f.cliente_razon_social.toLowerCase().includes(busqueda.toLowerCase()) ||
    f.cliente_rut.includes(busqueda)
  );

  const columns = [
    { title: 'Cliente', dataIndex: 'cliente_razon_social', key: 'cliente_razon_social' },
    { title: 'RUT', dataIndex: 'cliente_rut', key: 'cliente_rut' },
    { title: 'Segmento', dataIndex: 'segmento', key: 'segmento' },
    { title: 'Estado', dataIndex: 'probabilidad_cierre', key: 'probabilidad_cierre' },
    { title: 'Fecha Acción', dataIndex: 'fecha_proxima_accion', key: 'fecha_proxima_accion' },
  ];

  return (
    <MainLayout>
      <div style={{ padding: 24 }}>
        <h1 style={{ fontSize: 24, marginBottom: 24 }}>Funnels</h1>

        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={6}><Card><Statistic title="Activos" value={filtered.length} /></Card></Col>
          <Col span={6}><Card><Statistic title="Precierre" value={filtered.filter(f => f.probabilidad_cierre === 'precierre').length} /></Card></Col>
          <Col span={6}><Card><Statistic title="Negociación" value={filtered.filter(f => f.probabilidad_cierre === 'negociacion').length} /></Card></Col>
          <Col span={6}><Card><Statistic title="Cierre" value={filtered.filter(f => f.probabilidad_cierre === 'cierre').length} /></Card></Col>
        </Row>

        <Space wrap style={{ marginBottom: 24 }}>
          <Input
            placeholder="Buscar empresa o RUT"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{ width: 250 }}
          />
          <Button type="primary" onClick={() => setModalVisible(true)}>
            + Agregar Funnel
          </Button>
        </Space>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={filtered}
          loading={loading}
          pagination={{ pageSize: 10 }}
        />

        <FunnelModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={() => {
            setModalVisible(false);
            fetchFunnels();
          }}
        />
      </div>
    </MainLayout>
  );
}
