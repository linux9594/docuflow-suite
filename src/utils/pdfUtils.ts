import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function compressPDF(file: File, targetSizeKB?: number): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  let quality = 0.9;
  let compressedPdf: Uint8Array;
  
  if (targetSizeKB) {
    // Iteratively compress until we hit target size
    let attempts = 0;
    const maxAttempts = 10;
    
    while (attempts < maxAttempts) {
      compressedPdf = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 50,
      });
      
      const currentSizeKB = compressedPdf.length / 1024;
      
      if (currentSizeKB <= targetSizeKB) {
        break;
      }
      
      // Calculate new quality based on size ratio
      const ratio = targetSizeKB / currentSizeKB;
      quality *= Math.max(ratio * 0.9, 0.3);
      
      // Reload and compress again
      const newPdfDoc = await PDFDocument.load(compressedPdf);
      const pages = newPdfDoc.getPages();
      
      // Reduce image quality on pages
      for (const page of pages) {
        const { width, height } = page.getSize();
        // Scale down if needed
        if (quality < 0.7) {
          page.scale(quality, quality);
        }
      }
      
      compressedPdf = await newPdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 50,
      });
      
      attempts++;
    }
  } else {
    compressedPdf = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      objectsPerTick: 50,
    });
  }
  
  return new Blob([compressedPdf as BlobPart], { type: 'application/pdf' });
}

export async function mergePDFs(files: File[]): Promise<Blob> {
  const mergedPdf = await PDFDocument.create();
  
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => {
      mergedPdf.addPage(page);
    });
  }
  
  const mergedPdfBytes = await mergedPdf.save();
  return new Blob([mergedPdfBytes as BlobPart], { type: 'application/pdf' });
}

export async function splitPDF(file: File, pageRanges: { start: number; end: number }[]): Promise<Blob[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  const splitPdfs: Blob[] = [];
  
  for (const range of pageRanges) {
    const newPdf = await PDFDocument.create();
    const pages = await newPdf.copyPages(
      pdfDoc,
      Array.from({ length: range.end - range.start + 1 }, (_, i) => range.start + i - 1)
    );
    pages.forEach((page) => newPdf.addPage(page));
    
    const pdfBytes = await newPdf.save();
    splitPdfs.push(new Blob([pdfBytes as BlobPart], { type: 'application/pdf' }));
  }
  
  return splitPdfs;
}

export async function pdfToImages(file: File): Promise<string[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  const images: string[] = [];
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 });
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) continue;
    
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    await page.render(renderContext as any).promise;
    
    images.push(canvas.toDataURL('image/jpeg', 0.95));
  }
  
  return images;
}
