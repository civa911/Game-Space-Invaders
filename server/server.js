// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let players = {}; // Храним игроков

wss.on('connection', (ws) => {
  console.log('Клиент подключен');

  // Сохраняем нового клиента
  players[ws] = { x: 250, y: 450 }; // Начальная позиция игрока

  // Отправляем информацию о подключении
  ws.send(JSON.stringify({ type: 'connect', message: 'connected' }));

  // Обработчик сообщений от клиента
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    console.log('Получено сообщение от клиента:', data);

    if (data.type === 'player_move') {
      // Обновляем позицию игрока
      players[ws] = { x: data.x, y: data.y };
    }

    // Отправляем обновлённое состояние игры
    const gameState = {
      players: players,
      enemies: generateEnemies(), // Для примера
      bullets: [], // Здесь может быть логика для пуль
    };

    // Отправляем обновление всем клиентам
    updateGameState(gameState);
  });

  // Когда клиент отключается
  ws.on('close', () => {
    console.log('Клиент отключён');
    delete players[ws]; // Удаляем клиента из списка
  });
});

// Функция для обновления состояния игры и отправки клиентам
const updateGameState = (gameState) => {
  const message = JSON.stringify(gameState);
  Object.values(players).forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    }
  });
};

// Инициализация врагов
const generateEnemies = () => {
  const enemies = [];
  for (let i = 0; i < 5; i++) {  // 5 рядов
    let row = [];
    for (let j = 0; j < 10; j++) {  // 10 врагов в ряду
      row.push({ id: i * 10 + j, positionX: 50 + j * 50, positionY: 50 + i * 50, direction: 1 });
    }
    enemies.push(row);
  }
  return enemies.flat();
};

console.log('Сервер WebSocket запущен на порту 8080');
