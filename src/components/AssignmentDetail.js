import { Button, Chip, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAssignmentById } from '../services/fetch-assignments';
import GitHubIcon from '@mui/icons-material/GitHub';
import { styled } from '@mui/material/styles';
import { CheckCircle } from '@mui/icons-material';
import MUIRichTextEditor from 'mui-rte';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './AssignmentDetail.css';

export default function AssignmentDetail() {
  const { id } = useParams();
  const [activeAssignment, setActiveAssignment] = useState({});

  useEffect(() => {
    async function getActiveAssignment() {
      const assignment = await getAssignmentById(id);
      setActiveAssignment(assignment);
    }
    getActiveAssignment();
  }, [id]);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#221F1F'),
    backgroundColor: '#221F1F',
    '&:hover': {
      backgroundColor: '#6F6866',
    },
  }));

  console.log(activeAssignment);

  function createMarkup() {
    return { __html: `${activeAssignment.description}` };
  }
  function markupAssignmentDescription() {
    return <div dangerouslySetInnerHTML={createMarkup()} />;
  }

  const save = (data) => {
    console.log(data);
  };
  
  const myTheme = createTheme({
    // Need to setup theme later
  });

  return ( 
    <div>
      <div className='titleLine'>
        <div>
          <div className='space-between'>
            <h1 className='assignmentTitle'>{activeAssignment.title}</h1>
            <Chip label={activeAssignment.status} variant="outlined" color="success" icon={<CheckCircle />} />
          </div>
          <div>
            <h2>Assignment Description</h2>
            <div className='assignmentDescription'>
              { markupAssignmentDescription() }
            </div>
          </div>
          <form>
            <h2>Submit Assignment</h2>
            <ThemeProvider theme={myTheme}>
              <MUIRichTextEditor
                label="Type something here..."
                onSave={save}
                inlineToolbar={true}
              />
            </ThemeProvider>
            <Button>Submit</Button>
          </form>
          <div>
            <h2>Past Submissions</h2>
          </div>
        </div>
        <div>
          <div className='space-between'>
            <ColorButton variant='contained' startIcon={<GitHubIcon />}>
              Template
            </ColorButton>
            <ColorButton variant='contained' startIcon={<GitHubIcon />}>
              Example
            </ColorButton>
          </div>
          <form className='ticketForm'>
            <h3>Submit Ticket for Help</h3>
            <TextField id="standard-basic" label="Trouble With" variant="standard" helperText="I am having trouble with"/>
            <TextField id="standard-basic" label="Tried" variant="standard" helperText="Solutions you have tried"/>
            <TextField id="standard-basic" label="Issue" variant="standard" helperText="What you believe the issue might be" multiline rows={4}/>
            <TextField id="standard-basic" label="Room" variant="standard" helperText="Which room you are in"/>
            <Button>Submit Ticket</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
