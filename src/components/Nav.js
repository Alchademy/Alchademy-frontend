import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser, logout } from '../services/fetch-users';
import { useStateContext } from '../StateProvider';
import './Nav.css';

export default function Nav() {
  const { user, setUser } = useStateContext({});

  async function handleLogout() {
    await logout();
    window.location.replace('/');
  }

  useEffect(() => {
    async function getCurrentUser() {
      const user = await getUser();
      setUser(user);
    }
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="navBar">
      <span className="left">
        <p>Welcome {user.username}</p>
        <p>Role: {user.role}</p>
      </span>
      <div className="right">
        <ul>
          <li>
            <Link to="/dashboard" className="link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="link">
              About
            </Link>
          </li>
          <li>
            <Link to="/account" className="link">
              Account
            </Link>
          </li>
          <li>
            <Link to="/assignments/1" className='link'>Assignment</Link>
          </li>
          <input className='navSearchBar'/>
          <button onClick={handleLogout}>Logout</button>
        </ul>
      </div>
    </div>
  );
}
