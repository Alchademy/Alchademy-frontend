import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import StatusSwitch from './AssignmentComponents/StatusSwitch';

export default function GradeCard({ submission }) {
  return (
    <Link className='assignment-tile' to={`/grading/${submission.id}`}>
      <Card sx={{ minHeight: '200px', backgroundColor: '#A2D7D2' }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {submission.username}
          </Typography>
          <Typography variant="h5" component="div">
            {submission.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Grade: {submission.grade ? submission.grade : 0} / {submission.total_points}
          </Typography>
          <StatusSwitch status_id={submission.status_id}/>
        </CardContent>
      </Card>
    </Link>
  );
}
