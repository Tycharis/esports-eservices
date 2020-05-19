import {Accordion, Card, ListGroup} from "react-bootstrap";
import React from "react";

function ReportsCard(props) {
  return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} eventKey={8}>
            Reports
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={8}>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>Member Reports</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
  );
}

export default ReportsCard;