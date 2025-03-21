import React, { useState, useEffect } from 'react';
import useKeyboardControls from '../hooks/useKeyboardControls';
import shootSound from '../assets/sounds/shoot.mp3';

const Player = ({ onPositionChange, onShoot }) => {
  const [positionX, setPositionX] = useState(360);

  // Обработчик движения игрока
  const movePlayer = (direction) => {
    setPositionX((prevPosition) => {
      let newPosition = prevPosition;
      if (direction === 'left' && prevPosition > 0) {
        newPosition = prevPosition - 10;
      }
      if (direction === 'right' && prevPosition < 720) {
        newPosition = prevPosition + 10;
      }
      onPositionChange(newPosition); // Сообщаем GameBoard о новой позиции
      return newPosition;
    });
  };

  // Обработчик стрельбы игроком
  const shootBullet = () => {
    new Audio(shootSound).play();
    const bullet = {
      id: Date.now(),
      positionX: positionX + 22, // Центрируем пулю относительно игрока
      positionY: window.innerHeight - 100, // Начальная позиция пули
    };
    onShoot(bullet); // Передаем пулю в GameBoard
  };

  // Управление игроком
  useKeyboardControls(movePlayer, shootBullet);

  return (
    <div
      className="player"
      style={{
        left: `${positionX}px`,
        position: 'absolute',
        bottom: '10px',
        width: '50px',
        height: '50px',
        backgroundColor: 'null', 
      }}
    ></div>
  );
};

export default Player;