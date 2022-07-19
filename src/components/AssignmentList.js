import React, { useEffect, useState } from 'react';
import { useStateContext } from '../StateProvider';
import Assignment from './Assignment';

export default function AssignmentList() {
  const { syllabus, assignment, getSyllabusAssignments } = useStateContext();

  useEffect(() => {
    const list = getSyllabusAssignments(syllabus.id);
    console.log('list', list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
