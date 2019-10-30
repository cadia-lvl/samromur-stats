import React from 'react';
import { 
  Chart,
  CartesianChart,
} from '../components/charts';
import cubejsApi from '../components/api';
import {
  AreaChart,
  Area
} from "recharts";

export const AgeChart = () => (
  <Chart
    cubejsApi={cubejsApi}
    title="Aldursdreifing"
    query={{
      "measures": [
        "Clips.count"
      ],
      "timeDimensions": [],
      "dimensions": [
        "Clips.age"
      ],
      "filters": [
        {
          "dimension": "Clips.age",
          "operator": "notContains",
          "values": [
            "Óuppgefinn"
          ]
        }
      ],
      "order": {
        "Clips.age": "asc"
      }
    }}
    render={resultSet => (
      <CartesianChart resultSet={resultSet} ChartComponent={AreaChart}>
        {resultSet.seriesNames().map((series, i) => (
          <Area
            key={series.key}  
            stackId="a"
            dataKey={series.key}
            name={'Upptökur'}
          />
        ))}
      </CartesianChart>
    )}
  />
)

export default AgeChart;