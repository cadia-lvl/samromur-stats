import React from 'react';
import { 
  Chart
} from '../components/charts';
import cubejsApi from '../components/api';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const colors = ['#629ff4', '#ff4f5e', '#59cbb7'];

export const SexChart = () => (
  <Chart
    cubejsApi={cubejsApi}
    title="Kynjadreifing"
    query={{
      "measures": [
        "Clips.count"
      ],
      "timeDimensions": [
        {
          "dimension": "Clips.date"
        }
      ],
      "dimensions": [
        "Clips.sex"
      ],
      "filters": [
        {
          "dimension": "Clips.sex",
          "operator": "notContains",
          "values": [
            "Óuppgefið kyn"
          ]
        }
      ]
    }}
    render={resultSet => (
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            isAnimationActive={false}
            data={resultSet.chartPivot()}
            nameKey="x"
            dataKey={resultSet.seriesNames()[0].key}
            fill="#8884d8"
          >
          {
            resultSet.chartPivot().map((e, index) =>
              <Cell key={index} fill={colors[index % colors.length]}/>
            )
          }
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    )}
  />
)

export default SexChart;