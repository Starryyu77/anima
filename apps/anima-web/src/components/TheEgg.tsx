import { useRef } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { easing } from 'maath'
import vertexShader from '../shaders/eggVertex.glsl?raw'
import fragmentShader from '../shaders/eggFragment.glsl?raw'
import { useAnimaState } from '../hooks/useAnimaState'

// Define the shader material
const EggMaterial = shaderMaterial(
    {
        uTime: 0,
        uMood: 0,
        uHover: 0,
        uEnergy: 100,
        uRationality: 0,
        uSensibility: 0,
        uChaos: 0,
    },
    vertexShader,
    fragmentShader
)

extend({ EggMaterial })

// Add type safety for the new element
declare module '@react-three/fiber' {
    interface ThreeElements {
        eggMaterial: any
    }
}

export function TheEgg() {
    const materialRef = useRef<THREE.ShaderMaterial>(null)
    const meshRef = useRef<THREE.Mesh>(null)

    const { mood, energy, traits } = useAnimaState()

    // Mouse interaction state
    const hoverRef = useRef(0)

    useFrame((_state, delta) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value += delta

            // Smoothly update uniforms using maath
            easing.damp(materialRef.current.uniforms.uMood, 'value', mood, 0.5, delta)
            easing.damp(materialRef.current.uniforms.uEnergy, 'value', energy, 0.5, delta)
            easing.damp(materialRef.current.uniforms.uRationality, 'value', traits.rationality, 0.5, delta)
            easing.damp(materialRef.current.uniforms.uSensibility, 'value', traits.sensibility, 0.5, delta)
            easing.damp(materialRef.current.uniforms.uChaos, 'value', traits.chaos, 0.5, delta)

            // Hover effect damping
            easing.damp(materialRef.current.uniforms.uHover, 'value', hoverRef.current, 0.2, delta)
        }

        // Slight rotation
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.1
            meshRef.current.rotation.z += delta * 0.05
        }
    })

    return (
        <mesh
            ref={meshRef}
            onPointerOver={() => (hoverRef.current = 1)}
            onPointerOut={() => (hoverRef.current = 0)}
        >
            <icosahedronGeometry args={[1, 64]} />
            {/* @ts-ignore */}
            <eggMaterial ref={materialRef} transparent />
        </mesh>
    )
}
