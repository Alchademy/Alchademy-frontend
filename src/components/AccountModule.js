import React, { useEffect, useState } from 'react';
import { getAssignmentsBySyllabusId } from '../services/fetch-assignments';
import { getAllSubmissionsByUser } from '../services/fetch-submissions';

export default function AccountModule({ syllabus }) {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    async function getAssignmentsAndSubmissions() {
      if (syllabus.id) {
        const assignmentData = await getAssignmentsBySyllabusId(syllabus.id);
        setAssignments(assignmentData);
      }
    }
    getAssignmentsAndSubmissions();
  }, []);

  console.log('assignments', assignments);

  return (
    <div className="account-page-module">
      <h3>{syllabus.title}</h3>
      {assignments.length > 0 &&
        assignments.map((assign) => (
          <div key={assign.title + assign.syllabus_id} className="account-page-assignment">
            <div>{assign.title}</div>
            <div>{assign.due_date}</div>
            <div>{assign.total_points}</div>
          </div>
        ))}
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
