// GameBoard.jsx
import React, { useState, useEffect } from 'react';
import MainMenu from './MainMenu'; // Импортируем MainMenu
import Player from './Player';
import Enemy from './Enemy';
import Bullet from './Bullet';
import UI from './UI';
import useKeyboardControls from '../hooks/useKeyboardControls';

// Звуки
import shootSound from '../assets/sounds/shoot.mp3';
import explosionSound from '../assets/sounds/explosion.mp3';

// Подключаемся к серверу через WebSocket
const socket = new WebSocket('ws://localhost:8080');

const GameBoard = () => {
  const [playerPosition, setPlayerPosition] = useState(250);
  const [players, setPlayers] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [enemySpeed, setEnemySpeed] = useState(50);
  const [menuVisible, setMenuVisible] = useState(true); // Для показа главного меню

  useEffect(() => {
    // Подключаемся к серверу
    socket.onopen = () => {
      console.log('Подключение к серверу установлено');
      socket.send(JSON.stringify({ type: 'connect' })); // Отправляем запрос на подключение
    };

    // Обрабатываем сообщения от сервера
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'connect') {
        setGameStarted(true); // Игра начинается после подключения
      } else if (data.type === 'game_update') {
        setPlayers(data.players); // Обновляем состояние игроков
        setEnemies(data.enemies); // Обновляем врагов
        setBullets(data.bullets); // Обновляем пули
      }
    };

    socket.onerror = (error) => {
      console.error('Ошибка WebSocket:', error);
    };

    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.error('Ошибка WebSocket: Соединение закрыто неожиданно');
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  // Отправка позиции игрока на сервер
  const sendPlayerPosition = () => {
    const message = JSON.stringify({
      type: 'player_move',
      x: playerPosition,
      y: 450,
    });
    socket.send(message); // Отправляем данные на сервер
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

  // Стрельба
  const shootBullet = () => {
    new Audio(shootSound).play();
    setBullets((prevBullets) => [
      ...prevBullets,
      { positionX: playerPosition + 20, positionY: 450, id: Date.now() },
    ]);
  };

  // Управление движением игрока и стрельбой
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

  // Начало игры
  const handleStartGame = () => {
    setMenuVisible(false); // Прячем меню
    setGameStarted(true);  // Запускаем игру
    setGameOver(false);
    setScore(0);
    setEnemies([]);
    setBullets([]);
  };

  return (
    <div className="game-board">
      {menuVisible ? (
        <MainMenu onStart={handleStartGame} onExit={() => window.close()} />
      ) : (
        <>
          <div
            className="player"
            style={{
              left: `${playerPosition}px`,
              position: 'absolute',
              bottom: '0',
              width: '50px',
              height: '50px',
              backgroundColor: 'green',
            }}
          ></div>
          {renderEnemies()}
          {renderBullets()}
          <UI score={score} />
          {gameOver && (
            <div className="game-over">
              <h2>Game Over! Your score: {score}</h2>
              <button onClick={handleStartGame}>Restart</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GameBoard;
