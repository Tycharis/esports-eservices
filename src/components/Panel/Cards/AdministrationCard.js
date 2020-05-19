import {Accordion, Card, ListGroup} from "react-bootstrap";
import React from "react";

function AdministrationCard(props) {
  return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} eventKey={0}>
            Administration
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={0}>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>Calendar</ListGroup.Item>
              <ListGroup.Item>Member Search</ListGroup.Item>
              <ListGroup.Item>Forms</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
  );
}

export default AdministrationCard;