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

const CompressPDF200KB = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const { toast } = useToast();

  const TARGET_SIZE_KB = 200;

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setOriginalSize(selectedFile.size);
    setCompressedFile(null);
  };

  const handleCompress = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const compressed = await compressPDF(file, TARGET_SIZE_KB);
      setCompressedFile(compressed);
      setCompressedSize(compressed.size);
      
      const finalSizeKB = compressed.size / 1024;
      if (finalSizeKB <= TARGET_SIZE_KB) {
        toast({
          title: "Success!",
          description: `PDF compressed to ${finalSizeKB.toFixed(2)} KB`,
        });
      } else {
        toast({
          title: "Compressed",
          description: `Achieved ${finalSizeKB.toFixed(2)} KB (target: ${TARGET_SIZE_KB} KB)`,
        });
      }
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
      saveAs(compressedFile, `compressed_200kb_${file?.name}`);
    }
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Compress PDF to 200KB - DocuTools Pro",
    "applicationCategory": "Utility",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Compress PDF below 200KB for online applications, government portals, and college admission forms. Fast, secure, browser-based compression.",
    "operatingSystem": "Any",
    "url": "https://yourdomain.com/compress-pdf-200kb"
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SEOHead
        title="Compress PDF to 200KB - For Online Applications & Government Forms"
        description="Compress PDF below 200KB for online job applications, government form submission, and college admission portals. Free, secure, browser-based tool. No file uploads required."
        keywords="compress pdf to 200kb, reduce pdf to 200kb, pdf compressor 200kb, compress pdf for government forms, compress pdf for job application, pdf size reducer, shrink pdf to 200kb, pdf below 200kb"
        canonical="/compress-pdf-200kb"
        schema={schema}
      />
      <Header />
      <ToolBreadcrumb toolName="Compress PDF to 200KB" toolPath="/compress-pdf-200kb" />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Compress PDF to 200KB
            </h1>
            <p className="text-muted-foreground">
              Meet file size requirements for online applications and government portals
            </p>
            <div className="mt-4 inline-block bg-accent/10 text-accent px-4 py-2 rounded-lg font-semibold">
              Target Size: 200 KB
            </div>
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
                  className="w-full bg-gradient-highlight text-white font-semibold py-6 rounded-lg hover:opacity-90 transition-opacity"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Compressing to 200KB...
                    </>
                  ) : (
                    "Compress to 200KB"
                  )}
                </Button>
              </div>
            )}

            {compressedFile && (
              <div className="mt-8 space-y-4">
                <div className="bg-muted rounded-lg p-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Original</p>
                      <p className="text-xl font-bold text-foreground">
                        {(originalSize / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Target</p>
                      <p className="text-xl font-bold text-accent">
                        {TARGET_SIZE_KB} KB
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Final</p>
                      <p className={`text-xl font-bold ${
                        compressedSize / 1024 <= TARGET_SIZE_KB ? 'text-primary' : 'text-foreground'
                      }`}>
                        {(compressedSize / 1024).toFixed(2)} KB
                      </p>
                    </div>
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
              <h2 className="text-2xl font-bold text-foreground">Compress PDF Below 200KB for Online Applications</h2>
              <p className="text-muted-foreground leading-relaxed">
                Many government portals, job application websites, and college admission forms require PDF files 
                under 200KB. This tool helps you compress PDF for Aadhaar card upload, passport applications, 
                PAN card forms, and other document submissions that have strict file size limits.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground">Perfect For</h3>
              <ul className="text-muted-foreground space-y-2">
                <li>• Compress PDF below 200KB for online job applications</li>
                <li>• Reduce PDF size for government form submission</li>
                <li>• Fast PDF compression for college admission forms</li>
                <li>• PDF compressor for passport, PAN card, and exam forms</li>
                <li>• Scholarship application document uploads</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-foreground">How to Reduce PDF to 200KB</h3>
              <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Upload your PDF file above</li>
                <li>Click "Compress to 200KB" to start optimization</li>
                <li>Download your compressed PDF ready for submission</li>
              </ol>
              
              <h3 className="text-xl font-semibold text-foreground">Related Tools</h3>
              <ul className="space-y-2">
                <li><Link to="/compress-pdf-100kb" className="text-primary hover:underline">Compress PDF to 100KB</Link> — For stricter file size limits</li>
                <li><Link to="/pdf-compressor" className="text-primary hover:underline">PDF Compressor</Link> — General compression tool</li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompressPDF200KB;
