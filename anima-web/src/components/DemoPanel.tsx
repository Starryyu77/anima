import { useAnimaState } from '../hooks/useAnimaState'

export function DemoPanel() {
    const {
        mood, energy, traits, intimacy,
        setMood, setEnergy, feed
    } = useAnimaState()

    // Helpers to update traits manually (not exposed in store directly as simple setters, 
    // but we can simulate feeding or extend store. For demo, let's just use feeding or we might need to add setters to store if we want direct control)

    // Actually, let's just rely on feeding for traits or add direct setters to store?
    // The store has `feed`. Let's use `feed`.

    return (
        <div className="absolute top-4 right-4 z-20 w-80 bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-lg text-xs font-mono text-gray-300">
            <h2 className="text-white mb-4 border-b border-white/20 pb-2 uppercase tracking-widest">Debug Console</h2>

            {/* Visible Metrics */}
            <div className="space-y-4 mb-6">
                <div>
                    <label className="flex justify-between mb-1">
                        <span>Mood ({mood.toFixed(2)})</span>
                        <span className={mood > 0 ? "text-green-400" : "text-red-400"}>
                            {mood > 0.5 ? "HAPPY" : mood < -0.5 ? "ANGRY" : "NEUTRAL"}
                        </span>
                    </label>
                    <input
                        type="range" min="-1" max="1" step="0.1"
                        value={mood}
                        onChange={(e) => setMood(parseFloat(e.target.value))}
                        className="w-full accent-cyan-500 bg-gray-700 h-1 rounded appearance-none"
                    />
                </div>

                <div>
                    <label className="flex justify-between mb-1">
                        <span>Energy ({energy.toFixed(0)}%)</span>
                    </label>
                    <input
                        type="range" min="0" max="100" step="1"
                        value={energy}
                        onChange={(e) => setEnergy(parseFloat(e.target.value))}
                        className="w-full accent-yellow-500 bg-gray-700 h-1 rounded appearance-none"
                    />
                </div>

                <div>
                    <label className="flex justify-between">
                        <span>Intimacy</span>
                        <span>{intimacy.toFixed(1)}</span>
                    </label>
                    <div className="w-full bg-gray-700 h-1 rounded mt-1">
                        <div
                            className="bg-purple-500 h-full rounded transition-all duration-500"
                            style={{ width: `${intimacy}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Hidden Traits */}
            <h3 className="text-white/60 mb-2 mt-4 uppercase text-[10px]">Personality Traits</h3>
            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="bg-white/5 p-2 rounded">
                    <div className="text-cyan-400 text-lg font-bold">{traits.rationality}</div>
                    <div className="text-[10px]">Rational</div>
                </div>
                <div className="bg-white/5 p-2 rounded">
                    <div className="text-pink-400 text-lg font-bold">{traits.sensibility}</div>
                    <div className="text-[10px]">Sensible</div>
                </div>
                <div className="bg-white/5 p-2 rounded">
                    <div className="text-green-400 text-lg font-bold">{traits.chaos}</div>
                    <div className="text-[10px]">Chaos</div>
                </div>
            </div>

            {/* Actions */}
            <h3 className="text-white/60 mb-2 mt-4 uppercase text-[10px]">Simulate Action</h3>
            <div className="grid grid-cols-1 gap-2">
                <button
                    onClick={() => feed('rationality', 1)}
                    className="bg-cyan-900/40 hover:bg-cyan-800 text-cyan-200 py-2 rounded transition border border-cyan-800/50 flex justify-between px-3"
                >
                    <span>Feed: Code/Docs</span>
                    <span>+Rat</span>
                </button>
                <button
                    onClick={() => feed('sensibility', 1)}
                    className="bg-pink-900/40 hover:bg-pink-800 text-pink-200 py-2 rounded transition border border-pink-800/50 flex justify-between px-3"
                >
                    <span>Feed: Poetry/Art</span>
                    <span>+Sen</span>
                </button>
                <button
                    onClick={() => feed('chaos', 1)}
                    className="bg-green-900/40 hover:bg-green-800 text-green-200 py-2 rounded transition border border-green-800/50 flex justify-between px-3"
                >
                    <span>Feed: Meme/Glitch</span>
                    <span>+Chs</span>
                </button>
            </div>
        </div>
    )
}
