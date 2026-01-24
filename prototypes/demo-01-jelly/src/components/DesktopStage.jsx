import React from 'react';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Box } from '@react-three/drei';

export function DesktopStage() {
    return (
        <group>
            {/* PHYSICAL TASKBAR / SHELF */}
            {/* Positioned at bottom of view. 
            Visual: Transparent or simple material (since we have the UI div overlay).
            Physics: Static RigidBody.
        */}
            <RigidBody type="fixed" friction={2} restitution={0.2}>
                {/* The Taskbar collision box */}
                <CuboidCollider args={[10, 0.5, 2]} position={[0, -2.5, 0]} />

                {/* Visual representation of the "Floor" inside the screen 
                Using a shadow receiver plane or box implies the depth.
            */}
                <Box args={[20, 1, 5]} position={[0, -3, -1]} receiveShadow>
                    <meshStandardMaterial color="#0f172a" transparent opacity={0.5} />
                </Box>
            </RigidBody>

            {/* INVISIBLE WALLS to keep creature in frame */}
            <RigidBody type="fixed">
                <CuboidCollider args={[1, 10, 5]} position={[-6, 0, 0]} /> {/* Left */}
                <CuboidCollider args={[1, 10, 5]} position={[6, 0, 0]} />  {/* Right */}
                <CuboidCollider args={[10, 10, 1]} position={[0, 0, -3]} /> {/* Back */}
                <CuboidCollider args={[10, 10, 1]} position={[0, 0, 3]} />  {/* Front (Glass) */}
            </RigidBody>

            {/* Background Wallpaper Plane (Visual only) */}
            <mesh position={[0, 0, -4]}>
                <planeGeometry args={[20, 15]} />
                <meshStandardMaterial color="#334155" />
            </mesh>
        </group>
    );
}
