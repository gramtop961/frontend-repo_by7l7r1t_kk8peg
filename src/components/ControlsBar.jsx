import React from 'react';
import { Dice6, Skull, Share2, RotateCcw, MessageCircle, Calculator, ScrollText } from 'lucide-react';

const Button = ({ children, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 rounded-md font-bold text-white bg-sky-500 hover:bg-sky-600 active:scale-[0.98] transition ${className}`}
  >
    {children}
  </button>
);

export default function ControlsBar({
  onOpenDice,
  onOpenGraveyard,
  onInvite,
  onReset,
  unreadCount,
  onToggleChat,
  onToggleCalc,
  onOpenRules,
}) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center gap-2 flex-wrap">
        <Button onClick={onOpenDice} className="flex items-center gap-2"><Dice6 size={18}/> DADO</Button>
        <Button onClick={onOpenGraveyard} className="flex items-center gap-2"><Skull size={18}/> CIMITERO</Button>
        <button onClick={onOpenRules} className="px-3 py-2 rounded-md font-bold text-white bg-indigo-500 hover:bg-indigo-600 flex items-center gap-2">
          <ScrollText size={18}/> REGOLAMENTO
        </button>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <Button onClick={onInvite} className="flex items-center gap-2"><Share2 size={18}/> INVITA AMICI</Button>
        <Button onClick={onReset} className="flex items-center gap-2"><RotateCcw size={18}/> RICOMINCIA PARTITA</Button>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={onToggleCalc} className="relative p-2 rounded-full bg-slate-800/70 hover:bg-slate-700 text-white">
            <Calculator size={20}/>
          </button>
          <button onClick={onToggleChat} className="relative p-2 rounded-full bg-slate-800/70 hover:bg-slate-700 text-white">
            <MessageCircle size={20}/>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-rose-500 text-white rounded-full px-1.5 py-[1px]">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
