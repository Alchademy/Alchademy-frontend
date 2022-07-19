export async function getUser() {
  const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/github/dashboard`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    mode: 'cors',
  });
  const data = await rawResponse.json();

  return data;
}

export async function logout() {
  await fetch(`${process.env.REACT_APP_API_URL}/github/sessions`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    mode: 'cors',
  });
}
