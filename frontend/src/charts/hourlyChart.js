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

export const HourlyChart = () => (
  <Chart
    cubejsApi={cubejsApi}
    title="Recording hours popularity"
    query={{
      "measures": [
        "Clips.rollingCountWeek"
      ],
      "timeDimensions": [
        {
          "dimension": "Clips.date",
          "dateRange": "Today"
        }
      ],
      "dimensions": [
        "Clips.hour"
      ],
      "filters": [],
      "segments": []
    }}
    render={resultSet => { 
      return (
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
    )}}
  />
)

export default HourlyChart;