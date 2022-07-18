import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import AboutPage from './components/AboutPage';
import AccountPage from './components/AccountPage';
import AssignmentList from './components/AssignmentList';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/assignments">Assignments</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <AboutPage/>
          </Route>
          <Route path="/account">
            <AccountPage/>
          </Route>
          <Route path="/dashboard">
            <Dashboard/>
          </Route>
          <Route path="/assignments">
            <AssignmentList/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

