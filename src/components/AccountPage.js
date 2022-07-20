import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useStateContext } from '../StateProvider';
import AccountModule from './AccountModule';
import './AccountPage.css';

export default function AccountPage() {
  const { user, syllabus } = useStateContext();
  const [selectedModule, setSelectedModule] = useState({});

  useEffect(() => {
    if (syllabus.length > 0) {
      setSelectedModule(syllabus[0]);
    }
  }, [syllabus]);

  return (
    <div className="account-page">
      <div className="account-page-content">
        <div className="avatar-and-username">
          {user.avatar && (
            <div className="avatar">
              <img src={user.avatar} />
            </div>
          )}
          <div className="username">Grades for {user.username}</div>
        </div>
        <FormControl
          className="module-select"
          sx={{
            margin: '20px 0px 4px',
            borderColor: 'black',
          }}
        >
          <InputLabel>Course</InputLabel>
          <Select
            defaultValue={0}
            label="Course"
            onChange={(e) => setSelectedModule(syllabus[e.target.value])}
          >
            {syllabus.length > 0 &&
              syllabus.map((syl, i) => (
                <MenuItem key={syl.id} value={i}>
                  {syl.title}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {syllabus.length > 0 && (
          <AccountModule key={selectedModule.title} syllabus={selectedModule} />
        )}
      </div>
    </div>
  );
}
