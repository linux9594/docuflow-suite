import { PDFDocument } from 'pdf-lib';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import { jsPDF } from 'jspdf';

// Set up PDF.js worker for client-side usage with Vite
GlobalWorkerOptions.workerSrc = pdfWorker;


export async function compressPDF(file: File, targetSizeKB?: number): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  
  if (targetSizeKB) {
    // For target sizes (100KB, 200KB), use aggressive image-based compression
    return await aggressiveCompressPDF(arrayBuffer, targetSizeKB);
  } else {
    // For normal compression (40-60%), use standard compression
    return await standardCompressPDF(arrayBuffer);
  }
}

async function standardCompressPDF(arrayBuffer: ArrayBuffer): Promise<Blob> {
  // Convert PDF pages to images and recreate with reduced quality aiming for ~40-60% size reduction
  const pdf = await getDocument({ data: arrayBuffer }).promise;
  const newPdf = new jsPDF();
  let isFirstPage = true;
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.2 });
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) continue;
    
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    await page.render({
      canvasContext: context,
      viewport: viewport,
    } as any).promise;
    
    // Compress image to JPEG with quality 0.5 (typically 40-60% compression depending on content)
    const imgData = canvas.toDataURL('image/jpeg', 0.5);

    if (!isFirstPage) {
      newPdf.addPage();
    }
    isFirstPage = false;
    
    const pageWidth = newPdf.internal.pageSize.getWidth();
    const pageHeight = newPdf.internal.pageSize.getHeight();
    newPdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
  }
  
  return newPdf.output('blob');
}

async function aggressiveCompressPDF(arrayBuffer: ArrayBuffer, targetSizeKB: number): Promise<Blob> {
  const pdf = await getDocument({ data: arrayBuffer }).promise;
  const numPages = pdf.numPages;
  
  // Start with moderate quality/scale and aggressively reduce towards target
  let quality = 0.4;
  let scale = 1.0;
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    const newPdf = new jsPDF();
    let isFirstPage = true;
    
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: scale });
      
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) continue;
      
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      await page.render({
        canvasContext: context,
        viewport: viewport,
      } as any).promise;
      
      // Aggressive JPEG compression
      const imgData = canvas.toDataURL('image/jpeg', quality);
      
      if (!isFirstPage) {
        newPdf.addPage();
      }
      isFirstPage = false;
      
      const pageWidth = newPdf.internal.pageSize.getWidth();
      const pageHeight = newPdf.internal.pageSize.getHeight();
      newPdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
    }
    
    const resultBlob = newPdf.output('blob');
    const currentSizeKB = resultBlob.size / 1024;
    
    // If we're within ~15% of target or below, we're done
    if (currentSizeKB <= targetSizeKB * 1.15) {
      return resultBlob;
    }
    
    // Adjust quality and scale for next attempt (clamped to avoid going to 0)
    const ratio = targetSizeKB / currentSizeKB;
    quality = Math.max(quality * ratio * 0.85, 0.05);
    scale = Math.max(scale * Math.sqrt(ratio), 0.2);
    
    attempts++;
  }

  // Return best effort
  const finalPdf = new jsPDF();
  let isFirstPage = true;
  
  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: scale });
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) continue;
    
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    await page.render({
      canvasContext: context,
      viewport: viewport,
    } as any).promise;
    
    const imgData = canvas.toDataURL('image/jpeg', quality);
    
    if (!isFirstPage) {
      finalPdf.addPage();
    }
    isFirstPage = false;
    
    const pageWidth = finalPdf.internal.pageSize.getWidth();
    const pageHeight = finalPdf.internal.pageSize.getHeight();
    finalPdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
  }
  
  return finalPdf.output('blob');
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
  const pdf = await getDocument({ data: arrayBuffer }).promise;

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
