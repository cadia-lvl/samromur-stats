import React from 'react';
import { Chart, renderSingleValue } from '../components/charts';
import cubejsApi from '../components/api';

export const TotalClips = () => (
<Chart
    cubejsApi={cubejsApi}
    title="Total Utterances"
    query={{ measures: ["Clips.count"] }}
    render={resultSet => renderSingleValue(resultSet, "Clips.count")}
/>);

export default TotalClips