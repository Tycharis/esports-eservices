/* Esports Club at Kansas State University eServices
 * Copyright (C) 2019 Braedon Smith
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';

import './LoginForm.css';
import {logIn} from "../../services/auth-service";

import UnauthenticatedHeader from "../UnauthenticatedHeader";

function LoginForm(props) {
  const [escid, setEscid] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [failureMessage, setFailureMessage] = useState(null);

  const handleEscidChange = (e) => {
    setEscid(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();

    logIn(escid, password, (message, loggedIn) => {
      if (loggedIn) {
        setSuccessMessage('Login successful. Redirecting to home page...');
        redirectToHome();
      } else {
        setFailureMessage(message);
      }

      props.showError(message);
    });
  }

  const redirectToHome = () => {
    props.updateTitle('Dashboard');
    props.history.push('/dashboard');
  }

  const redirectToRegister = () => {
    props.history.push('/register');
    props.updateTitle('Register');
  }

  return (
      <div>
        <UnauthenticatedHeader {...props} />
        <div className="container">
          <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
              <div className="form-group text-left">
                <label htmlFor="escid">ESCID</label>
                <input type="text"
                       className="form-control"
                       id="escid"
                       placeholder="ESCID"
                       value={escid}
                       onChange={handleEscidChange}
                />
              </div>
              <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password"
                       className="form-control"
                       id="password"
                       placeholder="Password"
                       value={password}
                       onChange={handlePasswordChange}
                />
              </div>
              <div className="form-check">
              </div>
              <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmitClick}
              >Submit</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: successMessage ? 'block' : 'none' }} role="alert">
              {successMessage}
            </div>
            <div className="alert alert-danger text-white mt-2" style={{display: successMessage ? 'block' : 'none' }} role="alert">
              {failureMessage}
            </div>
            <div className="registerMessage">
              <span>Dont have an account? </span>
              <span className="loginText" onClick={() => redirectToRegister()}>Register</span>
            </div>
          </div>
        </div>
      </div>
  );
}

export default withRouter(LoginForm);