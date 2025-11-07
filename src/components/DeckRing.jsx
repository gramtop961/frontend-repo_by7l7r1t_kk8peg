import { useMemo } from "react";

// Visualizes 4 shared decks in a ring layout with counts
export default function DeckRing({ decks = [], onDraw }) {
  const colors = [
    "from-violet-500 to-fuchsia-500",
    "from-cyan-500 to-blue-500",
    "from-amber-500 to-orange-600",
    "from-emerald-500 to-teal-600",
  ];

  const segments = useMemo(() => {
    // Ensure exactly 4 decks for the ring visualization
    const four = Array.from({ length: 4 }, (_, i) => decks[i] || { name: `Deck ${i+1}`, count: 0 });
    return four.map((d, i) => ({ ...d, idx: i }));
  }, [decks]);

  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-square">
      {/* Ring background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-50 to-slate-100 shadow-inner" />

      {/* Segments */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative h-[86%] w-[86%]">
          {segments.map((seg, i) => {
            const rotate = i * 90;
            return (
              <button
                key={i}
                onClick={() => onDraw?.(seg.idx)}
                className={`group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center
                 h-1/2 w-[52%] rounded-3xl p-[2px] transition-transform hover:scale-[1.02]`}
                style={{ transform: `translate(-50%, -50%) rotate(${rotate}deg)` }}
                aria-label={`Draw from ${seg.name}`}
              >
                <div className={`h-full w-full rounded-3xl bg-gradient-to-br ${colors[i]} p-3`}
                  style={{ transform: `rotate(${-rotate}deg)` }}
                >
                  <div className="h-full w-full rounded-2xl bg-white/90 backdrop-blur-sm grid place-items-center text-center shadow">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-slate-500">{seg.name}</div>
                      <div className="text-3xl font-black text-slate-800">{seg.count}</div>
                      <div className="text-[10px] text-slate-400">tap to draw</div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Center badge */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="rounded-full px-6 py-3 bg-white shadow-lg border border-slate-100 text-center">
          <div className="text-[10px] uppercase tracking-widest text-slate-400">Shared Decks</div>
          <div className="text-sm font-semibold text-slate-700">EvoRing</div>
        </div>
      </div>
    </div>
  );
}
