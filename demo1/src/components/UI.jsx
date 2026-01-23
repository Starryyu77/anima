import React from 'react';
import { motion } from 'framer-motion';
import { FileWarning, Check, Image, FileText } from 'lucide-react';

export function UI({ gameState, setGameState }) {
    // Hit detection 
    const handleDragEnd = (event, info, type) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const dropX = info.point.x;
        const dropY = info.point.y;
        const dist = Math.sqrt(Math.pow(dropX - centerX, 2) + Math.pow(dropY - centerY, 2));

        // Eating zone radius 200
        if (dist < 200) {
            setGameState({ status: 'eating', type: type });
        } else {
            setGameState({ status: 'idle', type: null });
        }
    };

    // Helper for Draggable Icon
    const DraggableIcon = ({ type, icon: Icon, color, label }) => (
        <motion.div
            drag
            dragSnapToOrigin
            dragElastic={0.2}
            onDragStart={() => setGameState({ status: 'dragging', type: type })}
            onDragEnd={(e, i) => handleDragEnd(e, i, type)}
            style={{
                cursor: 'grab',
                // Icons now sit on the taskbar, so remove white background to look like files on dock, or keep typical file look
                // Checking prototype: Files are on desktop or above taskbar. 
                // Let's make them look like files hovering above taskbar or ON taskbar.
                // Let's stick to the card look but cleaner
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                padding: '10px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '80px',
                margin: '0 15px',
                zIndex: 10
            }}
            whileHover={{ scale: 1.1, y: -10 }}
            whileTap={{ scale: 0.9, cursor: 'grabbing' }}
        >
            <Icon size={40} color={color} />
            <span style={{ fontSize: '10px', marginTop: '5px', color: '#1e293b', fontWeight: 'bold' }}>{label}</span>
        </motion.div>
    );

    return (
        <div className="ui-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden' }}>

            {/* Taskbar Dock Background */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '80px', // Dock height
                background: 'linear-gradient(to top, #0f172a, #1e293b)', // Dark blue/slate gradient
                borderTop: '1px solid #334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
                pointerEvents: 'auto' // Allow clicks on dock if needed, but mostly visual
            }}>
                {/* Dock separation line or gloss effect could go here */}
            </div>

            {/* Draggable Items Area - Sitting on top of Taskbar */}
            {(gameState.status === 'idle' || gameState.status === 'dragging') && (
                <div style={{
                    position: 'absolute',
                    bottom: '20px', // Sit nicely inside/on the dock area
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    pointerEvents: 'auto',
                    zIndex: 20
                }}>
                    <DraggableIcon type="bug" icon={FileWarning} color="#ef4444" label="bug.js" />
                    <DraggableIcon type="image" icon={Image} color="#e879f9" label="design.png" />
                    <DraggableIcon type="text" icon={FileText} color="#94a3b8" label="notes.txt" />
                </div>
            )}

            {/* Result Card */}
            {gameState.status === 'finished' && (
                <motion.div
                    initial={{ scale: 0, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        x: '-50%',
                        y: '-50%',
                        background: 'white',
                        padding: '20px',
                        borderRadius: '16px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                        textAlign: 'center',
                        width: '300px',
                        pointerEvents: 'auto',
                        zIndex: 100
                    }}
                >
                    <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ background: '#dcfce7', padding: '10px', borderRadius: '50%' }}>
                            <Check color="#16a34a" size={32} />
                        </div>
                    </div>
                    <h2 style={{ margin: '0 0 10px 0', color: '#1f2937' }}>
                        {gameState.type === 'bug' ? 'Bug 修复！' : gameState.type === 'image' ? '审美提升！' : '知识吸收！'}
                    </h2>
                    <p style={{ color: '#4b5563', fontStyle: 'italic', marginBottom: '20px' }}>
                        {gameState.type === 'bug' ? '“味道有点苦，但干得漂亮，主人。”' :
                            gameState.type === 'image' ? '“好吃！感觉变漂亮了！”' :
                                '“嗯...稍微有点干。”'}
                    </p>
                    <button
                        onClick={() => setGameState({ status: 'idle', type: null })}
                        style={{
                            background: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        继续投喂
                    </button>
                </motion.div>
            )}

            {/* Instructions */}
            {gameState.status === 'idle' && (
                <div style={{ position: 'absolute', bottom: '90px', width: '100%', textAlign: 'center', color: '#94a3b8', fontSize: '14px', pointerEvents: 'none' }}>
                    ↓ 拖拽任务栏上的文件投喂 ↓
                </div>
            )}
        </div>
    );
}
