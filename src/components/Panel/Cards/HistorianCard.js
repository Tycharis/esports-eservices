import {Accordion, Card, ListGroup} from "react-bootstrap";
import React from "react";

function HistorianCard(props) {
  return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} eventKey={3}>
            Historian
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={3}>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>Regulation</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
  );
}

export default HistorianCard;