import { Button, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAssignmentById } from '../services/fetch-assignments';
import GitHubIcon from '@mui/icons-material/GitHub';
import { styled } from '@mui/material/styles';
import { CheckCircle } from '@mui/icons-material';
import MUIRichTextEditor from 'mui-rte';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './AssignmentDetail.css';
import { getAllAssignmentSubmissionsByUser, insertSubmission } from '../services/fetch-sumbissions';
import { useStateContext } from '../StateProvider';
import SubmissionRow from './AssignmentComponents/SubmissionRow';
import { convertToRaw } from 'draft-js';

export default function AssignmentDetail() {
  const { id } = useParams();
  const { user } = useStateContext();
  const [activeAssignment, setActiveAssignment] = useState({});
  const [submissionText, setSubmissionText] = useState({});
  const [submissions, setSubmissions] = useState(null);

  async function getActiveAssignment() {
    const assignment = await getAssignmentById(id);
    setActiveAssignment(assignment);
  }

  async function getSubmissionsOnLoad() {
    const submissionsList = await getAllAssignmentSubmissionsByUser(id, user.id);
    setSubmissions(submissionsList);
  }

  useEffect(() => {
    getActiveAssignment();
    getSubmissionsOnLoad();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#221F1F'),
    backgroundColor: '#221F1F',
    '&:hover': {
      backgroundColor: '#6F6866',
    },
  }));

  const handleSave = (data) => {
    setSubmissionText(data);
  };

  const handleChange = (event) => {
    const content = JSON.stringify(convertToRaw(event.getCurrentContent()));
    setSubmissionText(content);
  };

  const editorTheme = createTheme();

  Object.assign(editorTheme, {
    overrides: {
      MUIRichTextEditor: {
        root: {
          marginTop: '20px',
          width: '95%',
          minHeight: '200px',
          maxHeight: '200px',
          overflow: 'auto',
          position: 'relative',
          backgroundColor: '#FFFCFA',
          padding: '5px',
          paddingLeft: '20px',
          borderRadius: '20px'
        }
      }
    }
  });

  async function createSubmission(e) {
    e.preventDefault();
    await insertSubmission(submissionText, id, user.id);
    window.location.reload(false);
  }

  return ( 
    <div className='app-page flex-row'>
      <div className='column1'>
        <div className='space-between app-container'>
          <h1 className='assignmentTitle'>{activeAssignment.title}</h1>
          <Chip label={activeAssignment.status} variant="outlined" color="success" icon={<CheckCircle />} />
        </div>
        <div className='app-container'>
          <div className='flex-row space-between'>
            <h2>Assignment Description</h2>
            <h3>Total Points: {activeAssignment.total_points}</h3>
          </div>
          <ThemeProvider theme={editorTheme}>
            <MUIRichTextEditor
              inlineToolbar={false}
              toolbar={false}
              readOnly={true}
              defaultValue={activeAssignment.description}
            />
          </ThemeProvider>
        </div>
        <div className='app-container'>
          <h2>Submit Assignment</h2>
          <ThemeProvider theme={editorTheme}>
            <MUIRichTextEditor
              label="Type something here..."
              inlineToolbar={true}
              onChange={handleChange}
              onSave={handleSave}
            />
          </ThemeProvider>
          <Button onClick={createSubmission}>Submit</Button>
        </div>
        <div className='app-container'>
          <h2>Past Submissions</h2>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Submission</TableCell>
                  <TableCell align="right">Submitted On</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Grade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {submissions ? submissions.map((submission, i) => (
                  <SubmissionRow key={i} data={submissionText} row={submission} total_points={activeAssignment.total_points} />
                )) : null}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className='column2'>
        <div className='space-around app-container'>
          <ColorButton variant='contained' startIcon={<GitHubIcon />}>
              Template
          </ColorButton>
          <ColorButton variant='contained' startIcon={<GitHubIcon />}>
              Example
          </ColorButton>
        </div>
        <form className='ticketForm app-container'>
          <h3>Submit Ticket for Help</h3>
          <TextField id="standard-basic" label="Trouble With" variant="standard" helperText="I am having trouble with"/>
          <TextField id="standard-basic" label="Tried" variant="standard" helperText="Solutions you have tried"/>
          <TextField id="standard-basic" label="Issue" variant="standard" helperText="What you believe the issue might be" multiline rows={4}/>
          <TextField id="standard-basic" label="Room" variant="standard" helperText="Which room you are in"/>
          <Button>Submit Ticket</Button>
        </form>
      </div>
    </div>
  );
}
