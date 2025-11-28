import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-card shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-3xl font-black text-foreground tracking-tight">
            <span className="text-primary mr-0.5">V.K</span> Tools
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-muted-foreground font-medium hover:text-primary transition-colors">
              Solutions
            </a>
            <a href="#" className="text-muted-foreground font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#" className="text-muted-foreground font-medium hover:text-primary transition-colors">
              Contact
            </a>
            <a 
              href="#" 
              className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:bg-primary-dark hover:-translate-y-0.5 shadow-button hover:shadow-button-hover"
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
