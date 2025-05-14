
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import FeedbackDisplay from '@/components/FeedbackDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AnalysisResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Check if we have feedback data from location state
  const feedback = location.state?.feedback;
  const audioUrl = location.state?.audioUrl;
  const questionText = location.state?.questionText;
  
  // Redirect if no data
  useEffect(() => {
    if (!feedback) {
      navigate('/interview-simulator');
      toast({
        title: "Keine Analysedaten",
        description: "Bitte absolvieren Sie zuerst ein Interview.",
        variant: "destructive",
      });
    }
  }, [feedback, navigate, toast]);
  
  if (!feedback) {
    return null; // Will redirect via useEffect
  }
  
  const handleDownloadReport = () => {
    // In a real application, this would generate a PDF report
    toast({
      title: "Bericht wird heruntergeladen",
      description: "Ihr Analysebericht wird vorbereitet...",
    });
    
    setTimeout(() => {
      toast({
        title: "Download abgeschlossen",
        description: "Ihr Bericht wurde erfolgreich heruntergeladen.",
        variant: "default",
      });
    }, 2000);
  };
  
  const handleShare = () => {
    // In a real application, this might open a share dialog
    toast({
      title: "Teilen",
      description: "Link zur Analyse wurde in die Zwischenablage kopiert.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Header />
      
      <main className="flex-1 container px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Interview Analyse</h1>
              <p className="text-muted-foreground">
                Detaillierte Auswertung Ihrer Antwort.
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/interview-simulator')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zum Simulator
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Analyseergebnisse</CardTitle>
              {questionText && (
                <CardDescription>
                  Frage: {questionText}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <FeedbackDisplay 
                audioUrl={audioUrl} 
                feedback={feedback} 
              />
              
              <div className="flex gap-4 mt-8 justify-end">
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Ergebnis teilen
                </Button>
                <Button 
                  variant="default"
                  className="bg-brand-blue hover:bg-brand-blue/90"
                  onClick={handleDownloadReport}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Bericht herunterladen
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Verbesserungsvorschläge</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  Basierend auf unserer Analyse hier sind einige konkrete Vorschläge, 
                  wie Sie Ihre Antwort verbessern können:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Struktur:</strong> Verwenden Sie das STAR-Format (Situation, Task, Action, Result) 
                    für verhaltensorientierte Fragen, um strukturierte Antworten zu geben.
                  </li>
                  <li>
                    <strong>Körpersprache:</strong> Achten Sie auf aufrechte Haltung und 
                    Augenkontakt, um Selbstvertrauen auszustrahlen.
                  </li>
                  <li>
                    <strong>Sprechtempo:</strong> Versuchen Sie, ein gleichmäßiges Tempo beizubehalten und 
                    wichtige Punkte durch kurze Pausen hervorzuheben.
                  </li>
                  <li>
                    <strong>Konkrete Beispiele:</strong> Untermauern Sie Ihre Antworten mit spezifischen 
                    Beispielen aus Ihrer Erfahrung.
                  </li>
                </ul>
                
                <Button 
                  onClick={() => navigate('/interview-simulator')} 
                  className="mt-4 bg-brand-blue hover:bg-brand-blue/90"
                >
                  Weiter üben
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="bg-gray-50 border-t py-6">
        <div className="container px-4 md:px-6 text-center text-sm text-gray-500">
          © 2025 BewerberAI. Alle Rechte vorbehalten.
        </div>
      </footer>
    </div>
  );
};

export default AnalysisResult;
