import React, {useEffect, useState} from "react";
import Category from "./Category";

function Worksheet(props) {
  const [completed, setCompleted] = useState(0);
  const [required, setRequired] = useState(props.tasks.length);
  
  const cat1 = {
    title: "Prerequisites",
    tasks: []
  };

  const cat2 = {
    title: "Familiarization and Preparatory Training",
    tasks: []
  };

  const cat3 = {
    title: "Advanced Training",
    tasks: []
  };
  
  const cat4 = {
    title: "Event Participation",
    tasks: []
  };

  const cat5 = {
    title: "Continuing Education",
    tasks: []
  }

  const [prerequisites, setPrerequisites] = useState(cat1);
  const [familiarization, setFamiliarization] = useState(cat2);
  const [advanced, setAdvanced] = useState(cat3);
  const [participation, setParticipation] = useState(cat4);
  const [continuing, setContinuing] = useState(cat5);
  
  useEffect(() => {
    props.tasks.forEach(task => {
      switch (task.category) {
        case 0:
          prerequisites.tasks.push(task);
          break;
        case 1:
          familiarization.tasks.push(task);
          break;
        case 2:
          advanced.tasks.push(task);
          break;
        case 3:
          participation.tasks.push(task);
          break;
        default:
          continuing.tasks.push(task);
      }
    });
  }, [advanced.tasks, continuing.tasks, familiarization.tasks, participation.tasks, prerequisites.tasks, props.tasks]);
  
  return (
      <div className="container">
        <span className="row text-center col-12">{completed} Tasks Completed / {required} Tasks Required</span>
        <hr />
        {props.tasks ? (
            <div>
              <Category category={prerequisites}/>
              <Category category={familiarization} />
              <Category category={advanced} />
              <Category category={participation} />
              <Category category={continuing} />
            </div>
        ) : ""}
      </div>
  );
}

export default Worksheet;