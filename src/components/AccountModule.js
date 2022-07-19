import React, { useEffect, useState } from 'react';
import { getAssignmentsBySyllabusId } from '../services/fetch-assignments';

export default function AccountModule({ syllabus }) {
  const [assignments, setAssignments] = useState();

  useEffect(() => {
    async function getAssignments() {
      if (syllabus.id) {
        const data = await getAssignmentsBySyllabusId(syllabus.id);
        setAssignments(data);
      }
    }
    async function getStaff() {}
    getAssignments();
    getStaff();
  }, []);

  console.log('assignments', assignments);

  return (
    <div className="account-page-module">
      <h3>{syllabus.title}</h3>
      {assignments.length > 0 &&
        assignments.map((assign) => (
          <div key={assign.title + assign.syllabus_id}>{assign.title}</div>
        ))}
    </div>
  );
}
