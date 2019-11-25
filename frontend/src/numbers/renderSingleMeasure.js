import React from 'react';
import { QueryRenderer } from "@cubejs-client/react";
import { MainContainer } from '../components/containers';
import cubejsApi from '../components/api';

export const RenderSingleMeasure = ({query, title}) => (
  <MainContainer title={title} size="h6">
    <QueryRenderer
          query={query}
          cubejsApi={cubejsApi}
          render={({ resultSet }) => {
            if (!resultSet) {
              return <div className="loader" />;
            } else {
              return <h3>{resultSet.chartPivot()[0][query.measures[0]]}</h3>
            }
          }}
    />
  </MainContainer>
  
);

export default RenderSingleMeasure