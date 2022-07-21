import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AboutPage from './components/AboutPage';
import AccountPage from './components/AccountPage';
import AssignmentList from './components/AssignmentList';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import AssignmentDetail from './components/AssignmentDetail';
import { getUser } from './services/fetch-users';
import { useStateContext } from './StateProvider';
import Nav from './components/Nav';

export default function App() {
  const { user, setUser } = useStateContext();
  const [checkedForUser, setCheckedForUser] = useState(false);

  useEffect(() => {
    async function load() {
      if (!user.id) {
        const user = await getUser();
        setUser(user);
      }
      if (!checkedForUser) {
        setCheckedForUser(true);
      }
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      {checkedForUser && (
        <div className="App">
          {user.id ? <Nav /> : ''}

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
            <Route exact path="/assignments/syllabus/:id">
              {user.id ? <AssignmentList /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/assignments/:id">
              {user.id ? <AssignmentDetail /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/grading">
              {user.role > 1 ? <AssignmentDetail /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </div>)}
    </Router>
  );
}
