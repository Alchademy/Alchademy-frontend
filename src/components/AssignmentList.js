import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAssignmentsBySyllabusId } from '../services/fetch-assignments';
import { useStateContext } from '../StateProvider';
import Assignment from './Assignment';
import './Assignments.css';

export default function AssignmentList() {
  const { syllabus, assignment, getSyllabusAssignments, setAssignment, getSyllabus } =
    useStateContext();
  const { id } = useParams();

  useEffect(() => {
    async function getAssignments() {
      if (id) {
        const assignmentData = await getAssignmentsBySyllabusId(id);
        setAssignment(assignmentData);
      }
    }
    getAssignments();
    getSyllabus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syllabus.id]);

  return (
    <div>
      <div className="syllabus-title"> </div>
      <div>
        {assignment.map((assgn, i) => (
          <Assignment key={assgn.title + i} assgn={assgn} />
        ))}
      </div>
    </div>
  );
}
