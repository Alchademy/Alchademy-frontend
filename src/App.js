import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  // useHistory,
} from 'react-router-dom';
import AboutPage from './components/AboutPage';
import AccountPage from './components/AccountPage';
import AssignmentList from './components/AssignmentList';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import { getUser, logout } from './services/fetch-users';
import { useStateContext } from './StateProvider';

export default function App() {
  const { user, setUser } = useStateContext();

  async function handleLogout() {
    await logout();
    window.location.replace('/');
  }

  useEffect(() => {
    async function load() {
      const user = await getUser();
      setUser(user);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Router>
      <div>
        <button onClick={handleLogout}>Logout</button>
        {user.id ? <nav>
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
        </nav> : ''}
       

        <Switch>
          <Route exact path="/">
            {user.id ? <Redirect to="/dashboard" /> : <AuthPage />}
          </Route>
          <Route exact path="/about">
            {user.id ? <AboutPage /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/account">
            {user.id ? <AccountPage /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/dashboard">
            {user.id ? <Dashboard /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/assignments">
            {user.id ? <AssignmentList /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
