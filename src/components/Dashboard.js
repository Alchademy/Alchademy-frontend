import React, { useEffect, useState } from 'react';
import { getSyllabusByUserID } from '../services/fetch-syllabus';
import { useStateContext } from '../StateProvider';

export default function Dashboard() {
  const { user, setUser } = useStateContext();
  const [syllabus, setSyllabus] = useState([]);

  useEffect(() => {
    async function getSyllabus() {
      const syllabusList = await getSyllabusByUserID(user.id);
      if (syllabusList.length > 0) setSyllabus(syllabusList);
    }
    getSyllabus();
  }, [user.id]);

  return (
    <div>{syllabus.map((syllabi, i) => <p key={i}>{syllabi.title}</p>)}</div>
  );
}
