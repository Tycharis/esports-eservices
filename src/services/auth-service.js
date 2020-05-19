import {API_BASE_URL, getJwt} from "../components/lib";
import axios from "axios";

export const register = (payload, cb) => {
  axios.post(API_BASE_URL + '/register', payload)
      .then(response => {
        cb(response.data, true);
      }).catch(err => {
        cb(err.message, false);
  });
};

export const logIn = (escid, password, cb) => {
  const payload={
    "escid": escid,
    "password": password,
  };

  axios.post(API_BASE_URL + '/login', payload)
      .then(function (response) {
        if (response.status === 200) {
          localStorage.setItem('jwt', response.data.token);
          cb(null, true);

        } else {
          cb("Username or password is incorrect", false);
        }
      })
      .catch(err => {
        console.error(err);
        cb(err.message, false);
      });
};

export const logOut = (cb) => {
  axios.post(API_BASE_URL + '/logout', {}, {
    headers: {
      Authorization: `Bearer ${getJwt()}`
    }
  }).then(res => {
    localStorage.removeItem('jwt');
    cb(null, true);
  }).catch(err => {
    cb(err, false);
  });
};

export const getSelf = (cb) => {
  const jwt = getJwt();

  if (!jwt) {
    cb('Not logged in', false);
  }

  axios.get(API_BASE_URL + '/users/me', {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  }).then(res => {
    cb(null, res.data);
  }).catch(err => {
    localStorage.removeItem('jwt');
    cb(err, false);
  });
};

export const changePassword = (oldPassword, newPassword, cb) => {
  getSelf((err, user) => {
    if (err) {
      cb(err, false);
    }

    if (user) {
      axios.post(API_BASE_URL + '/users/password', {
        escid: user.id,
        password: oldPassword,
        newPassword: newPassword
      }, {
        headers: {
          Authorization: `Bearer ${getJwt()}`
        }
      }).then(res => {
        cb(res.data, true);
      }).catch(err => {
        cb(err, false);
      });

      return;
    }

    cb('Could not find self', false);
  });
};