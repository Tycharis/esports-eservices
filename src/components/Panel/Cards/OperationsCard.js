import {Accordion, Card, ListGroup} from "react-bootstrap";
import React from "react";

function OperationsCard(props) {
  const redirectToEvents = () => {
    props.history.push('/events')
  };

  const redirectToOps = () => {
    props.history.push('/operations');
  };

  const redirectToQuals = () => {
    props.history.push('/qualifications')
  };

  const redirectToTasks = () => {
    props.history.push('/tasks');
  };

  const redirectToLink = () => {
    props.history.push('/link');
  };

  return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Card.Header} eventKey={5}>
            Operations
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={5}>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item onClick={() => redirectToOps()}>Operations Qualifications</ListGroup.Item>
              <ListGroup.Item onClick={() => redirectToEvents()}>Events</ListGroup.Item>
              <ListGroup.Item onClick={() => redirectToQuals()}>Qualification Setup</ListGroup.Item>
              <ListGroup.Item onClick={() => redirectToTasks()}>Task Setup</ListGroup.Item>
              <ListGroup.Item onClick={() => redirectToLink()}>Link Tasks</ListGroup.Item>
              <ListGroup.Item>Regulations</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
  );
}

export default OperationsCard;