import { Button, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAssignmentById } from '../services/fetch-assignments';
import GitHubIcon from '@mui/icons-material/GitHub';
import { styled } from '@mui/material/styles';
import { CheckCircle } from '@mui/icons-material';
import MUIRichTextEditor from 'mui-rte';
import { ThemeProvider, createMuiTheme } from '@mui/material/styles';
import './AssignmentDetail.css';
import { getAllAssignmentSubmissionsByUser, insertSubmission } from '../services/fetch-sumbissions';
import { useStateContext } from '../StateProvider';

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

  function createMarkup() {
    return { __html: `${activeAssignment.description}` };
  }
  function markupAssignmentDescription() {
    return <div dangerouslySetInnerHTML={createMarkup()} />;
  }

  const save = (data) => {
    setSubmissionText(data);
  };

  const editorTheme = createMuiTheme();

  console.log(submissions);

  Object.assign(editorTheme, {
    overrides: {
      MUIRichTextEditor: {
        root: {
          marginTop: 20,
          width: '80%',
          minHeight: '200px',
          maxHeight: '200px',
          overflow: 'auto',
          position: 'relative',
          backgroundColor: '#FFFCFA',
          padding: '5px',
          borderRadius: '20px'
        },
        editor: {
          border: '1px solid gray' 
        }
      }
    }
  });

  async function createSubmission(e) {
    e.preventDefault();
    await insertSubmission(submissionText, id, user.id);
  }

  return ( 
    <div className='titleLine'>
      <div className='column1'>
        <div className='space-between titleContainer'>
          <h1 className='assignmentTitle'>{activeAssignment.title}</h1>
          <Chip label={activeAssignment.status} variant="outlined" color="success" icon={<CheckCircle />} />
        </div>
        <div className='editContainer'>
          <h2>Assignment Description</h2>
          <h4>Total Points: {activeAssignment.total_points}</h4>
          <div className='assignmentDescription'>
            { markupAssignmentDescription() }
          </div>
        </div>
        <form onSubmit={createSubmission} className='editContainer'>
          <h2>Submit Assignment</h2>
          <ThemeProvider theme={editorTheme}>
            <MUIRichTextEditor
              label="Type something here..."
              inlineToolbar={true}
              onChange={save}
            />
          </ThemeProvider>
          <button>Submit</button>
        </form>
        <div className='editContainer'>
          <h2>Past Submissions</h2>
          <TableContainer>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Submission</TableCell>
                  <TableCell align="right">Submitted On</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Grade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {rows.map((row) => (
                  <Row key={row.name} row={row} />
                ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className='column2'>
        <div className='space-around editContainer'>
          <ColorButton variant='contained' startIcon={<GitHubIcon />}>
              Template
          </ColorButton>
          <ColorButton variant='contained' startIcon={<GitHubIcon />}>
              Example
          </ColorButton>
        </div>
        <form className='ticketForm editContainer'>
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
