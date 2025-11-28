import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { saveAs } from "file-saver";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { compressImage } from "@/utils/imageUtils";
import { useToast } from "@/hooks/use-toast";

const ImageCompressor = () => {
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
      const compressed = await compressImage(file, 0.3);
      setCompressedFile(compressed);
      setCompressedSize(compressed.size);
      toast({
        title: "Success!",
        description: "Image compressed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to compress image",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (compressedFile && file) {
      const extension = file.name.split('.').pop();
      saveAs(compressedFile, `compressed_${file.name}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-foreground">
              Image Compressor
            </h1>
            <p className="text-lg text-muted-foreground">
              Optimize and compress JPG and PNG images easily
            </p>
          </div>

          <div className="bg-card rounded-xl p-8 shadow-card border border-border">
            <FileUpload
              onFileSelect={handleFileSelect}
              acceptedFileTypes="image/jpeg,image/jpg,image/png,image/webp"
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
                    "Compress Image"
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
                  Download Compressed Image
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

export default ImageCompressor;
