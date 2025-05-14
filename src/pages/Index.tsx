
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { ArrowRight, Award, BarChart3, BookOpen, CheckCircle2, MessageSquare, Video } from 'lucide-react';

const features = [
  {
    title: 'KI-gestützte Interviews',
    description: 'Üben Sie mit realistischen Interviewfragen aus verschiedenen Kategorien.',
    icon: <MessageSquare className="h-10 w-10 text-brand-blue p-2 bg-blue-100 rounded-lg" />,
  },
  {
    title: 'Detaillierte Analyse',
    description: 'Erhalten Sie Feedback zu Ihrer Klarheit, Relevanz und Überzeugungskraft.',
    icon: <BarChart3 className="h-10 w-10 text-brand-blue p-2 bg-blue-100 rounded-lg" />,
  },
  {
    title: 'Video-Feedback',
    description: 'Verbessern Sie Ihre Körpersprache und Ihren Präsentationsstil.',
    icon: <Video className="h-10 w-10 text-brand-blue p-2 bg-blue-100 rounded-lg" />,
  },
  {
    title: 'Expertenratschläge',
    description: 'Lernen Sie bewährte Techniken für erfolgreiche Interviews.',
    icon: <Award className="h-10 w-10 text-brand-blue p-2 bg-blue-100 rounded-lg" />,
  },
  {
    title: 'Umfangreiche Fragenbibliothek',
    description: 'Bereiten Sie sich auf alle Arten von Interviewfragen vor.',
    icon: <BookOpen className="h-10 w-10 text-brand-blue p-2 bg-blue-100 rounded-lg" />,
  },
  {
    title: 'Verfolgen Sie Ihren Fortschritt',
    description: 'Beobachten Sie Ihre Verbesserung im Laufe der Zeit.',
    icon: <CheckCircle2 className="h-10 w-10 text-brand-blue p-2 bg-blue-100 rounded-lg" />,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-white to-brand-gray py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Meistern Sie Ihre Vorstellungsgespräche mit <span className="text-brand-blue">KI-Training</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Trainieren und verbessern Sie Ihre Interviewfähigkeiten mit personalisierten Übungen und detaillierter Analyse Ihrer Antworten und Körpersprache.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-brand-blue hover:bg-brand-blue/90">
                  <Link to="/interview-simulator">
                    Jetzt Training starten
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Alles, was Sie für Ihre Vorbereitung brauchen
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-gray-500">
                Unsere innovativen Tools helfen Ihnen, selbstbewusst und gut vorbereitet in Ihr nächstes Vorstellungsgespräch zu gehen.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-brand-gray p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-brand-blue">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-6">
              Bereit, Ihren nächsten Vorstellungsgespräch zu gewinnen?
            </h2>
            <p className="mx-auto max-w-[700px] text-blue-100 mb-8">
              Beginnen Sie noch heute mit dem Training und erhöhen Sie Ihre Chancen auf Erfolg.
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white text-brand-blue hover:bg-gray-100">
              <Link to="/interview-simulator">
                Kostenlos ausprobieren
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-50 border-t py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="font-bold text-xl text-brand-blue">BewerberAI</span>
            </div>
            <div className="flex gap-4">
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
