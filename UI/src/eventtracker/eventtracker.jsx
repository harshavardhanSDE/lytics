import React, { useState, useEffect } from 'react';
import style from './eventtracker.module.css';

const EventTracker = () => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const handleMouseMove = (event) => {
    setCoordinates({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={style.tracker}>
      <p>Coordinates: X: {coordinates.x}, Y: {coordinates.y}</p>
    </div>
  );
};

export default EventTracker;
