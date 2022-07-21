import { CheckCircle } from '@mui/icons-material';
import { Chip } from '@mui/material';
import React from 'react';

export default function StatusSwitch({ status_id }) {
  return (
    <div>
      {status_id === 1 ? <Chip label={'Pending'} variant="outlined" sx={{ color: '#FFFCFA', backgroundColor: '#A2D7D2' }}/> : null}
      {status_id === 2 ? <Chip label={'Active'} variant="outlined" sx={{ color: '#FFFCFA', backgroundColor: '#65A7AB' }}/> : null}
      {status_id === 3 ? <Chip label={'Archived'} variant="outlined" sx={{ color: '#FFFCFA', backgroundColor: '#9F7724' }}/> : null}
      {status_id === 4 ? <Chip label={'Completed'} variant="outlined" sx={{ color: '#FFFCFA', backgroundColor:'#1F4E5C' }}/> : null}
    </div>
  );
}
