import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { TheEgg } from './TheEgg'
import { Effects } from './Effects'
import { InteractionLayer } from './InteractionLayer'
import { Suspense } from 'react'

export function AnimaCore() {
    return (
        <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 4]} />
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                minPolarAngle={Math.PI / 2 - 0.5}
                maxPolarAngle={Math.PI / 2 + 0.5}
            />

            <color attach="background" args={['#0a0a0a']} />

            <Suspense fallback={null}>
                <TheEgg />
                <Effects />
                <InteractionLayer />
            </Suspense>

            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
        </Canvas>
    )
}
