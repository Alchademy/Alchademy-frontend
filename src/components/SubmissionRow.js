import { createTheme, TableCell, TableRow, ThemeProvider } from '@mui/material';
import MUIRichTextEditor from 'mui-rte';
import React from 'react';

export default function SubmissionRow({ row, total_points }) {
  const formattedDate = new Date(row.created_on).toLocaleDateString('en-us');
  const editorTheme = createTheme();
  Object.assign(editorTheme, {
    overrides: {
      MUIRichTextEditor: {
        root: {
          width: '100%',
          minHeight: '50px',
          maxHeight: '200px',
          overflow: 'auto',
          position: 'relative',
          backgroundColor: '#FFFCFA',
          borderRadius: '20px'
        }
      }
    }
  });
  return (
    <TableRow>
      <TableCell scope="row" sx={{ width: '60%' }}>
        <ThemeProvider theme={editorTheme}>
          <MUIRichTextEditor
            inlineToolbar={false}
            toolbar={false}
            readOnly={true}
            defaultValue={row.text}
          />
        </ThemeProvider>
      </TableCell>
      <TableCell align="right">{formattedDate}</TableCell>
      <TableCell align="right">{row.status_id}</TableCell>
      <TableCell align="right">{`${row.grade ? row.grade : 0} / ${total_points}`}</TableCell>
    </TableRow>
  );
}