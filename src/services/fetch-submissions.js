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
