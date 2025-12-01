import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { pdfToImages } from "@/utils/pdfUtils";
import { useToast } from "@/hooks/use-toast";
import { SEOHead } from "@/components/SEOHead";
import { ToolBreadcrumb } from "@/components/ToolBreadcrumb";

const PDFToJPG = () => {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setImages([]);
  };

  const handleConvert = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const convertedImages = await pdfToImages(file);
      setImages(convertedImages);
      toast({
        title: "Success!",
        description: `Converted PDF to ${convertedImages.length} image${convertedImages.length > 1 ? 's' : ''}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert PDF to images",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadAll = async () => {
    if (images.length === 0) return;

    const zip = new JSZip();
    
    for (let i = 0; i < images.length; i++) {
      const base64Data = images[i].split(',')[1];
      zip.file(`page_${i + 1}.jpg`, base64Data, { base64: true });
    }

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `${file?.name.replace('.pdf', '')}_images.zip`);
  };

  const handleDownloadSingle = (index: number) => {
    const link = document.createElement('a');
    link.href = images[index];
    link.download = `page_${index + 1}.jpg`;
    link.click();
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PDF to JPG Converter",
    "applicationCategory": "Utility",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Free online PDF to JPG converter. Convert PDF pages to JPG images. Extract images from PDF files. Fast and secure.",
    "operatingSystem": "Any",
    "url": "https://linux9594.github.io/compressor-vk/pdf-to-jpg"
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead
        title="PDF to JPG Converter Online Free - Convert PDF to Images"
        description="Convert PDF to JPG online for free. Transform PDF pages into high-quality JPG images. Extract images from PDF files. Fast, secure, browser-based. Convert PDF to JPG now!"
        keywords="pdf to jpg, pdf to jpeg, pdf to image, convert pdf to jpg, pdf to jpg converter, pdf to image converter, extract images from pdf, how to convert pdf to jpg, pdf to jpeg online, pdf to png, pdf pages to images, convert pdf to jpg online free, pdf to jpg high quality, save pdf as jpg, export pdf to jpg, pdf to image online, pdf to photo converter, convert pdf pages to images"
        canonical="/pdf-to-jpg"
        schema={schema}
      />
      <Header />
      <ToolBreadcrumb toolName="PDF to JPG" toolPath="/pdf-to-jpg" />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-foreground">PDF to JPG</h1>
            <p className="text-lg text-muted-foreground">
              Extract images or convert PDF pages to JPG format
            </p>
          </div>

          <div className="bg-card rounded-xl p-8 shadow-card border border-border mb-8">
            <FileUpload
              onFileSelect={handleFileSelect}
              acceptedFileTypes="application/pdf"
              multiple={false}
            />

            {file && images.length === 0 && (
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
                    "Convert to JPG"
                  )}
                </Button>
              </div>
            )}
          </div>

          {images.length > 0 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">
                  {images.length} image{images.length > 1 ? 's' : ''} generated
                </p>
                <Button
                  onClick={handleDownloadAll}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download All (ZIP)
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {images.map((img, index) => (
                  <div key={index} className="bg-card rounded-lg p-4 shadow-card border border-border">
                    <img
                      src={img}
                      alt={`Page ${index + 1}`}
                      className="w-full rounded-lg mb-4"
                    />
                    <Button
                      onClick={() => handleDownloadSingle(index)}
                      variant="outline"
                      className="w-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Page {index + 1}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PDFToJPG;
