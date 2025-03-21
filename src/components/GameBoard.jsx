import React, { useState, useEffect } from 'react';
import Player from './Player';
import EnemyRow from './EnemyRow';
import Bullet from './Bullet';
import UI from './UI';
import LivesCount from './LivesCount';

// Звуки
import explosionSound from '../assets/sounds/explosion.mp3';

const GameBoard = () => {
  const [playerPosition, setPlayerPosition] = useState(360);
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [score, setScore] = useState(0);
  const [livesArray, setLivesCount] = useState([]);

  // Обработчик создания пули
  const handleShoot = (bullet) => {
    setBullets((prevBullets) => [...prevBullets, bullet]);
  };

  // Обновление позиции пули
  const updateBulletPosition = (id, x, y) => {
    setBullets((prev) =>
      prev.map((bullet) =>
        bullet.id === id ? { ...bullet, positionX: x, positionY: y } : bullet
      )
    );

    // Если пуля вышла за пределы экрана, удаляем её
    if (x === null && y === null) {
      setBullets((prev) => prev.filter((bullet) => bullet.id !== id));
    }
  };

  // Проверка столкновений
  const checkCollisions = () => {
    bullets.forEach((bullet) => {
      enemies.forEach((enemy) => {
        if (
          bullet.positionX >= enemy.positionX &&
          bullet.positionX <= enemy.positionX + 50 && // Ширина врага
          bullet.positionY >= enemy.positionY &&
          bullet.positionY <= enemy.positionY + 50 // Высота врага
        ) {
          // Удаляем врага и пулю
          setEnemies((prev) => prev.filter((e) => e.id !== enemy.id));
          setBullets((prev) => prev.filter((b) => b.id !== bullet.id));
          // Начисляем очки
          setScore((prev) => prev + 100);
          // Звук взрыва
          new Audio(explosionSound).play();
        }
      });
    });
  };

  // Создание массива с жизнями
  const generateLives = () => {
    let livesArray = [];
    for (let heart = 0; heart < 3; heart++) {
      livesArray.push(heart);
    }
    setLivesCount(livesArray);
  };

  // Инициализация при монтировании
  useEffect(() => {
    generateLives();
  }, []);

  // Проверка столкновений на каждом шаге
  useEffect(() => {
    const interval = setInterval(() => {
      checkCollisions();
    }, 50);

    return () => clearInterval(interval);
  }, [bullets, enemies]);

  // Рендер всех пуль
  const renderBullets = () => {
    return bullets.map((bullet) => (
      <Bullet
        key={bullet.id}
        id={bullet.id}
        positionX={bullet.positionX}
        positionY={bullet.positionY}
        onPositionUpdate={updateBulletPosition}
      />
    ));
  };

  // Отображение UI
  return (
    <div className="game-board">
      <Player onPositionChange={setPlayerPosition} onShoot={handleShoot} />
      <EnemyRow enemies={enemies} setEnemies={setEnemies} />
      {renderBullets()}
      <UI score={score} />
      <LivesCount lives={livesArray} />
    </div>
  );
};

export default GameBoard;