import React, {useState} from 'react';
import {Button, ButtonGroup, Dropdown} from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import Panel from "./Panel/Panel";
import PanelContent from "./Panel/PanelContent";
import {translateGrade} from "./lib";
import {logOut} from "../services/auth-service";

function Header(props) {
  const [panel, setPanel] = useState(false);

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  const title = capitalize(props.location.pathname.substring(1, props.location.pathname.length));

  const backdropClicked = () => {
    setPanel(false);
  }

  const redirectToDashboard = () => {
    props.history.push('/dashboard');
  }

  const redirectToProfile = () => {
    props.history.push('/profile');
  }

  const redirectToPassword = () => {
    props.history.push('/password');
  }

  const logout = () => {
    logOut((err, didLogOut) => {
      if (err) {
        alert('Could not log out. Contact the administrator.');
      }

      if (didLogOut) {
        props.history.push('/login');
      }
    });
  }

  return(
      <div>
        <Panel isOpen={panel} type={'left'} size={30} backdropClicked={backdropClicked}>
          <PanelContent {...props} />
        </Panel>
        <nav className="navbar navbar-dark bg-primary">
          <div className="row col-12 d-flex text-white position-relative">
            <div className="h3 text-white float-left" onClick={() => setPanel(true)}>
              &equiv;
            </div>
            <div className="position-absolute float-left" style={{left: '46.5%'}}>
              <span className="h3">{props.title || title}</span>
            </div>
            <div className="position-absolute float-right" style={{right: '0%'}}>
              <Dropdown alignRight as={ButtonGroup}>
                <Button variant="secondary" onClick={() => redirectToProfile()}>{props.user ? translateGrade(props.user.grade, props.user.firstName, props.user.lastName) : "User"}</Button>
                <Dropdown.Toggle split drop="right" variant="secondary" />
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => redirectToDashboard()}>Dashboard</Dropdown.Item>
                  <Dropdown.Item onClick={() => redirectToProfile()}>User Profile</Dropdown.Item>
                  <Dropdown.Item onClick={() => redirectToPassword()}>Password Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item className="bg-danger text-white" onClick={() => logout()}>Log out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </nav>
      </div>
  )
}

export default withRouter(Header);