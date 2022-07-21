export async function getAllSubmissionsByUser() {
  const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/submissions`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    mode: 'cors',
  });
  const data = await rawResponse.json();

  return data;
}

export async function getAllAssignmentSubmissionsByUser(assignment_id) {
  const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/submissions/assignment/${assignment_id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    mode: 'cors',
  });
  const data = await rawResponse.json();

  return data;
}

export async function insertSubmission(text, assignment_id, user_id, repo_link) {
  const newSubmission = {
    text: text,
    status_id: 2,
    assignment_id: assignment_id,
    user_id: user_id,
    grade: null,
    repo_link: repo_link
  };
  const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify(newSubmission),
  });
  const data = await rawResponse.json();

  return data;
}

export async function getSubmissionsByTA() {
  const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/submissions/ta`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    mode: 'cors',
  });
  const data = await rawResponse.json();

  return data;
}

export async function getSubmissionById(id) {
  const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/submissions/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    mode: 'cors',
  });
  const data = await rawResponse.json();

  return data;
}

export async function updateSubmission(id, { ...updatedSubmission }) {
  const resp = await fetch(`${process.env.REACT_APP_API_URL}/submissions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify(updatedSubmission),
  });
  return resp.json();
}
