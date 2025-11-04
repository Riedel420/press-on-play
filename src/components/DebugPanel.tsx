import { useEffect, useState } from 'react';

export function DebugPanel() {
  const [info, setInfo] = useState({
    mounted: new Date().toISOString(),
    renders: 0,
    error: null as string | null
  });

  useEffect(() => {
    setInfo(prev => ({ ...prev, renders: prev.renders + 1 }));

    const handleError = (event: ErrorEvent) => {
      console.error('Runtime error:', event.error);
      setInfo(prev => ({ ...prev, error: event.error?.message || 'Unknown error' }));
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return (
    <div className="debug">
      <div>Mounted: {info.mounted}</div>
      <div>Renders: {info.renders}</div>
      {info.error && <div style={{ color: '#ff6b6b' }}>Error: {info.error}</div>}
    </div>
  );
}