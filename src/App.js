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

import AlertComponent from './components/AlertComponent/AlertComponent';
// import Header from './components/Header';
import Dashboard from './components/Dashboard/Dashboard';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import AuthenticatedComponent from "./components/AuthenticatedComponent";
import EventsPage from "./components/EventsPage/EventsPage";
import Operations from "./components/Operations/Operations";
import UserProfile from "./components/UserProfile/UserProfile";
import LinkPage from "./components/LinkPage/LinkPage";

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import UserPassword from "./components/UserPassword/UserPassword";
import QualificationsPage from "./components/QualificationsPage/QualificationsPage";
import TaskPage from "./components/TaskPage/TaskPage";

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);

  useEffect(() => {
    document.title = `Esports Club at Kansas State University eServices - ${title}`;
  });

  return (
      <Router>
          <div className="App">
              <div>
                  <Switch>
                      <Route path="/" exact={true}>
                          <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
                      </Route>
                      <Route path="/register">
                          <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
                      </Route>
                      <Route path="/login">
                          <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
                      </Route>
                      <AuthenticatedComponent showError={updateErrorMessage} updateTitle={updateTitle}>
                          <Route path="/dashboard" component={Dashboard} showError={updateErrorMessage} updateTitle={updateTitle} />
                          <Route path="/operations" component={Operations} showError={updateErrorMessage} updateTitle={updateTitle} />
                          <Route path="/profile" component={UserProfile} showError={updateErrorMessage} updateTitle={updateTitle} />
                          <Route path="/password" component={UserPassword} showError={updateErrorMessage} updateTitle={updateTitle} />
                          <Route path="/events" component={EventsPage} showError={updateErrorMessage} updateTitle={updateTitle} />
                          <Route path="/qualifications" component={QualificationsPage} showError={updateErrorMessage} updateTitle={updateTitle} />
                          <Route path="/tasks" component={TaskPage} showError={updateErrorMessage} updateTitle={updateTitle} />
                          <Route path="/link" component={LinkPage} showError={updateErrorMessage} updateTitle={updateTitle} />
                      </AuthenticatedComponent>
                  </Switch>
                  <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
              </div>
          </div>
      </Router>
  );
}

export default App;