import React, { useEffect, useState } from 'react';
import { getCohortByUserId } from '../services/fetch-cohorts';
import { getSyllabusByUserID } from '../services/fetch-syllabus';
import { useStateContext } from '../StateProvider';

export default function Dashboard() {
  const { user, setUser } = useStateContext();
  const [syllabus, setSyllabus] = useState([]);
  const [cohort, setCohort] = useState([]);

  useEffect(() => {
    async function getSyllabus() {
      const syllabusList = await getSyllabusByUserID(user.id);
      if (syllabusList.length > 0) setSyllabus(syllabusList);
    }
    async function getCohort() {
      const cohortList = await getCohortByUserId(user.id);
      if (cohortList.length > 0) setCohort(cohortList);
    }

    getSyllabus();
    getCohort();
    console.log('cohort', cohort);
  }, [user.id]);

  return (
    <div>
      {syllabus.map((syllabi, i) => (
        <p key={i}>{syllabi.title}</p>
      ))}
      {cohort.map((coh, i) => (
        <p key={i}>{coh.title}</p>
      ))}
    </div>
  );
}
