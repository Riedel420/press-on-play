import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei";
import { Hand } from "./Hand";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense } from "react";

export function Scene() {
  return (
    <Canvas shadows gl={{ antialias: true, alpha: true }}>
      <color attach="background" args={["#1a1a1a"]} />
      
      <PerspectiveCamera makeDefault position={[0, 3, 4]} fov={50} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2}
      />

      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-5, 3, -5]} intensity={0.6} />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.8}
        castShadow
      />
      
      <Environment preset="studio" />

      <Suspense fallback={null}>
        <Hand />
      </Suspense>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.3} />
      </mesh>

      <EffectComposer>
        <Bloom intensity={0.3} luminanceThreshold={0.9} luminanceSmoothing={0.9} />
      </EffectComposer>
    </Canvas>
  );
}
