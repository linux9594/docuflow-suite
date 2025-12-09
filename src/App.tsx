import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PDFCompressor from "./pages/PDFCompressor";
import CompressPDF200KB from "./pages/CompressPDF200KB";
import CompressPDF100KB from "./pages/CompressPDF100KB";
import JPGToPDF from "./pages/JPGToPDF";
import PDFToJPG from "./pages/PDFToJPG";
import ImageCompressor from "./pages/ImageCompressor";
import MergePDF from "./pages/MergePDF";
import SplitPDF from "./pages/SplitPDF";
import WordToPDF from "./pages/WordToPDF";
import PDFToWord from "./pages/PDFToWord";
import Features from "./pages/Features";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pdf-compressor" element={<PDFCompressor />} />
          <Route path="/compress-pdf-200kb" element={<CompressPDF200KB />} />
          <Route path="/compress-pdf-100kb" element={<CompressPDF100KB />} />
          <Route path="/jpg-to-pdf" element={<JPGToPDF />} />
          <Route path="/pdf-to-jpg" element={<PDFToJPG />} />
          <Route path="/image-compressor" element={<ImageCompressor />} />
          <Route path="/merge-pdf" element={<MergePDF />} />
          <Route path="/split-pdf" element={<SplitPDF />} />
          <Route path="/word-to-pdf" element={<WordToPDF />} />
          <Route path="/pdf-to-word" element={<PDFToWord />} />
          <Route path="/features" element={<Features />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
