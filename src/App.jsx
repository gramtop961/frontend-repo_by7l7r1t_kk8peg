import { useMemo, useState } from "react";
import Header from "./components/Header";
import DeckRing from "./components/DeckRing";
import TurnPanel from "./components/TurnPanel";
import Hand from "./components/Hand";

// Lightweight local prototype of EvoRing: a shared-deck card game with 4 decks.
// This is a front-end only prototype to visualize core interactions: draw, hand, turn flow.

const starterDecks = [
  { name: "Genesis", count: 12, type: "evolve" },
  { name: "Flux", count: 12, type: "tactic" },
  { name: "Relic", count: 12, type: "relic" },
  { name: "Wilds", count: 12, type: "beast" },
];

function generateCard(fromDeck) {
  const baseTitle = {
    evolve: ["Gene Spark", "Adapt Pulse", "Morph Strand"],
    tactic: ["Phase Shift", "Tempo Knot", "Echo Step"],
    relic: ["Ancient Coil", "Crystal Loom", "Lingering Sigil"],
    beast: ["Talonstrike", "Pack Howl", "Burrow Dash"],
  }[fromDeck.type] || ["Unknown Protocol"]; 

  const title = baseTitle[Math.floor(Math.random() * baseTitle.length)];
  const power = Math.floor(1 + Math.random() * 9);
  return { title, power, type: fromDeck.type };
}

export default function App() {
  const [players] = useState(["Player 1", "Player 2"]);
  const [turnIndex, setTurnIndex] = useState(0);
  const [decks, setDecks] = useState(starterDecks);
  const [hands, setHands] = useState({ 0: [], 1: [] });
  const currentPlayer = useMemo(() => players[turnIndex % players.length], [players, turnIndex]);

  const drawFromDeck = (idx) => {
    setDecks((prev) => {
      if (!prev[idx] || prev[idx].count <= 0) return prev;
      const next = [...prev];
      next[idx] = { ...next[idx], count: next[idx].count - 1 };
      return next;
    });

    setHands((prev) => {
      const card = generateCard(decks[idx]);
      const owner = turnIndex % players.length;
      const updated = { ...prev, [owner]: [...prev[owner], card] };
      return updated;
    });
  };

  const playCard = (card) => {
    const owner = turnIndex % players.length;
    setHands((prev) => ({
      ...prev,
      [owner]: prev[owner].filter((c, i) => i !== prev[owner].indexOf(card)),
    }));
  };

  const endTurn = () => setTurnIndex((i) => i + 1);
  const reset = () => {
    setTurnIndex(0);
    setDecks(starterDecks);
    setHands({ 0: [], 1: [] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-slate-50 to-cyan-50 text-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-3">
            <DeckRing decks={decks} onDraw={drawFromDeck} />
          </div>
          <div className="lg:col-span-2">
            <TurnPanel player={currentPlayer} onEndTurn={endTurn} onReset={reset} />
            <div className="mt-4 p-4 rounded-2xl bg-white/70 backdrop-blur border border-slate-100 shadow-sm">
              <div className="text-xs uppercase tracking-widest text-slate-400 mb-2">{currentPlayer}'s Hand</div>
              <Hand cards={hands[turnIndex % players.length]} onPlay={playCard} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
              <div className="p-3 rounded-xl bg-white/70 border border-slate-100">
                Total Cards Drawn: {hands[0].length + hands[1].length}
              </div>
              <div className="p-3 rounded-xl bg-white/70 border border-slate-100">
                Decks Remaining: {decks.reduce((a, d) => a + d.count, 0)}
              </div>
            </div>
          </div>
        </div>

        <footer className="py-10 text-center text-xs text-slate-500">
          Prototype rules: Tap a deck segment to draw. End turn to switch players. This is a visual mock for EvoRing's shared-deck concept.
        </footer>
      </div>
    </div>
  );
}
