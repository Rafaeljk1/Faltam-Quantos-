
export type GameDifficulty = 'Fácil' | 'Médio' | 'Difícil';

export interface GameInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: GameDifficulty;
  path: string;
  color: string;
  category: 'Ação' | 'Raciocínio' | 'Esporte' | 'Clássico';
}

export interface UserStats {
  coins: number;
  highScores: Record<string, number>;
  achievements: string[];
}

export interface AppSettings {
  soundEnabled: boolean;
  darkMode: boolean;
}
