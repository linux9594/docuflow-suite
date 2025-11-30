import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { imagesToPDF } from "@/utils/imageUtils";
import { useToast } from "@/hooks/use-toast";
import { SEOHead } from "@/components/SEOHead";
import { ToolBreadcrumb } from "@/components/ToolBreadcrumb";

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

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "JPG to PDF Converter",
    "applicationCategory": "Utility",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Free online JPG to PDF converter. Convert JPG, JPEG, PNG images to PDF. Combine multiple images into one PDF document.",
    "operatingSystem": "Any",
    "url": "https://linux9594.github.io/compressor-vk/jpg-to-pdf"
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        title="JPG to PDF Converter Online Free - Convert Images to PDF"
        description="Convert JPG to PDF online for free. Transform JPEG, PNG, and other image formats to PDF. Combine multiple images into one PDF. Fast, secure, browser-based. Convert now!"
        keywords="jpg to pdf, jpeg to pdf, image to pdf, png to pdf, convert jpg to pdf, jpg to pdf converter, image to pdf converter, pictures to pdf"
        canonical="/jpg-to-pdf"
        schema={schema}
      />
      <Header />
      <ToolBreadcrumb toolName="JPG to PDF" toolPath="/jpg-to-pdf" />
      
      <main className="flex-1 py-12">
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

          <section className="mt-16 prose prose-slate dark:prose-invert max-w-4xl mx-auto">
            <div className="bg-card rounded-xl p-8 border border-border space-y-6">
              <h2 className="text-3xl font-bold text-foreground">JPG to PDF Converter</h2>
              <p className="text-muted-foreground">Convert JPG images into a single PDF file instantly. No app required, works directly on your browser, free and secure.</p>
              <h3 className="text-2xl font-bold text-foreground">How to Convert JPG to PDF</h3>
              <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                <li>Upload one or multiple JPG images.</li>
                <li>Arrange pages if needed.</li>
                <li>Download your final PDF.</li>
              </ol>
              <h3 className="text-2xl font-bold text-foreground">Related Tools</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><Link to="/image-compressor" className="text-primary hover:underline">Image Compressor</Link></li>
                <li><Link to="/pdf-compressor" className="text-primary hover:underline">PDF Compressor</Link></li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JPGToPDF;
