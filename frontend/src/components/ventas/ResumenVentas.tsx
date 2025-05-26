import { Card, Row, Col } from 'antd';

interface ResumenVentasProps {
  resumen: {
    mesActual: number;
    ultimosTresMeses: number;
    ranking: number;
    ticketPromedio: number;
  };
}

const ResumenVentas = ({ resumen }: ResumenVentasProps) => {
  return (
    <Row gutter={16} className="mb-6">
      <Col span={6}>
        <Card bordered={false} className="rounded-2xl shadow">
          <p className="text-sm text-gray-500">Ventas este mes</p>
          <h2 className="text-xl font-bold">${resumen?.mesActual}</h2>
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false} className="rounded-2xl shadow">
          <p className="text-sm text-gray-500">Últimos 3 meses</p>
          <h2 className="text-xl font-bold">${resumen?.ultimosTresMeses}</h2>
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false} className="rounded-2xl shadow">
          <p className="text-sm text-gray-500">Ranking actual</p>
          <h2 className="text-xl font-bold">#{resumen?.ranking}</h2>
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false} className="rounded-2xl shadow">
          <p className="text-sm text-gray-500">Ticket promedio</p>
          <h2 className="text-xl font-bold">${resumen?.ticketPromedio}</h2>
        </Card>
      </Col>
    </Row>
  );
};

export default ResumenVentas;
