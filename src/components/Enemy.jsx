import React from 'react';

const Enemy = ({ positionX, positionY }) => {
  return (
    <div
      className="enemy"
      style={{
        left: `${positionX}px`,
        top: `${positionY}px`,
        position: 'absolute',
        width: '40px',
        height: '40px',
        backgroundColor: 'red',
      }}
    ></div>
  );
};

export default Enemy;
