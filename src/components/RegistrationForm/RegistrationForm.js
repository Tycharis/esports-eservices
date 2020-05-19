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
import {register} from '../../services/auth-service';
import UnauthenticatedHeader from "../UnauthenticatedHeader";

function RegistrationForm(props) {
  const [state , setState] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    successMessage: null
  });

  const handleChange = (e) => {
    const {id , value} = e.target;
    setState(prevState => ({
      ...prevState,
      [id] : value
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (state.password.valueOf() === state.confirmPassword.valueOf()) {
      sendDetailsToServer();
    } else {
      props.showError('Passwords do not match: ' + state.password.valueOf() + " and " + state.confirmPassword.valueOf());
    }
  };

  const sendDetailsToServer = () => {
    if (state.lastName.length && state.email.length && state.password.length) {
      props.showError(null);

      const payload={
        "firstName": state.firstName,
        "lastName": state.lastName,
        "password": state.password,
        "email": state.email,
        "phone": state.phone
      }

      register(payload, (message, userDidRegister) => {
        if (userDidRegister) {
          setState(prevState => ({
            ...prevState,
            'successMessage': 'Registration successful. Redirecting to login page.'
          }));

          redirectToLogin();
          props.showError(null);

          return;
        }

        props.showError(message);
      });
    } else {
      props.showError('Please enter a valid username and password')
    }
  };

  const redirectToLogin = () => {
    props.updateTitle('Login')
    props.history.push('/login');
  }

  return (
      <div className="container">
        <UnauthenticatedHeader {...props} />
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
          <form>
            <div className="form-group text-left">
              <label htmlFor="firstName">First Name</label>
              <input type="text"
                     className="form-control"
                     id="firstName"
                     placeholder="Enter first name"
                     value={state.firstName}
                     onChange={handleChange}
              />
            </div>
            <div className="form-group text-left">
              <label htmlFor="lastName">Last Name</label>
              <input type="text"
                     className="form-control"
                     id="lastName"
                     placeholder="Enter last name"
                     value={state.lastName}
                     onChange={handleChange}
              />
            </div>
            <div className="form-group text-left">
              <label htmlFor="email">Email Address</label>
              <input type="email"
                     className="form-control"
                     id="email"
                     placeholder="Enter email address"
                     value={state.email}
                     onChange={handleChange}
              />
            </div>
            <div className="form-group text-left">
              <label htmlFor="phone">Phone</label>
              <input type="text"
                     className="form-control"
                     id="phone"
                     placeholder="Enter phone number"
                     value={state.phone}
                     onChange={handleChange}
              />
            </div>
            <div className="form-group text-left">
              <label htmlFor="password">Password</label>
              <input type="password"
                     className="form-control"
                     id="password"
                     placeholder="Password"
                     value={state.password}
                     onChange={handleChange}
              />
            </div>
            <div className="form-group text-left">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password"
                     className="form-control"
                     id="confirmPassword"
                     placeholder="Confirm Password"
                     value={state.confirmPassword}
                     onChange={handleChange}
              />
            </div>
            <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmitClick}
            >
              Register
            </button>
          </form>
          <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
            {state.successMessage}
          </div>
          <div className="mt-2">
            <span>Already have an account? </span>
            <span className="loginText" onClick={() => redirectToLogin()}>Login here</span>
          </div>
        </div>
      </div>
  );
}

export default withRouter(RegistrationForm);