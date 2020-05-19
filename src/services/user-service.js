import axios from "axios";
import {API_BASE_URL, getJwt} from "../components/lib";

export const updateUser = (user, cb) => {
  axios.put(API_BASE_URL + '/users', user, {
    headers: {
      Authorization: `Bearer ${getJwt()}`
    }
  }).then(res => {
    cb(res.data, true);
  }).catch(err => {
    cb(err.message, false);
  });
};

export const getUserById = (id, cb) => {
  axios.get(API_BASE_URL + '/users', {
    headers: {
      Authorization: `Bearer ${getJwt()}`
    },
    params: {
      id: id
    }
  }).then(res => {
    cb(null, res.data)
  }).catch(err => {
    localStorage.removeItem('jwt');
    cb(err.message, false);
  });
}

export const getUserByGrade = (grade, cb) => {
  axios.get(API_BASE_URL + '/users', {
    headers: {
      Authorization: `Bearer ${getJwt()}`
    },
    params: {
      grade: grade
    }
  }).then(res => {
    cb(null, res.data)
  }).catch(err => {
    localStorage.removeItem('jwt');
    cb(err, false);
  });
};

export const getMemberCount = (cb) => {
  axios.get(API_BASE_URL + '/users/count', {
    headers: {
      Authorization: `Bearer ${getJwt()}`
    }
  }).then(response => {
    if (response.status === 200) {
      cb(null, response.data.count);
    }
  }).catch(err => {
    localStorage.removeItem('jwt');
    cb(err, false);
  });
}

export const getRegistrationApprovals = (cb) => {
  axios.get(API_BASE_URL + '/users/register', {
    headers: {
      Authorization: `Bearer ${getJwt()}`
    }
  })
      .then(response => {
        if (response.status === 200) {
          cb(null, response.data);
        }
      })
      .catch(err => {
        console.error(err);
        cb(err.message, false);
      });
}

export const approveRegistration = (email, approved, cb) => {
  axios.post(API_BASE_URL + '/users/approvals', {
    email: email,
    approved: approved
  }, {
    headers: {
      Authorization: `Bearer ${getJwt()}`
    }
  }).then(response => {
        if (response.status === 200) {
          cb(response.data, true);
        }
      })
      .catch(err => {
        console.log(err);
        cb(err.message, false);
      });
}