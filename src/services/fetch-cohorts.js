export async function getCohortByUserId(user_id) {
  const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/cohorts/user/${user_id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    mode: 'cors',
  });
  const data = await rawResponse.json();

  return data;
}

export async function getCohortById(cohort_id) {
  const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/cohorts/${cohort_id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    mode: 'cors',
  });
  const data = await rawResponse.json();

  return data;
}
