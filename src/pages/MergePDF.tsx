import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { mergePDFs } from "@/utils/pdfUtils";
import { useToast } from "@/hooks/use-toast";
import { SEOHead } from "@/components/SEOHead";
import { ToolBreadcrumb } from "@/components/ToolBreadcrumb";

const MergePDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [mergedFile, setMergedFile] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFiles(prev => [...prev, selectedFile]);
    setMergedFile(null);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      toast({
        title: "Error",
        description: "Please select at least 2 PDF files to merge",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const merged = await mergePDFs(files);
      setMergedFile(merged);
      toast({
        title: "Success!",
        description: `Merged ${files.length} PDF files`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to merge PDF files",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (mergedFile) {
      saveAs(mergedFile, 'merged_document.pdf');
    }
  };

  const handleClear = () => {
    setFiles([]);
    setMergedFile(null);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Merge PDF",
    "applicationCategory": "Utility",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Free online PDF merger tool. Combine multiple PDF files into one document. Fast, secure, and browser-based. No upload limits.",
    "operatingSystem": "Any",
    "url": "https://linux9594.github.io/compressor-vk/merge-pdf"
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        title="Merge PDF Online Free - Combine Multiple PDF Files Into One"
        description="Merge PDF files online for free. Combine multiple PDF documents into a single file. Fast, secure, browser-based. No signup required. Merge PDF files now!"
        keywords="merge pdf, combine pdf, pdf merger, merge pdf files online, combine pdf files, pdf combiner, join pdf, merge pdf online free, pdf merge tool, how to merge pdf files, merge two pdf files, combine multiple pdf into one, merge pdf documents, join pdf files, concatenate pdf, merge pdf pages, combine pdf online, pdf joiner, merge pdf files into one, unite pdf files, merge pdf free online, combine pdf files free"
        canonical="/merge-pdf"
        schema={schema}
      />
      <Header />
      <ToolBreadcrumb toolName="Merge PDF" toolPath="/merge-pdf" />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-foreground">Merge PDF</h1>
            <p className="text-lg text-muted-foreground">
              Combine multiple PDF documents into a single file
            </p>
          </div>

          <div className="bg-card rounded-xl p-8 shadow-card border border-border">
            <FileUpload
              onFileSelect={handleFileSelect}
              acceptedFileTypes="application/pdf"
              multiple={true}
              maxFiles={10}
            />

            {files.length > 0 && !mergedFile && (
              <div className="mt-8 space-y-4">
                <p className="text-center text-muted-foreground">
                  {files.length} PDF{files.length > 1 ? 's' : ''} selected
                </p>
                <div className="flex gap-4">
                  <Button
                    onClick={handleMerge}
                    disabled={isProcessing || files.length < 2}
                    className="flex-1 bg-gradient-card text-white font-semibold py-6 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Merging...
                      </>
                    ) : (
                      "Merge PDFs"
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

            {mergedFile && (
              <div className="mt-8 space-y-4">
                <div className="bg-muted rounded-lg p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Merged PDF</p>
                  <p className="text-2xl font-bold text-primary">
                    {(mergedFile.size / 1024).toFixed(2)} KB
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {files.length} document{files.length > 1 ? 's' : ''} combined
                  </p>
                </div>

                <Button
                  onClick={handleDownload}
                  className="w-full bg-accent text-accent-foreground font-semibold py-6 rounded-lg hover:bg-accent/90 transition-colors"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Merged PDF
                </Button>
                
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="w-full"
                >
                  Merge More PDFs
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

export default MergePDF;
