import React from 'react';
import './AuthPage.css';
import data from '../periodicTableJSON.json';

export default function AuthPage() {
  async function handleLogin() {
    window.location.replace(`http://localhost:7890/github/login`);
  }

  return (
    <div className='auth-page'>
      <div className='logo'>
        Alchademy
      </div>
      <div className='login-button'>
        Login with Github 
        <p></p>
        <button onClick={handleLogin} ><img src='./githublogo.png'/></button>
      </div>
      
      <div className='periodic-table'>
        {data.elements.map((element, i) => 
          <div key={element.name + i} style={{ 
            gridColumn: element.xpos, 
            gridRow: element.ypos,
            backgroundColor: element.category === 'diatomic nonmetal' && '#A2D7D2'
            || element.category === 'noble gas' && '#e89f78'
            || element.category === 'alkali metal' && '#D4C9bA'
            || element.category === 'alkaline earth metal' && '#72442A'
            || element.category === 'metalloid' && '#D4C9bA'
            || element.category === 'polyatomic nonmetal' && '#65A7AB'
            || element.category === 'diatomic nonmetal' && '#9F7724'
            || element.category === 'post-transition metal' && '#6F6866'
            || element.category === 'transition metal' && '#E89062'
            || element.category === 'lanthanide' && '#1F4E5C'
            || element.category === 'actinide' && '#65A7AB'
            || element.category === 'unknown, but predicted to be an alkali metal' && '#A7A5A5'
            || 'unknown, predicted to be noble gas' && '#A7A5A5'
          }} className='element'>
            {element.symbol}
          </div>)}
      </div>      
    </div>
  );
}
