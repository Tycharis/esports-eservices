import {Accordion, Card, ListGroup} from "react-bootstrap";
import React from "react";

function InformationTechnologyCard(props) {
  return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} eventKey={4}>
            Information Technology
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={4}>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>Regulation</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
  );
}

export default InformationTechnologyCard;