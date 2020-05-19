import React, {useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
import Select from "react-select";
import {getQualifications} from "../../services/qualification-service";
import {getRequirements, getTasks, linkTask, unlinkTask} from "../../services/task-service";

const categoryOptions = ['Prerequesites', 'Familiarization', 'Advanced Training', 'Participation', 'Continuing Education'];

function LinkPage(props) {
  const [unlinkedChildren, setUnlinkedChildren] = useState([]);
  const [linkedChildren, setLinkedChildren] = useState([]);
  const [quals, setQuals] = useState(null);
  const [qualOptions, setQualOptions] = useState([]);
  const [selectedQual, setSelectedQual] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [successMessage, setSuccessMessage] = useState(null);
  const [failureMessage, setFailureMessage] = useState(null);
  const [dirty, setDirty] = useState(true);

  useEffect(() => {
    getQualifications((err, qualifications) => {
      if (qualifications) {
        setQuals(qualifications);

        let opts = [];

        qualifications.forEach(qual => {
          opts.push({value: qual.id, label: qual.name});
        });

        setQualOptions(opts);
      }
    });
  }, []);
  
  useEffect(() => {
    // if (!dirty) {
    //   return;
    // }

    getRequirements(selectedQual, (err, requirements) => {
      if (!requirements) {
        setLinkedChildren([]);

        getTasks((err, tasks) => {
          if (tasks) {
            setUnlinkedChildren(tasks);
          }
        });
      } else {
        setLinkedChildren(requirements);

        getTasks((err, tasks) => {
          if (tasks) {
            setUnlinkedChildren(tasks.filter(task => !requirements.find(child => task.id === child.id)));
          }
        });
      }

      // setDirty(false);
    });
  }, [/*dirty,*/ selectedQual]);

  const handleLink = (id) => {
    const payload = {
      taskId: id,
      qualId: selectedQual,
      category: selectedCategory.value
    }

    linkTask(payload, (message, taskDidLink) => {
      if (taskDidLink) {
        setFailureMessage(null);
        setSuccessMessage(message);

        setDirty(true);

        return;
      }

      setFailureMessage(message);
      setSuccessMessage(null);
    });
  };

  const handleUnlink = (id) => {
    unlinkTask(id, selectedQual, (message, taskDidUnlink) => {
      if (taskDidUnlink) {
        setFailureMessage(null);
        setSuccessMessage(message);

        setDirty(true);
        return;
      }

      setFailureMessage(message);
      setSuccessMessage(null);
    });
  };

  const handleSelectChange = (option) => {
    setSelectedQual(option.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  }

  return (
      <div className="container">
        <div className="row">
          <Table striped bordered hover size="sm" className="col-md-5">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {
              unlinkedChildren.map(child => (
                  <tr>
                    <td>{child.id}</td>
                    <td>{child.name}</td>
                    <td>{child.description}</td>
                    <td>
                      <Button variant="success" onClick={() => handleLink(child.id)}>Link</Button>
                    </td>
                  </tr>
              ))
            }
            </tbody>
          </Table>
          <div className="col-md-2">
            <Select options={qualOptions} onChange={handleSelectChange} />
            <Select options={categoryOptions.map((value, index) => {
              return {value: index, label: value}
            })} onChange={handleCategoryChange} />
          </div>
          <Table striped bordered hover size="sm" className="col-md-5">
            <thead>
              <tr>
                <th>Id</th>
                <th>Category</th>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {
              linkedChildren ? linkedChildren.map(child => (
                  <tr>
                    <td>{child.id}</td>
                    <td>{categoryOptions[child.category]}</td>
                    <td>{child.name}</td>
                    <td>{child.description}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleUnlink(child.id)}>Unlink</Button>
                    </td>
                  </tr>
              )) : ""
            }
            </tbody>
          </Table>
        </div>
        <div className="alert alert-success mt-2" style={{display: successMessage ? 'block' : 'none' }} role="alert">
          {successMessage}
        </div>
        <div className="alert alert-danger mt-2" style={{display: failureMessage ? 'block' : 'none' }} role="alert">
          {failureMessage}
        </div>
      </div>
  );
}

export default LinkPage;