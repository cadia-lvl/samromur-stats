import React from 'react';
import cubejsApi from '../components/api';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import { Line, HorizontalBar, Pie } from 'react-chartjs-2';

const COLORS_SERIES = ['#FF6492', '#141446', '#7A77FF'];

const barRender = ({ resultSet }) => {
    console.log(resultSet);
  const data = {
    labels: resultSet.categories().map(c => c.category),
    datasets: resultSet.series().map((s, index) => (
      {
        label: s.title,
        data: s.series.map(r => r.value),
        backgroundColor: COLORS_SERIES[index],
        fill: false
      }
    )),
  };
  const options = {
    scales: { xAxes: [{ stacked: true }] }
  };
  return <HorizontalBar data={data} options={options} />;
};

const renderChart = (Component) => ({ resultSet, error }) => (
  (resultSet && <Component resultSet={resultSet} />) ||
  (error && error.toString()) || 
  (<Spin />)
)

const ChartRenderer = () => <QueryRenderer
  query={{
    "measures": [
      "Clips.client_count"
    ],
    "timeDimensions": [],
    "dimensions": [
      "Clips.sex",
      "Clips.age"
    ]
  }}
  cubejsApi={cubejsApi}
  render={renderChart(barRender)}
/>;

export default ChartRenderer;