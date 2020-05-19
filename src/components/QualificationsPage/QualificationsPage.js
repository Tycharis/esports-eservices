import React, {useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
import {createQualification, deleteQualification, getQualifications} from "../../services/qualification-service";

function QualificationsPage(props) {
  const [children, setChildren] = useState([]);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [failureMessage, setFailureMessage] = useState(null);
  const [dirty, setDirty] = useState(true);

  useEffect(() => {
    if (!dirty) {
      return;
    }

    getQualifications((err, events) => {
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

  const handleDeleteQualification = (id) => {
    deleteQualification(id, (message, qualDidDelete) => {
      if (qualDidDelete) {
        setChildren(prevState => prevState.filter(qual => qual.id !== id));
      }
    });

    setDirty(true);
  }

  const handleSubmit = () => {
    const payload = {
      code: code,
      name: name,
    }

    createQualification(payload, (message, qualDidCreate) => {
      if (qualDidCreate) {
        setName("");
        setCode("");
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

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  }

  return (
      <div className="row justify-content-center">
        <Table striped bordered hover style={{width: '95%'}}>
          <thead>
          <tr>
            <th>Qual ID</th>
            <th>Code</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {children.map(child => (
                  <tr>
                    <td>{child.id}</td>
                    <td>{child.code}</td>
                    <td>{child.name}</td>
                    <td>
                      <Button variant='danger' onClick={() => handleDeleteQualification(child.id)}>Delete</Button>
                    </td>
                  </tr>
              )
          )}
          <tr>
            <td />
            <td>
              <input type="text"
                     className="form-control"
                     placeholder="Enter shorthand code"
                     value={code}
                     onChange={handleCodeChange}
              />
            </td>
            <td>
              <input type="text"
                     className="form-control"
                     placeholder="Enter qualification name"
                     value={name}
                     onChange={handleNameChange}
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

export default QualificationsPage;