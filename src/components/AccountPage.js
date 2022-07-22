import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useStateContext } from '../StateProvider';
import AccountModule from './AccountPageComponents/AccountModule';
import './AccountPage.css';

export default function AccountPage() {
  const { user, syllabus, getSyllabus } = useStateContext();
  const [selectedModule, setSelectedModule] = useState({});

  useEffect(() => {
    if (!syllabus.length) {
      getSyllabus();
    }
    if (syllabus.length) {
      setSelectedModule(syllabus[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {syllabus.length > 0 && (
          <>
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
                {syllabus.map((syl, i) => (
                  <MenuItem key={syl.id} value={i}>
                    {syl.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <AccountModule key={selectedModule.title} syllabus={selectedModule} />
          </>
        )}
      </div>
    </div>
  );
}
