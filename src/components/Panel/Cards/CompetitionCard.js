import {Accordion, Card, ListGroup} from "react-bootstrap";
import React from "react";

function CompetitionCard(props) {
  return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} eventKey={1}>
            Competition
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={1}>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>ESCR 40-2 Competition Program Management</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
  );
}

export default CompetitionCard;