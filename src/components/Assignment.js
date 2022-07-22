import { Link } from 'react-router-dom';
import StatusSwitch from './AssignmentComponents/StatusSwitch';

export default function Assignment({ assgn }) {
  const convertedTime = new Date(assgn.due_date).toLocaleDateString('en-us');
  return (
    <Link className="assignment-tile" to={`/assignments/${assgn.id}`}>
      <div className="assignment-list-div">
        <h3>{assgn.title}</h3>
        <p>
          Due Date: {convertedTime} <br></br>
          Total Points: {assgn.total_points}
        </p>
        <p className="status">
          <StatusSwitch status_id={assgn.status_id} />
        </p>
      </div>
    </Link>
  );
}
