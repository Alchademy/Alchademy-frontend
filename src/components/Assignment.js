import { Link } from 'react-router-dom';

export default function Assignment({ assgn }) {
  return (
    <Link to={`/assignments/${assgn.id}`}>
      <div className="assignment-list-div">
        <h3>{assgn.title}</h3>
        <p>
          {assgn.due_date} | {assgn.total_points}{' '}
        </p>
        <p> {assgn.status_id} </p>
      </div>
    </Link>
  );
}
