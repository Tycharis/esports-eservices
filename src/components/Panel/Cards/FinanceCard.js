import {Accordion, Card, ListGroup} from "react-bootstrap";
import React from "react";

function FinanceCard(props) {
  return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} eventKey={2}>
            Finance
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={2}>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>ESCR 80-1 Financial Procedures and Accounting</ListGroup.Item>
              <ListGroup.Item>ESCR 80-2 Fundraising and Donations</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
  );
}

export default FinanceCard;