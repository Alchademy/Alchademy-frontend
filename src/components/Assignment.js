export default function Assignment({ assgn }) {
  return (
    <div className="assignment-list-div">
      <h3>{assgn.title}</h3>
      <p>
        {assgn.due_date} | {assgn.total_points}{' '}
      </p>
      <p>
        {' '}
        {assgn.status_id === 2 && <span>Active</span>}
        {assgn.status_id === 4 && <span>Completed</span>}{' '}
      </p>
    </div>
  );
}