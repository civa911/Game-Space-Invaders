import React, { useEffect, useState } from 'react';

const Explosion = ({ positionX, positionY, onEnd }) => {
  const [size, setSize] = useState(20);

  useEffect(() => {
    const interval = setInterval(() => {
      setSize((prevSize) => {
        if (prevSize >= 60) {
          clearInterval(interval);
          onEnd();
          return prevSize;
        }
        return prevSize + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onEnd]);

  return (
    <div
      style={{
        left: `${positionX - size / 2}px`,
        top: `${positionY - size / 2}px`,
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: 'orange',
        borderRadius: '50%',
        opacity: 0.7,
        animation: 'explode 0.5s forwards'
      }}
    ></div>
  );
};

export default Explosion;
