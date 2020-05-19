import axios from 'axios';
import {API_BASE_URL, getJwt} from "../components/lib";

export const createQualification = (payload, cb) => {
  axios.post(API_BASE_URL + '/qualifications', payload, {
    headers: {
      Authorization: `Bearer ${getJwt()}`
    }
  }).then(res => {
    cb(res.data, true);
  }).catch(err => {
    cb(err.message, false);
  });
};

export const getQualifications = (cb) => {
  axios.get(API_BASE_URL + '/qualifications', {
    headers: {
      Authorization: `Bearer ${getJwt()}`
    }
  }).then(res => {
    cb(null, res.data);
  }).catch(err => {
    cb(err, false);
  });
};

export const deleteQualification = (qualId, cb) => {
  axios.delete(API_BASE_URL + '/qualifications', {
    headers: {
      Authorization: `Bearer ${getJwt()}`
    },
    params: {
      qualId: qualId
    }
  }).then(res => {
    cb(res.data, true);
  }).catch(err => {
    cb(err.message, false);
  });
};

export const deleteCompletedQual = (escid, qualId, cb) => {
  axios.delete(API_BASE_URL + '/qualifications/complete', {
    headers: {
      Authorization: `Bearer ${getJwt()}`
    },
    params: {
      escid: escid,
      qualId: qualId
    }
  }).then(res => {
    cb(res.data, true);
  }).catch(err => {
    cb(err.message, false);
  });
};

export const getCompletedQualForUser = (escid, qualId, cb) => {
  axios.get(API_BASE_URL + '/qualifications/complete', {
    headers: {
      Authorization: `Bearer ${getJwt()}`
    },
    params: {
      escid: escid,
      qualId: qualId
    }
  }).then(res => {
    cb(null, res.data);
  }).catch(err => {
    cb(err.message, false);
  });
};

export const getQualificationApprovals = (cb) => {
  axios.get(API_BASE_URL + '/qualifications/approvals', {
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

export const approveQualification = (payload, cb) => {
    axios.post(API_BASE_URL + '/tasks/approvals', payload, {
      headers: {
        Authorization: `Bearer ${getJwt()}`
      }
    }).then(response => {
      cb(null, true)
    }).catch(err => {
      console.log(err);
      cb(err.message, false);
    });
};