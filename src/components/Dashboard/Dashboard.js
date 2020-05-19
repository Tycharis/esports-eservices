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
import StatisticsModule from "./modules/StatisticsModule";
import ChainOfCommandModule from "./modules/ChainOfCommandModule";
import ApprovalsModule from "./modules/ApprovalsModule";
import NewsModule from "./modules/NewsModule";

import axios from "axios";
import {API_BASE_URL, getJwt} from "../lib";

function Dashboard(props) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    axios.get(API_BASE_URL + '/users/me', {
      headers: {
        Authorization: `Bearer ${getJwt()}`
      }
    }).then(response => {
      if (response.status === 200) {
        setUser(response.data);
      }
    }).catch(err => {
      localStorage.removeItem('jwt');
      props.history.push('/login');
    });
  }, [props.history]);

  return (
      <div className="row justify-content-center">
        <StatisticsModule {...props} user={user} className="col-md-3" />
        <ChainOfCommandModule {...props} user={user} className="col-md-3" />
        <ApprovalsModule {...props} user={user} className="col-md-3" />
        <NewsModule {...props} user={user} className="" />
      </div>
  );
}

export default Dashboard;