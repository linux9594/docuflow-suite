import mammoth from 'mammoth';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { GlobalWorkerOptions as PdfGlobalWorkerOptions, getDocument as pdfGetDocument } from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

PdfGlobalWorkerOptions.workerSrc = pdfWorker;

export async function wordToPDF(file: File): Promise<Blob> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer });
    const html = result.value;
    
    // Create PDF from HTML with better formatting
    const pdf = new jsPDF({
      unit: 'pt',
      format: 'a4',
    });
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 40;
    const maxWidth = pageWidth - 2 * margin;
    
    // Create a temporary div to parse HTML and maintain formatting
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    tempDiv.style.width = `${maxWidth}px`;
    tempDiv.style.fontFamily = 'Arial, sans-serif';
    tempDiv.style.fontSize = '12pt';
    tempDiv.style.lineHeight = '1.6';
    document.body.appendChild(tempDiv);
    
    let y = margin;
    const lineHeight = 18;
    
    // Process each paragraph and element
    const elements = tempDiv.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, div');
    
    elements.forEach((element) => {
      const text = element.textContent?.trim() || '';
      if (!text) return;
      
      // Set font based on element type
      const tagName = element.tagName.toLowerCase();
      if (tagName.startsWith('h')) {
        pdf.setFontSize(tagName === 'h1' ? 18 : tagName === 'h2' ? 16 : 14);
        pdf.setFont('helvetica', 'bold');
      } else {
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
      }
      
      // Split text to fit width
      const lines = pdf.splitTextToSize(text, maxWidth);
      
      lines.forEach((line: string) => {
        if (y + lineHeight > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(line, margin, y);
        y += lineHeight;
      });
      
      // Add spacing after element
      y += lineHeight * 0.3;
    });
    
    document.body.removeChild(tempDiv);
    return pdf.output('blob');
  } catch (error) {
    console.error('Error converting Word to PDF:', error);
    throw new Error('Failed to convert Word document to PDF');
  }
}

export async function pdfToWord(pdfText: string): Promise<Blob> {
  try {
    // Create a new document with the extracted text
    const paragraphs = pdfText.split('\n').map(line => 
      new Paragraph({
        children: [new TextRun(line || ' ')],
      })
    );

    const doc = new Document({
      sections: [{
        properties: {},
        children: paragraphs,
      }],
    });

    // Generate the DOCX file
    const blob = await Packer.toBlob(doc);
    return blob;
  } catch (error) {
    console.error('Error converting PDF to Word:', error);
    throw new Error('Failed to convert PDF to Word document');
  }
}

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // Use pdf.js to properly extract text (client-side, no backend)
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfGetDocument({ data: arrayBuffer }).promise;

    let fullText = '';
    
    // Extract text from each page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      
      // Combine text items with proper spacing
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      
      fullText += pageText + '\n\n';
    }
    
    return fullText.trim() || 'No text content found in PDF. The PDF might be image-based or scanned.';
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
}
