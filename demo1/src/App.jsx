import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
import { UI } from './components/UI';
import './index.css';

function App() {
  // State is now an object: { status: 'idle' | 'dragging' | 'eating' | ..., type: 'bug' | 'image' | 'text' }
  const [gameState, setGameState] = useState({ status: 'idle', type: null });

  // State sequencer
  useEffect(() => {
    if (gameState.status === 'eating') {
      const timer = setTimeout(() => setGameState(prev => ({ ...prev, status: 'choked' })), 1500);
      return () => clearTimeout(timer);
    }
    if (gameState.status === 'choked') {
      const timer = setTimeout(() => setGameState(prev => ({ ...prev, status: 'burp' })), 2000);
      return () => clearTimeout(timer);
    }
    if (gameState.status === 'burp') {
      const timer = setTimeout(() => setGameState(prev => ({ ...prev, status: 'finished' })), 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState.status]);

  return (
    <>
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        {/* 3D Scene */}
        <Canvas shadows camera={{ position: [0, 1.5, 4], fov: 50 }}>
          <Suspense fallback={null}>
            <Experience gameState={gameState.status} interactionType={gameState.type} />
          </Suspense>
        </Canvas>

        {/* 2D Overlay */}
        <UI gameState={gameState} setGameState={setGameState} />
      </div>
    </>
  );
}

export default App;
