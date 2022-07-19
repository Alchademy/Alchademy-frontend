export async function getAssignmentsByUser() {
  const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/assignments`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    mode: 'cors',
  });
  const data = await rawResponse.json();

  return data;
}

export async function getAssignmentsBySyllabusId(syllabus_id) {
  const rawResponse = await fetch(
    `${process.env.REACT_APP_API_URL}/assignments/syllabus/${syllabus_id}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      mode: 'cors',
    }
  );
  const data = await rawResponse.json();

  return data;
}
