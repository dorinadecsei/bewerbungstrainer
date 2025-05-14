
export interface Question {
  id: number;
  question: string;
  category: 'personal' | 'technical' | 'behavioral' | 'situational';
  difficulty: 'easy' | 'medium' | 'hard';
  expectedDuration: number; // in seconds
}

export const interviewQuestions: Question[] = [
  {
    id: 1,
    question: 'Erzählen Sie mir etwas über sich selbst.',
    category: 'personal',
    difficulty: 'easy',
    expectedDuration: 60,
  },
  {
    id: 2,
    question: 'Was sind Ihre größten Stärken?',
    category: 'personal',
    difficulty: 'easy',
    expectedDuration: 45,
  },
  {
    id: 3,
    question: 'Beschreiben Sie eine berufliche Herausforderung und wie Sie diese gemeistert haben.',
    category: 'behavioral',
    difficulty: 'medium',
    expectedDuration: 90,
  },
  {
    id: 4,
    question: 'Wo sehen Sie sich in fünf Jahren?',
    category: 'personal',
    difficulty: 'medium',
    expectedDuration: 60,
  },
  {
    id: 5,
    question: 'Beschreiben Sie eine Situation, in der Sie unter Druck gearbeitet haben.',
    category: 'situational',
    difficulty: 'medium',
    expectedDuration: 75,
  },
  {
    id: 6,
    question: 'Warum möchten Sie für unser Unternehmen arbeiten?',
    category: 'personal',
    difficulty: 'medium',
    expectedDuration: 60,
  },
  {
    id: 7,
    question: 'Wie gehen Sie mit Kritik um?',
    category: 'behavioral',
    difficulty: 'medium',
    expectedDuration: 60,
  },
  {
    id: 8,
    question: 'Beschreiben Sie ein Projekt, an dem Sie gearbeitet haben und auf das Sie besonders stolz sind.',
    category: 'behavioral',
    difficulty: 'hard',
    expectedDuration: 90,
  },
  {
    id: 9,
    question: 'Wie würden Ihre Kollegen Sie beschreiben?',
    category: 'personal',
    difficulty: 'easy',
    expectedDuration: 45,
  },
  {
    id: 10,
    question: 'Welche Fragen haben Sie an uns?',
    category: 'personal',
    difficulty: 'easy',
    expectedDuration: 60,
  }
];
