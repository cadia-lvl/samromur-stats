import React from 'react';
import { Chart, renderSingleValue } from '../components/charts';
import cubejsApi from '../components/api';

export const averageClipCount = () => (
  <Chart
    cubejsApi={cubejsApi}
    title="Average user recordings"
    query={{ measures: ["Clips.averageClipsPerClient"] }}
    render={resultSet => renderSingleValue(resultSet, "Clips.averageClipsPerClient")}
  />
);

export default averageClipCount