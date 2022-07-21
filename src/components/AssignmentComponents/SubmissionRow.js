import { createTheme, TableCell, TableRow, ThemeProvider } from '@mui/material';
import MUIRichTextEditor from 'mui-rte';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import StatusSwitch from './StatusSwitch';

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
          padding: '5px',
          paddingLeft: '20px',
          borderRadius: '10px'
        }
      }
    }
  });
  return (
    <TableRow sx={row.status_id !== 3 ? { backgroundColor: '#E89062' } : {}}>
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
      <TableCell align="center">{formattedDate}</TableCell>
      <TableCell align="center"><StatusSwitch status_id={row.status_id} /></TableCell>
      <TableCell align="center">
        {row.repo_link ? <a href={row.repo_link} target="_blank" rel="noreferrer"><GitHubIcon /></a> : null}
      </TableCell>
      <TableCell align="center">{`${row.grade ? row.grade : 0} / ${total_points}`}</TableCell>
    </TableRow>
  );
}