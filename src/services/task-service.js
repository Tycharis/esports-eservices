import axios from "axios";
import {API_BASE_URL, getJwt} from "../components/lib";


export const createTask = (payload, cb) => {
  axios.post(API_BASE_URL + '/tasks', payload, {
    headers: {
      Authorization: `Bearer ${getJwt()}`
    }
  }).then(res => {
    cb(res.data, true);
  }).catch(err => {
    cb(err.message, false);
  });
};

export const getTasks = (cb) => {
  axios.get(API_BASE_URL + '/tasks', {
    headers: {
      Authorization: `Bearer ${getJwt()}`
    }
  }).then(res => {
    cb(null, res.data);
  }).catch(err => {
    cb(err, false);
  });
};

export const deleteTask = (taskId, cb) => {
  axios.delete(API_BASE_URL + '/tasks', {
    headers: {
      Authorization: `Bearer ${getJwt()}`
    },
    params: {
      taskId: taskId
    }
  }).then(res => {
    cb(res.data, true);
  }).catch(err => {
    cb(err.message, false);
  });
};

export const linkTask = (payload, cb) => {
  axios.post(API_BASE_URL + '/tasks/link', payload,{
    headers: {
      Authorization: `Bearer ${getJwt()}`
    }
  }).then(res => {
    cb(res.data, true);
  }).catch(err => {
    cb(err.message, false);
  });
};

export const unlinkTask = (taskId, qualId, cb) => {
  axios.delete(API_BASE_URL + '/tasks/link', {
    headers: {
      Authorization: `Bearer ${getJwt()}`
    },
    params: {
      taskId: taskId,
      qualId: qualId
    }
  }).then(res => {
    cb(res.data, true);
  }).catch(err => {
    cb(err.message, false);
  });
};

export const getRequirements = (qualId, cb) => {
  axios.get(API_BASE_URL + '/tasks/link', {
    headers: {
      Authorization: `Bearer ${getJwt()}`
    },
    params: {
      id: qualId
    }
  }).then(res => {
    cb(null, res.data[0].Tasks);
  }).catch(err => {
    cb(err.message, false);
  });
};

export const getTaskApprovals = (cb) => {
  axios.get(API_BASE_URL + '/tasks/approvals', {
    headers: {
      Authorization: `Bearer ${getJwt()}`
    }
  }).then(response => {
    if (response.status === 200) {
      cb(null, response.data);
    }
  }).catch(err => {
    console.error(err);
    cb(err.message, false);
  });
}