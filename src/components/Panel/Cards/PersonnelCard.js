import {Accordion, Card, ListGroup} from "react-bootstrap";
import React from "react";

function PersonnelCard(props) {
  return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} eventKey={6}>
            Personnel
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={6}>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>Regulations</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
  );
}

export default PersonnelCard;