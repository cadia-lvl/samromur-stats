import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { RenderSingleMeasure, RenderPercentage }  from './components/renders';

import LaunchHours from './charts/launchHours'
import AgeChart from './charts/ageChart';
import SexChart from './charts/sexChart';
import HourlyChart from './charts/hourlyChart';
import ClipsChart from './charts/clipsChart';

class App extends Component {
  
  render() {
    return (
      <Container fluid>
        <Row>
          <Col sm="3">
            <RenderSingleMeasure 
              title="Total speakers"
              format="integer"
              query={{
                "measures": ["Clips.client_count"]
              }}
            />
          </Col>
          <Col sm="3">
            <RenderSingleMeasure 
              title="Total utterances"
              format="integer"
              query={{ measures: ["Clips.count"] }}
            />
          </Col>
          <Col sm="3">
            <RenderSingleMeasure
              title="Average per speaker"
              format="float"
              query={{ measures: ["Clips.averageClipsPerClient"] }}
            />
          </Col>
          <Col sm="3">
            <RenderSingleMeasure
              title="Convertion rate"
              format="percentage"
              query={{
                  "measures": [
                    "UserClients.speakConvertion"
                  ]
                }}
            />
          </Col>
        </Row>
        <Row>
        <Col sm="3">
            <RenderSingleMeasure 
              title="Total validators"
              format="integer"
              query={{
                "measures": ["Votes.client_count"]
              }}
            />
          </Col>
          <Col sm="3">
          <RenderSingleMeasure 
              title="Total validations"
              format="integer"
              query={{ measures: ["Votes.count"] }}
            />
          </Col>
          <Col sm="3">
            <RenderSingleMeasure
              title="Average per user"
              format="float"
              query={{ measures: ["Votes.averageVotesPerClient"] }}
            />
          </Col>
          <Col sm="3">
            <RenderSingleMeasure
              title="Convertion rate"
              format="percentage"
              query={{
                  "measures": [
                    "UserClients.listenConvertion"
                  ]
                }}
            />
          </Col>
        </Row>
        <Row>
        <Col sm="3">
            <RenderSingleMeasure
              title="Validated utterances"
              format="integer"
              query={{
                "measures": [
                  "Clips.count"
                ],
                "dimensions": [
                  "Clips.votes"
                ],
                "filters": [
                  {
                    "dimension": "Clips.votes",
                    "operator": "equals",
                    "values": [
                      "Validated"
                    ]
                  }
                ]
              }}
            />
          </Col>
          <Col sm="3">
            <RenderSingleMeasure
              title="Invalidated utterances"
              format="integer"
              query={{
                "measures": [
                  "Clips.count"
                ],
                "dimensions": [
                  "Clips.votes"
                ],
                "filters": [
                  {
                    "dimension": "Clips.votes",
                    "operator": "equals",
                    "values": [
                      "Invalidated"
                    ]
                  }
                ]
              }}
            />
          </Col>
          <Col sm="3">
            <RenderPercentage
              title="Valid"
              format="percentage"
              query={{
                "measures": [
                  "Clips.count"
                ],
                "timeDimensions": [
                  {
                    "dimension": "Votes.date"
                  }
                ],
                "dimensions": [
                  "Clips.votes"
                ],
                "filters": [
                  {
                    "dimension": "Clips.votes",
                    "operator": "notEquals",
                    "values": [
                      "Unconfirmed"
                    ]
                  }
                ]
              }}
              which={0}
            />
            </Col>
            <Col sm="3">
            <RenderPercentage
              title="Invalid"
              format="percentage"
              query={{
                "measures": [
                  "Clips.count"
                ],
                "timeDimensions": [
                  {
                    "dimension": "Votes.date"
                  }
                ],
                "dimensions": [
                  "Clips.votes"
                ],
                "filters": [
                  {
                    "dimension": "Clips.votes",
                    "operator": "notEquals",
                    "values": [
                      "Unconfirmed"
                    ]
                  }
                ]
              }}
              which={1}
            />
            </Col>
        </Row>
        <Row>
          <Col sm="6">
            <LaunchHours />
          </Col>
          <Col sm="6">
            <ClipsChart />
          </Col>
        </Row>
        <Row>
          <Col sm="6">
            <AgeChart />
          </Col>
          <Col sm="6">
            <SexChart />
          </Col>
        </Row>
        <Row>
          <Col sm="6">
            <HourlyChart />
          </Col>
          <Col sm="6">
            
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;