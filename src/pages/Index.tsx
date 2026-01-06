import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import { SEOHead } from "@/components/SEOHead";
import { 
  Minimize2, 
  ArrowDown, 
  ArrowDownCircle, 
  Image, 
  FileImage, 
  ImageIcon,
  Combine,
  Scissors,
  FileText,
  FileDown,
  Shield,
  Zap,
  Lock
} from "lucide-react";

const Index = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "DocuTools Pro",
    "applicationCategory": "Utility",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Professional online document tools for PDF compression, image optimization, file conversion, and document management. 100% browser-based processing.",
    "operatingSystem": "Any",
    "url": "https://yourdomain.com"
  };

  const tools = [
    {
      title: "PDF Compressor",
      description: "Compress PDF for Aadhaar card upload, government forms, and job applications without losing quality.",
      icon: Minimize2,
      link: "/pdf-compressor",
      highlight: false,
    },
    {
      title: "Compress PDF to 200KB",
      description: "Reduce PDF size below 200KB for online applications, passport forms, and college admissions.",
      icon: ArrowDown,
      link: "/compress-pdf-200kb",
      highlight: true,
    },
    {
      title: "Compress PDF to 100KB",
      description: "Compress PDF below 100KB for strict file size limits on exam forms and document portals.",
      icon: ArrowDownCircle,
      link: "/compress-pdf-100kb",
      highlight: true,
    },
    {
      title: "JPG to PDF",
      description: "Convert images to PDF for document submission—perfect for scanned documents and photo ID uploads.",
      icon: Image,
      link: "/jpg-to-pdf",
      highlight: false,
    },
    {
      title: "PDF to JPG",
      description: "Extract images from PDF files for presentations, social media, or individual page downloads.",
      icon: FileImage,
      link: "/pdf-to-jpg",
      highlight: false,
    },
    {
      title: "Image Compressor",
      description: "Optimize images for web upload while maintaining visual quality—ideal for profile photos and thumbnails.",
      icon: ImageIcon,
      link: "/image-compressor",
      highlight: false,
    },
    {
      title: "Merge PDF",
      description: "Combine multiple PDF documents into one file—useful for consolidating reports, invoices, or application materials.",
      icon: Combine,
      link: "/merge-pdf",
      highlight: false,
    },
    {
      title: "Split PDF",
      description: "Divide large PDF files into smaller parts—extract specific pages or create separate documents.",
      icon: Scissors,
      link: "/split-pdf",
      highlight: false,
    },
    {
      title: "Word to PDF",
      description: "Convert Word documents to PDF format for professional sharing and submission.",
      icon: FileText,
      link: "/word-to-pdf",
      highlight: false,
    },
    {
      title: "PDF to Word",
      description: "Transform PDFs into editable Word documents—perfect for editing contracts and official documents.",
      icon: FileDown,
      link: "/pdf-to-word",
      highlight: false,
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "100% Private",
      description: "Your files never leave your device. All processing happens locally in your browser."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Leverage modern browser APIs for instant processing without server delays."
    },
    {
      icon: Lock,
      title: "Secure Processing",
      description: "No file uploads, no data storage, no tracking. Complete privacy guaranteed."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SEOHead
        title="Free Online Document Tools - Compress, Convert & Merge Files"
        description="Professional online document tools for PDF compression, image optimization, and file conversion. Compress PDF for government forms, job applications, and exam submissions. 100% browser-based, fast, and secure."
        keywords="pdf compressor, compress pdf online, reduce pdf size, pdf to 200kb, pdf to 100kb, image compressor, document converter, merge pdf, split pdf, word to pdf, pdf to word, online document tools, compress pdf for aadhaar, compress pdf for government forms"
        canonical="/"
        schema={schema}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%)' }} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Professional Document Tools
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed max-w-2xl mx-auto">
              Compress PDF for government form submissions, job applications, and online portals. 
              All tools work 100% in your browser—your files never leave your device.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#tools"
                className="inline-flex items-center justify-center bg-accent text-accent-foreground px-8 py-3.5 rounded-lg text-base font-semibold shadow-accent hover:opacity-90 transition-all duration-200"
              >
                Explore Tools
              </a>
              <Link
                to="/features"
                className="inline-flex items-center justify-center bg-white/10 text-white px-8 py-3.5 rounded-lg text-base font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-card border-b border-border py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <main id="tools" className="py-16 lg:py-20 flex-1">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Document Processing Suite
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional tools designed for real-world document needs. Compress PDF for Aadhaar card uploads, 
              PAN card applications, passport forms, and more.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <ToolCard
                key={index}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                link={tool.link}
                highlight={tool.highlight}
              />
            ))}
          </div>
        </div>
      </main>

      {/* SEO Content Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Why Choose Our Document Tools?
            </h2>
            
            <div className="prose prose-slate max-w-none">
              <p className="text-muted-foreground mb-4">
                Our online PDF compressor helps you reduce PDF size for government form submissions, 
                including Aadhaar card uploads, PAN card applications, and passport document requirements. 
                Whether you need to compress PDF below 200KB for college admission forms or reduce file 
                size for job application documents, our tools deliver professional results instantly.
              </p>
              
              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                Common Use Cases
              </h3>
              <ul className="text-muted-foreground space-y-2 mb-6">
                <li>• Compress PDF for Aadhaar card upload without losing quality</li>
                <li>• Reduce PDF size for government form submission portals</li>
                <li>• PDF compressor for passport, PAN card, and exam forms</li>
                <li>• Compress PDF below 200KB for online job applications</li>
                <li>• Fast PDF compression for college admission documents</li>
                <li>• Secure PDF compressor without uploading files to external servers</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                Complete Privacy & Security
              </h3>
              <p className="text-muted-foreground">
                Unlike other online tools, all document processing happens directly in your web browser. 
                Your sensitive documents—including ID cards, financial statements, and personal records—are 
                never uploaded to any server. This makes our tools ideal for processing confidential 
                government documents and private business files.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
