import React, { useState, useEffect, useRef } from 'react';

const RocketFightGame = () => {
  const [angle, setAngle] = useState(0);
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [score, setScore] = useState(0);
  const bulletIdRef = useRef(0);
  const boxWidth = 800;
  const boxHeight = 600;
  const rocketCenterX = boxWidth / 2;
  const rocketCenterY = boxHeight / 2;

  // Auto-rotate rocket
  useEffect(() => {
    const interval = setInterval(() => {
      setAngle(prev => (prev + 2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Generate enemies with random velocities
  useEffect(() => {
    const initialEnemies = Array.from({ length: 10 }).map((_, idx) => ({
      id: idx,
      x: Math.random() * (boxWidth - 30),
      y: Math.random() * (boxHeight - 30),
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      alive: true,
    }));
    setEnemies(initialEnemies);
  }, []);

  // Move enemies randomly
  useEffect(() => {
    const interval = setInterval(() => {
      setEnemies(prev =>
        prev.map(enemy => {
          if (!enemy.alive) return enemy;
          let newX = enemy.x + enemy.vx;
          let newY = enemy.y + enemy.vy;
          if (newX < 0 || newX > boxWidth - 30) enemy.vx *= -1;
          if (newY < 0 || newY > boxHeight - 30) enemy.vy *= -1;
          return { ...enemy, x: newX, y: newY };
        })
      );
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Fire bullets
  const handleFire = () => {
    const rad = (angle * Math.PI) / 180;
    const bulletSpeed = 7;
    const rocketRadius = 35;
    const bulletX = rocketCenterX + Math.cos(rad) * rocketRadius;
    const bulletY = rocketCenterY - Math.sin(rad) * rocketRadius;

    setBullets(prev => [
      ...prev,
      {
        id: bulletIdRef.current++,
        x: bulletX,
        y: bulletY,
        vx: Math.cos(rad) * bulletSpeed,
        vy: -Math.sin(rad) * bulletSpeed,
      },
    ]);
  };

  // Move bullets
  useEffect(() => {
    const interval = setInterval(() => {
      setBullets(prev =>
        prev
          .map(bullet => ({
            ...bullet,
            x: bullet.x + bullet.vx,
            y: bullet.y + bullet.vy,
          }))
          .filter(bullet =>
            bullet.x >= 0 &&
            bullet.x <= boxWidth &&
            bullet.y >= 0 &&
            bullet.y <= boxHeight
          )
      );
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Collision detection
  useEffect(() => {
    setEnemies(prevEnemies =>
      prevEnemies.map(enemy => {
        if (!enemy.alive) return enemy;
        const hit = bullets.some(
          bullet =>
            bullet.x >= enemy.x &&
            bullet.x <= enemy.x + 30 &&
            bullet.y >= enemy.y &&
            bullet.y <= enemy.y + 30
        );
        if (hit) {
          setScore(prev => prev + 10);
          return { ...enemy, alive: false };
        }
        return enemy;
      })
    );
  }, [bullets]);

  return (
    <div
      style={{
        position: 'relative',
        height: `${boxHeight}px`,
        width: `${boxWidth}px`,
        border: '2px solid white',
        backgroundColor: 'black',
        overflow: 'hidden',
        margin: 'auto',
      }}
    >
      {/* Rocket */}
      <div
        style={{
          position: 'absolute',
          left: `${rocketCenterX}px`,
          top: `${rocketCenterY}px`,
          transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
          fontSize: '30px',
        }}
      >
        <img width="100px" src="https://static.vecteezy.com/system/resources/previews/046/947/282/non_2x/ak-47-assault-rifle-on-transparent-background-free-png.png" alt="" />
      </div>

      {/* Gun line */}
      <div/>

      {/* Bullets */}
      {bullets.map(bullet => (
        <div
          key={bullet.id}
          style={{
            position: 'absolute',
            left: `${bullet.x}px`,
            top: `${bullet.y}px`,
            width: '6px',
            height: '6px',
            backgroundColor: 'yellow',
            borderRadius: '50%',
          }}
        />
      ))}

      {/* Enemies */}
      {enemies.map(enemy =>
        enemy.alive ? (
          <div
            key={enemy.id}
            style={{
              position: 'absolute',
              left: `${enemy.x}px`,
              top: `${enemy.y}px`,
              fontSize: '30px',
            }}
          >
            👾
          </div>
        ) : (
          <div
            key={enemy.id}
            style={{
              position: 'absolute',
              left: `${enemy.x}px`,
              top: `${enemy.y}px`,
              fontSize: '30px',
              color: 'red',
            }}
          >
            💥
          </div>
        )
      )}

      {/* Fire Button */}
      <button
        onClick={handleFire}
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 20px',
          fontSize: '18px',
          backgroundColor: 'green',
          color: 'white',
          borderRadius: '10px',
        }}
      >
        Fire
      </button>

      {/* Score */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          color: 'white',
          fontSize: '18px',
        }}
      >
        Score: {score}
      </div>
    </div>
  );
};

export default RocketFightGame;
