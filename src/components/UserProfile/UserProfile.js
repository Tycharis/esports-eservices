import React, {useEffect, useState} from "react";
import {updateUser} from "../../services/user-service";
import {getSelf} from "../../services/auth-service";

function UserProfile(props) {
  const [user, setUser] = useState({});
  
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [successMessage, setSuccessMessage] = useState(null);
  const [failureMessage, setFailureMessage] = useState(null);

  const emailRegex = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$/g;

  useEffect(() => {
    getSelf((err, user) => {
      if (err) {
        props.history.push('/login');
      }
      
      if (user) {
        setUser(user);

        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setPhone(user.phone);
      }
    })
  }, [props.history]);
  
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    const stripped = [...e.target.value].filter(char => char >= '0' && char <= '9');

    setPhone(stripped);
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();

    if (emailRegex.test(email)) {
      updateUser({
        escid: user.id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone
      }, (message, userDidUpdate) => {
        if (userDidUpdate) {
          setSuccessMessage(message);
        } else {
          setFailureMessage(message);
        }
      });
    }
  };

  return (
      <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
        <form>
          <div className="form-group text-left">
            <label htmlFor="firstName">First Name</label>
            <input type="text"
                   className="form-control"
                   id="firstName"
                   placeholder="Enter first name"
                   value={firstName}
                   onChange={handleFirstNameChange}
            />
          </div>
          <div className="form-group text-left">
            <label htmlFor="lastName">Last Name</label>
            <input type="text"
                   className="form-control"
                   id="lastName"
                   placeholder="Enter last name"
                   value={lastName}
                   onChange={handleLastNameChange}
            />
          </div>
          <div className="form-group text-left">
            <label htmlFor="email">Email Address</label>
            <input type="email"
                   className="form-control"
                   id="email"
                   placeholder="Enter email address"
                   value={email}
                   onChange={handleEmailChange}
            />
          </div>
          <div className="form-group text-left">
            <label htmlFor="phone">Phone</label>
            <input type="text"
                   className="form-control"
                   id="phone"
                   placeholder="Enter phone number"
                   value={phone}
                   onChange={handlePhoneChange}
            />
          </div>
          <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmitClick}
          >
            Submit
          </button>
        </form>
        <div className="alert alert-success mt-2" style={{display: successMessage ? 'block' : 'none' }} role="alert">
          {successMessage}
        </div>
        <div className="alert alert-danger mt-2" style={{display: failureMessage ? 'block' : 'none' }} role="alert">
          {failureMessage}
        </div>
      </div>
  );
}

export default UserProfile;