import { create } from 'zustand'

export type TraitType = 'rationality' | 'sensibility' | 'chaos'

interface AnimaState {
    // Visible Metrics
    intimacy: number
    mood: number // -1.0 to 1.0 (0 is neutral)
    energy: number // 0 to 100

    // Hidden Traits
    traits: {
        rationality: number
        sensibility: number
        chaos: number
    }

    // Actions
    setMood: (mood: number) => void
    modifyMood: (delta: number) => void
    setEnergy: (energy: number) => void
    feed: (type: TraitType, value?: number) => void
    tick: () => void // Called periodically for decay/recovery
}

export const useAnimaState = create<AnimaState>((set) => ({
    intimacy: 10,
    mood: 0,
    energy: 100,
    traits: {
        rationality: 0,
        sensibility: 0,
        chaos: 0,
    },

    setMood: (mood) => set({ mood: Math.max(-1, Math.min(1, mood)) }),

    modifyMood: (delta) => set((state) => ({
        mood: Math.max(-1, Math.min(1, state.mood + delta))
    })),

    setEnergy: (energy) => set({ energy: Math.max(0, Math.min(100, energy)) }),

    feed: (type, value = 1) => set((state) => {
        const newTraits = { ...state.traits }
        newTraits[type] += value

        // Feeding usually improves mood slightly, unless it's chaos?
        // Following rules: 
        // Rationality: Intimacy +0.5, Mood +0.1 (if like)
        // Sensibility: Intimacy +0.5
        // Chaos: Mood varies

        // Simple implementation for now
        let moodDelta = 0.1
        if (type === 'chaos') moodDelta = 0.05

        return {
            traits: newTraits,
            intimacy: Math.min(100, state.intimacy + 0.5),
            mood: Math.max(-1, Math.min(1, state.mood + moodDelta)),
            energy: Math.max(0, state.energy - 1) // Digestion costs energy? Or feeding restores?
            // "Energy is Interaction Stamina". Feeding might cost processing power.
        }
    }),

    tick: () => set((state) => {
        // Mood decays towards 0
        // Energy recovers slowly if dormant, decays if active?
        return {
            mood: state.mood * 0.99,
            energy: Math.min(100, state.energy + 0.05)
        }
    })
}))
