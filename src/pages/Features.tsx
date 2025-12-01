import { Link } from "react-router-dom";
import { 
  FileText, 
  Image, 
  Merge, 
  Split, 
  Repeat, 
  Shield, 
  Zap, 
  Lock 
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { SEOHead } from "@/components/SEOHead";

const Features = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are all tools completely free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all our tools are 100% free with unlimited usage. No hidden fees, no watermarks, and no sign-up required."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. All processing happens locally in your browser. Your files never leave your device and we don't store or track any data."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to install anything?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No installation needed. All tools work directly in your web browser on any device - desktop, tablet, or mobile."
        }
      },
      {
        "@type": "Question",
        "name": "What file size limits do you have?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our tools can handle most common file sizes. For very large files, processing time may vary depending on your device's capabilities."
        }
      }
    ]
  };

  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "PDF Compression",
      description: "Reduce PDF file size with intelligent compression algorithms. Choose from standard compression (40-60% reduction) or target specific sizes like 100KB or 200KB for strict upload requirements.",
      tools: [
        { name: "PDF Compressor", link: "/pdf-compressor" },
        { name: "Compress to 200KB", link: "/compress-pdf-200kb" },
        { name: "Compress to 100KB", link: "/compress-pdf-100kb" },
      ]
    },
    {
      icon: <Image className="w-8 h-8" />,
      title: "Image Compression",
      description: "Optimize your images with advanced compression that reduces file size by 40-60% while maintaining visual quality. Perfect for web uploads, email attachments, and online forms.",
      tools: [
        { name: "Image Compressor", link: "/image-compressor" },
      ]
    },
    {
      icon: <Repeat className="w-8 h-8" />,
      title: "Format Conversion",
      description: "Convert between popular file formats seamlessly. Transform images to PDFs, PDFs to images, and switch between Word and PDF formats with ease.",
      tools: [
        { name: "JPG to PDF", link: "/jpg-to-pdf" },
        { name: "PDF to JPG", link: "/pdf-to-jpg" },
        { name: "Word to PDF", link: "/word-to-pdf" },
        { name: "PDF to Word", link: "/pdf-to-word" },
      ]
    },
    {
      icon: <Merge className="w-8 h-8" />,
      title: "PDF Merging",
      description: "Combine multiple PDF documents into a single file. Organize your documents efficiently and create comprehensive bundles for sharing or submission.",
      tools: [
        { name: "Merge PDF", link: "/merge-pdf" },
      ]
    },
    {
      icon: <Split className="w-8 h-8" />,
      title: "PDF Splitting",
      description: "Extract specific pages or divide large PDFs into smaller, manageable parts. View total page count and select custom page ranges for precise splitting.",
      tools: [
        { name: "Split PDF", link: "/split-pdf" },
      ]
    },
  ];

  const keyFeatures = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "100% Client-Side",
      description: "All processing happens in your browser. No files are uploaded to any server, ensuring maximum speed and privacy."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Completely Private",
      description: "Your files never leave your device. We don't store, track, or have access to any of your documents."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "No Watermarks",
      description: "All tools are completely free with no watermarks, no sign-up requirements, and unlimited usage."
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        title="Features - Free PDF & Image Tools"
        description="Discover our comprehensive collection of free PDF and image tools. Compress, convert, merge, and split PDFs. All tools work in your browser with complete privacy and no watermarks."
        keywords="pdf tools, image tools, pdf compressor, pdf converter, merge pdf, split pdf, free pdf tools, online document tools"
        canonical="/features"
        schema={faqSchema}
      />
      <Header />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-foreground">
              Our Features & Tools
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional document tools designed for students, professionals, and anyone who works with PDFs and images. 
              All tools are free, secure, and work entirely in your browser.
            </p>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {keyFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="bg-card rounded-xl p-6 border border-border text-center hover:shadow-card transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Tool Categories */}
          <div className="space-y-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-card rounded-xl p-8 border border-border">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2 text-foreground">{feature.title}</h2>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {feature.tools.map((tool, toolIndex) => (
                    <Link
                      key={toolIndex}
                      to={tool.link}
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground transition-colors font-medium text-sm"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div className="mt-16 bg-gradient-card rounded-xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-bold mb-2">Select Your Tool</h3>
                <p className="text-white/80 text-sm">Choose the tool that fits your needs from our comprehensive collection.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-bold mb-2">Upload Your File</h3>
                <p className="text-white/80 text-sm">Select your file - all processing happens securely in your browser.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-bold mb-2">Download Result</h3>
                <p className="text-white/80 text-sm">Get your processed file instantly - no waiting, no watermarks.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Frequently Asked Questions</h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="font-bold mb-2 text-foreground">Are all tools completely free?</h3>
                <p className="text-muted-foreground">Yes, all our tools are 100% free with unlimited usage. No hidden fees, no watermarks, and no sign-up required.</p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="font-bold mb-2 text-foreground">Is my data secure?</h3>
                <p className="text-muted-foreground">Absolutely. All processing happens locally in your browser. Your files never leave your device and we don't store or track any data.</p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="font-bold mb-2 text-foreground">Do I need to install anything?</h3>
                <p className="text-muted-foreground">No installation needed. All tools work directly in your web browser on any device - desktop, tablet, or mobile.</p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="font-bold mb-2 text-foreground">What file size limits do you have?</h3>
                <p className="text-muted-foreground">Our tools can handle most common file sizes. For very large files, processing time may vary depending on your device's capabilities.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Features;