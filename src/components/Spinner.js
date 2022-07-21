import React from 'react';

export default function Spinner() {
  return (
    <div className='loadScreen'>
      <div className='bounceball'/>
      <div className='flipper-container'>
        <img src={process.env.PUBLIC_URL + '/flipper1.png'} className='flipper1'/>
        <img src={process.env.PUBLIC_URL + '/flipper2.png'} className='flipper2'/>
      </div>
      <h1>Alchademy</h1>
    </div> 
  );
}
