import React from 'react';
import { Player, SquareValue } from '../types';
import { XIcon, OIcon } from './Icons';

interface ScoreboardProps {
  players: [Player, Player];
  isXNext: boolean;
  winner: SquareValue | 'draw' | null;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ players, isXNext, winner }) => {
  const [player1, player2] = players;
  const isPlayer1Active = isXNext && !winner;
  const isPlayer2Active = !isXNext && !winner;

  return (
    <div className="flex justify-center items-center gap-4 md:gap-8 my-6 p-4 bg-white/60 rounded-xl border border-gray-300/80 shadow-md">
      <div className={`text-center p-3 rounded-lg transition-all duration-300 ${isPlayer1Active ? 'bg-red-500/10 scale-105' : 'opacity-70'}`}>
        <div className="flex items-center justify-center gap-2">
          <XIcon className="w-6 h-6 text-red-600" />
          <p className="text-lg font-semibold text-slate-800 truncate max-w-28">{player1.name}</p>
        </div>
        <p className="text-3xl font-bold text-slate-900">{player1.score}</p>
      </div>
      
      <div className="text-4xl font-extrabold text-gray-400">-</div>

      <div className={`text-center p-3 rounded-lg transition-all duration-300 ${isPlayer2Active ? 'bg-gray-500/20 scale-105' : 'opacity-70'}`}>
        <div className="flex items-center justify-center gap-2">
          <OIcon className="w-6 h-6 text-gray-800" />
          <p className="text-lg font-semibold text-slate-800 truncate max-w-28">{player2.name}</p>
        </div>
        <p className="text-3xl font-bold text-slate-900">{player2.score}</p>
      </div>
    </div>
  );
};