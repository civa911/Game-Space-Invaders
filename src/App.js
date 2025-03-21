import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import MainMenu from './components/MainMenu';
import './App.css';

function App() {
  // Состояние для управления отображением меню или игры
  const [gameStarted, setGameStarted] = useState(false);

  // Функция для начала игры
  const startGame = () => {
    setGameStarted(true);
  };

  // Функция для выхода из игры и возвращения в меню
  const exitGame = () => {
    setGameStarted(false);
  };

  return (
    <div className="App">
      {/* Если игра не началась, показываем главное меню */}
      {!gameStarted ? (
        <MainMenu onStart={startGame} onExit={exitGame} />
      ) : (
        <GameBoard />
      )}
    </div>
  );
}

export default App;
