import React, {useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
import {getEvents, deleteEvent, createEvent} from "../../services/event-service";

function EventsPage(props) {
  const [children, setChildren] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [failureMessage, setFailureMessage] = useState(null);
  const [dirty, setDirty] = useState(true);

  useEffect(() => {
    if (!dirty) {
      return;
    }
    
    getEvents((err, events) => {
      if (err) {
        props.history.push('/login');
        return;
      }

      if (events) {
        setChildren(events);
        setDirty(false);
      }
    });
  }, [dirty, props.history]);

  const handleDeleteEvent = (id) => {
    deleteEvent(id, (message, eventDidDelete) => {
      if (eventDidDelete) {
        setChildren(prevState => prevState.filter(event => event.id !== id));
      }
    });

    setDirty(true);
  }

  const handleSubmit = () => {
    let start = 0;
    let end = 0;

    try {
      start = new Date(startTime).getTime();
      end = new Date(endTime).getTime();
    } catch (err) {
      setSuccessMessage(null);
      setFailureMessage(err.message);

      return;
    }

    if (end < start) {
      setSuccessMessage(null);
      setFailureMessage('End time must be later than start time');

      return;
    }

    const payload = {
      name: name,
      location: location,
      startTime: start,
      endTime: end
    }

    createEvent(payload, (message, eventDidCreate) => {
      if (eventDidCreate) {
        setName("");
        setLocation("");
        setStartTime("");
        setEndTime("");
        setSuccessMessage(message);
        setFailureMessage(null);
        setDirty(true);
      } else {
        setFailureMessage(message);
        setSuccessMessage(null);
      }
    });
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  }

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  }

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  }

  return (
      <div className="row justify-content-center">
        <Table striped bordered hover style={{width: '95%'}}>
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {children.map(child => (
                  <tr>
                    <td>{child.id}</td>
                    <td>{child.name}</td>
                    <td>{child.location}</td>
                    <td>{new Date(child.startTime).toISOString()}</td>
                    <td>{new Date(child.endTime).toISOString()}</td>
                    <td>
                      <Button variant='danger' onClick={() => handleDeleteEvent(child.id)}>Delete</Button>
                    </td>
                  </tr>
              )
          )}
            <tr>
              <td />
              <td>
                <input type="text"
                       className="form-control"
                       placeholder="Enter event name"
                       value={name}
                       onChange={handleNameChange}
                />
              </td>
              <td>
                <input type="text"
                       className="form-control"
                       placeholder="Enter event location"
                       value={location}
                       onChange={handleLocationChange}
                />
              </td>
              <td>
                <input type="text"
                       className="form-control"
                       placeholder="Enter start time"
                       value={startTime}
                       onChange={handleStartTimeChange}
                />
              </td>
              <td>
                <input type="text"
                       className="form-control"
                       placeholder="Enter end time"
                       value={endTime}
                       onChange={handleEndTimeChange}
                />
              </td>
              <td>
                <Button variant="success" onClick={() => handleSubmit()}>Save</Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <div className="alert alert-success mt-2" style={{display: successMessage ? 'block' : 'none' }} role="alert">
          {successMessage}
        </div>
        <div className="alert alert-danger mt-2" style={{display: failureMessage ? 'block' : 'none' }} role="alert">
          {failureMessage}
        </div>
      </div>
  );
}

export default EventsPage;