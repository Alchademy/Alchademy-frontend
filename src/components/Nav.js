import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <div>
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
      </ul>
    </div>
  );
}
