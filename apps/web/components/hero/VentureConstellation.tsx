"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import Link from "next/link";
import { PALETTE_LIGHT_GRADIENT } from "@nevrora/config";

interface OrbitalNodeProps {
  radius: number;
  speed: number;
  size: number;
  color: string;
  badgeNumber: string;
  label: string;
  slug: string;
  initialAngle?: number;
}

function OrbitalRing({ radius }: { radius: number }) {
  const points = React.useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(
          Math.cos(theta) * radius,
          0,
          Math.sin(theta) * radius,
        ),
      );
    }
    return pts;
  }, [radius]);

  const lineGeometry = React.useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <primitive
      object={
        new THREE.Line(
          lineGeometry,
          new THREE.LineBasicMaterial({
            color: new THREE.Color("#3B82F6"),
            transparent: true,
            opacity: 0.22,
          }),
        )
      }
    />
  );
}

function OrbitalNode({
  radius,
  speed,
  size,
  color,
  badgeNumber,
  label,
  slug,
  initialAngle = 0,
}: OrbitalNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const angleRef = useRef(initialAngle);

  useFrame((_, delta) => {
    if (!hovered) {
      angleRef.current += speed * delta;
    }
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(angleRef.current) * radius;
      meshRef.current.position.z = Math.sin(angleRef.current) * radius;
      meshRef.current.position.y = Math.sin(angleRef.current * 2) * 0.2;
    }
  });

  return (
    <group name={label}>
      <mesh
        ref={meshRef}
        name={label}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => {
          if (typeof window !== "undefined") {
            window.location.href = `/products/${slug}`;
          }
        }}
      >
        <sphereGeometry args={[hovered ? size * 1.35 : size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.9 : 0.5}
          roughness={0.15}
          metalness={0.8}
        />
        {/* Interactive HTML Product Label */}
        <Html
          position={[0, size + 0.35, 0]}
          center
          distanceFactor={7}
          zIndexRange={[100, 0]}
        >
          <Link
            href={`/products/${slug}`}
            className="pointer-events-auto flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold backdrop-blur-md shadow-md bg-white/90 text-[#0B1020] border border-slate-200/90 hover:border-blue-500 hover:scale-105 transition-all whitespace-nowrap cursor-pointer"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                badgeNumber === "01" ? "bg-blue-600" : "bg-violet-600"
              } animate-pulse shrink-0`}
            />
            <span className="text-[10px] font-mono text-blue-600 font-bold">
              {badgeNumber}
            </span>
            <span>{label}</span>
          </Link>
        </Html>
      </mesh>
    </group>
  );
}

function TranslucentStage() {
  return (
    <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[4.2, 64]} />
      <meshStandardMaterial
        color="#FFFFFF"
        transparent
        opacity={0.12}
        roughness={0.1}
        metalness={0.05}
      />
    </mesh>
  );
}

function CoreNucleus() {
  const coreRef = useRef<THREE.Mesh>(null);
  const outerPulseRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4;
      coreRef.current.rotation.x += delta * 0.2;
    }
    if (outerPulseRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.08;
      outerPulseRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group>
      {/* Dense central core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.55, 2]} />
        <meshStandardMaterial
          color="#2563EB"
          emissive="#3B82F6"
          emissiveIntensity={0.7}
          roughness={0.2}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>

      {/* Subtle outer halo */}
      <mesh ref={outerPulseRef}>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshBasicMaterial
          color="#7C3AED"
          transparent
          opacity={0.18}
          wireframe
        />
      </mesh>
    </group>
  );
}

function SceneContainer() {
  const sceneGroup = useRef<THREE.Group>(null);

  useFrame(({ pointer }) => {
    if (sceneGroup.current) {
      // Gentle parallax reacting to pointer
      sceneGroup.current.rotation.y = THREE.MathUtils.lerp(
        sceneGroup.current.rotation.y,
        pointer.x * 0.35,
        0.05,
      );
      sceneGroup.current.rotation.x = THREE.MathUtils.lerp(
        sceneGroup.current.rotation.x,
        -pointer.y * 0.25 + 0.4,
        0.05,
      );
    }
  });

  return (
    <group ref={sceneGroup} rotation={[0.4, 0, 0]}>
      {/* Translucent Frosted Glass Stage */}
      <TranslucentStage />

      {/* Central Core Nucleus */}
      <CoreNucleus />

      {/* Luminous Orbital Rings */}
      <OrbitalRing radius={1.6} />
      <OrbitalRing radius={2.5} />
      <OrbitalRing radius={3.4} />

      {/* In-Orbit Product Nodes: Strictly Launch Products */}
      <OrbitalNode
        radius={2.5}
        speed={0.35}
        size={0.16}
        color={PALETTE_LIGHT_GRADIENT.cobalt}
        badgeNumber="01"
        label="Neermiti Collections"
        slug="neermiti-collections"
        initialAngle={0.8}
      />
      <OrbitalNode
        radius={3.4}
        speed={0.22}
        size={0.18}
        color={PALETTE_LIGHT_GRADIENT.violet}
        badgeNumber="02"
        label="Sadhana Daily"
        slug="sadhana-daily"
        initialAngle={3.2}
      />
    </group>
  );
}

export function VentureConstellation() {
  return (
    <div className="relative w-full min-w-0 max-w-full h-[400px] md:h-[500px] overflow-hidden">
      <Canvas
        camera={{ position: [0, 2.5, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <pointLight
          position={[0, 0, 0]}
          intensity={2.8}
          color="#3B82F6"
          distance={10}
        />
        <directionalLight position={[5, 10, 7]} intensity={1.4} />
        <SceneContainer />
      </Canvas>

      {/* Floating Interactive Legend */}
      <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 max-w-[calc(100%-2rem)] text-[10px] sm:text-xs text-slate-600 bg-white/80 px-3 py-1.5 rounded-full border border-slate-200/80 backdrop-blur-sm truncate shadow-sm">
        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shrink-0" />
        <span className="truncate">
          3D Venture Constellation &bull; Orbital Interactive Canvas
        </span>
      </div>
    </div>
  );
}
