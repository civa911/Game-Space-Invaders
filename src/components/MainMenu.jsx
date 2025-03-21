import React from 'react';
import './MainMenu.css'; 

const MainMenu = ({ onStart, onExit }) => {
  return (
    <div className="main-menu">
      <h1 className="title">SPACE INVADERS</h1>
      <button onClick={onStart} className="menu-button">Новая игра</button>
      <button onClick={""} className="menu-button">Онлайн игра</button>
      <button onClick={""} className="menu-button">Доска лидеров</button>
      <button onClick={onExit} className="menu-button">Выход</button>
    </div>
  );
};

export default MainMenu;
