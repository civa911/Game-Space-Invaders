import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Player from './Player';
import EnemyRow from './EnemyRow';
import Bullet from './Bullet';
import UI from './UI';
import LivesCount from './LivesCount';
import GameOverMenu from './GameOverMenu';

// Звуки
import explosionSound from '../assets/sounds/explosion.mp3';
import EnemyBullet from './EnemyBullet';

const GameBoard = () => {
  const [bullets, setBullets] = useState([]);
  const [enemyBullets, setEnemyBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [score, setScore] = useState(0);
  const [livesCount, setLivesCount] = useState([1, 2, 3]);
  const [playerPosition, setPlayerPosition] = useState({ x: 360, y: window.innerHeight - 100 });
  const [isGameOver, setIsGameOver] = useState(false);

  // Обработчик создания пули
  const handleShoot = (bullet) => {
    setBullets((prevBullets) => [...prevBullets, bullet]);
  };
  // Обработчик создания пули врага
  const handleEnemyShoot = (bullet) => {
    setEnemyBullets((prevBullets) => [...prevBullets, bullet]);
  };

  // Обновление позиции пули
  const updateBulletPosition = useCallback((id, x, y) => {
    setBullets((prev) =>
      prev.map((bullet) =>
        bullet.id === id ? { ...bullet, positionX: x, positionY: y } : bullet
      )
    );
  
    if (x === null && y === null) {
      setBullets((prev) => prev.filter((bullet) => bullet.id !== id));
    }
  }, []);

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
  const checkCollisions = useCallback(() => {
    bullets.forEach((bullet) => {
      enemies.forEach((enemy) => {
        if (
          bullet.positionX >= enemy.positionX &&
          bullet.positionX <= enemy.positionX + 50 &&
          bullet.positionY >= enemy.positionY &&
          bullet.positionY <= enemy.positionY + 50
        ) {
          setEnemies((prev) => prev.filter((e) => e.id !== enemy.id));
          setBullets((prev) => prev.filter((b) => b.id !== bullet.id));
          setScore((prev) => prev + 100);
          new Audio(explosionSound).play();
        }
      });
    });
  }, [bullets, enemies]);

  // Проверка столкновений пуль врагов с игроком
  const checkEnemyBulletCollisions = useCallback(() => {
    enemyBullets.forEach((bullet) => {
      const playerX = playerPosition.x;
      const playerY = playerPosition.y;
  
      if (
        bullet.positionX >= playerX &&
        bullet.positionX <= playerX + 50 &&
        bullet.positionY >= playerY &&
        bullet.positionY <= playerY + 50
      ) {
        setEnemyBullets((prev) => prev.filter((b) => b.id !== bullet.id));
        setLivesCount((prev) => prev.slice(0, -1));
      }
    });
  }, [enemyBullets, playerPosition]);

  useEffect(() => {
    if (livesCount.length === 0) {
      setIsGameOver(true);
      // Дополнительные действия при завершении игры
    }
  }, [livesCount]);

  const handleReturnToMainMenu = () => {
    setIsGameOver(false); // Скрываем меню
    setLivesCount([1, 2, 3]); // Сбрасываем жизни
    setScore(0); // Сбрасываем счёт
    // Дополнительные действия для сброса состояния игры
  };

  // Проверка столкновений на каждом шаге
  useEffect(() => {
      checkCollisions();
      checkEnemyBulletCollisions();
    }, [bullets, enemies, checkCollisions, enemyBullets, playerPosition, checkEnemyBulletCollisions]);

  // Рендер всех пуль
  const renderBullets = useMemo(() => {
    return bullets.map((bullet) => (
      <Bullet
        key={bullet.id}
        id={bullet.id}
        positionX={bullet.positionX}
        positionY={bullet.positionY}
        onPositionUpdate={updateBulletPosition}
      />
    ));
  }, [bullets, updateBulletPosition]);

  // Рендер всех пуль врагов
  const renderEnemyBullets = useMemo(() => {
    return enemyBullets.map((bullet) => (
      <EnemyBullet
        key={bullet.id}
        id={bullet.id}
        positionX={bullet.positionX}
        positionY={bullet.positionY}
        onPositionUpdate={updateEnemyBulletPosition}
      />
    ));
  }, [enemyBullets]);

  // Отображение UI
  return (
    <div className="game-board">
      <Player onShoot={handleShoot} onPositionChange={setPlayerPosition} />
      <EnemyRow enemies={enemies} setEnemies={setEnemies} onEnemyShoot={handleEnemyShoot}/>
      {renderBullets}
      {renderEnemyBullets}
      <UI score={score} />
      <LivesCount lives={livesCount} />
      {isGameOver && (
        <GameOverMenu
          score={score}
          onReturnToMainMenu={handleReturnToMainMenu}
        />
      )}
    </div>
  );
};

export default GameBoard;