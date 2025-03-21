import React from 'react';

const LivesCount = ({ lives }) => {
  return (
    <div className="lives" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <h2>Lives:</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        {lives.map((_, index) => (
          <div
            key={index}
            className="heart"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default LivesCount;
