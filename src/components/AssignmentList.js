import React, { useEffect, useState } from 'react';
import { useStateContext } from '../StateProvider';
import { getAssignmentsByUser } from '../services/fetch-assignments';
import { getAssignmentsBySyllabusId } from '../services/fetch-assignments';

export default function AssignmentList() {
  const { syllabus, assignment, getSyllabusAssignments } = useStateContext();

  useEffect(() => {
    getSyllabusAssignments(syllabus.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {assignment.map((ass, i) => (
        <p key={i}>{ass.title}</p>
      ))}
    </div>
  );
}
