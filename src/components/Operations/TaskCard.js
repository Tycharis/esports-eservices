import React, {useState} from "react";

import {Card} from "react-bootstrap";

function TaskCard(props) {
  const [date, setDate] = useState(props.task.date || "");
  const [evaluator, setEvaluator] = useState(props.task.evaluator || "");
  const [event, setEvent] = useState(props.task.event || "");
  const [color, setColor] = useState("bg-secondary")

  const handleDateChange = (e) => {
    setDate(e.target.value);
  }

  const handleEvaluatorChange = (e) => {
    setEvaluator(e.target.value);
  }

  const handleEventChange = (e) => {
    setEvent(e.target.value);
  }

  return (
      <Card>
        <Card.Header as="h6" className={color + "text-white"}>{props.task.name}</Card.Header>
        <Card.Body className="container">
          <div className="row">
            <span className="col-12">{props.task.description}</span>
          </div>
          <div className="row">
            <input className="col-4" value={date} placeholder="Date" type="text" onChange={handleDateChange} />
            <input className="col-4" value={evaluator} placeholder="Evaluator ID" type="text" onChange={handleEvaluatorChange} />
            <input className="col-4" value={event} placeholder="Event ID" type="text" onChange={handleEventChange} />
          </div>
        </Card.Body>
      </Card>
  );
}

export default TaskCard;