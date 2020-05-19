import React, {useState} from "react";
import {changePassword} from "../../services/auth-service";

function UserPassword(props) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [failureMessage, setFailureMessage] = useState(null);

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();

    if (newPassword.valueOf() !== confirmPassword.valueOf()) {
      setFailureMessage('New passwords must match');
      return;
    }

    changePassword(oldPassword, newPassword, (message, passwordDidUpdate) => {
      if (passwordDidUpdate) {
        setSuccessMessage(message);
      } else {
        setFailureMessage(message);
      }
    });
  }

  return (
      <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
        <form>
          <div className="form-group text-left">
            <label htmlFor="oldPassword">Current Password</label>
            <input type="password"
                   className="form-control"
                   id="oldPassword"
                   placeholder="Enter current password"
                   value={oldPassword}
                   onChange={handleOldPasswordChange}
            />
          </div>
          <div className="form-group text-left">
            <label htmlFor="lastName">New Password</label>
            <input type="password"
                   className="form-control"
                   id="newPassword"
                   placeholder="Enter new password"
                   value={newPassword}
                   onChange={handleNewPasswordChange}
            />
          </div>
          <div className="form-group text-left">
            <label htmlFor="email">Confirm New Password</label>
            <input type="password"
                   className="form-control"
                   id="confirmPassword"
                   placeholder="Confirm new password"
                   value={confirmPassword}
                   onChange={handleConfirmPasswordChange}
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

export default UserPassword;