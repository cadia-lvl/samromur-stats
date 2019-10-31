import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import TotalClips from './numbers/totalClips';
import TotalConfirmedClips from "./numbers/totalConfirmedClips";
import TotalSpeakClients from './numbers/totalSpeakClients';
import SpeakConvertionRate from './numbers/speakConvertionRate'

import AgeChart from './charts/ageChart';
import SexChart from './charts/sexChart';
import HourlyChart from './charts/hourlyChart';

class App extends Component {
  
  render() {
    return (
      <Container fluid>
        <Row>
          <Col sm="4">
            <TotalClips />
          </Col>
          <Col sm="4">
            <TotalConfirmedClips />
          </Col>
          
        </Row>
        <Row>
          <Col sm="4">
            <TotalSpeakClients />
          </Col>
          <Col sm="4">
          <SpeakConvertionRate />
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