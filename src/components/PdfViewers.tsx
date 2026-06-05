import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Local worker setup for Vite
import * as pdfjsLib from 'pdfjs-dist';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export function PdfPresentationViewer({ url }: { url: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState(800);

  // Resize observer to make the PDF responsive to its container
  const containerRef = React.useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      const resizeObserver = new ResizeObserver((entries) => {
        if (entries[0]) {
          setContainerWidth(entries[0].contentRect.width);
        }
      });
      resizeObserver.observe(node);
    }
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div className="flex flex-col items-center w-full h-full bg-[#0a0a0a]" ref={containerRef}>
      <div className="flex-1 w-full flex items-center justify-center overflow-hidden min-h-0 relative group">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => console.error('Failed to load PDF', error)}
          loading={
            <div className="absolute inset-0 flex items-center justify-center text-muted font-mono animate-pulse">
              載入簡報中...
            </div>
          }
          error={
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/80 rounded-xl border border-white/10 m-2">
              <span className="text-red-400 font-mono mb-2 text-sm">無法載入簡報，檔案可能已毀損或遺失</span>
              <span className="text-white/60 font-mono text-xs">If you created an empty file, please use the <strong className="text-white">Upload File</strong> button to upload the real PDF instead.</span>
            </div>
          }
          className="flex items-center justify-center w-full h-full"
        >
          {numPages && (
            <Page 
              pageNumber={pageNumber} 
              renderTextLayer={false} 
              renderAnnotationLayer={false}
              width={containerWidth ? containerWidth * 0.95 : undefined}
              className="drop-shadow-2xl transition-all duration-300"
            />
          )}
        </Document>

        {/* Floating overlay controls */}
        {numPages && numPages > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-black/60 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-2xl">
            <button 
               onClick={() => setPageNumber(p => Math.max(1, p - 1))}
               disabled={pageNumber <= 1}
               className="p-1 hover:bg-white/20 rounded-full disabled:opacity-30 transition-colors text-white"
            >
               <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-white font-mono text-sm tracking-widest">
              {String(pageNumber).padStart(2, '0')} <span className="text-white/30 mx-1">/</span> {String(numPages).padStart(2, '0')}
            </span>
            <button 
               onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
               disabled={pageNumber >= numPages}
               className="p-1 hover:bg-white/20 rounded-full disabled:opacity-30 transition-colors text-white"
            >
               <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function PdfFullDocViewer({ url }: { url: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [containerWidth, setContainerWidth] = useState(800);

  const containerRef = React.useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      const resizeObserver = new ResizeObserver((entries) => {
        if (entries[0]) {
          setContainerWidth(entries[0].contentRect.width);
        }
      });
      resizeObserver.observe(node);
    }
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex flex-col items-center w-full bg-black py-8" ref={containerRef}>
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(error) => console.error('Failed to load PDF', error)}
        className="flex flex-col items-center w-full max-w-4xl gap-8"
        loading={<div className="text-muted font-mono animate-pulse py-20">載入完整行程表中...</div>}
        error={
          <div className="flex flex-col items-center justify-center text-center p-8 bg-[#0d0d0d] rounded-2xl border border-white/10 w-full">
            <span className="text-red-400 font-mono mb-2">無法載入簡報，檔案可能已毀損或遺失</span>
            <span className="text-white/60 font-mono text-sm">If you created an empty file, please use the <strong className="text-white">Upload File</strong> button to upload the real PDF instead.</span>
          </div>
        }
      >
        {Array.from(new Array(numPages || 0), (el, index) => (
          <div key={`page_${index + 1}`} className="w-full relative shadow-2xl rounded-xl overflow-hidden border border-white/10 group">
            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 border border-white/10">
              PAGE {index + 1}
            </div>
            <Page 
              pageNumber={index + 1} 
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={containerWidth ? containerWidth : undefined}
              className="w-full bg-white"
            />
          </div>
        ))}
      </Document>
    </div>
  );
}
