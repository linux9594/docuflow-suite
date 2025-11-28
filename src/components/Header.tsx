import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="bg-card shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-3xl font-black text-foreground tracking-tight hover:text-primary transition-colors">
            <span className="text-primary mr-0.5">V.K</span> Tools
          </Link>
          <nav className="flex items-center gap-4 md:gap-8">
            {!isHomePage && (
              <Link 
                to="/" 
                className="flex items-center gap-2 text-muted-foreground font-medium hover:text-primary transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            )}
            <a href="#" className="hidden md:block text-muted-foreground font-medium hover:text-primary transition-colors">
              Solutions
            </a>
            <a href="#" className="hidden md:block text-muted-foreground font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#" className="hidden md:block text-muted-foreground font-medium hover:text-primary transition-colors">
              Contact
            </a>
            <a 
              href="#" 
              className="bg-primary text-primary-foreground px-4 md:px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-primary-dark hover:-translate-y-0.5 shadow-button hover:shadow-button-hover"
            >
              Sign Up
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
