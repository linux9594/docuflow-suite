import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { compressPDF } from "@/utils/pdfUtils";
import { useToast } from "@/hooks/use-toast";
import { SEOHead } from "@/components/SEOHead";
import { ToolBreadcrumb } from "@/components/ToolBreadcrumb";

const PDFCompressor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setOriginalSize(selectedFile.size);
    setCompressedFile(null);
  };

  const handleCompress = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const compressed = await compressPDF(file);
      setCompressedFile(compressed);
      setCompressedSize(compressed.size);
      toast({
        title: "Success!",
        description: "PDF compressed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to compress PDF",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (compressedFile) {
      saveAs(compressedFile, `compressed_${file?.name}`);
    }
  };

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "PDF Compressor - DocuTools Pro",
      "applicationCategory": "Utility",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Professional PDF compressor for government forms, job applications, and document portals. Reduce PDF file size while maintaining quality.",
      "operatingSystem": "Any",
      "url": "https://yourdomain.com/pdf-compressor"
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can I compress PDF for Aadhaar card upload?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our tool compresses PDF files to meet Aadhaar card portal requirements while maintaining document clarity."
          }
        },
        {
          "@type": "Question",
          "name": "Is the PDF compression secure?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. All processing happens in your browser—your files are never uploaded to any server."
          }
        },
        {
          "@type": "Question",
          "name": "How much can I reduce PDF file size?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Typically 50-90% reduction depending on the original content. Text-heavy PDFs compress more effectively."
          }
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SEOHead
        title="PDF Compressor - Reduce PDF Size for Government Forms & Applications"
        description="Compress PDF for Aadhaar card upload, government form submission, and job applications. Free online PDF compressor that works 100% in your browser. No file uploads, complete privacy."
        keywords="pdf compressor, compress pdf for aadhaar, reduce pdf size for government forms, compress pdf online, pdf compression for job application, shrink pdf for document portal, compress pdf without quality loss, secure pdf compressor"
        canonical="/pdf-compressor"
        schema={schema}
      />
      <Header />
      <ToolBreadcrumb toolName="PDF Compressor" toolPath="/pdf-compressor" />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">PDF Compressor</h1>
            <p className="text-muted-foreground">
              Reduce PDF file size for government portals, job applications, and online submissions
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 shadow-card border border-border">
            <FileUpload
              onFileSelect={handleFileSelect}
              acceptedFileTypes="application/pdf"
              multiple={false}
            />

            {file && !compressedFile && (
              <div className="mt-8">
                <Button
                  onClick={handleCompress}
                  disabled={isProcessing}
                  className="w-full bg-gradient-card text-white font-semibold py-6 rounded-lg hover:opacity-90 transition-opacity"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Compressing...
                    </>
                  ) : (
                    "Compress PDF"
                  )}
                </Button>
              </div>
            )}

            {compressedFile && (
              <div className="mt-8 space-y-4">
                <div className="bg-muted rounded-lg p-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Original Size</p>
                      <p className="text-2xl font-bold text-foreground">
                        {(originalSize / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Compressed Size</p>
                      <p className="text-2xl font-bold text-primary">
                        {(compressedSize / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Saved{" "}
                      <span className="font-bold text-accent">
                        {(((originalSize - compressedSize) / originalSize) * 100).toFixed(1)}%
                      </span>
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleDownload}
                  className="w-full bg-accent text-accent-foreground font-semibold py-6 rounded-lg hover:bg-accent/90 transition-colors"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Compressed PDF
                </Button>
              </div>
            )}
          </div>

          <section className="mt-16">
            <div className="bg-card rounded-lg p-8 border border-border space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Compress PDF for Document Submissions</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our PDF compressor is designed for real-world document needs. Whether you need to compress PDF 
                for Aadhaar card upload, reduce file size for government form submission, or optimize documents 
                for job application portals, this tool delivers professional results instantly.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground">Common Use Cases</h3>
              <ul className="text-muted-foreground space-y-2">
                <li>• Compress PDF for Aadhaar card upload without losing quality</li>
                <li>• Reduce PDF size for government form submission portals</li>
                <li>• PDF compressor for passport, PAN card, and exam forms</li>
                <li>• Compress PDF below 200KB for online job applications</li>
                <li>• Fast PDF compression for college admission forms</li>
                <li>• Secure PDF compressor without uploading files to server</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-foreground">How It Works</h3>
              <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Upload your PDF file using the file selector above</li>
                <li>Click "Compress PDF" to start the optimization process</li>
                <li>Download your compressed PDF—ready for any portal or form</li>
              </ol>
              
              <h3 className="text-xl font-semibold text-foreground">Why Choose This Tool?</h3>
              <ul className="text-muted-foreground space-y-2">
                <li>• <strong>100% Browser-Based:</strong> Your files never leave your device</li>
                <li>• <strong>No Watermarks:</strong> Clean, professional output every time</li>
                <li>• <strong>No Registration:</strong> Use immediately without creating an account</li>
                <li>• <strong>Unlimited Usage:</strong> Compress as many files as you need</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-foreground">Related Tools</h3>
              <ul className="space-y-2">
                <li><Link to="/compress-pdf-200kb" className="text-primary hover:underline">Compress PDF to 200KB</Link> — For portals with 200KB limit</li>
                <li><Link to="/compress-pdf-100kb" className="text-primary hover:underline">Compress PDF to 100KB</Link> — For strict file size requirements</li>
                <li><Link to="/image-compressor" className="text-primary hover:underline">Image Compressor</Link> — Optimize images for web upload</li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PDFCompressor;
