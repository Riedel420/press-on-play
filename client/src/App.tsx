import { Suspense } from "react";
import "@fontsource/inter";
import { Scene } from "./components/Scene";
import { StudioUI } from "./components/StudioUI";
import { SoundManager } from "./components/SoundManager";

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Scene />
      <StudioUI />
      <SoundManager />
    </div>
  );
}

export default App;
