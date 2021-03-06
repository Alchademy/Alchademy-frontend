import React, { useEffect, useState } from 'react';
import { getCohortByUserId } from '../services/fetch-cohorts';
import { Link } from 'react-router-dom';
import { useStateContext } from '../StateProvider';
import './Dashboard.css';
import StatusSwitch from './AssignmentComponents/StatusSwitch';
import Spinner from './Spinner';

export default function Dashboard() {
  const { user, getSyllabus, syllabus, spinner, setSpinner } = useStateContext();
  // const [cohort, setCohort] = useState([]);

  useEffect(() => {
    setSpinner(true);
    // async function getCohort() {
    //   const cohortList = await getCohortByUserId(user.id);
    //   if (cohortList.length > 0) setCohort(cohortList);
    // }
    getSyllabus();
    // getCohort();
    setSpinner(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  return (
    <div>
      {spinner ? (
        <Spinner />
      ) : (
        <div className="syllabus-container">
          {syllabus.length > 0 &&
            syllabus.map((syllabi, i) => (
              <Link
                key={i + syllabi.id}
                to={`/assignments/syllabus/${syllabi.id}`}
                className="syllabus-tile"
              >
                <div>
                  <div className="syllabus-image">
                    <img src={'./Alchademy.png'} />
                  </div>
                  <div className="syllabus-lower">
                    <div className="syllabus-description">
                      <p>{syllabi.title}</p>
                      {/* have to get name of creator from sql backend */}
                      <p>created by:{syllabi.created_by_name}</p>
                    </div>
                    <span className="completeOrActive">
                      <StatusSwitch status_id={syllabi.status_id} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
