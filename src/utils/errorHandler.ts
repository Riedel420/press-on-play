export function setupErrorHandler() {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    // Log to console
    originalConsoleError.apply(console, args);
    
    // Add error to debug panel if available
    const debugPanel = document.querySelector('.debug');
    if (debugPanel) {
      const errorDiv = document.createElement('div');
      errorDiv.style.color = '#ff6b6b';
      errorDiv.textContent = `Error: ${args.join(' ')}`;
      debugPanel.appendChild(errorDiv);
    }
  };

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
  });

  window.addEventListener('error', (event) => {
    console.error('Runtime Error:', event.error);
  });
}