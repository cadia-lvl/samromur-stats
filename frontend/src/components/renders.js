import React from 'react';
import { QueryRenderer } from "@cubejs-client/react";
import { MainContainer } from '../components/containers';
import { 
  integerFormatter, 
  percentageFormatter,
  floatFormatter
} from '../functions/formatters';
import cubejsApi from '../components/api';

export const RenderSingleMeasure = ({query, title, format}) => (
  <MainContainer title={title} size="h6">
    <QueryRenderer
          query={query}
          cubejsApi={cubejsApi}
          render={({ resultSet }) => {
            if (!resultSet) {
              return <div className="loader" />;
            } else {
                let value = resultSet.chartPivot()[0][query.measures[0]];
                switch(format) {
                    case 'integer':
                        return <h3>{integerFormatter(value)}</h3>
                    case 'percentage':
                        return <h3>{percentageFormatter(value)}</h3>
                    case 'float':
                        return <h3>{floatFormatter(value)}</h3>
                    default:
                        return <h3>{value}</h3>
                }
            }
          }}
    />
  </MainContainer>
  
);

export const RenderPercentage = ({query, title, format, which}) => (
  <MainContainer title={title} size="h6">
    <QueryRenderer
          query={query}
          cubejsApi={cubejsApi}
          render={({ resultSet }) => {
            if (!resultSet) {
              return <div className="loader" />;
            } else {
                let values = [
                  resultSet.chartPivot()[0][query.measures[0]],
                  resultSet.chartPivot()[1][query.measures[0]]
                ]
                let total = values.reduce((a,b) => a + b, 0);
                let value = values[which] / total;
                switch(format) {
                    case 'integer':
                        return <h3>{integerFormatter(value)}</h3>
                    case 'percentage':
                        return <h3>{percentageFormatter(value)}</h3>
                    case 'float':
                        return <h3>{floatFormatter(value)}</h3>
                    default:
                        return <h3>{value}</h3>
                }
            }
          }}
    />
  </MainContainer>
  
);