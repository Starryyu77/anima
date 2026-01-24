import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Anima = ({ mood = 'neutral', isEating = false, speech = null, isSleeping = false, accessory = null }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [wanderPos, setWanderPos] = useState({ x: 0, y: 0 });

    // Handle Mouse Movement for Eye Tracking
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isSleeping) {
                setMousePos({ x: e.clientX, y: e.clientY });
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isSleeping]);

    // Wandering Logic - Constrained to "Walking" along the Dock
    useEffect(() => {
        if (isSleeping || isEating) return;

        const wanderInterval = setInterval(() => {
            // Mostly horizontal movement to slide along the dock
            const randomX = (Math.random() - 0.5) * 150; // Widen range to +/- 75px
            const randomY = (Math.random() - 0.5) * 10; // Minimal vertical bounce
            setWanderPos({ x: randomX, y: randomY });
        }, 4000); // More deliberate, slower moves

        return () => clearInterval(wanderInterval);
    }, [isSleeping, isEating]);

    const calculateEyePosition = (eyeX, eyeY) => {
        if (isSleeping) return { x: 0, y: 0 };

        // Offset simple tracking
        const centerX = window.innerWidth / 2 + wanderPos.x;
        const centerY = window.innerHeight - 80 + wanderPos.y; // Adjusted for bottom position
        const eyeCenterX = centerX + eyeX;
        const eyeCenterY = centerY + eyeY;
        const deltaX = mousePos.x - eyeCenterX;
        const deltaY = mousePos.y - eyeCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        const radius = isEating ? 8 : 6;
        const pupilX = Math.cos(angle) * radius;
        const pupilY = Math.sin(angle) * radius;
        return { x: pupilX, y: pupilY };
    };

    const leftEye = calculateEyePosition(-20, -10);
    const rightEye = calculateEyePosition(20, -10);

    const getMoodStyles = () => {
        // Same styles as before, just ensuring they persist
        switch (mood) {
            case 'rational': return "from-cyan-400/60 to-blue-600/40 border-cyan-200/50 shadow-[inset_0_0_20px_rgba(255,255,255,0.7),inset_10px_10px_30px_rgba(0,255,255,0.3),0_10px_40px_rgba(0,100,255,0.3)]";
            case 'sensible': return "from-fuchsia-400/50 to-rose-500/30 border-pink-200/50 shadow-[inset_0_0_20px_rgba(255,255,255,0.7),inset_10px_10px_30px_rgba(255,0,255,0.3),0_10px_40px_rgba(255,0,100,0.3)]";
            case 'chaos': return "from-yellow-400/60 via-red-500/50 to-purple-600/60 border-white/70 shadow-[inset_0_0_30px_rgba(255,255,255,0.9),inset_0_0_50px_rgba(255,0,0,0.4),0_0_50px_rgba(255,255,0,0.5)]";
            default: return "from-amber-100/40 to-orange-100/20 border-white/60 shadow-[inset_0_0_30px_rgba(255,255,255,0.8),inset_10px_10px_40px_rgba(255,250,220,0.5),0_20px_60px_rgba(255,200,100,0.2)]";
        }
    };

    const getBodyAnimation = () => {
        const baseX = wanderPos.x;
        const baseY = wanderPos.y;

        if (isSleeping) {
            return {
                scaleY: [0.6, 0.65, 0.6],
                scaleX: [1.2, 1.25, 1.2],
                // Melted puddle shape
                borderRadius: "60% 60% 40% 40% / 70% 70% 20% 20%",
                rotate: 0,
                x: baseX,
                y: baseY + 30, // Sink into dock
                transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            };
        }

        if (mood === 'chaos') {
            return {
                scale: [1, 1.2, 0.9, 1.1, 1],
                rotate: [0, 5, -5, 10, -10, 0],
                x: [baseX, baseX + 5, baseX - 5, baseX],
                y: baseY,
                transition: { duration: 0.5, repeat: Infinity }
            };
        }

        // Idle "Sitting/Sliding" on Dock
        return {
            // Flatter bottom to simulate sitting/gravity
            borderRadius: [
                "50% 50% 40% 40% / 60% 60% 30% 30%",
                "60% 40% 45% 45% / 70% 50% 25% 35%",
                "40% 60% 40% 40% / 50% 70% 35% 25%",
                "50% 50% 40% 40% / 60% 60% 30% 30%",
            ],
            scale: [1, 1.05, 0.95, 1], // Squish slightly
            x: baseX,
            y: baseY, // Stay low
            rotate: [0, 1, -1, 0],
            transition: {
                borderRadius: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 3, ease: "easeInOut" },
                y: { duration: 3, ease: "easeInOut" },
                rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }
        };
    };

    return (
        <div className="relative w-full h-full flex items-end justify-center pointer-events-none pb-8">
            {/* Gooey Filter */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            {/* Zzz Animation */}
            <AnimatePresence>
                {isSleeping && (
                    <div className="absolute top-1/2 left-1/2 -translate-y-24 ml-16 z-50 pointer-events-none">
                        {[1, 2, 3].map((i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
                                animate={{ opacity: [0, 1, 0], y: -30, x: 15 * i, scale: 1.5 }}
                                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
                                className="absolute text-white/80 font-bold text-xl font-mono"
                            >Z</motion.span>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            {/* Speech Bubble - Spawns higher now */}
            <AnimatePresence>
                {speech && (
                    <motion.div
                        initial={{ opacity: 0, y: 0, scale: 0.8 }}
                        animate={{ opacity: 1, y: -200, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute bottom-48 z-50 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-white/50 text-slate-800 font-medium whitespace-nowrap text-center pointer-events-auto origin-bottom"
                    >
                        {speech}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/90 rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Creature Wrapper - Sitting on bottom */}
            <div className="relative w-64 h-56 transition-transform duration-1000 ease-in-out">
                <motion.div
                    className="relative w-full h-full"
                    style={{ filter: "url(#goo)" }}
                >
                    {/* Main Body */}
                    <motion.div
                        className={`absolute inset-0 bg-gradient-to-br backdrop-blur-3xl border-2 ${getMoodStyles()}`}
                        animate={getBodyAnimation()}
                    >
                        {/* Internal Structure */}
                        <div className="absolute inset-8 rounded-full bg-white/10 blur-xl" />
                        <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-white/20 rounded-full blur-md mix-blend-overlay" />
                    </motion.div>

                    {/* Dock Overhang/Drops - Simulating melting over the edge */}
                    {!isSleeping && (
                        <>
                            {/* Left Drip */}
                            <motion.div
                                className={`absolute -bottom-4 left-12 w-14 h-16 backdrop-blur-2xl border border-white/20 ${getMoodStyles()}`}
                                style={{ borderRadius: "40% 60% 50% 50% / 60% 60% 40% 40%" }}
                                animate={{
                                    y: [0, 5, 0],
                                    scaleY: [1, 1.1, 1],
                                    height: ["3.5rem", "5rem", "3.5rem"] // Drip gets longer and shorter
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
                            {/* Right Drip */}
                            <motion.div
                                className={`absolute -bottom-3 right-16 w-12 h-14 backdrop-blur-2xl border border-white/20 ${getMoodStyles()}`}
                                style={{ borderRadius: "60% 40% 50% 50% / 60% 60% 40% 40%" }}
                                animate={{
                                    y: [0, 8, 0],
                                    scaleY: [1, 1.15, 1],
                                    height: ["3rem", "4.5rem", "3rem"]
                                }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            />
                        </>
                    )}
                </motion.div>

                {/* Accessory */}
                {accessory && !isSleeping && (
                    <motion.div
                        className="absolute -top-6 left-1/2 -translate-x-1/2 text-5xl z-20 drop-shadow-lg filter"
                        animate={{
                            x: wanderPos.x / 3,
                            rotate: [0, 5, -5, 0],
                            y: [0, -5, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {accessory}
                    </motion.div>
                )}

                {/* Eyes - Lower position for "Cute Monster" look */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center gap-6 z-20 pointer-events-none"
                    style={{
                        top: '15%',
                        transform: `translate(${wanderPos.x}px, ${wanderPos.y}px)`
                    }}
                >
                    <div className={`relative ${isSleeping ? 'w-10 h-1 bg-slate-800/50' : 'w-10 h-10 bg-white/90 shadow-lg'} rounded-full flex items-center justify-center transition-all duration-500`}>
                        {!isSleeping && (
                            <>
                                <motion.div className="w-4 h-4 bg-slate-900 rounded-full" animate={{ x: leftEye.x, y: leftEye.y }} />
                                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white rounded-full opacity-90" />
                            </>
                        )}
                    </div>
                    <div className={`relative ${isSleeping ? 'w-10 h-1 bg-slate-800/50' : 'w-10 h-10 bg-white/90 shadow-lg'} rounded-full flex items-center justify-center transition-all duration-500`}>
                        {!isSleeping && (
                            <>
                                <motion.div className="w-4 h-4 bg-slate-900 rounded-full" animate={{ x: rightEye.x, y: rightEye.y }} />
                                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white rounded-full opacity-90" />
                            </>
                        )}
                    </div>
                </motion.div>

                {isEating && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-8 w-12 h-6 bg-slate-900/50 rounded-b-full blur-sm z-10"
                    />
                )}
            </div>
        </div>
    );
};

export default Anima;
