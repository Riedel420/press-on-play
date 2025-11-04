import { useEffect, useState } from 'react';

export function APITest() {
  const [status, setStatus] = useState<string>('Loading...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testAPI = async () => {
      try {
        setStatus('Initiating API connection test...');
        console.log(`[${new Date().toISOString()}] Testing API connection...`);

        const response = await fetch('/api/health', {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        });

        console.log(`[${new Date().toISOString()}] Response received:`, {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries())
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`[${new Date().toISOString()}] API response:`, data);
        setStatus(`API is healthy: ${JSON.stringify(data, null, 2)}`);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error(`[${new Date().toISOString()}] API test failed:`, errorMessage);
        setError(errorMessage);
        setStatus('Failed to connect to API');
      }
    };

    testAPI();
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      padding: '1rem',
      background: error ? '#fee' : '#efe',
      color: error ? '#800' : '#080',
      zIndex: 9999,
      fontFamily: 'monospace'
    }}>
      {error ? (
        <>
          <strong>Error:</strong> {error}
        </>
      ) : (
        status
      )}
    </div>
  );
}