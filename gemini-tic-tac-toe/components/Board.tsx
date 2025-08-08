import React from 'react';
import { SquareValue } from '../types';
import { Square } from './Square';

interface BoardProps {
  squares: SquareValue[];
  onClick: (i: number) => void;
  winningLine: number[] | null;
  isAiThinking: boolean;
}

export const Board: React.FC<BoardProps> = ({ squares, onClick, winningLine, isAiThinking }) => {
  return (
    <div className={`grid grid-cols-3 gap-2 md:gap-3 p-2 md:p-3 bg-gray-800 rounded-xl shadow-lg border border-gray-700 ${isAiThinking ? 'cursor-wait' : ''}`}>
      {squares.map((value, i) => (
        <Square
          key={i}
          value={value}
          onClick={() => onClick(i)}
          isWinner={winningLine ? winningLine.includes(i) : false}
        />
      ))}
    </div>
  );
};