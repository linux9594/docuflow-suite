import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { saveAs } from "file-saver";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { compressPDF } from "@/utils/pdfUtils";
import { useToast } from "@/hooks/use-toast";

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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-foreground">
              Compress PDF to 200KB
            </h1>
            <p className="text-lg text-muted-foreground">
              Achieve a specific file size for uploads and sharing
            </p>
            <div className="mt-4 inline-block bg-accent/10 text-accent px-4 py-2 rounded-lg font-semibold">
              Target Size: 200 KB
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompressPDF200KB;
