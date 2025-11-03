import { Nail } from "./Nail";
import { useNailDesign } from "@/lib/stores/useNailDesign";
import * as THREE from "three";

export function Hand() {
  const { skinTone, handPose } = useNailDesign();
  
  const skinColor = new THREE.Color(
    skinTone.r / 255,
    skinTone.g / 255,
    skinTone.b / 255
  );

  const fingerPositions = getFingerPositions(handPose);

  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.3, 1.5]} />
        <meshStandardMaterial color={skinColor} roughness={0.8} metalness={0.1} />
      </mesh>

      {fingerPositions.map((finger, index) => (
        <Finger
          key={index}
          fingerId={index}
          position={finger.position}
          rotation={finger.rotation}
          nailId={finger.nailId}
          skinColor={skinColor}
        />
      ))}
    </group>
  );
}

interface FingerProps {
  fingerId: number;
  position: [number, number, number];
  rotation: [number, number, number];
  nailId: number;
  skinColor: THREE.Color;
}

function Finger({ position, rotation, nailId, skinColor }: FingerProps) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, 0.25]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.09, 0.5, 16]} />
        <meshStandardMaterial color={skinColor} roughness={0.8} metalness={0.1} />
      </mesh>
      
      <mesh position={[0, 0, 0.6]} castShadow receiveShadow>
        <cylinderGeometry args={[0.075, 0.08, 0.3, 16]} />
        <meshStandardMaterial color={skinColor} roughness={0.8} metalness={0.1} />
      </mesh>
      
      <Nail
        nailId={nailId}
        position={[0, 0.025, 0.78]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

interface FingerPosition {
  position: [number, number, number];
  rotation: [number, number, number];
  nailId: number;
}

function getFingerPositions(pose: string): FingerPosition[] {
  switch (pose) {
    case "spread":
      return [
        { position: [-0.5, 0, 0.3], rotation: [0, 0, -0.5], nailId: 0 },
        { position: [-0.25, 0, 0.6], rotation: [0, 0, -0.2], nailId: 1 },
        { position: [0, 0, 0.7], rotation: [0, 0, 0], nailId: 2 },
        { position: [0.25, 0, 0.6], rotation: [0, 0, 0.2], nailId: 3 },
        { position: [0.5, 0, 0.3], rotation: [0, 0, 0.5], nailId: 4 },
        { position: [0.5, 0, -0.3], rotation: [0, 0, 0.5], nailId: 5 },
        { position: [0.25, 0, -0.6], rotation: [0, 0, 0.2], nailId: 6 },
        { position: [0, 0, -0.7], rotation: [0, 0, 0], nailId: 7 },
        { position: [-0.25, 0, -0.6], rotation: [0, 0, -0.2], nailId: 8 },
        { position: [-0.5, 0, -0.3], rotation: [0, 0, -0.5], nailId: 9 },
      ];
    
    case "fist":
      return [
        { position: [-0.4, 0.15, 0.3], rotation: [0.8, 0, -0.3], nailId: 0 },
        { position: [-0.2, 0.2, 0.5], rotation: [0.8, 0, -0.1], nailId: 1 },
        { position: [0, 0.2, 0.55], rotation: [0.8, 0, 0], nailId: 2 },
        { position: [0.2, 0.2, 0.5], rotation: [0.8, 0, 0.1], nailId: 3 },
        { position: [0.4, 0.15, 0.3], rotation: [0.8, 0, 0.3], nailId: 4 },
        { position: [0.4, 0.15, -0.3], rotation: [0.8, 0, 0.3], nailId: 5 },
        { position: [0.2, 0.2, -0.5], rotation: [0.8, 0, 0.1], nailId: 6 },
        { position: [0, 0.2, -0.55], rotation: [0.8, 0, 0], nailId: 7 },
        { position: [-0.2, 0.2, -0.5], rotation: [0.8, 0, -0.1], nailId: 8 },
        { position: [-0.4, 0.15, -0.3], rotation: [0.8, 0, -0.3], nailId: 9 },
      ];
    
    case "relaxed":
    default:
      return [
        { position: [-0.45, 0, 0.4], rotation: [0, 0, -0.3], nailId: 0 },
        { position: [-0.22, 0, 0.65], rotation: [0, 0, -0.1], nailId: 1 },
        { position: [0, 0, 0.7], rotation: [0, 0, 0], nailId: 2 },
        { position: [0.22, 0, 0.65], rotation: [0, 0, 0.1], nailId: 3 },
        { position: [0.45, 0, 0.4], rotation: [0, 0, 0.3], nailId: 4 },
        { position: [0.45, 0, -0.4], rotation: [0, 0, 0.3], nailId: 5 },
        { position: [0.22, 0, -0.65], rotation: [0, 0, 0.1], nailId: 6 },
        { position: [0, 0, -0.7], rotation: [0, 0, 0], nailId: 7 },
        { position: [-0.22, 0, -0.65], rotation: [0, 0, -0.1], nailId: 8 },
        { position: [-0.45, 0, -0.4], rotation: [0, 0, -0.3], nailId: 9 },
      ];
  }
}
