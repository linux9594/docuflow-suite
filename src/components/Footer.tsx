import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-gradient-card rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground tracking-tight">
                DocuTools<span className="text-primary"> Pro</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Professional document processing tools that work entirely in your browser. 
              Fast, secure, and completely private—your files never leave your device.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/pdf-compressor" className="text-muted-foreground hover:text-primary transition-colors">
                  PDF Compressor
                </Link>
              </li>
              <li>
                <Link to="/merge-pdf" className="text-muted-foreground hover:text-primary transition-colors">
                  Merge PDF
                </Link>
              </li>
              <li>
                <Link to="/split-pdf" className="text-muted-foreground hover:text-primary transition-colors">
                  Split PDF
                </Link>
              </li>
              <li>
                <Link to="/image-compressor" className="text-muted-foreground hover:text-primary transition-colors">
                  Image Compressor
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-6">
          <p className="text-muted-foreground text-sm text-center">
            © 2026 DocuTools Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
