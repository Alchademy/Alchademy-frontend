import React, { useEffect, useState } from 'react';
import { useStateContext } from '../StateProvider';
import './Assignments.css';
import { getSubmissionsByTA } from '../services/fetch-sumbissions';
import GradeCard from './GradeCard';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import './AssignmentDetail.css';

export default function GradingList() {
  const { user } = useStateContext();
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [status, setStatus] = useState(2);
  useEffect(() => {
    async function getAllSubmissionsAndFilterForTA() {
      if (user.role > 1) {
        const submissionData = await getSubmissionsByTA();
        const filteredSubmissions = submissionData.filter(submission => submission.status_id === status);
        setAllSubmissions(filteredSubmissions);
      }
    }
    getAllSubmissionsAndFilterForTA();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  function handleChange(e) {
    e.preventDefault();
    setStatus(e.target.value);
  }

  return (
    <div className='app-page'>
      <div className='app-container flex-row space-between'>
        <h2 className="grading-header">Welcome to your Grading Section, {user.username}</h2>
      </div>
      <div className="app-container flex-column">
        <div className='flex-row space-between'>
          <h3>Submissions</h3>
          <FormControl sx={{ width: '20vw' }}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value={2}>Submitted</MenuItem>
              <MenuItem value={3}>Archived</MenuItem>
              <MenuItem value={4}>Completed</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='flex-row'>
          {allSubmissions.map((submission, i) => (
            <GradeCard key={i} submission={submission} />
          ))}
        </div>
      </div>
    </div>
  );
}
