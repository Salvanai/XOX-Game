import React from 'react';
import { SquareValue } from '../types';
import { XIcon, OIcon } from './Icons';

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  isWinner: boolean;
}

export const Square: React.FC<SquareProps> = ({ value, onClick, isWinner }) => {
  const icon =
    value === 'X' ? (
      <XIcon className="w-16 h-16 md:w-20 md:h-20 text-red-600 animate-scale-in" />
    ) : value === 'O' ? (
      <OIcon className="w-16 h-16 md:w-20 md:h-20 text-gray-800 animate-scale-in" />
    ) : null;

  return (
    <button
      onClick={onClick}
      className={`aspect-square w-full flex items-center justify-center rounded-lg transition-all duration-200 
      ${isWinner ? 'bg-red-200' : 'bg-white hover:bg-gray-200'}
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500`}
    >
      {icon}
    </button>
  );
};