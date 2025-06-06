import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '../components/App';
import { preloadFonts } from './font-utils';
import { downloadPdf } from './pdf-downloader.js';
import { ContentEditor } from '../components/ContentEditor';

// Preload fonts for better rendering
preloadFonts();

// Убедимся, что документ имеет класс dark
document.documentElement.classList.add('dark');

// Initialize React App and PDF functionality
document.addEventListener('DOMContentLoaded', () => {
  // Initialize React App
  const container = document.getElementById('app-root');
  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    console.error('Container element #app-root not found');
  }

  // Initialize the PDF download button
  const downloadButton = document.getElementById('download-pdf-button');
  if (downloadButton) {
    downloadButton.addEventListener('click', async () => {
      // Show loading state
      const originalText = downloadButton.textContent;
      downloadButton.textContent = 'Generating PDF...';
      downloadButton.disabled = true;
      
      try {
        // Generate and download the PDF
        await downloadPdf();
      } finally {
        // Restore button state
        downloadButton.textContent = originalText;
        downloadButton.disabled = false;
      }
    });
  }

  // Render the content editor
  const editorRoot = document.getElementById('content-editor-root');
  if (editorRoot) {
    const editorRootNode = createRoot(editorRoot);
    editorRootNode.render(<ContentEditor />);
  } else {
    console.error('Container element #content-editor-root not found');
  }
}); 