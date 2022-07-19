import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAssignmentsBySyllabusId } from '../services/fetch-assignments';
import { useStateContext } from '../StateProvider';
import Assignment from './Assignment';

export default function AssignmentList() {
  const { syllabus, assignment, getSyllabusAssignments, setAssignment } = useStateContext();
  const { id } = useParams();

  useEffect(() => {
    async function getAssignments() {
      if (id) {
        const assignmentData = await getAssignmentsBySyllabusId(id);
        setAssignment(assignmentData);
      }
    }
    getAssignments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syllabus.id]);

  return (
    <div>
      <div> {syllabus.title} </div>
      <div>
        {assignment.map((assgn, i) => (
          <Assignment key={assgn.title + i} assgn={assgn} />
        ))}
      </div>
    </div>
  );
}
