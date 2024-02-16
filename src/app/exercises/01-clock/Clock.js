'use client';
import React from 'react';
import format from 'date-fns/format';

function Clock() {
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
    <p className="clock">{time ? format(time, 'hh:mm:ss.S a') : '---'}</p>
  );
}

export default Clock;
