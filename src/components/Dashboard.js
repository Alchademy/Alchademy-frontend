import React, { useEffect, useState } from 'react';
import { getCohortByUserId } from '../services/fetch-cohorts';
import { Link } from 'react-router-dom';
import { getSyllabusByUserID } from '../services/fetch-syllabus';
import { useStateContext } from '../StateProvider';
import './Dashboard.css';

export default function Dashboard() {
  const { user, setUser, getSyllabus, syllabus } = useStateContext();
  const [cohort, setCohort] = useState([]);

  useEffect(() => {
    async function getCohort() {
      const cohortList = await getCohortByUserId(user.id);
      if (cohortList.length > 0) setCohort(cohortList);
    }

    getSyllabus();
    getCohort();
  }, [user.id]);

  return (
    <div className='syllabus-container' >
      {syllabus.map((syllabi, i) => (
        <Link key={i + syllabi.id} to={`/assignments/syllabus/${syllabi.id}`} className='syllabus-tile'>
          <div>
            <div className='syllabus-image'>
              <img src={'./Alchademy.png'} />
            </div>
            <div className="syllabus-lower">
              <div className='syllabus-description'>
                <p>{syllabi.title}</p>
                {/* have to get name of creator from sql backend */}
                <p>created by:{syllabi.created_by}</p>
              </div>
              <span className='completeOrActive'>
                {syllabi.status_id === 1 ? <p className='active'>Active</p>
                  : <p className='complete'>Complete</p>}
              </span>
            </div>
            
          </div>
        </Link>
      ))}
    </div>
  );
}
