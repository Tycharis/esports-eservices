import {Accordion, Card, ListGroup} from "react-bootstrap";
import React from "react";

function ResourcesCard(props) {
  return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} eventKey={9}>
            Resources
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={9}>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>Meeting Minutes</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
  );
}

export default ResourcesCard;