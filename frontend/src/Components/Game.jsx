import React, { useState, useEffect } from 'react';

const Game = () => {
  const [rocketPosition, setRocketPosition] = useState({ x: 50, y: 0 });
  const [targets, setTargets] = useState([
    { id: 1, position: 10, speed: 0.8 },
    { id: 2, position: 60, speed: 0.4 },
    { id: 3, position: 100, speed: 0.5 },
    { id: 4, position: 150, speed: 0.3 },
    { id: 5, position: 200, speed: 0.6 }
  ]);

  const [isLaunched, setIsLaunched] = useState(false);
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('white');

  // Constants for game dimensions and collision detection
  const boxHeight = 500;
  const boxWidth = 90;
  const rocketHeight = 30; // Approximate height of the rocket emoji
  const targetHeight = 30; // Approximate height of the target emoji
  const hitRangeX = 5; // Horizontal range for hit detection

  useEffect(() => {
    let moveTargets = setInterval(() => {
      setTargets(prevTargets => prevTargets.map(target => ({
        ...target,
        position: (target.position + target.speed) % boxWidth
      })));
    }, 100);

    return () => clearInterval(moveTargets);
  }, []);

  useEffect(() => {
    let rocketFlight;

    if (isLaunched) {
      rocketFlight = setInterval(() => {
        setRocketPosition(prev => {
          const newY = prev.y + 1;
          if (newY > boxHeight) {
            clearInterval(rocketFlight);
            setBackgroundColor('white');
            setIsLaunched(false);
            return { ...prev, y: 0 };
          }

          // Enhanced collision detection
          const hasHit = targets.some(target => {
            const targetY = boxHeight - targetYPositions[target.id - 1];
            const isVerticalOverlap = newY + rocketHeight >= targetY && newY <= targetY + targetHeight;
            const isHorizontalOverlap = Math.abs(target.position - rocketPosition.x) <= hitRangeX;
            return isVerticalOverlap && isHorizontalOverlap;
          });

          if (hasHit) {
            setScore(prev => prev + 10);
            setHits(hits => hits + 1);
            setBackgroundColor('green');
          } else {
            setMisses(misses => misses + 1);
            setBackgroundColor('red');
          }

          return { ...prev, y: newY };
        });
      }, 10);
    }

    return () => clearInterval(rocketFlight);
  }, [isLaunched, targets, rocketPosition.x]);

  const handleLaunchClick = () => {
    setIsLaunched(true);
  };

  const targetYPositions = [80, 160, 240, 320, 400]; // Vertical positions of the targets

  return (
    <div style={{margin:'auto', position: 'relative', height: `${boxHeight}px`, width: `400px`, border: '1px solid black', backgroundColor }}>
      <div
        style={{
          position: 'absolute',
          bottom: `${rocketPosition.y}px`,
          left: `${rocketPosition.x}%`,
          fontSize: '30px',
          border:'1px solid black',
          borderRadius:'50%',
        }}
      >🛸</div>
      {targets.map((target, index) => (
        <div
          key={target.id}
          style={{
            position: 'absolute',
            top: `${boxHeight - targetYPositions[index]}px`,
            left: `${target.position}%`,
            fontSize: '30px',
          }}
        >👽</div>
      ))}
      <button onClick={handleLaunchClick} disabled={isLaunched}>Launch Rocket</button>
      <div>Score: {score}</div>
      <div>Hits: {hits}</div>
      <div>Misses: {misses}</div>
    </div>
  );
};

export default Game;
