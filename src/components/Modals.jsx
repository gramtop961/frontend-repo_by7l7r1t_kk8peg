import React from 'react';

export function CardModal({ open, card, onClose, onReturnToHand, onReturnToDeck, onSendToGraveyard, onGiveTo }) {
  if (!open || !card) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-slate-900 rounded-lg p-4 w-[420px] max-w-[95vw]">
        <img src={card.image} alt={card.displayName} className="w-full h-auto rounded" />
        <div className="mt-2 text-white font-bold text-center">{card.displayName}</div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button onClick={() => onReturnToHand(card.id)} className="px-3 py-2 rounded-md font-bold text-white bg-sky-500">RIMETTI IN MANO</button>
          <button onClick={() => onReturnToDeck(card.id)} className="px-3 py-2 rounded-md font-bold text-white bg-sky-500">RIMETTI NEL MAZZO</button>
          <button onClick={() => onSendToGraveyard(card.id)} className="px-3 py-2 rounded-md font-bold text-white bg-sky-500">METTI NEL CIMITERO</button>
          <button onClick={() => onGiveTo(card.id)} className="px-3 py-2 rounded-md font-bold text-white bg-sky-500">CEDI</button>
        </div>
        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-3 py-1 rounded bg-slate-700 text-white">Chiudi</button>
        </div>
      </div>
    </div>
  );
}

export function DiceModal({ open, onClose, value, onRoll }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-slate-900 rounded-lg p-4 w-[360px] max-w-[95vw] text-center">
        <div className="mx-auto w-24 h-24 bg-red-600 rounded-lg grid place-items-center shadow-inner">
          <span className="text-white text-4xl font-extrabold">{value}</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button onClick={onRoll} className="px-3 py-2 rounded-md font-bold text-white bg-sky-500">LANCIA</button>
          <button onClick={onClose} className="px-3 py-2 rounded-md font-bold text-white bg-sky-500">CHIUDI</button>
        </div>
      </div>
    </div>
  );
}

export function ChooseModal({ open, title, images, onClose, onPick }) {
  const [selected, setSelected] = React.useState(null);
  React.useEffect(() => {
    if (!open) setSelected(null);
  }, [open]);
  if (!open) return null;
  const sorted = [...images].sort((a,b)=>a.displayName.localeCompare(b.displayName));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-slate-900 rounded-lg p-4 w-[720px] max-w-[95vw]">
        <div className="text-white font-bold mb-2">{title}</div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-[60vh] overflow-auto pr-2">
          {sorted.map((img) => (
            <img
              key={img.id}
              src={img.image}
              alt={img.displayName}
              className={`w-full h-32 object-cover rounded cursor-pointer border ${selected?.id===img.id? 'border-sky-500' : 'border-transparent'}`}
              onClick={() => setSelected(img)}
            />
          ))}
        </div>
        {selected && (
          <div className="mt-4">
            <img src={selected.image} alt={selected.displayName} className="w-full h-auto rounded" />
          </div>
        )}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button disabled={!selected} onClick={() => selected && onPick(selected)} className="px-3 py-2 rounded-md font-bold text-white bg-sky-500 disabled:opacity-60">PESCA</button>
          <button onClick={onClose} className="px-3 py-2 rounded-md font-bold text-white bg-sky-500">CHIUDI</button>
        </div>
      </div>
    </div>
  );
}
