import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function PlayField({
  players,
  currentPlayerId,
  fieldCards,
  onReturnToHand,
  onReturnToDeck,
  onSendToGraveyard,
  onGiveTo,
  onMoveLeft,
  onMoveRight,
  onEditNote,
  onOpenModal,
}) {
  const grouped = players.map((p) => ({
    player: p,
    cards: fieldCards.filter((c) => c.ownerId === p.id),
  }));

  const playersWithCards = grouped.filter(g => g.cards.length > 0);
  const playersWithout = grouped.filter(g => g.cards.length === 0);

  return (
    <div className="w-full mt-4">
      <h2 className="text-white font-bold mb-2">CAMPO DA GIOCO</h2>
      <div className="bg-blue-900/50 rounded-lg p-3 border border-blue-700/50">
        <div className="grid gap-4">
          {playersWithCards.map(({ player, cards }) => (
            <div key={player.id} className="bg-blue-800/40 rounded-md p-3">
              <div className="text-sky-200 font-semibold mb-2">{player.name}</div>
              <div className="flex flex-wrap gap-3">
                {cards.map((c, idx) => (
                  <div key={c.id} className="bg-slate-900/60 rounded-lg p-2 w-40">
                    <div className="flex justify-between items-center mb-1">
                      <button onClick={() => onMoveLeft(c.id)} className="p-1 rounded bg-slate-700 hover:bg-slate-600 text-white"><ArrowLeft size={14}/></button>
                      <button onClick={() => onMoveRight(c.id)} className="p-1 rounded bg-slate-700 hover:bg-slate-600 text-white"><ArrowRight size={14}/></button>
                    </div>
                    <img src={c.image} alt={c.displayName} className="w-full h-52 object-cover rounded cursor-pointer" onClick={() => onOpenModal(c)} />
                    <div className="mt-2 text-white text-sm font-semibold text-center">{c.displayName}</div>
                    <textarea
                      value={c.note || ''}
                      onChange={(e) => onEditNote(c.id, e.target.value)}
                      placeholder="Aggiungi nota..."
                      className="mt-2 w-full text-sm bg-slate-800 text-white rounded p-2 resize-none h-16"
                    />
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <button onClick={() => onReturnToHand(c.id)} className="px-2 py-1 rounded-md font-bold text-white bg-sky-500 hover:bg-sky-600 text-xs">RIMETTI IN MANO</button>
                      <button onClick={() => onReturnToDeck(c.id)} className="px-2 py-1 rounded-md font-bold text-white bg-sky-500 hover:bg-sky-600 text-xs">RIMETTI NEL MAZZO</button>
                      <button onClick={() => onSendToGraveyard(c.id)} className="px-2 py-1 rounded-md font-bold text-white bg-sky-500 hover:bg-sky-600 text-xs">METTI NEL CIMITERO</button>
                      <button onClick={() => onGiveTo(c.id)} className="px-2 py-1 rounded-md font-bold text-white bg-sky-500 hover:bg-sky-600 text-xs">CEDI</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {playersWithout.length > 0 && (
            <div className="bg-blue-800/40 rounded-md p-3">
              <div className="text-sky-200 font-semibold mb-2">Senza carte in campo</div>
              <div className="flex gap-2 flex-wrap">
                {playersWithout.map(({ player }) => (
                  <span key={player.id} className="px-2 py-1 rounded bg-slate-800 text-slate-200 text-sm">{player.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
