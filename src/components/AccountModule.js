import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAssignmentsAndSubmissionsBySyllabusId } from '../services/fetch-assignments';

export default function AccountModule({ syllabus }) {
  const [assignments, setAssignments] = useState([]);

  function formatDate(due_date) {
    if (due_date) {
      const timestamp = new Date(due_date);
      let date = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        timeZone: 'America/Los_Angeles',
      }).format(timestamp);
      date = date.replace(/, /g, ' by ');
      date = date.replace(/ AM/g, 'am');
      date = date.replace(/ PM/g, 'pm');
      return date;
    }
  }

  useEffect(() => {
    async function getAssignmentsAndSubmissions() {
      if (syllabus.id) {
        const data = await getAssignmentsAndSubmissionsBySyllabusId(syllabus.id);
        const assignmentData = data.map((item) => {
          return { ...item, due_date: formatDate(item.due_date) };
        });
        setAssignments(assignmentData);
      }
    }
    getAssignmentsAndSubmissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="account-page-module">
      {assignments.length > 0 && (
        <>
          <Table
            sx={{
              marginBottom: '10px',
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    padding: '16px 16px 5px',
                    borderColor: 'rgba(0, 0, 0, 0.87)',
                  }}
                >
                  Assignment
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    padding: '16px 16px 5px',
                    borderColor: 'rgba(0, 0, 0, 0.87)',
                  }}
                >
                  Due
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    padding: '16px 16px 5px',
                    borderColor: 'rgba(0, 0, 0, 0.87)',
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    padding: '16px 16px 5px',
                    borderColor: 'rgba(0, 0, 0, 0.87)',
                  }}
                >
                  Score
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    padding: '16px 16px 5px',
                    borderColor: 'rgba(0, 0, 0, 0.87)',
                  }}
                >
                  Out of
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignments.length > 0 &&
                assignments.map((assign) => (
                  <TableRow key={assign.title + assign.id} className="assignment-row">
                    <TableCell
                      sx={{
                        borderColor: 'rgba(0, 0, 0, 0.35)',
                      }}
                    >
                      <Link to={`/assignments/${assign.id}`}>{assign.title}</Link>
                    </TableCell>
                    <TableCell
                      sx={{
                        borderColor: 'rgba(0, 0, 0, 0.35)',
                      }}
                    >
                      {assign.due_date}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        borderColor: 'rgba(0, 0, 0, 0.35)',
                      }}
                    >
                      {assign.created_on > assign.due_date && 'Late'}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        borderColor: 'rgba(0, 0, 0, 0.35)',
                      }}
                    >
                      {assign.grade ? assign.grade : '-'}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        borderColor: 'rgba(0, 0, 0, 0.35)',
                      }}
                    >
                      {assign.total_points}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
}
