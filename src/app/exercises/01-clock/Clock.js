'use client';
import React from 'react';
import format from 'date-fns/format';

function Clock() {
  // issue, that new Date() runs on the server
  const [time, setTime] = React.useState();

  React.useEffect(() => {
    const createDate = new Date();

    const intervalId = window.setInterval(() => {
      setTime(createDate);
    }, 50);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    // add a truthy condition, check for the time value
    // if 'time' is truthy, it will render the 'format()'
    // otherwise, just render the placeholder value
    <p className="clock">{time ? format(time, 'hh:mm:ss.S a') : '--'}</p>
  );
}

export default Clock;
