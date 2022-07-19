import userEvent from '@testing-library/user-event';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/fetch-users';
import { useStateContext } from '../StateProvider';
import './Nav.css';

export default function Nav() {
  const { user, setUser } = useStateContext({});

  useEffect(() => {
    async function getCurrentUser(){
      const user = await getUser();
      setUser(user);
    }
    getCurrentUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='navBar'>
      <span className=''>
        <p>Welcome {user.username}</p>
      </span>
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
        <input className='navSearchBar'/>
      </ul>
      
    </div>
  );
}
