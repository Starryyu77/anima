import { AnimaCore } from './components/AnimaCore'
import { DemoPanel } from './components/DemoPanel'

function App() {
  return (
    <>
      {/* Immersive Background Layer */}
      <div className="fixed inset-0 bg-[#0a0a0a]" />

      {/* 3D Scene */}
      <div className="fixed inset-0 z-0">
        <AnimaCore />
      </div>

      {/* UI Overlay */}
      <div className="fixed top-0 left-0 p-8 z-10 pointer-events-none">
        <h1 className="text-sm tracking-[0.2em] font-bold text-white/80 uppercase mb-1">
          Anima <span className="text-xs font-normal opacity-50 ml-2">v0.1.0</span>
        </h1>
        <p className="text-[10px] text-white/40 font-mono">
          System: Online <br />
          Connection: Secure
        </p>
      </div>

      {/* Hint */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-white/20 text-[10px] pointer-events-none text-center">
        "Form follows Data"
      </div>

      {/* Controls */}
      <DemoPanel />
    </>
  )
}

export default App
