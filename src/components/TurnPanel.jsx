import { useEffect } from "react";
import { Play, RotateCcw, ArrowRight } from "lucide-react";

export default function TurnPanel({ player, onEndTurn, onReset }) {
  useEffect(() => {
    // potential side-effects for future enhancements
  }, [player]);

  return (
    <div className="w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center gap-3 p-4 rounded-2xl bg-white/70 backdrop-blur border border-slate-100 shadow-sm">
      <div className="flex-1 min-w-[160px]">
        <div className="text-xs uppercase tracking-widest text-slate-400">Current Player</div>
        <div className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          {player}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onEndTurn} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500 text-white font-medium shadow hover:bg-emerald-600">
          <ArrowRight className="h-4 w-4" /> End Turn
        </button>
        <button onClick={onReset} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 text-white font-medium shadow hover:bg-black">
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
      </div>
    </div>
  );
}
