import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

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
          </Route>
          <Route path="/users">
          </Route>
          <Route path="/">
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

