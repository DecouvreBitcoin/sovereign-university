// @generated
// This file is automatically generated from our schemas by the command `pnpm types:generate`. Do not modify manually.

export interface QuizQuestion {
  id: string;
  chapterId: string;
  difficulty: string;
  author: string | null;
  duration: number | null;
  lastUpdated: Date;
  lastCommit: string;
  lastSync: Date;
}

export interface QuizQuestionLocalized {
  quizQuestionId: string;
  language: string;
  question: string;
  answer: string;
  wrongAnswers: string[];
  explanation: string | null;
}

export interface JoinedQuizQuestion {
  id: string;
  chapterId: string;
  difficulty: string;
  author: string | null;
  duration: number | null;
  lastUpdated: Date;
  lastCommit: string;
  lastSync: Date;
  language: string;
  question: string;
  answer: string;
  wrongAnswers: string[];
  explanation: string | null;
  tags: string[];
}
