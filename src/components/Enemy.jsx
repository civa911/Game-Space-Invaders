import React, { useEffect } from 'react';

const Enemy = ({ positionX, positionY, onEnemyShoot, id }) => {
  useEffect(() => {
    const shootInterval = setInterval(() => {
      // Координаты середины врага
      const bulletX = positionX + 20; // 20 - это половина ширины врага (40px)
      const bulletY = positionY + 40; // 40 - это высота врага, пуля вылетает снизу

      // Создаем пулю
      const bullet = {
        id: `${id}-${Date.now()}`, // Уникальный ID для пули
        positionX: bulletX,
        positionY: bulletY,
      };

      // Вызываем колбэк для создания пули
      onEnemyShoot(bullet);
    }, 15000); // Интервал стрельбы 15 секунд

    return () => clearInterval(shootInterval); // Очистка интервала при размонтировании
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