import { Link, useLocation } from "react-router-dom";
import { Home, FileText } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-card rounded-lg flex items-center justify-center shadow-button group-hover:shadow-button-hover transition-shadow">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">
              DocuTools<span className="text-primary"> Pro</span>
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            {!isHomePage && (
              <Link 
                to="/" 
                className="flex items-center gap-2 text-muted-foreground font-medium hover:text-primary transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            )}
            <Link 
              to="/features" 
              className="hidden md:block text-muted-foreground font-medium hover:text-primary transition-colors"
            >
              Features
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
