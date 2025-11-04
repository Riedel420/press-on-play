import { Suspense, Component, ErrorInfo } from "react";
import "@fontsource/inter";
import { APITest } from "./components/APITest.tsx";
import { DebugPanel } from "./components/DebugPanel.tsx";

class ErrorBoundary extends Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red', background: '#fff' }}>
          <h2>Something went wrong.</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error?.message}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f0f0f0',
        color: '#000'
      }}>
        <h1 style={{ 
          fontSize: '2rem', 
          marginBottom: '2rem',
          color: '#333'
        }}>
          Press-On Play™
        </h1>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p>Initializing application...</p>
        </div>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading API test...</div>}>
            <APITest />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading debug panel...</div>}>
            <DebugPanel />
          </Suspense>
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}

export default App;
