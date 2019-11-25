import React from 'react';
import { Chart, renderSingleValue } from '../components/charts';
import cubejsApi from '../components/api';

export const SpeakConvertion = () => (
<Chart
    cubejsApi={cubejsApi}
    title="Recording convertion rate"
    query={{
        "measures": [
          "UserClients.speakConvertion"
        ],
        "timeDimensions": [],
        "filters": []
      }}
    render={resultSet => <h1 height={300}>{resultSet.chartPivot()[0]["UserClients.speakConvertion"]}</h1>}
/>);

export default SpeakConvertion