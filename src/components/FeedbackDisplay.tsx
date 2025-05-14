
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ThumbsUp, AlertTriangle, Smile, Meh, Frown, Clock } from 'lucide-react';

interface FeedbackItem {
  category: string;
  score: number;
  insights: string[];
  icon: React.ReactNode;
}

interface FeedbackDisplayProps {
  audioUrl?: string;
  feedback: {
    confidence: number;
    clarity: number;
    conciseness: number;
    relevance: number;
    overallScore: number;
    insights: string[];
    improvements: string[];
  };
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ audioUrl, feedback }) => {
  const getMoodIcon = (score: number) => {
    if (score >= 80) return <Smile className="h-5 w-5 text-green-500" />;
    if (score >= 50) return <Meh className="h-5 w-5 text-amber-500" />;
    return <Frown className="h-5 w-5 text-red-500" />;
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-700 bg-green-100';
    if (score >= 50) return 'text-amber-700 bg-amber-100';
    return 'text-red-700 bg-red-100';
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };
  
  const feedbackItems: FeedbackItem[] = [
    {
      category: 'Selbstvertrauen',
      score: feedback.confidence,
      insights: ['Ihr Tonfall war überzeugend', 'Sie haben klare Aussagen getroffen'],
      icon: <ThumbsUp className="h-5 w-5 text-brand-blue" />
    },
    {
      category: 'Klarheit',
      score: feedback.clarity,
      insights: ['Sie haben Ihre Gedanken strukturiert dargestellt', 'Verständliche Erklärungen'],
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />
    },
    {
      category: 'Prägnanz',
      score: feedback.conciseness,
      insights: ['Sie haben sich auf das Wesentliche konzentriert', 'Keine unnötigen Abschweifungen'],
      icon: <Clock className="h-5 w-5 text-brand-green" />
    },
    {
      category: 'Relevanz',
      score: feedback.relevance,
      insights: ['Ihre Antwort bezog sich direkt auf die Frage', 'Passende Beispiele verwendet'],
      icon: <ThumbsUp className="h-5 w-5 text-brand-blue" />
    }
  ];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getMoodIcon(feedback.overallScore)}
            Gesamtbewertung
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-3xl font-bold">{feedback.overallScore}%</div>
            <Progress 
              value={feedback.overallScore} 
              className={`h-3 ${getProgressColor(feedback.overallScore)}`} 
            />
          </div>
          
          {audioUrl && (
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Ihre aufgezeichnete Antwort:</p>
              <audio controls className="w-full">
                <source src={audioUrl} type="audio/webm" />
                Ihr Browser unterstützt keine Audiowiedergabe.
              </audio>
            </div>
          )}
          
          <div className="space-y-2">
            <h3 className="font-semibold">Wichtigste Erkenntnisse:</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {feedback.insights.map((insight, index) => (
                <li key={index}>{insight}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {feedbackItems.map((item) => (
          <Card key={item.category}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                {item.icon}
                {item.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-sm font-medium px-2 py-0.5 rounded ${getScoreColor(item.score)}`}>
                  {item.score}%
                </span>
                <Progress 
                  value={item.score} 
                  className={`h-2 ${getProgressColor(item.score)}`} 
                />
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                {item.insights.map((insight, index) => (
                  <li key={index}>• {insight}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ThumbsUp className="h-5 w-5 text-brand-green" />
            Verbesserungsvorschläge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {feedback.improvements.map((improvement, index) => (
              <li key={index}>{improvement}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackDisplay;
