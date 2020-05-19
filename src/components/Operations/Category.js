import React from "react";
import TaskCard from "./TaskCard";

function Category(props) {
  return (
    <div className="container text-center">
      <span className="col-12">{props.category.title} - {props.category.tasks.length} Required Tasks</span>
      <div className="row">
        {props.category.tasks.map(task => {
          return <TaskCard task={task} />
        })}
      </div>
    </div>
  );
}

export default Category;