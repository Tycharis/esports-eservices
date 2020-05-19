import React from 'react';
import { withRouter } from "react-router-dom";

function UnauthenticatedHeader(props) {
  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  const title = capitalize(props.location.pathname.substring(1, props.location.pathname.length));

  return(
      <nav className="navbar navbar-dark bg-primary justify-content-center">
        <div className="float-left row d-flex col-12 text-white" style={{left: '50%'}} >
          <span className="h3">{props.title || title}</span>
        </div>
      </nav>
  )
}

export default withRouter(UnauthenticatedHeader);