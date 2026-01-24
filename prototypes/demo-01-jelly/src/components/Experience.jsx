import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei';
import { JellyCreature } from './JellyCreature';

export function Experience({ gameState, interactionType }) {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

            {/* The Creature */}
            <JellyCreature position={[0, -1, 0]} gameState={gameState} interactionType={interactionType} />

            {/* Floor & Shadows */}
            <ContactShadows resolution={512} scale={10} blur={2} opacity={0.5} far={10} color="#000000" />

            {/* Background/Environment */}
            <Environment preset="city" />
            <OrbitControls makeDefault />
        </>
    );
}
