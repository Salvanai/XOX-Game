import React from 'react';
import { Player, SquareValue } from '../types';
import { XIcon, OIcon } from './Icons';

interface GameStatusProps {
  winner: SquareValue | null;
  isDraw: boolean;
  isXNext: boolean;
  players: [Player, Player];
  isAiThinking: boolean;
}

export const GameStatus: React.FC<GameStatusProps> = ({ winner, isDraw, isXNext, players, isAiThinking }) => {
  const getStatusMessage = () => {
    if (winner) {
      const winnerName = winner === 'X' ? players[0].name : players[1].name;
      const WinnerIcon = winner === 'X' ? XIcon : OIcon;
      const colorClass = winner === 'X' ? 'text-red-600' : 'text-gray-800';
      return (
        <span className="flex items-center justify-center gap-2">
          <WinnerIcon className={`w-7 h-7 ${colorClass}`} />
          <span className="font-bold">{winnerName}</span> wins!
        </span>
      );
    }
    if (isDraw) {
      return <span className="font-bold">It's a Draw!</span>;
    }
    if (isAiThinking) {
        return (
            <span className="flex items-center justify-center gap-2 animate-pulse-fast">
                <OIcon className="w-7 h-7 text-gray-800" />
                <span>{players[1].name} is thinking...</span>
            </span>
        );
    }
    const nextPlayerName = isXNext ? players[0].name : players[1].name;
    const NextPlayerIcon = isXNext ? XIcon : OIcon;
    const colorClass = isXNext ? 'text-red-600' : 'text-gray-800';
    return (
        <span className="flex items-center justify-center gap-2">
            <NextPlayerIcon className={`w-7 h-7 ${colorClass}`} />
            <span>{nextPlayerName}'s Turn</span>
        </span>
    );
  };

  return (
    <div className="text-center h-12 my-4 text-2xl text-gray-700 flex items-center justify-center transition-all duration-300">
      {getStatusMessage()}
    </div>
  );
};