import { useMemo } from "react";

function Card({ card, onPlay }) {
  return (
    <button
      onClick={() => onPlay?.(card)}
      className="group relative h-36 w-24 rounded-xl bg-white border border-slate-200 shadow hover:shadow-md transition-all overflow-hidden text-left"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100" />
      <div className="relative p-2 h-full w-full flex flex-col">
        <div className="text-[10px] uppercase tracking-widest text-slate-400">{card.type}</div>
        <div className="mt-auto">
          <div className="text-lg font-bold text-slate-800 leading-tight line-clamp-2">{card.title}</div>
          {card.power !== undefined && (
            <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900 text-white text-xs">
              PWR {card.power}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

export default function Hand({ cards = [], onPlay }) {
  const spread = useMemo(() => cards.slice(0, 8), [cards]);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex gap-3 md:gap-4 overflow-x-auto px-2 py-1">
        {spread.length === 0 ? (
          <div className="text-slate-500 text-sm">Draw from a deck to add cards to your hand.</div>) :
          spread.map((c, i) => <Card key={i} card={c} onPlay={onPlay} />)}
      </div>
    </div>
  );
}
