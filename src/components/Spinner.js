import React from 'react';

import './Spinner.css';

export default function Spinner() {
  return (
    <div className='spinner-container'>
      <div className='beaker'>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
      </div>
    </div>
  );
}
