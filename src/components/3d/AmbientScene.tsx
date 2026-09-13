import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import styles from './AmbientScene.module.css';

// Simple deterministic pseudo-random helper to satisfy linter purity rules
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

const NeuralNodes: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 75;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color('#38bdf8');
    const border = new THREE.Color('#334155');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 8;
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 8;
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 8;

      const mixColor = pseudoRandom(i + 100) > 0.4 ? cyan : border;
      col[i * 3] = mixColor.r;
      col[i * 3 + 1] = mixColor.g;
      col[i * 3 + 2] = mixColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state: { clock: THREE.Clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
      />
    </points>
  );
};

export const AmbientScene: React.FC = () => {
  // Lazy state initialization to prevent synchronous setState inside useEffect
  const [shouldRender] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hasWebGL = (() => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch {
        return false;
      }
    })();

    return !mediaQuery.matches && hasWebGL;
  });

  if (!shouldRender) {
    return null;
  }

  return (
    <div className={styles.canvasContainer} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <NeuralNodes />
      </Canvas>
    </div>
  );
};

export default AmbientScene;
