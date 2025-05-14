
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Timer } from 'lucide-react';
import { Question } from '@/data/interviewQuestions';

interface InterviewQuestionProps {
  question: Question;
  isActive: boolean;
  onTimeUp?: () => void;
}

const InterviewQuestion = ({ question, isActive, onTimeUp }: InterviewQuestionProps) => {
  const [timeLeft, setTimeLeft] = useState(question.expectedDuration);
  
  // Start timer when question becomes active
  useEffect(() => {
    if (!isActive) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1 && onTimeUp) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isActive, onTimeUp]);
  
  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Category color mapping
  const categoryColor = {
    personal: 'bg-blue-100 text-blue-800',
    technical: 'bg-purple-100 text-purple-800',
    behavioral: 'bg-green-100 text-green-800',
    situational: 'bg-orange-100 text-orange-800',
  };
  
  // Difficulty color mapping
  const difficultyColor = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  };
  
  return (
    <Card className={`w-full transition-shadow ${isActive ? 'shadow-lg ring-1 ring-brand-blue' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="space-x-2">
            <Badge className={categoryColor[question.category]}>
              {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
            </Badge>
            <Badge className={difficultyColor[question.difficulty]}>
              {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
            </Badge>
          </div>
          
          {isActive && (
            <div className="flex items-center gap-1 text-sm font-medium">
              <Timer className="w-4 h-4" />
              <span 
                className={`${timeLeft < 10 ? 'text-red-500 animate-pulse' : ''}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          )}
        </div>
        <CardTitle className="text-xl">{question.question}</CardTitle>
        <CardDescription>
          Empfohlene Antwortzeit: {formatTime(question.expectedDuration)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isActive && (
          <p className="text-muted-foreground italic">
            Beachten Sie Ihre Körpersprache und versuchen Sie, klar und selbstbewusst zu antworten.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default InterviewQuestion;
