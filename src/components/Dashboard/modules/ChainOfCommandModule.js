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

import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {Card} from 'react-bootstrap';

import {translateGrade} from "../../lib";
import {getUnitForUser, getUnitLeader} from "../../../services/unit-service";
import {getUserByGrade} from "../../../services/user-service";

function ChainOfCommandModule(props) {
  const [president, setPresident] = useState(undefined);
  const [unitLeader, setUnitLeader] = useState(undefined);
  const [unit, setUnit] = useState(undefined);

  useEffect(() => {
    if (!props.user) {
      return;
    }

    getUserByGrade(10, (err, user) => {
      if (err) {
        props.history.push('/login');
        return;
      }

      setPresident(user);
    });

    getUnitForUser(props.user.id, (err, unit) => {
      if (err) {
        props.history.push('/login');
        return;
      }

      setUnit(unit);
    });

    getUnitLeader(props.user.UnitId, (err, leader) => {
      if (err) {
        props.history.push('/login');
        return;
      }

      setUnitLeader(leader);
    });
  }, [props, props.user]);

  return (
      <Card>
        <Card.Header as="h4" className="text-center bg-secondary text-white">Chain of Command</Card.Header>
        <Card.Body>
          <strong>Club President</strong>
          <br />
          <span>{president ? translateGrade(president.grade, president.firstName, president.lastName) : ""}</span>
          <br />
          <br />
          <strong>Division Officer</strong>
          <br />
          <span>N/A</span>
          <br />
          <br />
          <strong>Group Director</strong>
          <br />
          <span>N/A</span>
          <br />
          <br />
          <strong>Unit leader ({unit ? (unit.charter ? unit.charter : "No unit") : "No unit"})</strong>
          <br />
          <span>{unitLeader ? translateGrade(unitLeader.grade, unitLeader.firstName, unitLeader.lastName) : ""}</span>
        </Card.Body>
      </Card>
  );
}

export default withRouter(ChainOfCommandModule);