import React from 'react';
import { Chart, renderSingleValue } from '../components/charts';
import cubejsApi from '../components/api';

export const TotalConfirmedClips = () => (
  <Chart
    cubejsApi={cubejsApi}
    title="Staðfestar upptökur"
    query={{
      "measures": [
        "Clips.count"
      ],
      "timeDimensions": [],
      "dimensions": [
        "Clips.votes"
      ],
      "filters": [
        {
          "dimension": "Clips.votes",
          "operator": "equals",
          "values": [
            "Staðfest"
          ]
        }
      ],
      "segments": []
    }}
    render={resultSet => renderSingleValue(resultSet, "Clips.count")}
  />
);

export default TotalConfirmedClips