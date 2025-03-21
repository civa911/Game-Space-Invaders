import React, { useEffect, useState } from 'react';

const Bullet = ({ id, positionX, positionY, onPositionUpdate }) => {
  const [position, setPosition] = useState({ x: positionX, y: positionY });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        const newY = prev.y - 10; // Пуля движется вверх
        if (newY > 0) {
          // Передаём обновлённые координаты в родительский компонент
          onPositionUpdate(id, prev.x, newY);
          return { x: prev.x, y: newY };
        } else {
          // Пуля вышла за пределы экрана
          clearInterval(interval);
          onPositionUpdate(id, null, null); // Уведомляем родительский компонент об удалении пули
          return prev;
        }
      });
    }, 30);

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(interval);
  }, [id, onPositionUpdate]);

  return (
    <div
      className="bullet"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: 'absolute',
        width: '5px',
        height: '20px',
        backgroundColor: 'yellow',
      }}
    ></div>
  );
};

export default Bullet;