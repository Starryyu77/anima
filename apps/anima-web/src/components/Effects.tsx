import { EffectComposer, Noise, Bloom, Vignette, Scanline } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useAnimaState } from '../hooks/useAnimaState'

export function Effects() {
    const { traits } = useAnimaState()

    // Dynamic effect parameters based on state
    // High chaos -> more noise
    const chaosLevel = Math.min(1, traits.chaos / 10)

    return (
        <EffectComposer>
            <Bloom
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                intensity={1.5 + chaosLevel}
            />
            <Noise
                opacity={0.05 + chaosLevel * 0.1}
                blendFunction={BlendFunction.OVERLAY}
            />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
            <Scanline
                density={1.5} // Scanline density
                opacity={0.05} // Subtle
                blendFunction={BlendFunction.OVERLAY}
            />
        </EffectComposer>
    )
}
