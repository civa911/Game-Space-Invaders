import React from 'react';

const Player = ({ positionX }) => {
  return (
    <div
      className="player"
      style={{
        left: `${positionX}px`,
        position: 'absolute',
        bottom: '0',
        width: '50px',
        height: '50px',
        backgroundColor: 'green',
      }}
    ></div>
  );
};

export default Player;
