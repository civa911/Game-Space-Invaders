import React from 'react';

const Player = ({ positionX }) => {
  return (
    <div
      className="player"
      style={{
        left: `${positionX}px`,
        position: 'absolute',
        bottom: '10',
        width: '50px',
        height: '50px',
        backgroundColor: 0,
      }}
    ></div>
  );
};

export default Player;
