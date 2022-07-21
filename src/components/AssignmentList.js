import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAssignmentsBySyllabusId } from '../services/fetch-assignments';
import { useStateContext } from '../StateProvider';
import Assignment from './Assignment';
import './Assignments.css';
import { getSyllabusByID } from '../services/fetch-syllabus';
import Spinner from './Spinner';

export default function AssignmentList() {
  const { syllabus, assignment, setAssignment, setSyllabus, setSpinner, spinner } = useStateContext();
  const { id } = useParams();
  
  useEffect(() => {
    setSpinner(true);
    async function getAssignments() {
      if (id) {
        const assignmentData = await getAssignmentsBySyllabusId(id);
        setAssignment(assignmentData);
      }
    }
    async function getSyllabusName() {
      const syllabus = await getSyllabusByID(id);
      setSyllabus(syllabus);
    }
    getAssignments();
    getSyllabusName();
    setSpinner(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syllabus.id]);

  return (
    <div>
      {spinner ? <Spinner /> :
        <div>
          <div className="syllabus-title">{syllabus.title}</div>
          <div className="assignment-list">
            {assignment.map((assgn, i) => (
              <Assignment key={assgn.title + i} assgn={assgn} />
            ))}
          </div>
        </div>}
    </div>
  );
}
