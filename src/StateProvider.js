import { useState, createContext, useContext } from 'react';
import { getAssignmentsBySyllabusId } from './services/fetch-assignments';
import { getSyllabusByUserID } from './services/fetch-syllabus';

const StateContext = createContext();

export function StateProvider({ children }) {
  const [user, setUser] = useState({});
  const [syllabus, setSyllabus] = useState([]);
  const [assignment, setAssignment] = useState([]);
  const [submissionText, setSubmissionText] = useState({});
  const [spinner, setSpinner] = useState(false);
  const state = {
    user,
    setUser,
    syllabus,
    setSyllabus,
    getSyllabus,
    assignment,
    setAssignment,
    getSyllabusAssignments,
    submissionText,
    setSubmissionText,
    spinner,
    setSpinner
  };

  async function getSyllabus() {
    const syllabusList = await getSyllabusByUserID(user.id);
    if (syllabusList.length > 0) setSyllabus(syllabusList);
  }

  async function getSyllabusAssignments(syllabus_id) {
    const assignmentList = await getAssignmentsBySyllabusId(syllabus_id);
    if (assignmentList.length > 0) setAssignment(assignmentList);
  }

  return <StateContext.Provider value={state}>{children}</StateContext.Provider>;
}

export function useStateContext() {
  return useContext(StateContext);
}
