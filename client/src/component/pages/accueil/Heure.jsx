
import React from 'react';
import './dash.css';

function Heure() {
  const localDate = new Date();

  // Define options to format the date as "day/month/year"
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  // Format the date using the options
  const formattedDate = localDate.toLocaleString('en-US', options);

  return (
    <div className="date-area">
      <input type="text" disabled defaultValue={formattedDate} />
    </div>
  );
}

export default Heure;
