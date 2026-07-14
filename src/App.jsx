import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

function App() {
  const [currentLevel, setCurrentLevel] = useState('menu'); 

  // Level 1 state
  const [bunnyFound, setBunnyFound] = useState(false);

  // Level 2 state
  const [labMessage, setLabMessage] = useState('Афина, проверь системы! Нажми СИНЮЮ кнопку.');
  const [labPassed, setLabPassed] = useState(false);

  // Level 3 state
  const [starsClicked, setStarsClicked] = useState([]);
  
  const resetGame = () => {
    setBunnyFound(false);
    setLabMessage('Афина, проверь системы! Нажми СИНЮЮ кнопку.');
    setLabPassed(false);
    setStarsClicked([]);
    setCurrentLevel('menu');
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="app-container" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        
        {/* MENU */}
        {currentLevel === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              background: 'url(/space.png) center/cover no-repeat',
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)'
            }}
          >
            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '40px', borderRadius: '20px', textAlign: 'center', backdropFilter: 'blur(10px)', margin: '20px' }}>
              <h1 style={{ fontSize: '3.5rem', margin: '0 0 10px 0', color: '#fbbf24' }}>Космос Афины</h1>
              <p style={{ fontSize: '1.5rem', marginBottom: '40px' }}>Приключения Инайи и Афины</p>
              <button 
                type="button"
                onClick={() => setCurrentLevel('level1')}
                style={{ fontSize: '1.8rem', padding: '16px 40px', borderRadius: '50px', background: '#3b82f6', border: '4px solid white', outline: 'none', userSelect: 'none' }}
              >
                Начать квест!
              </button>
            </div>
          </motion.div>
        )}

        {/* LEVEL 1: MOUNTAINS */}
        {currentLevel === 'level1' && (
          <motion.div
            key="level1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              height: '100%', 
              background: 'url(/mountains.png) center/cover no-repeat',
              position: 'relative'
            }}
          >
            <div style={{ position: 'absolute', top: 20, left: 20, background: 'rgba(255,255,255,0.8)', padding: '15px 30px', borderRadius: '20px', color: '#333' }}>
              <h2 style={{ margin: 0 }}>Уровень 1: Горы Кавказа</h2>
              <p style={{ margin: '5px 0 0 0', fontSize: '1.2rem' }}>
                {bunnyFound ? 'Ура! Ты нашла зайца!' : 'Синий заяц спрятался! Помоги Афине найти его. Нажми на зайца!'}
              </p>
            </div>

            <motion.img 
              src="/bunny.png" 
              alt="Синий заяц"
              onClick={() => {
                setBunnyFound(true);
                triggerConfetti();
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                position: 'absolute',
                bottom: '25%',
                right: '15%',
                width: '120px',
                filter: bunnyFound ? 'drop-shadow(0 0 20px #fff)' : 'none',
                opacity: bunnyFound ? 1 : 0.8
              }}
            />

            {bunnyFound && (
              <motion.button 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setCurrentLevel('level2')}
                style={{ position: 'absolute', bottom: 40, right: '0', transform: 'translateX(-50%)', fontSize: '1.5rem', padding: '15px 40px' }}
              >
                Идем в лабораторию!
              </motion.button>
            )}
          </motion.div>
        )}

        {/* LEVEL 2: LAB/SPACESHIP PANEL */}
        {currentLevel === 'level2' && (
          <motion.div
            key="level2"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            style={{ 
              height: '100%', 
              background: 'url(/spaceship.png) center/cover no-repeat',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div style={{ marginTop: 20, background: 'rgba(0,0,0,0.7)', padding: '20px 40px', borderRadius: '20px', color: 'white', textAlign: 'center', border: '2px solid #3b82f6' }}>
              <h2 style={{ margin: 0, color: '#fbbf24' }}>Уровень 2: Научная проверка</h2>
              <p style={{ margin: '10px 0 0 0', fontSize: '1.4rem' }}>
                Инайя: "{labMessage}"
              </p>
            </div>

            <div style={{ display: 'flex', gap: '30px', marginTop: 'auto', marginBottom: '15%' }}>
              <motion.div 
                whileTap={{ scale: 0.9 }}
                onClick={() => setLabMessage('Ой, не та кнопка! Наука требует точности. Нужна СИНЯЯ.')}
                style={{ width: 80, height: 80, background: '#ef4444', borderRadius: '50%', border: '6px solid #b91c1c', boxShadow: '0 10px 0 #991b1b' }} 
              />
              <motion.div 
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setLabMessage('Отлично! Системы в норме. К взлету готовы!');
                  setLabPassed(true);
                  triggerConfetti();
                }}
                style={{ width: 100, height: 100, background: '#3b82f6', borderRadius: '50%', border: '6px solid #1d4ed8', boxShadow: '0 10px 0 #1e40af' }} 
              />
              <motion.div 
                whileTap={{ scale: 0.9 }}
                onClick={() => setLabMessage('Это зеленая. Инайя говорит: проверяй внимательно! Нужна СИНЯЯ.')}
                style={{ width: 80, height: 80, background: '#22c55e', borderRadius: '50%', border: '6px solid #15803d', boxShadow: '0 10px 0 #166534' }} 
              />
            </div>

            {labPassed && (
              <motion.button 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setCurrentLevel('level3')}
                style={{ position: 'absolute', bottom: 40, fontSize: '1.5rem', padding: '15px 40px', background: '#fbbf24', color: '#000' }}
              >
                Пуск! В космос!
              </motion.button>
            )}
          </motion.div>
        )}

        {/* LEVEL 3: SPACE */}
        {currentLevel === 'level3' && (
          <motion.div
            key="level3"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              height: '100%', 
              background: 'url(/space.png) center/cover no-repeat',
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.6)', padding: '15px 30px', borderRadius: '20px', color: 'white', textAlign: 'center', width: '80%' }}>
              <h2 style={{ margin: 0, color: '#fbbf24' }}>Уровень 3: Космос</h2>
              <p style={{ margin: '5px 0 0 0', fontSize: '1.2rem' }}>
                {starsClicked.length < 5 
                  ? `Инайя: "Знаешь ли ты, что звезды образуют созвездия? Нажми на 5 звезд, Афина!" (${starsClicked.length}/5)`
                  : 'Созвездие Синего Зайца собрано! Вы с Инайей настоящие исследователи!'}
              </p>
            </div>

            {/* Stars rendering */}
            {[
              { id: 1, top: '30%', left: '30%' },
              { id: 2, top: '20%', left: '60%' },
              { id: 3, top: '50%', left: '70%' },
              { id: 4, top: '70%', left: '50%' },
              { id: 5, top: '60%', left: '20%' },
            ].map(star => {
              const isClicked = starsClicked.includes(star.id);
              return (
                <motion.div
                  key={star.id}
                  onClick={() => {
                    if (!isClicked) {
                      const newStars = [...starsClicked, star.id];
                      setStarsClicked(newStars);
                      if (newStars.length === 5) {
                        setTimeout(() => triggerConfetti(), 500);
                      }
                    }
                  }}
                  animate={{ scale: isClicked ? 1.5 : [1, 1.2, 1] }}
                  transition={{ repeat: isClicked ? 0 : Infinity, duration: 2 }}
                  style={{
                    position: 'absolute',
                    top: star.top,
                    left: star.left,
                    width: 40,
                    height: 40,
                    background: isClicked ? '#fbbf24' : '#fff',
                    borderRadius: '50%',
                    boxShadow: isClicked ? '0 0 30px #fbbf24' : '0 0 10px #fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{color: isClicked ? '#fff' : '#000', fontSize: '1.2rem'}}>⭐</span>
                </motion.div>
              )
            })}

            {starsClicked.length === 5 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}
              >
                <img src="/bunny.png" alt="Заяц" style={{ width: '200px', filter: 'drop-shadow(0 0 30px #3b82f6)' }} />
                <h1 style={{ color: '#fbbf24', textShadow: '0 2px 4px #000' }}>Победа!</h1>
                <button onClick={resetGame} style={{ padding: '10px 20px' }}>Сыграть еще раз</button>
              </motion.div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
