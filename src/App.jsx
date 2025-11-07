import React from 'react';
import Deck from './components/Deck';
import Hand from './components/Hand';
import PlayField from './components/PlayField';
import ControlsBar from './components/ControlsBar';
import { CardModal, DiceModal, ChooseModal } from './components/Modals';

// Simple local prototype. Real-time multiplayer, persistence, and full rule set would
// be implemented on the backend; this front-end demonstrates structure and UI flows.

const DECKS = [
  {
    key: 'PERSONAGGI',
    back: 'https://i.imgur.com/r1rfUAB.png',
    size: 177,
  },
  {
    key: 'MOSSE',
    back: 'https://i.imgur.com/6MUXCZO.png',
    size: 91,
  },
  {
    key: 'BONUS',
    back: 'https://i.imgur.com/lEROr3r.png',
    size: 161,
  },
  {
    key: 'PERSONAGGI SPECIALI',
    back: 'https://i.imgur.com/ipVd57A.png',
    size: 80,
  },
];

function formatNameFromUrl(url) {
  try {
    const file = url.split('/').pop()?.split('.')[0] || '';
    return file.replace(/-/g, ' ').toUpperCase();
  } catch {
    return 'CARTA';
  }
}

export default function App() {
  const [playerName, setPlayerName] = React.useState('');
  const [roomCode, setRoomCode] = React.useState('');
  const [entered, setEntered] = React.useState(false);

  const [players, setPlayers] = React.useState([]);
  const meIdRef = React.useRef('me');

  const [deckCounts, setDeckCounts] = React.useState(() => {
    const map = {};
    DECKS.forEach(d => { map[d.key] = d.size; });
    return map;
  });

  const [hand, setHand] = React.useState([]); // {id, deck, image, displayName, note}
  const [field, setField] = React.useState([]); // {id, deck, image, ownerId, displayName, note}
  const [graveyard, setGraveyard] = React.useState([]); // {id, deck, image, by, displayName, note}

  const [diceOpen, setDiceOpen] = React.useState(false);
  const [diceValue, setDiceValue] = React.useState(1);

  const [chooseOpen, setChooseOpen] = React.useState(false);
  const [chooseDeck, setChooseDeck] = React.useState(null);

  const [cardModalOpen, setCardModalOpen] = React.useState(false);
  const [modalCard, setModalCard] = React.useState(null);

  const [unread, setUnread] = React.useState(0);
  const [chatOpen, setChatOpen] = React.useState(false);
  const [calcOpen, setCalcOpen] = React.useState(false);

  const bgUrl = 'https://files.123freevectors.com/wp-content/original/113342-royal-blue-blurred-background-vector.jpg';

  React.useEffect(() => {
    if (chatOpen) setUnread(0);
  }, [chatOpen]);

  function enterRoom() {
    if (!playerName || !roomCode) return;
    setEntered(true);
    setPlayers([{ id: meIdRef.current, name: playerName }]);
  }

  function resetGame() {
    const map = {};
    DECKS.forEach(d => { map[d.key] = d.size; });
    setDeckCounts(map);
    setHand([]);
    setField([]);
    setGraveyard([]);
  }

  function drawFrom(deckKey) {
    if (deckCounts[deckKey] <= 0) return;
    const image = getCardImage(deckKey);
    const card = {
      id: `${deckKey}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
      deck: deckKey,
      image,
      displayName: formatNameFromUrl(image),
      note: '',
    };
    setHand(prev => [...prev, card]);
    setDeckCounts(dc => ({ ...dc, [deckKey]: dc[deckKey] - 1 }));
  }

  function getCardImage(deckKey) {
    // For now we just use the back as a placeholder front until images are provided next step.
    // Replace with real per-card images when available.
    const deck = DECKS.find(d => d.key === deckKey);
    return deck?.back || '';
  }

  function shuffleDeck(deckKey) {
    // Visual-only: brief shake animation by decrementing and incrementing a dummy state
    // This simplistic approach stands in for a proper animated deck component.
  }

  function chooseFrom(deckKey) {
    setChooseDeck(deckKey);
    setChooseOpen(true);
  }

  function onPickSpecific(cardLike) {
    setChooseOpen(false);
    if (!cardLike) return;
    const card = {
      id: `${chooseDeck}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
      deck: chooseDeck,
      image: cardLike.image,
      displayName: cardLike.displayName,
      note: '',
    };
    setHand(prev => [...prev, card]);
    setDeckCounts(dc => ({ ...dc, [chooseDeck]: Math.max(0, dc[chooseDeck] - 1) }));
  }

  function playCard(cardId) {
    setHand(prev => {
      const idx = prev.findIndex(c => c.id === cardId);
      if (idx === -1) return prev;
      const card = prev[idx];
      const rest = [...prev.slice(0, idx), ...prev.slice(idx + 1)];
      setField(f => [...f, { ...card, ownerId: meIdRef.current }]);
      return rest;
    });
  }

  function editNote(cardId, text) {
    setHand(h => h.map(c => c.id === cardId ? { ...c, note: text } : c));
    setField(f => f.map(c => c.id === cardId ? { ...c, note: text } : c));
    setGraveyard(g => g.map(c => c.id === cardId ? { ...c, note: text } : c));
  }

  function returnToHand(cardId) {
    setField(prev => {
      const idx = prev.findIndex(c => c.id === cardId);
      if (idx === -1) return prev;
      const card = prev[idx];
      setHand(h => [...h, { ...card }]);
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
    });
    setCardModalOpen(false);
  }

  function returnToDeck(cardId) {
    // Put card back and increase deck count
    setField(prev => {
      const idx = prev.findIndex(c => c.id === cardId);
      if (idx !== -1) {
        const card = prev[idx];
        setDeckCounts(dc => ({ ...dc, [card.deck]: dc[card.deck] + 1 }));
        return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
      }
      return prev;
    });
    setGraveyard(prev => {
      const idx = prev.findIndex(c => c.id === cardId);
      if (idx !== -1) {
        const card = prev[idx];
        setDeckCounts(dc => ({ ...dc, [card.deck]: dc[card.deck] + 1 }));
        return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
      }
      return prev;
    });
    setCardModalOpen(false);
  }

  function sendToGraveyard(cardId) {
    // From field to graveyard
    setField(prev => {
      const idx = prev.findIndex(c => c.id === cardId);
      if (idx === -1) return prev;
      const card = prev[idx];
      setGraveyard(g => [...g, { ...card, by: playerName }]);
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
    });
    setCardModalOpen(false);
  }

  function giveTo(cardId) {
    // Prototype: just returns to hand (ownership transfer UI would go here)
    returnToHand(cardId);
  }

  function moveLeft(cardId) {
    setField(prev => {
      const idx = prev.findIndex(c => c.id === cardId);
      if (idx <= 0) return prev;
      const arr = [...prev];
      [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
      return arr;
    });
  }

  function moveRight(cardId) {
    setField(prev => {
      const idx = prev.findIndex(c => c.id === cardId);
      if (idx === -1 || idx === prev.length - 1) return prev;
      const arr = [...prev];
      [arr[idx + 1], arr[idx]] = [arr[idx], arr[idx + 1]];
      return arr;
    });
  }

  function openCardModal(card) {
    setModalCard(card);
    setCardModalOpen(true);
  }

  function showTo(cardId) {
    alert('Selezione giocatore per MOSTRA: prototipo locale');
  }

  const chooseImages = React.useMemo(() => {
    if (!chooseDeck) return [];
    // Until real images are provided, fill with pseudo-cards based on back image
    const deck = DECKS.find(d => d.key === chooseDeck);
    const count = Math.min(30, deck?.size || 0);
    return Array.from({ length: count }).map((_, i) => ({
      id: `${chooseDeck}-${i}`,
      image: deck?.back || '',
      displayName: `${chooseDeck} ${String(i + 1).padStart(3, '0')}`,
    }));
  }, [chooseDeck]);

  return (
    <div
      className="min-h-screen w-full overflow-y-auto"
      style={{ backgroundImage: `url(${bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="max-w-7xl mx-auto p-4">
        <header className="mb-4">
          <h1 className="text-3xl font-extrabold text-white tracking-wide drop-shadow">MINKIARDS</h1>
          <p className="text-sky-100">Prototipo locale — funzionalità multi-giocatore verranno aggiunte con backend.</p>
        </header>

        {!entered ? (
          <div className="bg-slate-900/70 rounded-xl p-4 border border-slate-700">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-white text-sm">Il tuo nome</label>
                <input value={playerName} onChange={(e)=>setPlayerName(e.target.value)} className="mt-1 w-full bg-slate-800 text-white rounded p-2" placeholder="Inserisci nome" />
              </div>
              <div>
                <label className="text-white text-sm">Codice stanza</label>
                <input value={roomCode} onChange={(e)=>setRoomCode(e.target.value)} className="mt-1 w-full bg-slate-800 text-white rounded p-2" placeholder="Es. ABC123" />
              </div>
              <div className="sm:col-span-2">
                <button onClick={enterRoom} className="px-4 py-2 rounded-md font-bold text-white bg-sky-500 hover:bg-sky-600">ENTRA</button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <ControlsBar
              onOpenDice={() => setDiceOpen(true)}
              onOpenGraveyard={() => alert('Apri CIMITERO: prototipo locale')}
              onInvite={() => navigator.clipboard.writeText(window.location.href)}
              onReset={resetGame}
              unreadCount={unread}
              onToggleChat={() => setChatOpen(v=>!v)}
              onToggleCalc={() => setCalcOpen(v=>!v)}
              onOpenRules={() => window.open('https://minkiards.wixsite.com/minkiards/post/regolamento-ufficiale', '_blank')}
            />

            <div className="mt-6 flex flex-wrap items-start gap-6">
              {DECKS.map(d => (
                <Deck
                  key={d.key}
                  name={d.key}
                  count={deckCounts[d.key]}
                  backImage={d.back}
                  onDraw={() => drawFrom(d.key)}
                  onShuffle={() => shuffleDeck(d.key)}
                  onChoose={() => chooseFrom(d.key)}
                  extraControl={d.key === 'BONUS' ? (
                    <label className="flex items-center gap-2 text-white">
                      <input type="checkbox" className="accent-sky-500" onChange={(e)=>alert(e.target.checked ? 'SCENARI attivati (prototipo)' : 'SCENARI disattivati (prototipo)')} />
                      <span className="text-sm">ATTIVA SCENARI</span>
                    </label>
                  ) : null}
                />
              ))}
            </div>

            <div className="mt-6">
              <Hand cards={hand} onPlay={playCard} onShowTo={showTo} onEditNote={editNote} />
            </div>

            <div className="mt-6">
              <PlayField
                players={players}
                currentPlayerId={meIdRef.current}
                fieldCards={field}
                onReturnToHand={returnToHand}
                onReturnToDeck={returnToDeck}
                onSendToGraveyard={sendToGraveyard}
                onGiveTo={giveTo}
                onMoveLeft={moveLeft}
                onMoveRight={moveRight}
                onEditNote={editNote}
                onOpenModal={openCardModal}
              />
            </div>
          </>
        )}
      </div>

      <CardModal
        open={cardModalOpen}
        card={modalCard}
        onClose={() => setCardModalOpen(false)}
        onReturnToHand={returnToHand}
        onReturnToDeck={returnToDeck}
        onSendToGraveyard={sendToGraveyard}
        onGiveTo={giveTo}
      />

      <DiceModal
        open={diceOpen}
        value={diceValue}
        onRoll={() => setDiceValue(1 + Math.floor(Math.random()*6))}
        onClose={() => setDiceOpen(false)}
      />

      <ChooseModal
        open={chooseOpen}
        title={`Scegli da ${chooseDeck || ''}`}
        images={chooseImages}
        onPick={onPickSpecific}
        onClose={() => setChooseOpen(false)}
      />

      {chatOpen && (
        <div className="fixed right-4 bottom-4 z-40 w-80 h-96 bg-slate-900/95 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
          <div className="px-3 py-2 bg-slate-800 text-white font-semibold">Chat</div>
          <div className="p-3 h-[calc(100%-84px)] overflow-y-auto space-y-2">
            <div className="text-slate-300 text-sm">Nessun messaggio (prototipo locale)</div>
          </div>
          <div className="p-2 bg-slate-800 flex items-center gap-2">
            <input className="flex-1 bg-slate-700 text-white rounded p-2 text-sm" placeholder="Scrivi un messaggio..." />
            <button className="px-3 py-1 rounded bg-sky-500 text-white font-bold">Invia</button>
          </div>
        </div>
      )}

      {calcOpen && (
        <div className="fixed right-4 bottom-4 z-40 w-80 h-96 bg-slate-900/95 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
          <div className="px-3 py-2 bg-slate-800 text-white font-semibold">Calcolatrice</div>
          <CalculatorWidget />
        </div>
      )}
    </div>
  );
}

function CalculatorWidget() {
  const [expr, setExpr] = React.useState('');
  const [res, setRes] = React.useState('');
  function append(v){ setExpr(e => e + v); }
  function clear(){ setExpr(''); setRes(''); }
  function evalNow(){
    try {
      // eslint-disable-next-line no-eval
      const val = eval(expr);
      setRes(String(val));
    } catch {
      setRes('Errore');
    }
  }
  return (
    <div className="p-3 text-white">
      <input value={expr} onChange={(e)=>setExpr(e.target.value)} className="w-full bg-slate-800 rounded p-2" placeholder="0" />
      <div className="mt-2 grid grid-cols-4 gap-2">
        {[7,8,9,'/'],[4,5,6,'*'],[1,2,3,'-'],[0,'.','=','+']].flat().map((b,i)=> (
          <button key={i} onClick={()=> b==='='? evalNow(): append(String(b))} className="px-3 py-2 bg-slate-700 rounded hover:bg-slate-600">{b}</button>
        ))}
        <button onClick={clear} className="col-span-4 px-3 py-2 bg-rose-600 rounded">C</button>
      </div>
      <div className="mt-3 text-slate-300">Risultato: <span className="font-bold text-white">{res}</span></div>
    </div>
  );
}
