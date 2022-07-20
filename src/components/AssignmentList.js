import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { getAssignmentsBySyllabusId } from '../services/fetch-assignments';
import { useStateContext } from '../StateProvider';
import Assignment from './Assignment';
import './Assignments.css';
import { getSyllabusByID } from '../services/fetch-syllabus';

export default function AssignmentList() {
  const { syllabus, assignment, getSyllabusAssignments, setAssignment, setSyllabus } =
    useStateContext();
  const { id } = useParams();

  useEffect(() => {
    async function getAssignments() {
      if (id) {
        const assignmentData = await getAssignmentsBySyllabusId(id);
        setAssignment(assignmentData);
      }
    }
    async function getSyllabusName() {
      const syllabus = await getSyllabusByID(id);
      console.log(syllabus);
      setSyllabus(syllabus);
    }
    getAssignments();
    getSyllabusName();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syllabus.id]);

  return (
    <div>
      <div className="syllabus-title">{syllabus.title}</div>
      <div className="assignment-list">
        {assignment.map((assgn, i) => (
          <Assignment key={assgn.title + i} assgn={assgn} />
        ))}
      </div>
    </div>
  );
}
