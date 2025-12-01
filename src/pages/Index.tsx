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
  FileDown
} from "lucide-react";

const Index = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PDF COMPRESSOR - Free Online PDF Tools",
    "applicationCategory": "Utility",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Free online PDF tools suite. Compress PDF files, convert images to PDF, merge and split PDFs, convert Word to PDF and more. All tools work in your browser with complete privacy.",
    "operatingSystem": "Any",
    "url": "https://linux9594.github.io/compressor-vk",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "3420"
    }
  };
  const tools = [
    {
      title: "PDF Compressor",
      description: "Reduce PDF file size without compromising quality.",
      icon: Minimize2,
      link: "/pdf-compressor",
      highlight: false,
    },
    {
      title: "Compress PDF to 200KB",
      description: "Achieve a specific file size for uploads and sharing.",
      icon: ArrowDown,
      link: "/compress-pdf-200kb",
      highlight: true,
    },
    {
      title: "Compress PDF to 100KB",
      description: "Drastically reduce PDF size for minimal bandwidth.",
      icon: ArrowDownCircle,
      link: "/compress-pdf-100kb",
      highlight: true,
    },
    {
      title: "JPG to PDF",
      description: "Convert your image files into a single PDF document.",
      icon: Image,
      link: "/jpg-to-pdf",
      highlight: false,
    },
    {
      title: "PDF to JPG",
      description: "Extract images or convert PDF pages to JPG format.",
      icon: FileImage,
      link: "/pdf-to-jpg",
      highlight: false,
    },
    {
      title: "Image Compressor",
      description: "Optimize and compress JPG and PNG images easily.",
      icon: ImageIcon,
      link: "/image-compressor",
      highlight: false,
    },
    {
      title: "Merge PDF",
      description: "Combine multiple PDF documents into a single file.",
      icon: Combine,
      link: "/merge-pdf",
      highlight: false,
    },
    {
      title: "Split PDF",
      description: "Divide large PDF files into smaller, manageable parts.",
      icon: Scissors,
      link: "/split-pdf",
      highlight: false,
    },
    {
      title: "Word to PDF",
      description: "Convert Microsoft Word documents to PDF format.",
      icon: FileText,
      link: "/word-to-pdf",
      highlight: false,
    },
    {
      title: "PDF to Word",
      description: "Transform PDFs into editable Microsoft Word files.",
      icon: FileDown,
      link: "/pdf-to-word",
      highlight: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        title="Free Online PDF Tools - Compress, Convert, Merge & Split PDF"
        description="Free online PDF tools for all your document needs. Compress PDF files, convert images to PDF, merge and split PDFs, convert Word to PDF and more. Fast, secure, no signup required."
        keywords="pdf tools, pdf compressor, compress pdf, pdf converter, merge pdf, split pdf, pdf to jpg, jpg to pdf, word to pdf, pdf to word, free pdf tools, online pdf tools, pdf editor, reduce pdf size, compress pdf online, pdf merger, pdf splitter, image to pdf converter, document converter, pdf optimizer, shrink pdf, pdf file compressor, online document tools"
        canonical="/"
        schema={schema}
      />
      <Header />
      
      <section className="relative bg-gradient-hero text-white py-24 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 100% 150%, hsl(264 69% 34%) 24%, hsl(263 64% 51%) 25%, hsl(263 64% 51%) 28%, hsl(264 69% 34%) 29%, hsl(264 69% 34%) 36%, hsl(263 64% 51%) 36%, hsl(263 64% 51%) 40%, transparent 40%, transparent)`,
            backgroundSize: '50px 100px'
          }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
              Elevate Your Document Workflow.
            </h1>
            <p className="text-xl md:text-2xl mb-10 leading-relaxed opacity-95">
              Experience powerful, elegant, and secure online tools designed to simplify your file management.
            </p>
            <Link
              to="#tools-list"
              className="inline-block bg-accent text-accent-foreground px-8 py-4 rounded-xl text-lg font-bold shadow-accent hover:bg-accent/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Discover All Tools
            </Link>
          </div>
        </div>
      </section>

      <main id="tools-list" className="py-20 flex-1">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-foreground tracking-tight">
            Your Suite of Essential Tools
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      <Footer />
    </div>
  );
};

export default Index;
