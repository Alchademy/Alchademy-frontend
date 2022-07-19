import React from 'react';
import { useStateContext } from '../StateProvider';
import AccountModule from './AccountModule';
import './AccountPage.css';

export default function AccountPage() {
  const { user, syllabus } = useStateContext();
  console.log(syllabus);

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
      <div className="modules">
        {syllabus.length > 0 &&
          syllabus.map((syl) => <AccountModule key={syl.title} syllabus={syl} />)}
      </div>
    </div>
  );
}
