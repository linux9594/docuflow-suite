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

const CompressPDF100KB = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const { toast } = useToast();

  const TARGET_SIZE_KB = 100;

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
      saveAs(compressedFile, `compressed_100kb_${file?.name}`);
    }
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Compress PDF to 100KB",
    "applicationCategory": "Utility",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Compress PDF to 100KB or less online free. Perfect for email attachments and online forms. Fast, secure compression with quality preservation.",
    "operatingSystem": "Any",
    "url": "https://linux9594.github.io/compressor-vk/compress-pdf-100kb"
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        title="Compress PDF to 100KB Online Free - Reduce PDF Size to 100KB"
        description="Compress PDF to 100KB or less for free. Perfect for email attachments and online forms. Fast, secure, browser-based PDF compression. No upload limits. Compress PDF to 100KB now!"
        keywords="compress pdf to 100kb, reduce pdf to 100kb, pdf compressor 100kb, compress pdf file to 100kb, pdf size reducer 100kb, make pdf 100kb, shrink pdf to 100kb"
        canonical="/compress-pdf-100kb"
        schema={schema}
      />
      <Header />
      <ToolBreadcrumb toolName="Compress PDF to 100KB" toolPath="/compress-pdf-100kb" />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-foreground">
              Compress PDF to 100KB
            </h1>
            <p className="text-lg text-muted-foreground">
              Drastically reduce PDF size for minimal bandwidth
            </p>
            <div className="mt-4 inline-block bg-accent/10 text-accent px-4 py-2 rounded-lg font-semibold">
              Target Size: 100 KB
            </div>
          </div>

          <div className="bg-card rounded-xl p-8 shadow-card border border-border">
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
                      Compressing to 100KB...
                    </>
                  ) : (
                    "Compress to 100KB"
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

          <section className="mt-16 prose prose-slate dark:prose-invert max-w-4xl mx-auto">
            <div className="bg-card rounded-xl p-8 border border-border space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Compress PDF to 100KB</h2>
              <p className="text-muted-foreground">
                This tool reduces your PDF file to 100KB for strict upload requirements. Useful for job applications, 
                scholarship portals, and online verification forms.
              </p>
              <h3 className="text-2xl font-bold text-foreground">How to Use</h3>
              <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                <li>Select your PDF.</li>
                <li>Wait a few seconds as the file is optimized.</li>
                <li>Download your compressed 100KB PDF.</li>
              </ol>
              <h3 className="text-2xl font-bold text-foreground">Related Tools</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><Link to="/compress-pdf-200kb" className="text-primary hover:underline">Compress PDF to 200KB</Link></li>
                <li><Link to="/pdf-to-jpg" className="text-primary hover:underline">PDF to JPG</Link></li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompressPDF100KB;
