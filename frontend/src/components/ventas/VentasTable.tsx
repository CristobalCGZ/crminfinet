import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Venta {
  id: number;
  cliente: string;
  fecha: string;
  tipo: 'fijo' | 'movil';
  estado: string;
  monto: number;
}

interface VentasTableProps {
  ventas: Venta[];
}

const VentasTable = ({ ventas }: VentasTableProps) => {
  const columns: ColumnsType<Venta> = [
    {
      title: 'Cliente',
      dataIndex: 'cliente',
      key: 'cliente',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
    },
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      key: 'tipo',
      render: (tipo) => (
        <Tag color={tipo === 'fijo' ? 'blue' : 'green'}>
          {tipo.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
    },
    {
      title: 'Monto',
      dataIndex: 'monto',
      key: 'monto',
      render: (monto) => `$${monto.toLocaleString()}`,
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <a href={`/ventas/${record.id}`}>Ver detalle</a>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={ventas}
      rowKey="id"
      pagination={{ pageSize: 10 }}
    />
  );
};

export default VentasTable;
