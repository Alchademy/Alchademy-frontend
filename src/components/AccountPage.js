import React from 'react';
import { useStateContext } from '../StateProvider';
import './AccountPage.css';

export default function AccountPage() {
  const { user, syllabus, assignment } = useStateContext();
  console.log(syllabus);
  console.log(assignment);

  return (
    <div className="account-page">
      <div className="avatar-and-username">
        {user.avatar && (
          <div className="avatar">
            <img src={user.avatar} />
          </div>
        )}
        <div className="username">
          {user.username} - {user.role === 4 && 'Admin'}
          {user.role === 3 && 'Instructor'}
          {user.role === 2 && 'TA'}
          {user.role === 1 && 'Student'}
        </div>
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
