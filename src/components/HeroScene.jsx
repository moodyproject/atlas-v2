import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Eternal Flame ── */
function Flame() {
  const meshRef = useRef();
  const matRef = useRef();

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Teardrop / flame silhouette
    shape.moveTo(0, -0.6);
    shape.bezierCurveTo(0.5, -0.2, 0.45, 0.6, 0.15, 1.2);
    shape.bezierCurveTo(0.05, 1.5, -0.05, 1.5, -0.15, 1.2);
    shape.bezierCurveTo(-0.45, 0.6, -0.5, -0.2, 0, -0.6);

    const extrudeSettings = {
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.15,
      bevelSize: 0.1,
      bevelSegments: 12,
      curveSegments: 32,
    };
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center();
    return geo;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
      meshRef.current.scale.x = 1 + Math.sin(t * 2.5) * 0.03;
      meshRef.current.scale.y = 1 + Math.sin(t * 3.2) * 0.04 + Math.sin(t * 1.7) * 0.02;
    }
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.6 + Math.sin(t * 4) * 0.15 + Math.sin(t * 2.3) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0.6, 0]} scale={1.1}>
      <meshPhysicalMaterial
        ref={matRef}
        color="#c9a96e"
        emissive="#b8944f"
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.3}
        transparent
        opacity={0.65}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ── Inner glow core ── */
function FlameCore() {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.scale.x = 0.7 + Math.sin(t * 3.8) * 0.08;
      ref.current.scale.y = 0.85 + Math.sin(t * 4.5) * 0.1;
      ref.current.material.opacity = 0.4 + Math.sin(t * 3) * 0.15;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0.5, 0.2]}>
      <sphereGeometry args={[0.28, 16, 16]} />
      <meshBasicMaterial color="#f5e6c8" transparent opacity={0.5} />
    </mesh>
  );
}

/* ── Rising ember particles ── */
function Embers({ count = 60 }) {
  const ref = useRef();

  const { positions, velocities, lifetimes, offsets } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = [];
    const life = [];
    const off = [];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 1] = Math.random() * 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      vel.push({
        x: (Math.random() - 0.5) * 0.003,
        y: 0.005 + Math.random() * 0.01,
        z: (Math.random() - 0.5) * 0.003,
      });
      life.push(2 + Math.random() * 3);
      off.push(Math.random() * 5);
    }
    return { positions: pos, velocities: vel, lifetimes: life, offsets: off };
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const posAttr = ref.current.geometry.attributes.position;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const age = (t + offsets[i]) % lifetimes[i];
      const progress = age / lifetimes[i];

      if (progress < 0.01) {
        posAttr.array[i * 3] = (Math.random() - 0.5) * 0.3;
        posAttr.array[i * 3 + 1] = 0.2 + Math.random() * 0.3;
        posAttr.array[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      } else {
        posAttr.array[i * 3] += velocities[i].x + Math.sin(t * 2 + i) * 0.001;
        posAttr.array[i * 3 + 1] += velocities[i].y;
        posAttr.array[i * 3 + 2] += velocities[i].z + Math.cos(t * 1.5 + i) * 0.001;
      }
    }
    posAttr.needsUpdate = true;
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
        color="#d4b876"
        size={0.04}
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Candle base / pedestal ── */
function Pedestal() {
  return (
    <group position={[0, -1.1, 0]}>
      {/* main column */}
      <mesh>
        <cylinderGeometry args={[0.18, 0.22, 1.2, 32]} />
        <meshPhysicalMaterial
          color="#2c2820"
          roughness={0.6}
          metalness={0.4}
        />
      </mesh>
      {/* top rim */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.28, 0.18, 0.08, 32]} />
        <meshPhysicalMaterial
          color="#b8944f"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      {/* base */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.22, 0.35, 0.1, 32]} />
        <meshPhysicalMaterial
          color="#b8944f"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      {/* base plate */}
      <mesh position={[0, -0.68, 0]}>
        <cylinderGeometry args={[0.35, 0.38, 0.06, 32]} />
        <meshPhysicalMaterial
          color="#2c2820"
          roughness={0.5}
          metalness={0.5}
        />
      </mesh>
    </group>
  );
}

/* ── Soft ground plane for shadow/glow ── */
function GroundGlow() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.72, 0]}>
      <circleGeometry args={[2, 64]} />
      <meshBasicMaterial
        color="#b8944f"
        transparent
        opacity={0.06}
      />
    </mesh>
  );
}

/* ── Point light that flickers ── */
function FlameLight() {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.intensity = 2.5 + Math.sin(t * 4) * 0.5 + Math.sin(t * 2.7) * 0.3;
      ref.current.position.x = Math.sin(t * 3) * 0.05;
    }
  });

  return (
    <pointLight
      ref={ref}
      position={[0, 0.8, 0.5]}
      color="#f5e6c8"
      intensity={2.5}
      distance={6}
      decay={2}
    />
  );
}

/* ── Full scene ── */
function Scene() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} color="#f0ece2" />
      <directionalLight position={[3, 4, 5]} intensity={0.4} color="#f5e6c8" />

      <group ref={groupRef}>
        <Flame />
        <FlameCore />
        <Embers />
        <Pedestal />
        <FlameLight />
        <GroundGlow />
      </group>
    </>
  );
}

export default function HeroScene() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '55%',
        height: '100%',
        zIndex: 1,
        opacity: 0.9,
      }}
      className="hero-scene-container"
    >
      <Canvas
        camera={{ position: [0, 0.3, 4], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
