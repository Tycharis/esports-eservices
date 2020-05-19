import React, {useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
import {createTask, deleteTask, getTasks} from "../../services/task-service";

function TaskPage(props) {
  const [children, setChildren] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [failureMessage, setFailureMessage] = useState(null);
  const [dirty, setDirty] = useState(true);

  useEffect(() => {
    if (!dirty) {
      return;
    }

    getTasks((err, tasks) => {
      if (err) {
        props.history.push('/login');
        return;
      }

      if (tasks) {
        setChildren(tasks);
        setDirty(false);
      }
    });
  }, [dirty, props.history]);

  const handleDeleteTask = (id) => {
    console.log(id);

    deleteTask(id, (message, taskDidDelete) => {
      if (taskDidDelete) {
        setChildren(prevState => prevState.filter(task => task.id !== id));
      }
    });

    setDirty(true);
  }

  const handleSubmit = () => {
    const payload = {
      name: name,
      description: description,
    }

    createTask(payload, (message, qualDidCreate) => {
      if (qualDidCreate) {
        setName("");
        setDescription("");
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

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  return (
      <div className="row justify-content-center">
        <Table striped bordered hover style={{width: '95%'}}>
          <thead>
          <tr>
            <th>Task ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {children.map(child => (
                  <tr>
                    <td>{child.id}</td>
                    <td>{child.name}</td>
                    <td>{child.description}</td>
                    <td>
                      <Button variant='danger' onClick={() => handleDeleteTask(child.id)}>Delete</Button>
                    </td>
                  </tr>
              )
          )}
          <tr>
            <td />
            <td>
              <input type="text"
                     className="form-control"
                     placeholder="Enter task name"
                     value={name}
                     onChange={handleNameChange}
              />
            </td>
            <td>
              <input type="text"
                     className="form-control"
                     placeholder="Enter task description"
                     value={description}
                     onChange={handleDescriptionChange}
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

export default TaskPage;