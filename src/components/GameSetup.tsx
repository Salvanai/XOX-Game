import React, { useState } from 'react';
import { GameMode } from '../types';

interface GameSetupProps {
  onGameStart: (mode: GameMode, player1Name: string, player2Name: string) => void;
}

export const GameSetup: React.FC<GameSetupProps> = ({ onGameStart }) => {
  const [mode, setMode] = useState<GameMode>(GameMode.SINGLE_PLAYER);
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Gemini AI');

  const handleModeChange = (newMode: GameMode) => {
    setMode(newMode);
    if (newMode === GameMode.SINGLE_PLAYER) {
      setPlayer2Name('Gemini AI');
    } else {
      setPlayer2Name('Player 2');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGameStart(mode, player1Name || 'Player 1', player2Name || (mode === GameMode.SINGLE_PLAYER ? 'Gemini AI' : 'Player 2'));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl space-y-8 border border-gray-300">
        <div>
          <h1 className="text-4xl font-bold text-center text-red-600">
            Game Setup
          </h1>
          <p className="mt-2 text-center text-gray-500">Choose your game mode and enter player names.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Game Mode</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleModeChange(GameMode.SINGLE_PLAYER)}
                className={`px-4 py-3 rounded-lg font-semibold transition ${
                  mode === GameMode.SINGLE_PLAYER ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Single Player
              </button>
              <button
                type="button"
                onClick={() => handleModeChange(GameMode.MULTIPLAYER)}
                className={`px-4 py-3 rounded-lg font-semibold transition ${
                  mode === GameMode.MULTIPLAYER ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Two Players
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="player1" className="block text-sm font-medium text-gray-700">Player 1 (X)</label>
              <input
                id="player1"
                type="text"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
                placeholder="Enter name for Player 1"
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label htmlFor="player2" className="block text-sm font-medium text-gray-700">Player 2 (O)</label>
              <input
                id="player2"
                type="text"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                placeholder={mode === GameMode.SINGLE_PLAYER ? 'AI Opponent' : 'Enter name for Player 2'}
                disabled={mode === GameMode.SINGLE_PLAYER}
                className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 disabled:opacity-50"
              />
            </div>
          </div>
          <div>
            <button type="submit" className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-white transition-transform transform hover:scale-105">
              Start Game
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};