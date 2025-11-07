import React from 'react';
import { Shuffle, Eye } from 'lucide-react';

export default function Deck({
  name,
  count,
  backImage,
  onDraw,
  onShuffle,
  onChoose,
  extraControl,
}) {
  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <div className="text-white font-semibold tracking-wide">{name} · Rimaste: {count}</div>
      <div className="relative" onClick={onDraw}>
        <img src={backImage} alt={name} className="w-28 h-40 object-cover rounded-lg shadow-lg cursor-pointer" />
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onShuffle} className="px-3 py-1.5 rounded-md font-bold text-white bg-sky-500 hover:bg-sky-600 flex items-center gap-2">
          <Shuffle size={16}/> MISCHIA
        </button>
        <button onClick={onChoose} className="px-3 py-1.5 rounded-md font-bold text-white bg-emerald-500 hover:bg-emerald-600 flex items-center gap-2">
          <Eye size={16}/> SCEGLI
        </button>
      </div>
      {extraControl}
    </div>
  );
}
