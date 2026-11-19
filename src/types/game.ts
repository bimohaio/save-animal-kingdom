export type ChallengeType = "quiz" | "matching" | "sorting";

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizChallenge {
  type: "quiz";
  prompt: string;
  description: string;
  options: QuizOption[];
  answer: string;
  success: string;
  hint: string;
}

export interface MatchingChallenge {
  type: "matching";
  prompt: string;
  description: string;
  pairs: { left: string; right: string }[];
  success: string;
  hint: string;
}

export interface SortingChallenge {
  type: "sorting";
  prompt: string;
  description: string;
  items: { id: string; label: string; category: "recycle" | "reduce" }[];
  success: string;
  hint: string;
}

export type Challenge = QuizChallenge | MatchingChallenge | SortingChallenge;

export interface Level {
  id: number;
  name: string;
  subtitle: string;
  emoji: string;
  theme: string;
  location: string;
  animal: string;
  animalName: string;
  crystal: string;
  description: string;
  challenge: Challenge;
}