import React, { useEffect, useState } from 'react';
import { Table, Card, Row, Col, Select, Input, Button, Statistic, Space } from 'antd';
import useVentas from '@/hooks/useVentas';
import MainLayout from '@/layout/MainLayout';
import './VentasPage.css';
import InfinitySpinner from '@/assets/infinitespinner.svg?react';

const { Option } = Select;

function VentasPage() {
  const [tipo, setTipo] = useState<'todas' | 'fijo' | 'movil'>('todas');
  const [anio, setAnio] = useState<number>(new Date().getFullYear());
  const [mes, setMes] = useState<number>(new Date().getMonth() + 1);
  const [busqueda, setBusqueda] = useState<string>('');

  const { data: ventas, resumen, loading, fetchVentas } = useVentas();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token') === 'authenticated';
    console.log('[VentasPage] ¿Está logueado?', isLoggedIn);
    console.log('[VentasPage] Cookies actuales:', document.cookie);

    if (isLoggedIn) {
      fetchVentas({ tipo, anio: anio.toString(), mes: mes.toString(), busqueda });
    }
  }, [tipo, anio, mes, busqueda]);

  const anios = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  const columns = [
    {
      title: 'Folio',
      dataIndex: 'folio',
      key: 'folio',
    },
    {
      title: 'Empresa',
      dataIndex: 'nombre_empresa',
      key: 'nombre_empresa',
    },
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      key: 'tipo',
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
    },
    {
      title: 'Fecha',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <MainLayout>
      <div style={{ padding: 24 }}>
        <h1 style={{ fontSize: 24, marginBottom: 24 }}>Ventas</h1>

        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
            <InfinitySpinner style={{ width: 80, height: 80 }} />
            <p style={{ marginTop: 12 }}>Cargando ventas...</p>
          </div>
        )}

        {!loading && (
          <>
            <Row gutter={16} style={{ marginBottom: 24 }}>
              <Col span={6}><Card><Statistic title="Mes Actual" value={resumen?.mesActual ?? 0} prefix="$" /></Card></Col>
              <Col span={6}><Card><Statistic title="Últimos 3 Meses" value={resumen?.ultimosTresMeses ?? 0} prefix="$" /></Card></Col>
              <Col span={6}><Card><Statistic title="Ranking" value={resumen?.ranking ?? '-'} prefix="#" /></Card></Col>
              <Col span={6}><Card><Statistic title="Ticket Promedio" value={resumen?.ticketPromedio ?? 0} prefix="$" /></Card></Col>
            </Row>

            <Space wrap style={{ marginBottom: 24 }}>
              <Select<'todas' | 'fijo' | 'movil'> value={tipo} onChange={(value) => setTipo(value)} style={{ width: 120 }}>
                <Option value="todas">Todas</Option>
                <Option value="fijo">Fijo</Option>
                <Option value="movil">Móvil</Option>
              </Select>

              <Select<number> value={mes} onChange={(value) => setMes(value)} style={{ width: 100 }}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <Option key={m} value={m}>{m}</Option>
                ))}
              </Select>

              <Select<number> value={anio} onChange={(value) => setAnio(value)} style={{ width: 100 }}>
                {anios.map((a) => (
                  <Option key={a} value={a}>{a}</Option>
                ))}
              </Select>

              <Input
                placeholder="Buscar empresa o RUT"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={{ width: 200 }}
              />

              <Button onClick={() => fetchVentas({ tipo, anio: anio.toString(), mes: mes.toString(), busqueda })}>
                Filtrar
              </Button>
            </Space>

            <Table
              rowKey="id"
              columns={columns}
              dataSource={ventas}
              loading={false}
              pagination={{ pageSize: 10 }}
            />
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default VentasPage;
