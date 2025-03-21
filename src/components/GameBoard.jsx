import React, { useState, useEffect } from 'react';
import Player from './Player';
import EnemyRow from './EnemyRow';
import Bullet from './Bullet';
import UI from './UI';
import LivesCount from './LivesCount';

// Звуки
import explosionSound from '../assets/sounds/explosion.mp3';
import EnemyBullet from './EnemyBullet';

const GameBoard = () => {
  const [bullets, setBullets] = useState([]);
  const [enemyBullets, setEnemyBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [score, setScore] = useState(0);
  const [livesArray, setLivesCount] = useState([]);

  // Обработчик создания пули
  const handleShoot = (bullet) => {
    setBullets((prevBullets) => [...prevBullets, bullet]);
  };
  // Обработчик создания пули врага
  const handleEnemyShoot = (bullet) => {
    setEnemyBullets((prevBullets) => [...prevBullets, bullet]);
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

  // Обновление позиции пули врага
  const updateEnemyBulletPosition = (id, x, y) => {
    setEnemyBullets((prev) =>
      prev.map((bullet) =>
        bullet.id === id ? { ...bullet, positionX: x, positionY: y } : bullet
      )
    );

    // Если пуля вышла за пределы экрана, удаляем её
    if (x === null && y === null) {
      setEnemyBullets((prev) => prev.filter((bullet) => bullet.id !== id));
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

  // Проверка столкновений пуль врагов с игроком
  const checkEnemyBulletCollisions = () => {
    enemyBullets.forEach((bullet) => {
      // Предположим, что игрок находится в позиции (playerX, playerY)
      const playerX = 200; // Замените на реальные координаты игрока
      const playerY = 500; // Замените на реальные координаты игрока

      if (
        bullet.positionX >= playerX &&
        bullet.positionX <= playerX + 50 && // Ширина игрока
        bullet.positionY >= playerY &&
        bullet.positionY <= playerY + 50 // Высота игрока
      ) {
        // Удаляем пулю
        setEnemyBullets((prev) => prev.filter((b) => b.id !== bullet.id));
        // Уменьшаем количество жизней
        setLivesCount((prev) => prev.slice(0, -1));
      }
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
      checkEnemyBulletCollisions();
    }, 50);

    return () => clearInterval(interval);
  }, [bullets, enemies, enemyBullets]);

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

  // Рендер всех пуль врагов
  const renderEnemyBullets = () => {
    return enemyBullets.map((bullet) => (
      <EnemyBullet
        key={bullet.id}
        id={bullet.id}
        positionX={bullet.positionX}
        positionY={bullet.positionY}
        onPositionUpdate={updateEnemyBulletPosition}
      />
    ));
  };

  // Отображение UI
  return (
    <div className="game-board">
      <Player onShoot={handleShoot} />
      <EnemyRow enemies={enemies} setEnemies={setEnemies} onEnemyShoot={handleEnemyShoot}/>
      {renderBullets()}
      {renderEnemyBullets()}
      <UI score={score} />
      <LivesCount lives={livesArray} />
    </div>
  );
};

export default GameBoard;