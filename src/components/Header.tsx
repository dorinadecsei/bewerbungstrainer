
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Interview Simulator', path: '/interview-simulator' },
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-brand-blue">BewerberAI</span>
          </Link>
        </div>

        {isMobile ? (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            {isMobileMenuOpen && (
              <div className="absolute top-16 left-0 right-0 bg-white shadow-md z-50">
                <nav className="flex flex-col p-4">
                  {links.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`py-2 px-4 text-sm hover:bg-brand-gray rounded-md ${
                        location.pathname === link.path 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-foreground'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </>
        ) : (
          <nav className="flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-brand-blue ${
                  location.pathname === link.path ? 'text-brand-blue' : 'text-muted-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}

        <div className="hidden md:flex gap-2">
          <Button asChild variant="default">
            <Link to="/interview-simulator">Start Training</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
