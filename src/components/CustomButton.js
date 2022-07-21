import { Button } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';

export default function CustomButton({ onClick, text, width }) {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#1F4E5C'),
    backgroundColor: '#1F4E5C',
    marginTop: '20px',
    width: `${width}`,
    '&:hover': {
      backgroundColor: '#65A7AB',
      color: theme.palette.getContrastText('#65A7AB'),
    },
  }));
  return (
    <ColorButton variant='contained' onClick={onClick}>
      {text}
    </ColorButton>
  );
}
