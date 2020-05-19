import React, {useEffect, useState} from "react";

import {translateGrade} from "../lib";
import {Button} from "react-bootstrap";
import Select from "react-select";
import {getUserById} from "../../services/user-service";
import {getQualifications} from "../../services/qualification-service";
import QualificationCard from "./QualificationCard";
import Worksheet from "./Worksheet";

function Operations(props) {
  const [user, setUser] = useState(null);
  // const [content, setContent] = useState(searchPage);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [options, setOptions] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [failureMessage, setFailureMessage] = useState(null);

  useEffect(() => {
    getQualifications((err, quals) => {
      if (quals) {
        setOptions(quals.map(qual => ({
          value: qual.id,
          label: qual.name
        })));
      }
    });
  }, []);

  const handleSelectChange = (option) => {
    setSelected(option);
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }

  const handleSearch = () => {
    const id = parseInt(search, 10);

    console.log(search);
    if (isNaN(id)) {
      return;
    }

    getUserById(id, (err, user) => {
      if (err) {
        setFailureMessage(err);
        setSuccessMessage(null);
      }

      if (user) {
        setUser(user);
        setFailureMessage(null);
        setSuccessMessage(null);

        // setContent(sqtrPage);
      }
    });
  }

  return (
      <div className="container">
        <span className="col-4">{user ? `${user.id} - ` + translateGrade(user.grade, user.firstName, user.lastName) : "Enter an ESCID and click search"}</span>
        <div className="row">
          <input className="col-2" type="text" placeholder="ESCID" value={search} onChange={handleSearchChange} />
          <Button className="col-1" variant="primary" style={{left: '1%'}} onClick={() => handleSearch()}>Search</Button>
          <div className="col-1" />
          <Select options={options} onChange={handleSelectChange} className="col-3" />
          <div className="col-1" />
          {selected ? <QualificationCard className="row col-4" escid={user.id} qual={selected.value} /> : ""}
        </div>
        <div className="row bg-danger text-white">{failureMessage}</div>
        {tasks ? <Worksheet tasks={tasks} /> : ""}
      </div>
  );
}

export default Operations;