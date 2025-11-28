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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-foreground">PDF Compressor</h1>
            <p className="text-lg text-muted-foreground">
              Reduce PDF file size without compromising quality
            </p>
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

          <section className="mt-16 prose prose-slate dark:prose-invert max-w-4xl mx-auto">
            <div className="bg-card rounded-xl p-8 border border-border space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Fast and Free PDF Compressor</h2>
              <p className="text-muted-foreground">
                Our online PDF Compressor allows you to reduce PDF size instantly without installing any software. 
                It works directly in your browser, uses secure on-device processing, and delivers high-quality 
                compression suitable for job applications, online forms, and email attachments.
              </p>
              
              <h3 className="text-2xl font-bold text-foreground">Why compress PDF?</h3>
              <p className="text-muted-foreground">
                Large PDF files are difficult to upload on government portals, college websites, and job portals. 
                This tool helps you shrink PDF size while maintaining readability and formatting.
              </p>
              
              <h3 className="text-2xl font-bold text-foreground">How to Compress PDF</h3>
              <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                <li>Upload your PDF file using the Select button.</li>
                <li>Wait a few seconds while the tool optimizes all pages.</li>
                <li>Download your final compressed PDF instantly.</li>
              </ol>
              
              <h3 className="text-2xl font-bold text-foreground">Features</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>No watermark</li>
                <li>No installation required</li>
                <li>100 percent free and unlimited</li>
                <li>Fast browser-based compression</li>
              </ul>
              
              <h3 className="text-2xl font-bold text-foreground">Related Tools</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><Link to="/compress-pdf-200kb" className="text-primary hover:underline">Compress PDF to 200KB</Link></li>
                <li><Link to="/compress-pdf-100kb" className="text-primary hover:underline">Compress PDF to 100KB</Link></li>
                <li><Link to="/image-compressor" className="text-primary hover:underline">Image Compressor</Link></li>
                <li><Link to="/jpg-to-pdf" className="text-primary hover:underline">JPG to PDF</Link></li>
              </ul>
              
              <h3 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h3>
              <h4 className="text-lg font-semibold text-foreground">Is your PDF compressor free?</h4>
              <p className="text-muted-foreground">Yes, completely free with no account needed.</p>
              
              <h4 className="text-lg font-semibold text-foreground">Does it reduce quality?</h4>
              <p className="text-muted-foreground">It optimizes size while keeping text readable and images clear.</p>
              
              <h4 className="text-lg font-semibold text-foreground">Do you store my files?</h4>
              <p className="text-muted-foreground">No, all processing happens inside your browser for full privacy.</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PDFCompressor;
