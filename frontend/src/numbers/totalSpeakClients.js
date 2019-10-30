import React from 'react';
import { Chart, renderSingleValue } from '../components/charts';
import cubejsApi from '../components/api';

export const TotalSpeakClients = () => (
  <Chart
    cubejsApi={cubejsApi}
    title="Fjöldi lesenda"
    query={{ measures: ["Clips.client_count"] }}
    render={resultSet => renderSingleValue(resultSet, "Clips.client_count")}
  />
);

export default TotalSpeakClients