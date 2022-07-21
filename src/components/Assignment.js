import { CheckCircle } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Assignment({ assgn }) {
  return (
    <Link className="assignment-tile" to={`/assignments/${assgn.id}`}>
      <div className="assignment-list-div">
        <h3>{assgn.title}</h3>
        <p>
          {assgn.due_date} | {assgn.total_points}{' '}
        </p>
        <Chip
          variant="outlined"
          color="success"
          label={assgn.status_id === 4 ? 'Completed' : 'Active'}
          icon={<CheckCircle />}
        />
      </div>
    </Link>
  );
}
