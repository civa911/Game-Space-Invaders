import React from 'react';

const GameOverMenu = ({ score, onReturnToMainMenu }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '20px',
      borderRadius: '10px',
      textAlign: 'center',
    }}>
      <h2>Game Over!</h2>
      <p>Your final score: {score}</p>
      <button
        onClick={onReturnToMainMenu}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Return to Main Menu
      </button>
    </div>
  );
};

export default GameOverMenu;