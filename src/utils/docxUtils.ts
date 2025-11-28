import mammoth from 'mammoth';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

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
  // This is a simplified version - in production you'd use pdf.js with proper text extraction
  try {
    // For now, we'll use a basic approach
    // In a real implementation, you'd use pdf.js getTextContent()
    const arrayBuffer = await file.arrayBuffer();
    const text = new TextDecoder().decode(arrayBuffer);
    
    // Extract readable text (very basic)
    const cleanText = text
      .replace(/[^\x20-\x7E\n]/g, ' ')
      .split('\n')
      .filter(line => line.trim().length > 0)
      .join('\n');
    
    return cleanText || 'Unable to extract text from this PDF. The PDF might be image-based or use a complex encoding.';
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
}
