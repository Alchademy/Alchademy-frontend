import { CheckCircle } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { Link } from 'react-router-dom';

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
        <Chip
          style={{ margin: '10px' }}
          variant="outlined"
          color="success"
          label={assgn.status_id === 4 ? 'Completed' : 'Active'}
          icon={<CheckCircle />}
        />
      </div>
    </Link>
  );
  // working on getting custom colors for status name
  // (assgn.status_id === 1 && '#dda438') ||
  // (assgn.status_id === 2 && '#e89062') ||
  // (assgn.status_id === 4 && '#1f4e5c')
}
