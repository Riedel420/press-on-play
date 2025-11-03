import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useNailDesign, type NailShape, type NailDesign } from "@/lib/stores/useNailDesign";

interface NailProps {
  nailId: number;
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: [number, number, number];
}

export function Nail({ nailId, position, rotation, scale = [1, 1, 1] }: NailProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const { nails, selectedNails, selectNail, currentFinish } = useNailDesign();
  const nailDesign = nails[nailId];
  const isSelected = selectedNails.includes(nailId);

  const geometry = useMemo(() => {
    return createNailGeometry(nailDesign.shape, nailDesign.length);
  }, [nailDesign.shape, nailDesign.length]);

  const compositeColor = useMemo(() => {
    const visibleLayers = nailDesign.layers.filter(l => l.visible);
    let finalColor = new THREE.Color(1, 0.75, 0.8);
    
    for (const layer of visibleLayers) {
      if (layer.type === 'color' && layer.color) {
        const layerColor = new THREE.Color(layer.color.r / 255, layer.color.g / 255, layer.color.b / 255);
        finalColor.lerp(layerColor, layer.opacity);
      } else if (layer.type === 'gradient' && layer.gradient) {
        const firstColor = layer.gradient.colors[0];
        if (firstColor) {
          const gradColor = new THREE.Color(firstColor.r / 255, firstColor.g / 255, firstColor.b / 255);
          finalColor.lerp(gradColor, layer.opacity * 0.7);
        }
      } else if (layer.type === 'pattern' || layer.type === 'texture') {
        const accentColor = new THREE.Color(1, 1, 1);
        finalColor.lerp(accentColor, layer.opacity * 0.2);
      } else if (layer.type === 'decal') {
        const decalColor = new THREE.Color(0.9, 0.85, 0.95);
        finalColor.lerp(decalColor, layer.opacity * 0.3);
      }
    }
    
    return finalColor;
  }, [nailDesign.layers]);

  const material = useMemo(() => {
    let roughness = 0.1;
    let metalness = 0.2;
    let envMapIntensity = 1.5;
    let emissive = new THREE.Color(0, 0, 0);
    let emissiveIntensity = 0;
    
    switch (currentFinish) {
      case 'matte':
        roughness = 0.9;
        metalness = 0;
        envMapIntensity = 0.3;
        break;
      case 'metallic':
        roughness = 0.2;
        metalness = 0.9;
        envMapIntensity = 2.0;
        break;
      case 'chrome':
        roughness = 0.05;
        metalness = 1.0;
        envMapIntensity = 3.0;
        break;
      case 'holographic':
        roughness = 0.1;
        metalness = 0.5;
        envMapIntensity = 4.0;
        emissive = new THREE.Color(0.3, 0.3, 0.5);
        emissiveIntensity = 0.3;
        break;
      case 'glossy':
      default:
        roughness = 0.1;
        metalness = 0.2;
        envMapIntensity = 1.5;
        break;
    }
    
    return new THREE.MeshStandardMaterial({
      color: compositeColor,
      roughness,
      metalness,
      envMapIntensity,
      emissive,
      emissiveIntensity,
    });
  }, [compositeColor, currentFinish]);

  useFrame(() => {
    if (meshRef.current && isSelected) {
      meshRef.current.scale.setScalar(1.02 + Math.sin(Date.now() * 0.005) * 0.02);
    } else if (meshRef.current) {
      meshRef.current.scale.set(1, 1, 1);
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        material={material}
        onClick={(e) => {
          e.stopPropagation();
          selectNail(nailId, e.shiftKey);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
        castShadow
        receiveShadow
      >
        {isSelected && (
          <meshBasicMaterial color="#00ff00" transparent opacity={0.3} />
        )}
      </mesh>
      
      {hovered && !isSelected && (
        <mesh geometry={geometry} scale={1.05}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
        </mesh>
      )}
    </group>
  );
}

function createNailGeometry(shape: NailShape, length: number): THREE.BufferGeometry {
  const adjustedLength = 0.3 + length * 0.4;
  
  switch (shape) {
    case "square":
      return new THREE.BoxGeometry(0.15, 0.05, adjustedLength);
    
    case "rounded":
      const roundedShape = new THREE.Shape();
      roundedShape.moveTo(-0.075, 0);
      roundedShape.lineTo(-0.075, adjustedLength - 0.075);
      roundedShape.quadraticCurveTo(-0.075, adjustedLength, 0, adjustedLength);
      roundedShape.quadraticCurveTo(0.075, adjustedLength, 0.075, adjustedLength - 0.075);
      roundedShape.lineTo(0.075, 0);
      roundedShape.lineTo(-0.075, 0);
      
      const extrudeSettings = {
        depth: 0.05,
        bevelEnabled: true,
        bevelThickness: 0.005,
        bevelSize: 0.005,
        bevelSegments: 2
      };
      return new THREE.ExtrudeGeometry(roundedShape, extrudeSettings);
    
    case "stiletto":
      const stilettoShape = new THREE.Shape();
      stilettoShape.moveTo(-0.075, 0);
      stilettoShape.lineTo(-0.05, adjustedLength * 0.7);
      stilettoShape.lineTo(0, adjustedLength);
      stilettoShape.lineTo(0.05, adjustedLength * 0.7);
      stilettoShape.lineTo(0.075, 0);
      stilettoShape.lineTo(-0.075, 0);
      return new THREE.ExtrudeGeometry(stilettoShape, { depth: 0.05, bevelEnabled: false });
    
    case "almond":
      const almondShape = new THREE.Shape();
      almondShape.moveTo(-0.075, 0);
      almondShape.lineTo(-0.07, adjustedLength * 0.6);
      almondShape.quadraticCurveTo(-0.04, adjustedLength * 0.9, 0, adjustedLength);
      almondShape.quadraticCurveTo(0.04, adjustedLength * 0.9, 0.07, adjustedLength * 0.6);
      almondShape.lineTo(0.075, 0);
      almondShape.lineTo(-0.075, 0);
      return new THREE.ExtrudeGeometry(almondShape, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.005 });
    
    case "coffin":
      const coffinShape = new THREE.Shape();
      coffinShape.moveTo(-0.075, 0);
      coffinShape.lineTo(-0.075, adjustedLength * 0.7);
      coffinShape.lineTo(-0.05, adjustedLength);
      coffinShape.lineTo(0.05, adjustedLength);
      coffinShape.lineTo(0.075, adjustedLength * 0.7);
      coffinShape.lineTo(0.075, 0);
      coffinShape.lineTo(-0.075, 0);
      return new THREE.ExtrudeGeometry(coffinShape, { depth: 0.05, bevelEnabled: false });
    
    case "oval":
    default:
      const ovalShape = new THREE.Shape();
      const radiusX = 0.075;
      const radiusY = adjustedLength / 2;
      for (let i = 0; i <= 32; i++) {
        const angle = (i / 32) * Math.PI;
        const x = radiusX * Math.cos(angle);
        const y = radiusY + radiusY * Math.sin(angle);
        if (i === 0) ovalShape.moveTo(x, y);
        else ovalShape.lineTo(x, y);
      }
      ovalShape.lineTo(-radiusX, 0);
      return new THREE.ExtrudeGeometry(ovalShape, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.003 });
  }
}
