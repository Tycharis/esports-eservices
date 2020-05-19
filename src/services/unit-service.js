import axios from "axios";
import {API_BASE_URL, getJwt} from "../components/lib";

export const getUnitLeader = (unitId, cb) => {
  axios.get(API_BASE_URL + '/units/leader', {
    headers: {
      Authorization: `Bearer ${getJwt()}`
    },
    params: {
      id: unitId
    }
  }).then(res => {
    cb(null, res.data)
  }).catch(err => {
    localStorage.removeItem('jwt');
    cb('Auth failed', false);
  });
};

export const getUnitForUser = (userId, cb) => {
  axios.get(API_BASE_URL + '/units', {
    headers: {
      Authorization: `Bearer ${getJwt()}`
    },
    params: {
      id: userId
    }
  }).then(res => {
    cb(null, res.data)
  }).catch(err => {
    localStorage.removeItem('jwt');
    cb(err, false);
  });
};

export const getUnitMemberCount = (unitId, cb) => {
  axios.get(API_BASE_URL + '/units/count', {
    headers: {
      Authorization: `Bearer ${getJwt()}`
    },
    params: {
      id: unitId
    }
  }).then(res => {
    cb(null, res.data.count)
  }).catch(err => {
    localStorage.removeItem('jwt');
    cb(err, false);
  });
}