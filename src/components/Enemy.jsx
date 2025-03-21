import React, { useEffect } from 'react';

const Enemy = ({ positionX, positionY, onEnemyShoot, id }) => {
  useEffect(() => {
    const shootInterval = setInterval(() => {
 
      const bulletX = positionX + 20; 
      const bulletY = positionY + 40; 

      // Создаем пулю
      const bullet = {
        id: `${id}-${Date.now()}`, 
        positionX: bulletX,
        positionY: bulletY,
      };

      onEnemyShoot(bullet);
    }, 10000); 

    return () => clearInterval(shootInterval); 
  }, [positionX, positionY, onEnemyShoot, id]);

  return (
    <div
      className="enemy"
      style={{
        left: `${positionX}px`,
        top: `${positionY}px`,
        position: 'absolute',
        width: '40px',
        height: '40px',
        backgroundColor: 'red',
      }}
    ></div>
  );
};

export default Enemy;