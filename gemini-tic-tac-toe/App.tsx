import React, { useState, useEffect, useCallback } from 'react';
import { GameMode, Player, SquareValue } from './types';
import { GameSetup } from './components/GameSetup';
import { Scoreboard } from './components/Scoreboard';
import { Board } from './components/Board';
import { GameStatus } from './components/GameStatus';
import { getAiMove } from './services/geminiService';
import { calculateWinner } from './utils/gameLogic';

const App: React.FC = () => {
  const [players, setPlayers] = useState<[Player, Player] | null>(null);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [board, setBoard] = useState<SquareValue[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  const winnerInfo = calculateWinner(board);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const isDraw = board.every(square => square !== null) && !winner;

  const handleGameStart = (mode: GameMode, player1Name: string, player2Name: string) => {
    setGameMode(mode);
    setPlayers([
      { name: player1Name, score: 0 },
      { name: player2Name, score: 0 }
    ]);
    resetRound();
  };

  const handleSquareClick = useCallback((index: number) => {
    if (winner || board[index] || (gameMode === GameMode.SINGLE_PLAYER && !isXNext) || isAiThinking) {
      return;
    }
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }, [isXNext, board, gameMode, isAiThinking, winner]);

  const resetRound = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };
  
  const startNewGame = () => {
      setPlayers(null);
      setGameMode(null);
      resetRound();
  };

  useEffect(() => {
    if (winner) {
      setPlayers(currentPlayers => {
        if (!currentPlayers) return null;
        const [player1, player2] = currentPlayers;
        if (winner === 'X') {
          const newPlayer1: Player = { ...player1, score: player1.score + 1 };
          return [newPlayer1, player2];
        } else if (winner === 'O') {
          const newPlayer2: Player = { ...player2, score: player2.score + 1 };
          return [player1, newPlayer2];
        }
        return currentPlayers;
      });
    }
  }, [winner]);

  const triggerAiMove = useCallback(async () => {
    if (gameMode === GameMode.SINGLE_PLAYER && !isXNext && !winner && !isDraw) {
      setIsAiThinking(true);
      try {
        const move = await getAiMove(board);
        if (board[move] === null) {
          handleSquareClick(move);
        } else {
            // Fallback: if AI returns an invalid move, pick the first available spot
            const fallbackMove = board.findIndex(sq => sq === null);
            if(fallbackMove !== -1) handleSquareClick(fallbackMove);
        }
      } catch (error) {
        console.error("Error getting AI move:", error);
        // Fallback in case of API error
        const fallbackMove = board.findIndex(sq => sq === null);
        if(fallbackMove !== -1) handleSquareClick(fallbackMove);
      } finally {
        setIsAiThinking(false);
      }
    }
  }, [gameMode, isXNext, winner, isDraw, board, handleSquareClick]);


  useEffect(() => {
    const timer = setTimeout(() => {
        triggerAiMove();
    }, 500); // Small delay to make AI feel more natural
    return () => clearTimeout(timer);
  }, [triggerAiMove]);


  if (!gameMode || !players) {
    return <GameSetup onGameStart={handleGameStart} />;
  }

  return (
    <div className="min-h-screen bg-gray-200 text-slate-900 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-2 text-red-600">
          Tic-Tac-Toe
        </h1>
        <Scoreboard players={players} isXNext={isXNext} winner={winner} />
        <GameStatus winner={winner} isDraw={isDraw} isXNext={isXNext} players={players} isAiThinking={isAiThinking} />
        <Board squares={board} onClick={handleSquareClick} winningLine={winnerInfo?.line} isAiThinking={isAiThinking}/>
        
        {(winner || isDraw) && (
            <div className="text-center mt-6 animate-scale-in">
                <button
                onClick={resetRound}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105"
                >
                Play Again
                </button>
            </div>
        )}
         <div className="text-center mt-4">
            <button
            onClick={startNewGame}
            className="text-gray-500 hover:text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
            >
            New Game
            </button>
        </div>
      </div>
    </div>
  );
};

export default App;