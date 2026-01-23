import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder, Box, MeshDistortMaterial, Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

export function JellyCreature({ gameState, interactionType, ...props }) {
    const meshRef = useRef();
    const eyesRef = useRef();
    const groupRef = useRef();

    // Random offset for wandering
    const noiseOffset = useRef(Math.random() * 100);

    // Animation loop
    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // --- 1. Material & Shape Animation (Liquid Effect) ---
        // Default Values
        let distort = 0.4;
        let speed = 2;
        // Milky/Yellowish default color from images
        let color = "#ffffee";

        // Reaction Logic based on Interaction Type
        if (gameState === 'eating' || gameState === 'choked' || gameState === 'burp' || gameState === 'finished') {
            if (interactionType === 'bug') {
                color = gameState === 'choked' ? "#bbf7d0" : "#ffffee"; // Green tint if choked
                speed = 5;
            } else if (interactionType === 'image') {
                color = "#fbcfe8"; // Pinkish tint
                distort = 0.6;
                speed = 4;
            } else if (interactionType === 'text') {
                color = "#e5e5e5"; // Greyish tint
                distort = 0.2;
                speed = 1;
            }
        }

        // Reaction to states
        if (gameState === 'eating') {
            distort = 0.8;
        } else if (gameState === 'choked') {
            distort = 1.0;
            speed = 10;
        }

        if (meshRef.current) {
            meshRef.current.distort = THREE.MathUtils.lerp(meshRef.current.distort, distort, 0.1);
            meshRef.current.speed = THREE.MathUtils.lerp(meshRef.current.speed, speed, 0.1);
            meshRef.current.color.set(color);
        }

        // --- 2. Autonomous Movement (Wandering) ---
        if (groupRef.current) {
            let targetX = 0;
            let targetRotZ = 0;

            if (gameState === 'idle') {
                // Wander logic
                targetX = Math.sin(time * 0.5 + noiseOffset.current) * 2;
                targetRotZ = Math.sin(time * 1) * 0.2;
            } else {
                targetX = 0;
                targetRotZ = 0;
            }

            // Interaction Shakes
            if (gameState === 'choked') {
                targetX = (Math.random() - 0.5) * 0.2;
                targetRotZ = 0;
            }

            groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.02);
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.05);

            // Gentle Floating
            groupRef.current.position.y = props.position[1] + Math.sin(time * 2) * 0.05;
        }


        // --- 3. Eyes Animation ---
        if (eyesRef.current) {
            let eyeRotX = 0;
            let eyePosY = 0.3;

            if (gameState === 'choked') {
                eyeRotX = -0.6;
                eyePosY = 0.4;
            } else if (gameState === 'finished') {
                eyePosY = 0.3 + Math.sin(time * 10) * 0.05;
            }

            eyesRef.current.rotation.x = THREE.MathUtils.lerp(eyesRef.current.rotation.x, eyeRotX, 0.1);
            eyesRef.current.position.y = THREE.MathUtils.lerp(eyesRef.current.position.y, eyePosY, 0.1);
        }
    });

    return (
        <group ref={groupRef} {...props}>
            {/* Main Body with MeshDistortMaterial */}
            <Sphere args={[1, 64, 64]} position={[0, 1, 0]}>
                <MeshDistortMaterial
                    ref={meshRef}
                    color="#ffffee" // Milky white/yellow base
                    roughness={0.2} // Glossy but not perfect mirror
                    metalness={0.1}
                    transmission={0.8} // Slightly more opaque
                    thickness={1}
                    transparent
                    opacity={0.9}
                    clearcoat={1}
                    distort={0.4}
                    speed={2}
                />

                {/* Accessories */}
                <group>
                    {/* Helmet */}
                    <group position={[0, 0.9, 0]} rotation={[-0.2, 0, 0]}>
                        <Sphere args={[1.05, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]}>
                            <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.5} />
                        </Sphere>
                        <Cylinder args={[1.2, 1.2, 0.1, 32]} position={[0, -0.1, 0]}>
                            <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.5} />
                        </Cylinder>
                        {/* Helmet Detail */}
                        <Box args={[0.4, 0.2, 0.1]} position={[0, 0.8, 0.9]} rotation={[0.4, 0, 0]}>
                            <meshStandardMaterial color="#fbbf24" />
                        </Box>
                    </group>

                    {/* Band-aid */}
                    <group position={[0.6, 0.2, 0.95]} rotation={[0, 0.5, 0]}>
                        <Box args={[0.3, 0.1, 0.02]} rotation={[0, 0, 0.2]}>
                            <meshStandardMaterial color="#fca5a5" />
                        </Box>
                        <Box args={[0.3, 0.1, 0.02]} rotation={[0, 0, -0.2]}>
                            <meshStandardMaterial color="#fca5a5" />
                        </Box>
                        {/* Band-aid pad */}
                        <Box args={[0.1, 0.1, 0.025]} rotation={[0, 0, 0.2]} position={[0, 0, 0.005]}>
                            <meshStandardMaterial color="#fecaca" />
                        </Box>
                    </group>

                    {/* Flag - With Text */}
                    <group position={[-1.2, 0.2, 0.5]} rotation={[0, 0, -0.5]}>
                        <Cylinder args={[0.02, 0.02, 1.5]} position={[0, 0.5, 0]}>
                            <meshStandardMaterial color="#8B4513" />
                        </Cylinder>
                        {/* Flag Banner - Paper color */}
                        <Box args={[0.6, 0.4, 0.01]} position={[0.3, 1, 0]}>
                            <meshStandardMaterial color="#fef3c7" />
                        </Box>
                        {/* Text */}
                        <Text
                            position={[0.3, 1, 0.02]}
                            fontSize={0.2}
                            color="#5c3a21" // Brown text
                            anchorX="center"
                            anchorY="middle"
                        >
                            加油
                        </Text>
                    </group>
                </group>

                {/* Eyes Group - Googly Eyes */}
                <group ref={eyesRef} position={[0, 0.3, 0.95]}>
                    {/* Left Eye */}
                    <group position={[-0.3, 0, 0]}>
                        {/* Sclera (White) */}
                        <Sphere args={[0.15, 32, 32]}>
                            <meshStandardMaterial color="white" roughness={0.2} />
                        </Sphere>
                        {/* Pupil (Black) */}
                        <Sphere args={[0.07, 32, 32]} position={[0, 0, 0.12]}>
                            <meshStandardMaterial color="black" roughness={0.2} />
                        </Sphere>
                    </group>

                    {/* Right Eye */}
                    <group position={[0.3, 0, 0]}>
                        {/* Sclera (White) */}
                        <Sphere args={[0.15, 32, 32]}>
                            <meshStandardMaterial color="white" roughness={0.2} />
                        </Sphere>
                        {/* Pupil (Black) */}
                        <Sphere args={[0.07, 32, 32]} position={[0, 0, 0.12]}>
                            <meshStandardMaterial color="black" roughness={0.2} />
                        </Sphere>
                    </group>
                </group>

            </Sphere>
        </group>
    );
}
