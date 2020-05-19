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

import {getUnitForUser, getUnitMemberCount} from "../../../services/unit-service";
import {getMemberCount} from "../../../services/user-service";

function StatisticsModule(props) {
  const [unit, setUnit] = useState(undefined);
  const [unitCount, setUnitCount] = useState(undefined);
  const [clubCount, setClubCount] = useState(undefined);

  useEffect(() => {
    getMemberCount((err, count) => {
      if (err) {
        props.history.push('/login');
        return;
      }

      setClubCount(count);
    });
  });

  useEffect(() => {
    if (!props.user) {
      return;
    }

    getUnitForUser(props.user.id, (err, unit) => {
      if (err) {
        props.history.push('/login');
        return;
      }

      if (unit) {
        setUnit(unit);

        getUnitMemberCount(unit.id, (err, count) => {
          if (err) {
            props.history.push('/login');
            return;
          }

          setUnitCount(count);
        });
      }
    });
  }, [props.history, props.user]);

  return (
      <Card>
        <Card.Header as="h4" className="text-center bg-secondary text-white">Statistics</Card.Header>
        <Card.Body>
          <span>Members in your unit ({unit ? unit.charter : "No unit"}): {unitCount ? unitCount : "N/A"}</span>
          <br />
          <span>Total Club member count: {clubCount}</span>
        </Card.Body>
      </Card>
  );
}

export default withRouter(StatisticsModule);