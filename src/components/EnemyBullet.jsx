import React, { useEffect, useState } from 'react';

const EnemyBullet = ({ id, positionX, positionY, onPositionUpdate }) => {
  const [position, setPosition] = useState({ x: positionX, y: positionY });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        const newY = prev.y + 10; 
        if (newY < window.innerHeight) { 
          onPositionUpdate(id, prev.x, newY); 
          return { x: prev.x, y: newY };
        } else {
          clearInterval(interval); 
          onPositionUpdate(id, null, null); 
          return prev;
        }
      });
    }, 30);

    return () => clearInterval(interval); 
  }, [id, onPositionUpdate]);

  return (
    <div
      className="enemy-bullet"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: 'absolute',
        width: '5px',
        height: '20px',
        backgroundColor: 'red', 
      }}
    ></div>
  );
};

export default EnemyBullet;