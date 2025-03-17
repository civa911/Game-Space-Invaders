import React, { useEffect, useState } from 'react';

const Bullet = ({ positionX, positionY }) => {
  const [position, setPosition] = useState({ x: positionX, y: positionY });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        if (prev.y > 0) {
          return { x: prev.x, y: prev.y - 10 };
        }
        clearInterval(interval);
        return prev;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [position.y]);

  return (
    <div
      className="bullet"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: 'absolute',
        width: '5px',
        height: '20px',
        backgroundColor: 'yellow',
      }}
    ></div>
  );
};

export default Bullet;
