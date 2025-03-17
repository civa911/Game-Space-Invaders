import React, { useState, useEffect } from 'react';
import Player from './Player';
import Enemy from './Enemy';
import Bullet from './Bullet';
import UI from './UI';

const GameBoard = () => {
  const [playerPosition, setPlayerPosition] = useState(250);
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [score, setScore] = useState(0);

  // Инициализация врагов
  const generateEnemies = () => {
    const enemyRows = [];
    for (let i = 0; i < 5; i++) {  // 5 рядов
      let row = [];
      for (let j = 0; j < 10; j++) {  // 10 врагов в ряду
        row.push({ id: i * 10 + j, positionX: 50 + j * 50, positionY: 50 + i * 50 });
      }
      enemyRows.push(row);
    }
    setEnemies(enemyRows.flat());
  };

  useEffect(() => {
    generateEnemies();
  }, []);

  // Обработчик движения игрока
  const movePlayer = (direction) => {
    setPlayerPosition((prevPosition) => {
      if (direction === 'left' && prevPosition > 0) {
        return prevPosition - 10;
      }
      if (direction === 'right' && prevPosition < 500) {
        return prevPosition + 10;
      }
      return prevPosition;
    });
  };

  // Обработчик стрельбы
  const shootBullet = () => {
    setBullets((prevBullets) => [
      ...prevBullets,
      { positionX: playerPosition + 20, positionY: 450, id: Date.now() }
    ]);
  };

  // Рендер всех врагов
  const renderEnemies = () => {
    return enemies.map((enemy) => (
      <Enemy key={enemy.id} positionX={enemy.positionX} positionY={enemy.positionY} />
    ));
  };

  // Рендер всех пуль
  const renderBullets = () => {
    return bullets.map((bullet) => (
      <Bullet key={bullet.id} positionX={bullet.positionX} positionY={bullet.positionY} />
    ));
  };

  return (
    <div className="game-board">
      <Player positionX={playerPosition} />
      {renderEnemies()}
      {renderBullets()}
      <UI score={score} />
    </div>
  );
};

export default GameBoard;
