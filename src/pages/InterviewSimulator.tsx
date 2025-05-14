
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import InterviewQuestion from '@/components/InterviewQuestion';
import AnswerRecorder from '@/components/AnswerRecorder';
import FeedbackDisplay from '@/components/FeedbackDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { interviewQuestions } from '@/data/interviewQuestions';
import { ArrowLeft, ArrowRight, RefreshCcw, ThumbsUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const InterviewSimulator = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [activeTab, setActiveTab] = useState<'question' | 'feedback'>('question');
  const [audioUrl, setAudioUrl] = useState<string | undefined>();
  const [mockFeedback, setMockFeedback] = useState<any | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find current question
  const currentQuestion = interviewQuestions.find(
    (q) => q.id === currentQuestionId
  ) || interviewQuestions[0];
  
  // Go to next or previous question
  const goToQuestion = (direction: 'next' | 'prev') => {
    const currentIndex = interviewQuestions.findIndex(q => q.id === currentQuestionId);
    if (direction === 'next' && currentIndex < interviewQuestions.length - 1) {
      setCurrentQuestionId(interviewQuestions[currentIndex + 1].id);
      setActiveTab('question');
      setAudioUrl(undefined);
      setMockFeedback(null);
    } else if (direction === 'prev' && currentIndex > 0) {
      setCurrentQuestionId(interviewQuestions[currentIndex - 1].id);
      setActiveTab('question');
      setAudioUrl(undefined);
      setMockFeedback(null);
    }
  };
  
  // Handle when recording is completed
  const handleRecordingComplete = (audioBlob: Blob) => {
    // Create URL for the audio
    const url = URL.createObjectURL(audioBlob);
    setAudioUrl(url);
    
    // Show loading toast
    toast({
      title: "Antwort wird analysiert",
      description: "Bitte warten Sie einen Moment...",
    });
    
    // Simulate analysis time (would be replaced with actual API call)
    setTimeout(() => {
      // Generate mock feedback - in a real app this would come from an API
      const generatedFeedback = generateMockFeedback();
      setMockFeedback(generatedFeedback);
      setActiveTab('feedback');
      
      toast({
        title: "Analyse abgeschlossen",
        description: "Ihr Feedback ist bereit.",
        variant: "default",
      });
    }, 2500);
  };
  
  // Generate mock feedback
  const generateMockFeedback = () => {
    // This would be replaced with actual AI analysis in a production app
    return {
      confidence: Math.floor(Math.random() * 40) + 60, // 60-100
      clarity: Math.floor(Math.random() * 40) + 60,
      conciseness: Math.floor(Math.random() * 40) + 60,
      relevance: Math.floor(Math.random() * 40) + 60,
      overallScore: Math.floor(Math.random() * 30) + 70, // 70-100
      insights: [
        "Sie haben klare und strukturierte Antworten gegeben",
        "Ihre Beispiele waren relevant und überzeugend",
        "Sie haben ein gutes Gleichgewicht zwischen Detail und Kürze gefunden",
        "Ihr Selbstvertrauen kam in Ihrem Tonfall zum Ausdruck"
      ],
      improvements: [
        "Versuchen Sie, weniger Füllwörter wie 'äh' und 'um' zu verwenden",
        "Achten Sie auf eine ruhigere Atmung während der Antwort",
        "Sprechen Sie etwas langsamer für mehr Klarheit",
        "Verknüpfen Sie Ihre Erfahrungen direkter mit der Stelle"
      ]
    };
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Header />
      
      <main className="flex-1 container px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Interview Simulator</h1>
              <p className="text-muted-foreground">
                Üben Sie Ihre Antworten auf typische Interviewfragen und erhalten Sie Feedback.
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="self-start"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zur Startseite
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>
                Frage {currentQuestionId} von {interviewQuestions.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InterviewQuestion
                question={currentQuestion}
                isActive={true}
                onTimeUp={() => {
                  toast({
                    title: "Zeit abgelaufen",
                    description: "Die empfohlene Zeit für diese Frage ist vorbei.",
                    variant: "default",
                  });
                }}
              />
              
              <div className="mt-8">
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="question">Antworten</TabsTrigger>
                    <TabsTrigger 
                      value="feedback"
                      disabled={!mockFeedback}
                    >
                      Feedback
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="question" className="mt-6">
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Nehmen Sie Ihre Antwort auf die obige Frage auf. 
                        Sprechen Sie klar und deutlich und versuchen Sie, 
                        Ihre Antwort innerhalb der empfohlenen Zeit zu halten.
                      </p>
                      <AnswerRecorder onRecordingComplete={handleRecordingComplete} />
                    </div>
                  </TabsContent>
                  <TabsContent value="feedback" className="mt-6">
                    {mockFeedback ? (
                      <FeedbackDisplay 
                        audioUrl={audioUrl} 
                        feedback={mockFeedback} 
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <p className="text-muted-foreground mb-4">
                          Beantworten Sie zuerst die Frage, um Feedback zu erhalten.
                        </p>
                        <Button onClick={() => setActiveTab('question')}>
                          Zurück zum Antworten
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={() => goToQuestion('prev')}
              disabled={currentQuestionId === interviewQuestions[0].id}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Vorherige Frage
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setAudioUrl(undefined);
                  setMockFeedback(null);
                  setActiveTab('question');
                  
                  toast({
                    title: "Frage zurückgesetzt",
                    description: "Sie können diese Frage erneut beantworten.",
                  });
                }}
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Diese Frage wiederholen
              </Button>
              
              <Button
                variant="default"
                className="bg-brand-blue hover:bg-brand-blue/90"
                onClick={() => goToQuestion('next')}
                disabled={currentQuestionId === interviewQuestions[interviewQuestions.length - 1].id}
              >
                Nächste Frage
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Card className="bg-brand-blue text-white mt-12">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <ThumbsUp className="h-10 w-10 text-white bg-blue-700 p-2 rounded-lg" />
                <div>
                  <h3 className="text-lg font-bold text-white">Expertentipp</h3>
                  <p className="text-blue-100">
                    Denken Sie daran, Ihre Antworten mit konkreten Beispielen aus Ihrer Erfahrung 
                    zu untermauern. Dies macht Ihre Aussagen glaubwürdiger und einprägsamer für 
                    den Interviewer.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="bg-gray-50 border-t py-6">
        <div className="container px-4 md:px-6 text-center text-sm text-gray-500">
        </div>
      </footer>
    </div>
  );
};

export default InterviewSimulator;
