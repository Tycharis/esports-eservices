import axios from 'axios';
import {API_BASE_URL, getJwt} from "../components/lib";

export const getEvents = (cb) => {
  axios.get(API_BASE_URL + '/events', {
    headers: {
      Authorization: `Bearer ${getJwt()}`
    }
  }).then(res => {
    cb(null, res.data);
  }).catch(err => {
    console.log(err);
    localStorage.removeItem('jwt');
    cb(err.message, false);
  });
};

export const deleteEvent = (id, cb) => {
  axios.delete(API_BASE_URL + '/events', {
    headers: {
      Authorization: `Bearer ${getJwt()}`
    },
    params: {
      id: id
    }
  }).then(res => {
    cb(res.data, true);
  }).catch(err => {
    cb(err.message, false);
  });
};

export const createEvent = (payload, cb) => {
  axios.post(API_BASE_URL + '/events', payload, {
    headers: {
      Authorization: `Bearer ${getJwt()}`
    }
  }).then(res => {
    cb(res.data, true);
  }).catch(err => {
    cb(err.message, false);
  });
};