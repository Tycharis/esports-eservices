import {Accordion, Card, ListGroup} from "react-bootstrap";
import React from "react";

function PublicAffairsCard(props) {
  return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} eventKey={7}>
            Public Affairs
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={7}>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>Regulations</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
  );
}

export default PublicAffairsCard;