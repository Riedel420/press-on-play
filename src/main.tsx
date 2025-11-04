import { createRoot } from "react-dom/client";
import { StrictMode, Suspense } from "react";
import App from "./App.tsx";
import "./index.css";
import { setupErrorHandler } from "./utils/errorHandler.ts";

console.log('[Debug] Starting application...');

const RootErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      onError={(event) => {
        event.preventDefault();
        console.error('[Root Error]:', event);
      }}
    >
      <Suspense fallback={<div>Loading application...</div>}>
        {children}
      </Suspense>
    </div>
  );
};

try {
  console.log('[Debug] Looking for root element...');
  const rootElement = document.getElementById("root");
  if (!rootElement) throw new Error("Failed to find the root element");
  
  console.log('[Debug] Creating root...');
  const root = createRoot(rootElement);

  console.log('[Debug] Setting up error handler...');
  setupErrorHandler();

  console.log('[Debug] Rendering app...');
  root.render(
    <StrictMode>
      <RootErrorBoundary>
        <App />
      </RootErrorBoundary>
    </StrictMode>
  );
  console.log('[Debug] App rendered successfully');
} catch (error: unknown) {
  console.error('[Debug] Error in main:', error);
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  document.body.innerHTML = `<div style="padding: 20px; color: red;">Error: ${errorMessage}</div>`;
}
