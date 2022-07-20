export async function getSyllabusByUserID(user_id) {
  const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/syllabus/user/${user_id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    mode: 'cors',
  });
  const data = await rawResponse.json();

  return data;
}

export async function getSyllabusByID(syllabus_id) {
  const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/syllabus/${syllabus_id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    mode: 'cors',
  });
  const data = await rawResponse.json();

  return data;
}
