import React from 'react';

export default function StatusIcon(status_id) {
  return (
    <div>
      {
        (() => {
          switch (status_id) {
            case 1:
              return this.myComponentMethod();
            case 2: 
              return this.myComponentMethod();
            case 3:
              return <div>1</div>; 
            default: return null;
          }
        })
      }
    </div>
  );
}
