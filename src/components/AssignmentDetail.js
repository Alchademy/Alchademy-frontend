import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAssignmentById } from '../services/fetch-assignments';
import MUIRichTextEditor from 'mui-rte';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './AssignmentDetail.css';
import { getAllAssignmentSubmissionsByUser, insertSubmission } from '../services/fetch-sumbissions';
import { useStateContext } from '../StateProvider';
import SubmissionRow from './AssignmentComponents/SubmissionRow';
import { convertToRaw } from 'draft-js';
import LinkButton from './AssignmentComponents/LinkButton';
import CustomButton from './CustomButton';
import StatusSwitch from './AssignmentComponents/StatusSwitch';
import Spinner from './Spinner';

export default function AssignmentDetail() {
  const { id } = useParams();
  const { user, spinner, setSpinner } = useStateContext();
  const [activeAssignment, setActiveAssignment] = useState({});
  const [submissionText, setSubmissionText] = useState({});
  const [repoLink, setRepoLink] = useState('');
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
    setSpinner(true);
    getActiveAssignment();
    getSubmissionsOnLoad();
    setSpinner(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = (data) => {
    setSubmissionText(data);
  };

  const handleRepoChange = (e) => {
    setRepoLink(e.target.value);
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
          borderRadius: '20px',
        },
      },
    },
  });

  async function createSubmission(e) {
    setSpinner(true);
    e.preventDefault();
    await insertSubmission(submissionText, id, user.id, repoLink);
    window.location.reload(true);
    setSpinner(false);
  }

  return (<div>
    {spinner ? <Spinner /> :
  
      <div className='app-page flex-row'>
        <div className='column1'>
          <div className='space-between app-container flex-row'>
            <h1 className='assignmentTitle'>{activeAssignment.title}</h1>
            <StatusSwitch status_id={activeAssignment.status_id} />
          </div>
          <div className="app-container">
            <div className="flex-row space-between">
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
          <div className="app-container">
            <h2>Submit Assignment</h2>
            <div className='flex-column center-items'>
              <TextField onChange={handleRepoChange} fullWidth sx={{ marginTop: '20px' }} id="repo_link" label="Repo" variant="standard" helperText="Add Github Link for your project"/>
              <ThemeProvider theme={editorTheme}>
                <MUIRichTextEditor
                  label="Leave comments about project..."
                  inlineToolbar={true}
                  onChange={handleChange}
                  onSave={handleSave}
                />
              </ThemeProvider>
              <CustomButton onClick={createSubmission} text={'Submit Assignment'} width={'98%'}/>
            </div>
          </div>
          <div className="app-container">
            <h2>Past Submissions</h2>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Submission</TableCell>
                    <TableCell align="center">Submitted On</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Repo</TableCell>
                    <TableCell align="center">Grade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {submissions
                    ? submissions.map((submission, i) => (
                      <SubmissionRow
                        key={i}
                        data={submissionText}
                        row={submission}
                        total_points={activeAssignment.total_points}
                      />
                    ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className='column2'>
          <div className='space-around app-container flex-row'>
            <LinkButton text={'Template'} link={activeAssignment.template_link}/>
            <LinkButton text={'Example'} link={activeAssignment.example_link}/>
          </div>
          <form className="ticketForm app-container">
            <h3>Submit Ticket for Help</h3>
            <TextField id="standard-basic" label="Trouble With" variant="standard" helperText="I am having trouble with"/>
            <TextField id="standard-basic" label="Tried" variant="standard" helperText="Solutions you have tried"/>
            <TextField id="standard-basic" label="Issue" variant="standard" helperText="What you believe the issue might be" multiline rows={4}/>
            <TextField id="standard-basic" label="Room" variant="standard" helperText="Which room you are in"/>
            <CustomButton text={'Submit Ticket'} width={'100%'}/>
          </form>
        </div>
      </div>}
  </div>
  );
}
