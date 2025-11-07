import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between gap-4 py-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">
            EvoRing
          </h1>
          <p className="text-xs md:text-sm text-slate-500">A shared-deck card battler</p>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-2 text-slate-500">
        <span className="text-xs">Prototype</span>
        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>
    </header>
  );
}
