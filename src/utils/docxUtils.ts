import mammoth from 'mammoth';
import { jsPDF } from 'jspdf';
// @ts-ignore
import htmlDocx from 'html-docx-js/dist/html-docx';

export async function wordToPDF(file: File): Promise<Blob> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer });
    const html = result.value;
    
    // Create PDF from HTML
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    
    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    tempDiv.style.width = `${pageWidth - 2 * margin}mm`;
    
    // Simple text extraction and PDF generation
    const text = tempDiv.textContent || '';
    const lines = pdf.splitTextToSize(text, pageWidth - 2 * margin);
    
    let y = margin;
    lines.forEach((line: string) => {
      if (y > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
      pdf.text(line, margin, y);
      y += 7;
    });
    
    return pdf.output('blob');
  } catch (error) {
    console.error('Error converting Word to PDF:', error);
    throw new Error('Failed to convert Word document to PDF');
  }
}

export async function pdfToWord(pdfText: string): Promise<Blob> {
  try {
    // Create HTML from text
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Calibri, sans-serif; font-size: 11pt; line-height: 1.5; }
            p { margin: 0 0 10pt 0; }
          </style>
        </head>
        <body>
          ${pdfText.split('\n').map(line => `<p>${line}</p>`).join('')}
        </body>
      </html>
    `;
    
    // Convert HTML to DOCX
    const docx = htmlDocx.asBlob(html);
    return docx;
  } catch (error) {
    console.error('Error converting PDF to Word:', error);
    throw new Error('Failed to convert PDF to Word document');
  }
}

export async function extractTextFromPDF(file: File): Promise<string> {
  // This is a simplified version - in production you'd use pdf.js
  const text = await file.text();
  return text;
}
