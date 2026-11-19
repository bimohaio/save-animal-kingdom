import { useEffect, useState } from "react";

const STORAGE_KEY = "save-animal-kingdom-progress-v1";

export interface SavedGame {
  completedLevels: number[];
  rescuedAnimals: string[];
  crystals: string[];
  score: number;
  lives: number;
  gameCompleted: boolean;
}

const initialState: SavedGame = {
  completedLevels: [],
  rescuedAnimals: [],
  crystals: [],
  score: 0,
  lives: 3,
  gameCompleted: false,
};

function loadProgress(): SavedGame {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...initialState, ...JSON.parse(raw) } : initialState;
  } catch {
    return initialState;
  }
}

export function useGameState() {
  const [game, setGame] = useState<SavedGame>(loadProgress);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(game));
  }, [game]);

  const completeLevel = (levelId: number, animalName: string, crystal: string) => {
    setGame((current) => {
      if (current.completedLevels.includes(levelId)) return current;
      return {
        ...current,
        completedLevels: [...current.completedLevels, levelId],
        rescuedAnimals: [...current.rescuedAnimals, animalName],
        crystals: [...current.crystals, crystal],
        score: current.score + 100,
      };
    });
  };

  const loseLife = () => setGame((current) => ({ ...current, lives: Math.max(0, current.lives - 1) }));
  const addBonus = (points: number) => setGame((current) => ({ ...current, score: current.score + points }));
  const finishGame = () => setGame((current) => ({ ...current, gameCompleted: true, score: current.score + 250 }));
  const resetGame = () => {
    localStorage.removeItem(STORAGE_KEY);
    setGame(initialState);
  };

  return { game, completeLevel, loseLife, addBonus, finishGame, resetGame };
}