import React from "react";
import { Card, CardTitle, CardBody, CardText } from "reactstrap";
import { QueryRenderer } from "@cubejs-client/react";
import { Spin } from 'antd';
import { Row, Col, Statistic, Table } from 'antd';
import {
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line
} from "recharts";

export const Chart = ({ cubejsApi, title, query, render }) => (
  <Card>
    <CardBody>
      <CardTitle tag="h5">{title}</CardTitle>
      <CardText>
        <QueryRenderer
          query={query}
          cubejsApi={cubejsApi}
          render={({ resultSet }) => {
            if (!resultSet) {
              return <div className="loader" />;
            }

            return render(resultSet);
          }}
        />
      </CardText>
    </CardBody>
  </Card>
);

export const CartesianChart = ({ resultSet, children, ChartComponent }) => (
  <ResponsiveContainer width="100%" height={350}>
    <ChartComponent data={resultSet.chartPivot()}>
      <XAxis dataKey="x" />
      <YAxis />
      <CartesianGrid />
      { children }
      <Legend />
      <Tooltip />
    </ChartComponent>
  </ResponsiveContainer>
)

export const renderChart = (Component) => ({ resultSet, error }) => (
  (resultSet && <Component resultSet={resultSet} />) ||
  (error && error.toString()) || 
  (<Spin />)
)

export const numberRender = ({ resultSet }) => (
  <Row type="flex" justify="center" align="middle" style={{ height: '100%' }}>
    <Col>
      {resultSet
        .seriesNames()
        .map(s => (
          <Statistic value={resultSet.totalRow()[s.key]} />
        ))}
    </Col>
  </Row>
);