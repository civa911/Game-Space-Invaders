import React, { useState, useEffect } from 'react';
import Player from './Player';
import Enemy from './Enemy';
import Bullet from './Bullet';
import UI from './UI';
import useKeyboardControls from '../hooks/useKeyboardControls';

// Звуки
import shootSound from '../assets/sounds/shoot.mp3';
import explosionSound from '../assets/sounds/explosion.mp3';

const GameBoard = () => {
  const [playerPosition, setPlayerPosition] = useState(250);
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [enemySpeed, setEnemySpeed] = useState(50);

  // Инициализация врагов
  const generateEnemies = () => {
    const enemyRows = [];
    for (let i = 0; i < 5; i++) {  // 5 рядов
      let row = [];
      for (let j = 0; j < 10; j++) {  // 10 врагов в ряду
        row.push({ id: i * 10 + j, positionX: 50 + j * 50, positionY: 50 + i * 50, direction: 1 });
      }
      enemyRows.push(row);
    }
    setEnemies(enemyRows.flat());
  };

  

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
    new Audio(shootSound).play(); // Воспроизводим звук выстрела
    setBullets((prevBullets) => [
      ...prevBullets,
      { positionX: playerPosition + 20, positionY: 450, id: Date.now() }
    ]);
  };

  // Двигаем врагов
  const moveEnemies = () => {
    setEnemies((prevEnemies) => {
      let allEnemiesMoved = true;
      return prevEnemies.map((enemy) => {
        if (enemy.positionY >= 400) {
          setGameOver(true);  // Игра окончена, если враг достиг дна
          return enemy;
        }
        if (enemy.direction === 1 && enemy.positionX >= 550) {
          enemy.direction = -1;
          return { ...enemy, positionY: enemy.positionY + 20 }; // Вниз
        }
        if (enemy.direction === -1 && enemy.positionX <= 0) {
          enemy.direction = 1;
          return { ...enemy, positionY: enemy.positionY + 20 }; // Вниз
        }

        return { ...enemy, positionX: enemy.positionX + (enemy.direction * 5) };
      });
    });
  };

  // Проверка столкновений пуль с врагами
  const checkCollisions = () => {
    setBullets((prevBullets) => {
      return prevBullets.filter((bullet) => {
        const hitEnemy = enemies.find((enemy) => {
          return (
            bullet.positionX >= enemy.positionX &&
            bullet.positionX <= enemy.positionX + 40 &&
            bullet.positionY >= enemy.positionY &&
            bullet.positionY <= enemy.positionY + 40
          );
        });

        if (hitEnemy) {
          new Audio(explosionSound).play(); // Звук взрыва
          setEnemies((prevEnemies) => {
            return prevEnemies.filter((enemy) => enemy.id !== hitEnemy.id);
          });
          setScore((prevScore) => prevScore + 10);  // Увеличиваем очки
          return false; // Удаляем пулю
        }

        return bullet.positionY > 0;  // Пуля остаётся, если она не покинула экран
      });
    });
  };

  // Управляем скоростью врагов с увеличением сложности
  useEffect(() => {
    if (score >= 100) {
      setEnemySpeed(40); // Увеличиваем скорость после 100 очков
    }
  }, [score]);

  // Счётчик для движения пуль и врагов
  useEffect(() => {
    generateEnemies();
    const interval = setInterval(() => {
      moveEnemies();
      checkCollisions();
    }, 50);

    return () => clearInterval(interval);
  }, [enemies]);

  // Управление игроком
  useKeyboardControls(movePlayer, shootBullet);

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

  if (gameOver) {
    return (
      <div className="game-over">
        <h2>Game Over! Your score: {score}</h2>
        <button onClick={() => window.location.reload()}>Restart</button>
      </div>
    );
  }

// Отображение UI
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
