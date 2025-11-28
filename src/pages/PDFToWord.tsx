import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { saveAs } from "file-saver";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { extractTextFromPDF, pdfToWord } from "@/utils/docxUtils";
import { useToast } from "@/hooks/use-toast";

const PDFToWord = () => {
  const [file, setFile] = useState<File | null>(null);
  const [wordFile, setWordFile] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setWordFile(null);
  };

  const handleConvert = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const text = await extractTextFromPDF(file);
      const docx = await pdfToWord(text);
      setWordFile(docx);
      toast({
        title: "Success!",
        description: "PDF converted to Word document",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert PDF to Word",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (wordFile && file) {
      const fileName = file.name.replace('.pdf', '.docx');
      saveAs(wordFile, fileName);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-foreground">
              PDF to Word
            </h1>
            <p className="text-lg text-muted-foreground">
              Transform PDFs into editable Microsoft Word files
            </p>
          </div>

          <div className="bg-card rounded-xl p-8 shadow-card border border-border">
            <FileUpload
              onFileSelect={handleFileSelect}
              acceptedFileTypes="application/pdf"
              multiple={false}
            />

            {file && !wordFile && (
              <div className="mt-8">
                <Button
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className="w-full bg-gradient-card text-white font-semibold py-6 rounded-lg hover:opacity-90 transition-opacity"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    "Convert to Word"
                  )}
                </Button>
              </div>
            )}

            {wordFile && (
              <div className="mt-8 space-y-4">
                <div className="bg-muted rounded-lg p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Word Document Created</p>
                  <p className="text-2xl font-bold text-primary">
                    {(wordFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>

                <Button
                  onClick={handleDownload}
                  className="w-full bg-accent text-accent-foreground font-semibold py-6 rounded-lg hover:bg-accent/90 transition-colors"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Word Document
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

export default PDFToWord;
