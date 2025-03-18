import { useEffect } from 'react';

const useKeyboardControls = (movePlayer, shootBullet) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        movePlayer('left');
      } else if (e.key === 'ArrowRight') {
        movePlayer('right');
      } else if (e.key === ' ') {
        shootBullet();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [movePlayer, shootBullet]);
};

export default useKeyboardControls;
