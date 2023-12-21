import React, { useState, useEffect } from 'react';

const Game = () => {
  const [rocketPosition, setRocketPosition] = useState({ x: 50, y: 0 });
  const [targets, setTargets] = useState([
    { id: 1, position: 10, speed: 3.8, stopped: false },
    { id: 2, position: 60, speed: 2.4, stopped: false },
    { id: 3, position: 100, speed: 5.5, stopped: false },
    { id: 4, position: 150, speed: 1.3, stopped: false },
    { id: 5, position: 200, speed: 7.6, stopped: false },
  ]);

  const [isLaunched, setIsLaunched] = useState(false);
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('white');
  const [timer, setTimer] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  const boxHeight = 765;
  const boxWidth = 100;
  const rocketHeight = 20;
  const targetHeight = 20;
  const hitRangeX = 5;
  const targetYPositions = [140, 280, 420, 560, 700];

  useEffect(() => {
    let moveTargets = setInterval(() => {
      setTargets(prevTargets => prevTargets.map(target => {
        if (target.stopped) return target;

        return {
          ...target,
          position: (target.position + target.speed) % boxWidth
        };
      }));
    }, 100);

    return () => clearInterval(moveTargets);
  }, []);

  useEffect(() => {
    if (!gameOver && !allTargetsStopped && timer > 0) {
      var interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer === 1) {
            setGameOver(true);
            clearInterval(interval);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameOver, allTargetsStopped, timer]);

  useEffect(() => {
    if (isLaunched) {
      const rocketFlight = setInterval(() => {
        setRocketPosition(prev => {
          const newY = prev.y + 2;
          if (newY > boxHeight) {
            clearInterval(rocketFlight);
            setIsLaunched(false);
            setBackgroundColor('white');
            return { ...prev, y: 0 };
          }

          return { ...prev, y: newY };
        });
      }, 10);

      return () => clearInterval(rocketFlight);
    }
  }, [isLaunched]);

  useEffect(() => {
    if (isLaunched) {
      const checkCollision = () => {
        const newY = rocketPosition.y;
        targets.forEach((target, index) => {
          const targetY = boxHeight - targetYPositions[index];
          const isVerticalOverlap = newY + rocketHeight >= targetY && newY <= targetY + targetHeight;
          const isHorizontalOverlap = Math.abs(target.position - rocketPosition.x) <= hitRangeX;

          if (isVerticalOverlap && isHorizontalOverlap && !target.stopped) {
            setTargets(prevTargets => prevTargets.map(t => t.id === target.id ? { ...t, stopped: true } : t));
            setScore(prev => prev + 10);
            setHits(prev => prev + 1);
            setBackgroundColor('green');
          }
        });
      };

      checkCollision();
    }
  }, [rocketPosition, targets, isLaunched]);

  const handleLaunchClick = () => {
    setIsLaunched(true);
  };

  var allTargetsStopped = targets.every(target => target.stopped);

  const handleRestart = () => {
    setRocketPosition({ x: 50, y: 0 });
    setTargets([
      { id: 1, position: 10, speed: 3.8, stopped: false },
      { id: 2, position: 60, speed: 2.4, stopped: false },
      { id: 3, position: 100, speed: 5.5, stopped: false },
      { id: 4, position: 150, speed: 1.3, stopped: false },
      { id: 5, position: 200, speed: 7.6, stopped: false },
    ]);
    setIsLaunched(false);
    setScore(0);
    setHits(0);
    setMisses(0);
    setBackgroundColor('white');
    setTimer(30);
    setGameOver(false);
  };

  return (
    <div style={{backgroundImage: 'url(https://alrightblog951505478.files.wordpress.com/2018/12/milky-way-starry-sky-night-sky-star-957061.jpeg?w=1200)', position: 'relative', height: `${boxHeight}px`, width: `${boxWidth}%`, border: '1px solid black', backgroundColor, margin: '0 auto', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: `${rocketPosition.y}px`, left: `${rocketPosition.x}%`, fontSize: '20px', border: '1px solid black', padding: '5px', borderRadius: '50%' }}>🛸</div>
      {targets.map((target, index) => (
        <div key={target.id} style={{ position: 'absolute', top: `${boxHeight - targetYPositions[index]}px`, left: `${target.position}%`, fontSize: '20px', opacity: target.stopped ? 0.5 : 1 }}>👽</div>
      ))}
      <button onClick={handleLaunchClick} disabled={isLaunched} style={{ fontSize: '16px', position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', marginLeft: '120px', borderRadius: '50%', padding: '5px', backgroundColor: 'green', color: 'white' }}>Launch Rocket</button>
      <div style={{color:'white', fontSize: '14px', position: 'absolute', bottom: '40px', left: '50%', marginLeft: '-100px', transform: 'translateX(-50%)' }}>Score: {score}</div>
      <div style={{color:'white', fontSize: '14px', position: 'absolute', marginLeft: '-100px', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>Hits: {hits}</div>
      <div style={{color:'white', fontSize: '14px', position: 'absolute', marginLeft: '-100px', bottom: '0px', left: '50%', transform: 'translateX(-50%)' }}>Misses: {misses}</
      div>
{(gameOver || allTargetsStopped) && (
<div style={{ width: '200px', height: '100px', position: 'absolute', bottom: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', padding: '20px', borderRadius: '10px' }}>
{gameOver ? 'Game Over!' : 'You Won!'}
<br />
<button onClick={handleRestart} style={{ marginTop: '10px', padding: '5px', borderRadius: '5px', fontSize: '16px', backgroundColor: 'green', color: 'white' }}>Restart</button>
</div>
)}
{timer > 0 && <div style={{color:'white', fontSize: '16px', position: 'absolute', top: '10px', left: '10px'}}>Time Left: {timer}s</div>}
</div>
);
};

export default Game;

