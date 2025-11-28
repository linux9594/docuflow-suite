import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { saveAs } from "file-saver";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { imagesToPDF } from "@/utils/imageUtils";
import { useToast } from "@/hooks/use-toast";

const JPGToPDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [pdfFile, setPdfFile] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFiles(prev => [...prev, selectedFile]);
    setPdfFile(null);
  };

  const handleConvert = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    try {
      const pdf = await imagesToPDF(files);
      setPdfFile(pdf);
      toast({
        title: "Success!",
        description: `Converted ${files.length} image${files.length > 1 ? 's' : ''} to PDF`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert images to PDF",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (pdfFile) {
      saveAs(pdfFile, 'converted_images.pdf');
    }
  };

  const handleClear = () => {
    setFiles([]);
    setPdfFile(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-foreground">JPG to PDF</h1>
            <p className="text-lg text-muted-foreground">
              Convert your image files into a single PDF document
            </p>
          </div>

          <div className="bg-card rounded-xl p-8 shadow-card border border-border">
            <FileUpload
              onFileSelect={handleFileSelect}
              acceptedFileTypes="image/jpeg,image/jpg,image/png"
              multiple={true}
              maxFiles={10}
            />

            {files.length > 0 && !pdfFile && (
              <div className="mt-8 space-y-4">
                <p className="text-center text-muted-foreground">
                  {files.length} image{files.length > 1 ? 's' : ''} selected
                </p>
                <div className="flex gap-4">
                  <Button
                    onClick={handleConvert}
                    disabled={isProcessing}
                    className="flex-1 bg-gradient-card text-white font-semibold py-6 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Converting...
                      </>
                    ) : (
                      "Convert to PDF"
                    )}
                  </Button>
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    className="px-8"
                  >
                    Clear
                  </Button>
                </div>
              </div>
            )}

            {pdfFile && (
              <div className="mt-8 space-y-4">
                <div className="bg-muted rounded-lg p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">PDF Created</p>
                  <p className="text-2xl font-bold text-primary">
                    {(pdfFile.size / 1024).toFixed(2)} KB
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {files.length} page{files.length > 1 ? 's' : ''}
                  </p>
                </div>

                <Button
                  onClick={handleDownload}
                  className="w-full bg-accent text-accent-foreground font-semibold py-6 rounded-lg hover:bg-accent/90 transition-colors"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download PDF
                </Button>
                
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="w-full"
                >
                  Convert More Images
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

export default JPGToPDF;
