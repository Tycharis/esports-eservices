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

import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {Card, Table} from 'react-bootstrap';

import {API_BASE_URL, getJwt, translateGrade, translateTime} from "../../lib";
import {approveRegistration, getRegistrationApprovals} from "../../../services/user-service";
import {approveQualification, getQualificationApprovals} from "../../../services/qualification-service";
import {getTaskApprovals} from "../../../services/task-service";

function ApprovalsModule(props) {
  const [children , setChildren] = useState([]);
  // const [user, setUser] = useState(undefined);

  useEffect(() => {
    let components = [];
    
    if (props.user) {
      if (props.user.grade >= 4) {
        getRegistrationApprovals((err, approvals) => {
          if (approvals) {
            components.concat(approvals);
          }
        });

        if (props.user.grade === 5 || props.user.grade === 9 || props.user.grade === 10) {
          getQualificationApprovals((err, approvals) => {
            if (approvals) {
              components.concat(approvals);
            }
          });
        }
      }

      getTaskApprovals((err, approvals) => {
        if (approvals) {
          components.concat(approvals);
        }
      });
    }
    
    setChildren(components);
  }, [props, props.user]);
  
  const sendTaskApproval = (approved, escid, taskId) => {
    axios.post(API_BASE_URL + '/qualifications/approvals', {
      approved: approved,
      escid: escid,
      taskId: taskId
    }, {
      headers: {
        Authorization: `Bearer ${getJwt()}`
      }
    })
        .then(response => {
          setChildren(prevState => {
            return prevState.filter(value => value.escid !== escid && value.taskId && value.taskId !== taskId);
          });
        })
        .catch(err => console.log(err));
  }

  const sendQualificationApproval = (approved, escid, qualId) => {
    approveQualification({
      approved: approved,
      escid: escid,
      qualId: qualId
    }, (message, qualApproved) => {
      if (qualApproved) {
        setChildren(prevState => {
          return prevState.filter(value => value.escid !== escid && value.qual_id && value.qual_id === qualId);
        });
      }
    });
  }

  const sendRegistrationApproval = (approved, email) => {
    approveRegistration(email, approved, (message, registrationApproved) => {
      if (registrationApproved) {

      }
    });
  }

  return (
      <Card>
        <Card.Header as="h4" className="text-center bg-secondary text-white">Approvals</Card.Header>
        <Card.Body>
          <Table striped bordered hover size="sm">
            <thead>
            <tr>
              <th>Approval</th>
              <th>Submitted by</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {children.map((item) => {
              if (item.task_name) {
                return (
                    <tr>
                      <td>Task completed: {item.task_name}</td>
                      <td>{translateGrade(item.grade, item.first, item.last)} ({item.escid})</td>
                      <td>{translateTime(item.completed)}</td>
                      <td>
                        <span onClick={() => sendTaskApproval(true, item.escid, item.qual_id)}>Approve</span>
                        or
                        <span onClick={() => sendTaskApproval(false, item.escid, item.qual_id)}>Deny</span>
                      </td>
                    </tr>
                );
              } else if (item.qualification_name) {
                return (
                    <tr>
                      <td>Qualification completed: {item.qualification_name}</td>
                      <td>{translateGrade(item.grade, item.first, item.last)} ({item.escid})</td>
                      <td>{translateTime(item.completed)}</td>
                      <td>
                        <span onClick={() => sendQualificationApproval(true, item.escid, item.task_id)}>Approve</span>
                        or
                        <span onClick={() => sendQualificationApproval(false, item.escid, item.task_id)}>Deny</span>
                      </td>
                    </tr>
                );
              } else {
                return (
                    <tr>
                      <td>Membership request</td>
                      <td>{item.first_name} {item.last_name} &lt;{item.email}&gt;</td>
                      <td />
                      <td>
                        <span className="text-success" onClick={() => sendRegistrationApproval(true, item.rowid)}>Approve</span>
                        or
                        <span className="text-danger" onClick={() => sendRegistrationApproval(false, item.rowid)}>Deny</span>
                      </td>
                    </tr>
                );
              }
            })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
  );
}

export default ApprovalsModule;