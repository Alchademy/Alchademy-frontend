import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAssignmentsAndSubmissionsBySyllabusId } from '../services/fetch-assignments';

export default function AccountModule({ syllabus }) {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    async function getAssignmentsAndSubmissions() {
      if (syllabus.id) {
        const assignmentData = await getAssignmentsAndSubmissionsBySyllabusId(syllabus.id);
        setAssignments(assignmentData);
      }
    }
    getAssignmentsAndSubmissions();
  }, []);

  console.log('assignments', assignments);

  return (
    <div className="account-page-module">
      <h3>{syllabus.title}</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Assignment</TableCell>
            <TableCell>Due</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Out of</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assignments.length > 0 &&
            assignments.map((assign) => (
              <TableRow key={assign.title + assign.syllabus_id} className="assignment-row">
                <TableCell>{assign.title}</TableCell>
                <TableCell>{assign.due_date}</TableCell>
                <TableCell>{assign.created_on > assign.due_date && 'Late'}</TableCell>
                <TableCell>{assign.grade}</TableCell>
                <TableCell>{assign.total_points}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

{
  /* <div>
{submission.status_id === 4 && 'Completed'}
{submission.status_id === 3 && 'Active'}
{submission.status_id === 2 && 'Active'}
{submission.status_id === 1 && 'Pending'}
</div> */
}
