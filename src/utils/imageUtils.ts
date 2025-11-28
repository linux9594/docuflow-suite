import imageCompression from 'browser-image-compression';
import { jsPDF } from 'jspdf';

export async function compressImage(file: File, maxSizeMB: number = 0.2): Promise<Blob> {
  const options = {
    maxSizeMB,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    initialQuality: 0.5,
    alwaysKeepResolution: false,
  };
  
  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
}

export async function imagesToPDF(files: File[]): Promise<Blob> {
  const pdf = new jsPDF();
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const imageData = await readFileAsDataURL(file);
    
    if (i > 0) {
      pdf.addPage();
    }
    
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = imageData;
    });
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    const imgWidth = img.width;
    const imgHeight = img.height;
    const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
    
    const finalWidth = imgWidth * ratio;
    const finalHeight = imgHeight * ratio;
    
    const x = (pageWidth - finalWidth) / 2;
    const y = (pageHeight - finalHeight) / 2;
    
    pdf.addImage(imageData, 'JPEG', x, y, finalWidth, finalHeight);
  }
  
  return pdf.output('blob');
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
