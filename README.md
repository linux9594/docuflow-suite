# DocuTools Pro

A professional, enterprise-grade web application for document processing and file management. Built with modern technologies for optimal performance, security, and user experience.

## Overview

DocuTools Pro is a comprehensive suite of online document tools designed for professionals, businesses, and individuals who need fast, secure, and reliable file processing. All operations are performed entirely in the browser—your files never leave your device.

## Features

### Document Processing
- **PDF Compression** — Reduce PDF file sizes while maintaining quality
- **Targeted Compression** — Compress PDFs to specific sizes (100KB, 200KB)
- **PDF Merging** — Combine multiple PDF documents into one
- **PDF Splitting** — Divide large PDFs into smaller, manageable files

### File Conversion
- **JPG to PDF** — Convert images to PDF documents
- **PDF to JPG** — Extract images from PDF files
- **Word to PDF** — Convert DOCX documents to PDF format
- **PDF to Word** — Transform PDFs into editable Word documents

### Image Optimization
- **Image Compression** — Optimize JPG and PNG files for web use

## Key Benefits

- **100% Browser-Based** — All processing happens locally in your browser
- **Complete Privacy** — Files are never uploaded to external servers
- **No Registration** — Use all tools immediately without creating an account
- **Fast Processing** — Leverage modern browser APIs for optimal speed
- **Cross-Platform** — Works on any device with a modern web browser

## Technology Stack

- **React 18** — Modern component-based UI architecture
- **TypeScript** — Type-safe development experience
- **Vite** — Next-generation frontend build tool
- **Tailwind CSS** — Utility-first CSS framework
- **PDF-lib** — Pure JavaScript PDF manipulation
- **JSZip** — Client-side file compression

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/docutools-pro.git

# Navigate to project directory
cd docutools-pro

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## Deployment

### GitHub Pages

This project includes automatic deployment to GitHub Pages via GitHub Actions.

1. Push your code to the `main` branch
2. Go to repository Settings → Pages
3. Under "Build and deployment", select "GitHub Actions"
4. The site will be automatically deployed on each push to `main`

### Other Platforms

The production build (`dist/` folder) can be deployed to any static hosting service:

- **Netlify** — Drag and drop the `dist` folder
- **Vercel** — Import the repository and configure build settings
- **AWS S3** — Upload `dist` contents to an S3 bucket with static hosting
- **Cloudflare Pages** — Connect your repository for automatic deployments

## Project Structure

```
docutools-pro/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   └── ui/          # Base UI components
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Library configurations
├── .github/
│   └── workflows/       # GitHub Actions workflows
└── index.html           # Entry HTML file
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

Contributions are welcome. Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

© 2026 DocuTools Pro. All rights reserved.
