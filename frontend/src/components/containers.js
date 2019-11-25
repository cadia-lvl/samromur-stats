import React from "react";
import { Card, CardTitle, CardBody, CardText } from "reactstrap";

export const MainContainer = ({ title, size, children }) => (
    <Card>
      <CardBody>
        <CardTitle tag={size}>{title}</CardTitle>
        <CardText>
          {children}
        </CardText>
      </CardBody>
    </Card>
);