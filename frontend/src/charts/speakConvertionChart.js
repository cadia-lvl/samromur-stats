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

export const SpeakConvertionChart = () => (
  <Chart
    cubejsApi={cubejsApi}
    title="Hlutfall nýrra heimsókna sem talar"
    query={{
        "measures": [
          "UserClients.speakConvertion"
        ],
        "timeDimensions": [
          {
            "dimension": "UserClients.date",
            "granularity": "day"
          }
        ],
        "segments": [],
        "filters": []
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

export default SpeakConvertionChart;