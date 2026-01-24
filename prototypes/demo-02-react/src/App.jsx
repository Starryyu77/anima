import React, { useState, useRef, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import Anima from './components/Anima';

const DesktopIcon = ({ name, type, icon, initialPos, onDragEnd, onDragStart }) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={onDragStart}
      onDragEnd={(e, info) => onDragEnd(e, info, name, type)}
      initial={initialPos}
      className="absolute flex flex-col items-center gap-2 cursor-pointer w-20 group z-50"
      whileHover={{ scale: 1.05 }}
      whileDrag={{ scale: 1.1, zIndex: 100 }}
    >
      <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
        <span className="text-3xl select-none">{icon}</span>
      </div>
      <span className="text-white text-xs font-medium drop-shadow-md text-center px-1 py-0.5 rounded bg-black/20 backdrop-blur-sm select-none">
        {name}
      </span>
    </motion.div>
  );
};

const Dock = () => (
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 h-20 bg-white/20 backdrop-blur-3xl border border-white/20 rounded-[2rem] flex items-end gap-3 px-4 pb-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-40 transform perspective-1000 rotateX(5deg)">
    {['finder', 'launchpad', 'safari', 'messages', 'music'].map((app, i) => (
      <div key={i} className={`w-14 h-14 rounded-2xl shadow-lg transition-transform duration-300 cursor-pointer hover:-translate-y-4 hover:scale-110 ${i === 0 ? "bg-gradient-to-b from-sky-400 to-blue-600" :
          i === 1 ? "bg-gradient-to-br from-gray-300 to-gray-500" :
            i === 2 ? "bg-gradient-to-b from-blue-400 to-teal-500" :
              i === 3 ? "bg-green-500" :
                "bg-gradient-to-tr from-pink-500 to-rose-600"
        }`} />
    ))}
  </div>
);

function App() {
  // State
  const [mood, setMood] = useState('neutral'); // neutral, rational, sensible, chaos
  const [isEating, setIsEating] = useState(false);
  const [speech, setSpeech] = useState(null);
  const [isSleeping, setIsSleeping] = useState(false);
  const [accessory, setAccessory] = useState(null);
  const [files, setFiles] = useState([
    { id: 1, name: 'rust_docs.md', type: 'rational', icon: '🦀', pos: { x: 50, y: 50 }, visible: true },
    { id: 2, name: 'sad_diary.txt', type: 'sensible', icon: '📓', pos: { x: 50, y: 180 }, visible: true },
    { id: 3, name: 'meme_image.png', type: 'chaos', icon: '🤪', pos: { x: 50, y: 310 }, visible: true },
  ]);

  // Idle Timer Logic
  const lastInteractionTime = useRef(Date.now());

  useEffect(() => {
    const resetIdleTimer = () => {
      lastInteractionTime.current = Date.now();
      if (isSleeping) setIsSleeping(false);
    };

    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('click', resetIdleTimer);
    window.addEventListener('keydown', resetIdleTimer);

    const idleCheckInterval = setInterval(() => {
      const timeSinceLastInteraction = Date.now() - lastInteractionTime.current;
      if (timeSinceLastInteraction > 5000 && !isSleeping) { // 5 seconds for demo
        setIsSleeping(true);
      }
    }, 1000);

    // Assign random accessory on mount
    const accessories = ['🎧', '🌸', '👓', '🎀', '🧢', '🌱'];
    setAccessory(accessories[Math.floor(Math.random() * accessories.length)]);

    return () => {
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('click', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
      clearInterval(idleCheckInterval);
    };
  }, [isSleeping]); // Re-bind if needed, but refs usually serve well. Keeping isSleeping in dep array to update state correctly if logic changes.

  const handleDragStart = () => {
    setIsEating(true);
    setIsSleeping(false); // Wake up on drag
    lastInteractionTime.current = Date.now();
  };

  const handleDragEnd = (event, info, fileName, fileType) => {
    setIsEating(false);
    lastInteractionTime.current = Date.now();

    // Updated collision detection targeting the Dock area
    const dropX = info.point.x;
    const dropY = info.point.y;
    const screenCenterX = window.innerWidth / 2;
    const screenCenterY = window.innerHeight - 150; // Target bottom area
    const detectionRadius = 150;

    const distance = Math.sqrt(
      Math.pow(dropX - screenCenterX, 2) + Math.pow(dropY - screenCenterY, 2)
    );

    if (distance < detectionRadius) {
      handleFeed(fileName, fileType);
    }
  };

  const handleFeed = (name, type) => {
    // "Consume" the file
    setFiles(prev => prev.map(f => f.name === name ? { ...f, visible: false } : f));

    // Wake up fully
    setIsSleeping(false);

    // Reaction Logic
    if (type === 'rational') {
      setMood('rational');
      setSpeech("Processing Logic... Rationality +1");
    } else if (type === 'sensible') {
      setMood('sensible');
      setSpeech("Absorbing Emotions... Sensibility +1");
    } else if (type === 'chaos') {
      setMood('chaos');
      setSpeech("LOL! Chaos +1");
    }

    setTimeout(() => {
      setSpeech(null);
    }, 3000);

    // Respawn file
    setTimeout(() => {
      setFiles(prev => prev.map(f => f.name === name ? { ...f, visible: true } : f));
    }, 5000);
  };

  return (
    <div className="w-full h-screen relative overflow-hidden bg-cover bg-center font-sans"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")' }}
    >
      <div className="absolute inset-0 bg-black/30" />

      {/* Desktop Icons */}
      {files.map(file => (
        file.visible && (
          <DesktopIcon
            key={file.id}
            name={file.name}
            type={file.type}
            icon={file.icon}
            initialPos={file.pos}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        )
      ))}

      {/* Anima (Sitting on Dock) */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-96 h-64 flex items-end justify-center pointer-events-none z-30">
        <Anima
          mood={mood}
          isEating={isEating}
          speech={speech}
          isSleeping={isSleeping}
          accessory={accessory}
        />
      </div>

      {/* Dock */}
      <div className="z-40">
        <Dock />
      </div>

      <div className="absolute bottom-2 right-2 text-white/30 text-[10px]">
        Project Anima Demo v0.3
      </div>
    </div>
  );
}

export default App;
