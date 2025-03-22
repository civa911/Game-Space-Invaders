import React, { useEffect } from 'react';
import Enemy from './Enemy';

const EnemyRow = ({ enemies, setEnemies, onEnemyShoot }) => {
 
  const generateEnemies = () => {
    const enemyRows = [];
    const gameWidth = 0.4 * window.innerWidth;
    const enemyCountPerRow = 10;
    const enemyRow = 1;
    const enemyWidth = 50;
    const enemyGap = 10;
    const totalEnemiesWidth = enemyCountPerRow * enemyWidth + (enemyCountPerRow - 1) * enemyGap;
    const startX = (gameWidth - totalEnemiesWidth) / 2;

    for (let i = 0; i < enemyRow; i++) {
      let row = [];
      for (let j = 0; j < enemyCountPerRow; j++) {
        row.push({
          id: i * enemyCountPerRow + j,
          positionX: startX + j * (enemyWidth + enemyGap),
          positionY: 50 + i * 50,
          direction: 1,
        });
      }
      enemyRows.push(row);
    }

    setEnemies(enemyRows.flat());
  };

  useEffect(() => {
    const shootInterval = setInterval(() => {
      enemies.forEach(enemy => {
        onEnemyShoot({
          id: `${enemy.id}-bullet-${Date.now()}`,
          positionX: enemy.positionX + 25, // Центр врага
          positionY: enemy.positionY + 50, // Нижняя часть врага
        });
      });
    }, 1000); // Интервал стрельбы

    return () => clearInterval(shootInterval);
  }, [enemies, onEnemyShoot]);
  
  useEffect(() => {
    generateEnemies();
  }, []);

  
  return (
    <>
      {enemies.map((enemy) => (
        <Enemy
          key={enemy.id}
          id={enemy.id} 
          positionX={enemy.positionX}
          positionY={enemy.positionY}
          onEnemyShoot={onEnemyShoot} 
        />
      ))}
    </>
  );
};

export default EnemyRow;