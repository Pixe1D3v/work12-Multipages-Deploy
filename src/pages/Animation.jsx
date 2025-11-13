import { useState, useEffect, useRef } from 'react';

import basketball from '/src/assets/imgs/basketball.png';
import football from '/src/assets/imgs/football.png';
import volleyball from '/src/assets/imgs/volleyball.png';
import human from '/src/assets/imgs/me.png';
import cartoon from '/src/assets/imgs/cartoon.png';
import logo from '/src/assets/imgs/logo.png';
import woodPlanks from '/src/assets/imgs/wood-planks.png';

const Animation = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [running, setRunning] = useState(false);
  const [selectedBall, setSelectedBall] = useState(0);
  
  const runXRef = useRef(true);
  const runYRef = useRef(true);
  const xRef = useRef(0);
  const yRef = useRef(0);

  const boxWidth = 1200;
  const boxHeight = 500;
  const ballSize = 200;
  const speedX = 3;
  const speedY = 3;
  const maxX = boxWidth - ballSize - 4;
  const maxY = boxHeight - ballSize - 4;

  const balls = [
    { id: 0, name: 'None', image: null },
    { id: 1, name: 'Basketball', image: basketball },
    { id: 2, name: 'Football', image: football },
    { id: 3, name: 'Volleyball', image: volleyball },
    { id: 4, name: 'Human', image: human },
    { id: 5, name: 'Cartoon', image: cartoon },
    { id: 6, name: 'Logo', image: logo }
  ];

  const calculate = () => {
    if (runXRef.current) {
      xRef.current += speedX;
      if (xRef.current >= maxX) runXRef.current = false;
    } else {
      xRef.current -= speedX;
      if (xRef.current <= 0) runXRef.current = true;
    }

    if (runYRef.current) {
      yRef.current += speedY;
      if (yRef.current >= maxY) runYRef.current = false;
    } else {
      yRef.current -= speedY;
      if (yRef.current <= 0) runYRef.current = true;
    }

    setX(xRef.current);
    setY(yRef.current);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        calculate();
      }
    }, 7);

    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '6') {
        setSelectedBall(Number(e.key));
      } else if (e.key === ' ') {
        e.preventDefault();
        setRunning(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleRunClick = () => {
    setRunning(prev => !prev);
  };

  const handleBallClick = (id) => {
    setSelectedBall(id);
  };

  return (
    <div className='w-100 h-auto d-flex justify-content-center align-items-center bg-white rounded-4 py-3' style={{boxShadow:'0 5px 5px #cccccc'}}>
      <div className="w-100 h-100 bg-gray-50 d-flex aligh-items-center justify-content-center p-5">
        <style>{`
          
          .monitor {
            background-image: url('${woodPlanks}');
            background-size: cover;
            background-position: center;
          }

          .ball-container {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background-color: #5c636a;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          .ball-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }

          .btn {
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            font-weight: 500;
            border: 1px solid;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
          }

          .btn-success {
            background-color: #198754;
            border-color: #198754;
            color: white;
          }

          .btn-success:hover {
            background-color: #157347;
          }

          .btn-danger {
            background-color: #dc3545;
            border-color: #dc3545;
            color: white;
          }

          .btn-danger:hover {
            background-color: #bb2d3b;
          }

          .btn-secondary {
            background-color: #6c757d;
            border-color: #6c757d;
            color: white;
          }

          .btn-outline-secondary {
            background-color: transparent;
            border-color: #6c757d;
            color: #6c757d;
          }

          .btn-outline-secondary:hover {
            background-color: #6c757d;
            color: white;
          }

          .btn-primary {
            background-color: #0d6efd;
            border-color: #0d6efd;
            color: white;
          }

          .btn-outline-primary {
            background-color: transparent;
            border-color: #0d6efd;
            color: #0d6efd;
          }

          .btn-outline-primary:hover {
            background-color: #0d6efd;
            color: white;
          }
        `}</style>

        <div className="w-100 d-flex flex-column align-items-center justify-content-center">
          <div 
            className="monitor relative border-2 border-gray-700 rounded-xl bg-gray-300"
            style={{ width: `${boxWidth}px`, height: `${boxHeight}px` }}
          >
            <div 
              className="ball-container position-relative"
              style={{ 
                left: `${x}px`, 
                top: `${y}px`,
                transition: 'none'
              }}
            >
              {selectedBall !== 0 && balls[selectedBall].image && (
                <img 
                  src={balls[selectedBall].image} 
                  alt={balls[selectedBall].name}
                  className="ball-img"
                />
              )}
            </div>
          </div>

          <div className="w-100 d-flex justify-content-center align-items-center gap-4 mt-5">
            <button 
              className={running ? 'btn btn-danger' : 'btn btn-success'}
              onClick={handleRunClick}
            >
              <i className={running ? 'bi bi-pause' : 'bi bi-play'}></i>
              {running ? 'PAUSE' : 'RUN'}
            </button>

            <div className="d-flex gap-2">
              {balls.map((ball) => (
                <button
                  key={ball.id}
                  className={
                    selectedBall === ball.id
                      ? ball.id === 0 
                        ? 'btn btn-secondary' 
                        : 'btn btn-primary'
                      : ball.id === 0 
                        ? 'btn btn-outline-secondary' 
                        : 'btn btn-outline-primary'
                  }
                  onClick={() => handleBallClick(ball.id)}
                >
                  {ball.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Animation;