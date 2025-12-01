import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { PDFDocument } from 'pdf-lib';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { splitPDF } from "@/utils/pdfUtils";
import { useToast } from "@/hooks/use-toast";
import { SEOHead } from "@/components/SEOHead";
import { ToolBreadcrumb } from "@/components/ToolBreadcrumb";

const SplitPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [splitFiles, setSplitFiles] = useState<Blob[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pageRanges, setPageRanges] = useState<string>("1-end");
  const [totalPages, setTotalPages] = useState<number>(0);
  const { toast } = useToast();

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setSplitFiles([]);
    
    // Get page count
    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setTotalPages(pdfDoc.getPageCount());
    } catch (error) {
      console.error('Error getting page count:', error);
    }
  };

  const handleSplit = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      // Parse page ranges (simplified - split by every page for demo)
      const ranges = [{ start: 1, end: 1 }, { start: 2, end: 2 }]; // Demo: split into individual pages
      
      const split = await splitPDF(file, ranges);
      setSplitFiles(split);
      toast({
        title: "Success!",
        description: `PDF split into ${split.length} files`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to split PDF",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadAll = async () => {
    if (splitFiles.length === 0) return;

    const zip = new JSZip();
    
    for (let i = 0; i < splitFiles.length; i++) {
      zip.file(`split_${i + 1}.pdf`, splitFiles[i]);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `${file?.name.replace('.pdf', '')}_split.zip`);
  };

  const handleDownloadSingle = (index: number) => {
    saveAs(splitFiles[index], `split_${index + 1}.pdf`);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Split PDF",
    "applicationCategory": "Utility",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Free online PDF splitter tool. Extract and split PDF pages into separate files. Fast, secure, and browser-based.",
    "operatingSystem": "Any",
    "url": "https://linux9594.github.io/compressor-vk/split-pdf"
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        title="Split PDF Online Free - Extract & Divide PDF Pages"
        description="Split PDF files online for free. Extract and divide PDF pages into separate documents. Fast, secure, browser-based. No signup required. Split PDF now!"
        keywords="split pdf, divide pdf, extract pdf pages, pdf splitter, split pdf pages, pdf page extractor, separate pdf pages, split pdf online free, how to split pdf, split pdf into multiple files, divide pdf into pages, extract pages from pdf, split pdf by pages, pdf separator, break pdf into parts, split pdf document, pdf page splitter, split large pdf, split pdf file online, separate pdf documents"
        canonical="/split-pdf"
        schema={schema}
      />
      <Header />
      <ToolBreadcrumb toolName="Split PDF" toolPath="/split-pdf" />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-foreground">Split PDF</h1>
            <p className="text-lg text-muted-foreground">
              Divide large PDF files into smaller, manageable parts
            </p>
          </div>

          <div className="bg-card rounded-xl p-8 shadow-card border border-border">
            <FileUpload
              onFileSelect={handleFileSelect}
              acceptedFileTypes="application/pdf"
              multiple={false}
            />

            {file && splitFiles.length === 0 && (
              <div className="mt-8 space-y-4">
                {totalPages > 0 && (
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">Total Pages</p>
                    <p className="text-3xl font-bold text-primary">{totalPages}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Page Ranges (e.g., "1-3, 5-end")
                  </label>
                  <Input
                    value={pageRanges}
                    onChange={(e) => setPageRanges(e.target.value)}
                    placeholder="1-end"
                    className="w-full"
                  />
                </div>
                
                <Button
                  onClick={handleSplit}
                  disabled={isProcessing}
                  className="w-full bg-gradient-card text-white font-semibold py-6 rounded-lg hover:opacity-90 transition-opacity"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Splitting...
                    </>
                  ) : (
                    "Split PDF"
                  )}
                </Button>
              </div>
            )}

            {splitFiles.length > 0 && (
              <div className="mt-8 space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">
                    {splitFiles.length} file{splitFiles.length > 1 ? 's' : ''} created
                  </p>
                  <Button
                    onClick={handleDownloadAll}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download All (ZIP)
                  </Button>
                </div>

                <div className="space-y-3">
                  {splitFiles.map((_, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <span className="font-medium">Split Part {index + 1}</span>
                      <Button
                        onClick={() => handleDownloadSingle(index)}
                        variant="outline"
                        size="sm"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SplitPDF;
