import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAssignmentById } from '../services/fetch-assignments';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './AssignmentDetail.css';
import { getSubmissionById, updateSubmission } from '../services/fetch-sumbissions';

import LinkButton from './AssignmentComponents/LinkButton';
import StatusSwitch from './AssignmentComponents/StatusSwitch';
import { TextField, Typography } from '@mui/material';
import MUIRichTextEditor from 'mui-rte';
import CustomButton from './CustomButton';

export default function GradingDetail() {
  const { id } = useParams();
  const [activeSubmission, setActiveSubmission] = useState({});
  const [activeAssignment, setActiveAssignment] = useState({});
  const [grade, setGrade] = useState(null);

  console.log(grade);

  async function getActiveAssignment() {
    const assignment = await getAssignmentById(activeSubmission.assignment_id);
    setActiveAssignment(assignment);
  }

  async function getActiveSubmission() {
    const submission = await getSubmissionById(id);
    setActiveSubmission(submission);
    setGrade(Number(submission.grade));
  }

  useEffect(() => {
    getActiveSubmission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeSubmission.assignment_id) {
      getActiveAssignment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSubmission.assignment_id]);

  const editorTheme = createTheme();

  Object.assign(editorTheme, {
    overrides: {
      MUIRichTextEditor: {
        root: {
          marginTop: '20px',
          width: '95%',
          minHeight: '100px',
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

  async function updateGrade(e) {
    e.preventDefault();
    setGrade(e.target.value);
  }

  async function editSubmission(e) {
    e.preventDefault();
    if (grade > 0) {
      const updatedSubmission = {
        grade: grade,
        status_id: 4
      };
      await updateSubmission(activeSubmission.id, updatedSubmission);
    }
    window.location.replace('/grading');
  }

  return ( 
    <div className='app-page flex-row'>
      <div className='column1'>
        <div className='space-between app-container flex-row'>
          <div>
            <Typography sx={{ fontSize: 28 }} variant="h3" component="div">
              {activeAssignment.title}
            </Typography>
            <Typography sx={{ fontSize: 18, fontWeight: 'Bold' }} variant="h5" color="text.secondary" gutterBottom>
              {activeSubmission.username}
            </Typography>
          </div>
          <StatusSwitch status_id={activeSubmission.status_id} />
        </div>
        <div className="app-container">
          <div className="flex-row space-between">
            <Typography sx={{ fontSize: 24, fontWeight: 'Bold' }} variant="h5" component="div">
              Submission
            </Typography>
            { activeSubmission.repo_link ? <LinkButton text={'Repo'} link={activeSubmission.repo_link}/> : null }
          </div>
          <ThemeProvider theme={editorTheme}>
            <MUIRichTextEditor
              inlineToolbar={false}
              toolbar={false}
              readOnly={true}
              defaultValue={activeSubmission.text}
            />
          </ThemeProvider>
        </div>
        <div className="app-container">
          <Typography sx={{ fontSize: 24, fontWeight: 'Bold' }} variant="h5" component="div">
              Grade Assignment
          </Typography>
          <div className='flex-row space-between'>
            {activeSubmission ? <TextField defaultValue={`${activeSubmission.grade}`} onChange={updateGrade} type='number' label="Grade" variant="standard" helperText="Provide a grade for the submission"/> : null }
            <Typography sx={{ fontSize: 18, fontWeight: 'Bold' }} variant="h5" component="div">
              Total Points: {activeAssignment.total_points}
            </Typography>
          </div>
          <CustomButton onClick={editSubmission} text={'Grade Assignment'} width={'100%'}/>
        </div>
      </div>
      <div className='column2'>
        <div className='space-around app-container flex-row'>
          <LinkButton text={'Template'} link={activeAssignment.template_link}/>
          <LinkButton text={'Example'} link={activeAssignment.example_link}/>
        </div>
        <div className='app-container flex-column'>
          <Typography sx={{ fontSize: 24, fontWeight: 'Bold' }} variant="h5" component="div">
              Grading Rubric
          </Typography> 
          <ThemeProvider theme={editorTheme}>
            <MUIRichTextEditor
              inlineToolbar={false}
              toolbar={false}
              readOnly={true}
              defaultValue={activeAssignment.description}
            />
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}
