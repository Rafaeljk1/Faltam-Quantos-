
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { UserStats, AppSettings } from './types.ts';
import { soundManager } from './services/SoundManager.ts';

// Pages
import Splash from './pages/Splash.tsx';
import Home from './pages/Home.tsx';
import Menu from './pages/Menu.tsx';
import Leaderboard from './pages/Leaderboard.tsx';

// Jogos Clássicos
import ClickerGame from './pages/games/ClickerGame.tsx';
import ReactionGame from './pages/games/ReactionGame.tsx';
import DodgeGame from './pages/games/DodgeGame.tsx';
import MemoryGame from './pages/games/MemoryGame.tsx';

// Novos Jogos
import CorridaGalo from './pages/games/CorridaGalo.tsx';
import PuloSapo from './pages/games/PuloSapo.tsx';
import QuebraBlocos from './pages/games/QuebraBlocos.tsx';
import TiroAlvo from './pages/games/TiroAlvo.tsx';
import LabirintoMaluco from './pages/games/LabirintoMaluco.tsx';
import PintorVeloz from './pages/games/PintorVeloz.tsx';
import CampeaoTap from './pages/games/CampeaoTap.tsx';
import CacaMoedas from './pages/games/CacaMoedas.tsx';
import EscudoNinja from './pages/games/EscudoNinja.tsx';
import BolaLouca from './pages/games/BolaLouca.tsx';

const App: React.FC = () => {
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('minigames_stats_v2');
    return saved ? JSON.parse(saved) : { coins: 0, highScores: {}, achievements: [] };
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('minigames_settings_v2');
    return saved ? JSON.parse(saved) : { soundEnabled: true, darkMode: false };
  });

  useEffect(() => {
    localStorage.setItem('minigames_stats_v2', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('minigames_settings_v2', JSON.stringify(settings));
    soundManager.setEnabled(settings.soundEnabled);
    if (settings.darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [settings]);

  const addCoins = useCallback((amount: number) => {
    setStats(prev => ({ ...prev, coins: Math.max(0, prev.coins + amount) }));
    if (amount > 0) soundManager.playSuccess();
  }, []);

  const updateHighScore = useCallback((gameId: string, score: number) => {
    setStats(prev => {
      const currentHigh = prev.highScores[gameId];
      const isSmallerBetter = ['reaction', 'memory', 'labirinto'].includes(gameId);
      const shouldUpdate = currentHigh === undefined || (isSmallerBetter ? score < currentHigh : score > currentHigh);
      if (shouldUpdate) return { ...prev, highScores: { ...prev.highScores, [gameId]: score } };
      return prev;
    });
  }, []);

  return (
    <div className={`h-screen w-full flex flex-col overflow-hidden transition-colors duration-300 ${settings.darkMode ? 'dark bg-gray-950' : 'bg-gray-50'}`}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu stats={stats} settings={settings} onToggleSound={() => setSettings(s => ({...s, soundEnabled: !s.soundEnabled}))} onToggleTheme={() => setSettings(s => ({...s, darkMode: !s.darkMode}))} />} />
          <Route path="/leaderboard" element={<Leaderboard stats={stats} />} />
          
          <Route path="/game/clicker" element={<ClickerGame addCoins={addCoins} coins={stats.coins} />} />
          <Route path="/game/reaction" element={<ReactionGame addCoins={addCoins} updateHighScore={updateHighScore} />} />
          <Route path="/game/dodge" element={<DodgeGame addCoins={addCoins} updateHighScore={updateHighScore} />} />
          <Route path="/game/memory" element={<MemoryGame addCoins={addCoins} updateHighScore={updateHighScore} />} />
          <Route path="/game/corrida-galo" element={<CorridaGalo addCoins={addCoins} updateHighScore={updateHighScore} />} />
          <Route path="/game/pulo-sapo" element={<PuloSapo addCoins={addCoins} updateHighScore={updateHighScore} />} />
          <Route path="/game/quebra-blocos" element={<QuebraBlocos addCoins={addCoins} updateHighScore={updateHighScore} />} />
          <Route path="/game/tiro-alvo" element={<TiroAlvo addCoins={addCoins} updateHighScore={updateHighScore} />} />
          <Route path="/game/labirinto" element={<LabirintoMaluco addCoins={addCoins} updateHighScore={updateHighScore} />} />
          <Route path="/game/pintor" element={<PintorVeloz addCoins={addCoins} updateHighScore={updateHighScore} />} />
          <Route path="/game/tap" element={<CampeaoTap addCoins={addCoins} updateHighScore={updateHighScore} />} />
          <Route path="/game/caca-moedas" element={<CacaMoedas addCoins={addCoins} updateHighScore={updateHighScore} />} />
          <Route path="/game/ninja" element={<EscudoNinja addCoins={addCoins} updateHighScore={updateHighScore} />} />
          <Route path="/game/bola" element={<BolaLouca addCoins={addCoins} updateHighScore={updateHighScore} />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
