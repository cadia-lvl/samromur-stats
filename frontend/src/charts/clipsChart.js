import React from 'react';
import cubejsApi from '../components/api';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import { Chart, Axis, Tooltip, Geom, Coord, Legend } from 'bizcharts';
import { dateFormatter } from '../functions/formatters';
import { MainContainer } from '../components/containers';

const stackedChartData = (resultSet) => {
  const totals = []
  const data = resultSet.pivot().map(
    ({ xValues, yValuesArray }) => {
      let total = {
        x: resultSet.axisValuesString(xValues, ', '),
        color: resultSet.axisValuesString(['Total'], ', '),
        measure: 0
      }
      let original = yValuesArray.map(([yValues, m]) => {
        total.measure += m;
        return ({
          x: resultSet.axisValuesString(xValues, ', '),
          color: resultSet.axisValuesString(yValues, ', '),
          measure: m && Number.parseFloat(m)
        })
      })
      total.measure = Number.parseFloat(total.measure);
      totals.push(total);
      return original;
    }
  ).reduce((a, b) => a.concat(b), []);

  return data.concat(totals);
}

const lineRender = ({ resultSet }) => { return(
  <Chart scale={{ x: { tickCount: 10 } }} height={400} data={stackedChartData(resultSet)} forceFit>
    <Axis 
      name="x"
      label={{
        formatter: val => dateFormatter(val),
      }}
    />
    <Axis name="measure" />
    {/* <Tooltip crosshairs={{type : 'y'}} /> */}
    <Geom type="line" position={`x*measure`} size={2} color="color" shape='color'
      />
    <Legend itemFormatter={(val) => {
      let vals = val.split(',')
      return vals[0]
    }}/>
  </Chart>
)};

const renderChart = (Component) => ({ resultSet, error }) => (
  (resultSet && <Component resultSet={resultSet} />) ||
  (error && error.toString()) || 
  (<Spin />)
)

const ChartRenderer = () => (
  <MainContainer title='Recordings over time' size='h5'>
    <QueryRenderer
      query={{
        "measures": [
          "Clips.count"
        ],
        "timeDimensions": [
          {
            "dimension": "Clips.date",
            "granularity": "day"
          }
        ],
        "dimensions": [
          "Clips.sex"
        ]
      }}
      cubejsApi={cubejsApi}
      render={renderChart(lineRender)}
    />
  </MainContainer>
);


export default ChartRenderer;