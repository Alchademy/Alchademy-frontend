import { styled } from '@mui/material/styles';
import { CheckCircle } from '@mui/icons-material';
import { Chip } from '@mui/material';
import React from 'react';

export default function StatusIcon({ text, color }) {
  // const StatusChip = styled(Chip)(({ theme }) => ({
  //   color: theme.palette.getContrastText({ color }),
  //   backgroundColor: { color }
  // }));
  return (
    <Chip label={text} 
      variant="outlined" 
      icon={<CheckCircle />}
      sx={{
        color: { color }
      }}
    />
  );
}
