import React from 'react';

const MainMenu = ({ onStart, onExit }) => {
  return (
    <div className="main-menu">
      <h1>Space Invaders</h1>
      <button onClick={onStart}>Новая игра</button>
      <button onClick={""}>Онлайн игра</button>
      <button onClick={""}>Список лидеров</button>
      <button onClick={onExit}>выход</button>
    </div>
  );
};

export default MainMenu;
