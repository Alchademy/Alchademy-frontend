import React from 'react';

export default function AuthPage() {
  async function handleLogin() {
    window.location.replace(`http://localhost:7890/github/login`);
  }

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
