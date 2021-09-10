import React from 'react';
import './WeekdayIndicator.css';

const WeekdayIndicator = () => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekdayName = weekdays.map((day, key) => {
    return (
      <div className="weekday" key={key}>
        {day}
      </div>
    );
  });
  return <nav className="weekdays-container">{weekdayName}</nav>;
};

export default WeekdayIndicator;
