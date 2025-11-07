import React from 'react';

export default function Hand({ cards, onPlay, onShowTo, onEditNote }) {
  return (
    <div className="w-full">
      <h2 className="text-white font-bold mb-2">LA TUA MANO</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {cards.length === 0 && (
          <div className="text-white/80">Nessuna carta in mano</div>
        )}
        {cards.map((c) => (
          <div key={c.id} className="bg-slate-900/60 rounded-lg p-2 w-40 shrink-0">
            <img src={c.image} alt={c.displayName} className="w-full h-52 object-cover rounded" />
            <div className="mt-2 text-white text-sm font-semibold text-center">{c.displayName}</div>
            <textarea
              value={c.note || ''}
              onChange={(e) => onEditNote(c.id, e.target.value)}
              placeholder="Aggiungi nota..."
              className="mt-2 w-full text-sm bg-slate-800 text-white rounded p-2 resize-none h-16"
            />
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button onClick={() => onPlay(c.id)} className="px-2 py-1 rounded-md font-bold text-white bg-sky-500 hover:bg-sky-600 text-sm">GIOCA</button>
              <button onClick={() => onShowTo(c.id)} className="px-2 py-1 rounded-md font-bold text-white bg-indigo-500 hover:bg-indigo-600 text-sm">MOSTRA</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
