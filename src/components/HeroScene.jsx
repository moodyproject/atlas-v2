import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function WarmTorus() {
  const meshRef = useRef();
  const wireRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.08;
      meshRef.current.rotation.y = t * 0.12;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.08;
      wireRef.current.rotation.y = t * 0.12;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.2, 0.4, 200, 32, 2, 3]} />
        <meshPhysicalMaterial
          color="#c9a96e"
          roughness={0.15}
          metalness={0.8}
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={wireRef}>
        <torusKnotGeometry args={[1.2, 0.4, 80, 16, 2, 3]} />
        <meshBasicMaterial
          color="#b8944f"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

function FloatingRing({ radius, speed, rotationAxis }) {
  const ref = useRef();
  const points = useMemo(() => {
    const pts = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
    }
    return pts;
  }, [radius]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation[rotationAxis] = t * speed;
    }
  });

  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#d4b876" transparent opacity={0.15} />
    </line>
  );
}

function Particles() {
  const ref = useRef();
  const count = 40;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#c9a96e"
        size={0.025}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#f5e6c8" />
      <directionalLight position={[-3, -2, 4]} intensity={0.3} color="#b8944f" />

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <WarmTorus />
      </Float>

      <FloatingRing radius={2.2} speed={0.05} rotationAxis="x" />
      <FloatingRing radius={2.6} speed={-0.03} rotationAxis="y" />
      <FloatingRing radius={3.0} speed={0.02} rotationAxis="z" />

      <Particles />
    </>
  );
}

export default function HeroScene() {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '55%',
      height: '100%',
      zIndex: 1,
      opacity: 0.85,
    }}
    className="hero-scene-container"
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
