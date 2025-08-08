import { GoogleGenAI, Type } from "@google/genai";
import { SquareValue } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAiMove = async (board: SquareValue[]): Promise<number> => {
  const prompt = `
    You are an expert Tic-Tac-Toe player. You are playing as 'O'. The user is 'X'.
    The board is a 9-element array. Indices 0-8 map to the board positions like this:
    0 | 1 | 2
    -----------
    3 | 4 | 5
    -----------
    6 | 7 | 8
    
    The current board state is: ${JSON.stringify(board)}.
    'null' represents an empty square.
    
    It is your turn. Your goal is to win, or if you cannot win, block the opponent or draw.
    Analyze the board and determine the best possible move. Your response must be a JSON object with a single key 'move', which is a number from 0 to 8 representing the index of your chosen square. Only choose an empty square.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            move: {
              type: Type.INTEGER,
              description: "The index (0-8) of the best move for 'O'."
            },
          },
          required: ["move"]
        },
        // Disable thinking for low-latency response
        thinkingConfig: { thinkingBudget: 0 }
      },
    });

    const responseText = response.text.trim();
    const result = JSON.parse(responseText);
    
    if (typeof result.move === 'number' && result.move >= 0 && result.move <= 8) {
      return result.move;
    } else {
      throw new Error("Invalid move received from AI.");
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    // Fallback strategy: return a random available move
    const availableMoves = board
      .map((square, index) => (square === null ? index : null))
      .filter((index): index is number => index !== null);
      
    if (availableMoves.length > 0) {
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
    // This should theoretically not be reached in a valid game state
    return -1;
  }
};