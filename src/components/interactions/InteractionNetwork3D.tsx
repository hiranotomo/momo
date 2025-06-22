import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Line, Html } from '@react-three/drei';
import * as THREE from 'three';

interface Node {
  id: string;
  position: [number, number, number];
  type: 'microbe' | 'plant' | 'metabolite';
  size: number;
  color: string;
}

interface Edge {
  start: [number, number, number];
  end: [number, number, number];
  type: 'symbiotic' | 'parasitic' | 'neutral';
  strength: number;
}

interface InteractionNetwork3DProps {
  onSelectNode: (node: Node) => void;
  viewMode: 'orbit' | 'fly';
}

function NetworkNode({ node, onClick }: { node: Node; onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      if (hovered) {
        meshRef.current.scale.setScalar(1.2);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const geometry = node.type === 'microbe' ? 'sphere' : node.type === 'plant' ? 'box' : 'octahedron';

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {geometry === 'sphere' && <sphereGeometry args={[node.size, 32, 32]} />}
        {geometry === 'box' && <boxGeometry args={[node.size * 1.5, node.size * 1.5, node.size * 1.5]} />}
        {geometry === 'octahedron' && <octahedronGeometry args={[node.size]} />}
        <meshStandardMaterial 
          color={node.color} 
          emissive={node.color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-background/90 text-white px-2 py-1 rounded text-xs">
            {node.id}
          </div>
        </Html>
      )}
    </group>
  );
}

function NetworkEdge({ edge }: { edge: Edge }) {
  const color = edge.type === 'symbiotic' ? '#4ade80' : 
                edge.type === 'parasitic' ? '#ef4444' : '#94a3b8';
  
  return (
    <Line
      points={[edge.start, edge.end]}
      color={color}
      lineWidth={edge.strength}
      opacity={0.6}
      transparent
    />
  );
}

function Scene({ nodes, edges, onSelectNode }: { 
  nodes: Node[]; 
  edges: Edge[]; 
  onSelectNode: (node: Node) => void;
}) {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {nodes.map((node) => (
        <NetworkNode 
          key={node.id} 
          node={node} 
          onClick={() => onSelectNode(node)}
        />
      ))}
      
      {edges.map((edge, index) => (
        <NetworkEdge key={index} edge={edge} />
      ))}
    </>
  );
}

const InteractionNetwork3D: React.FC<InteractionNetwork3DProps> = ({ 
  onSelectNode, 
  viewMode 
}) => {
  // Sample data
  const nodes: Node[] = [
    { id: 'Nostoc', position: [0, 0, 0], type: 'microbe', size: 0.8, color: '#4ade80' },
    { id: 'Bryum', position: [3, 2, -1], type: 'plant', size: 1, color: '#22d3ee' },
    { id: 'Syntrichia', position: [-2, 1, 2], type: 'plant', size: 0.9, color: '#22d3ee' },
    { id: 'Auxin', position: [1, -2, 1], type: 'metabolite', size: 0.6, color: '#f59e0b' },
    { id: 'Cytokinin', position: [-1, 3, -2], type: 'metabolite', size: 0.6, color: '#f59e0b' },
    { id: 'Bacillus', position: [2, -1, -3], type: 'microbe', size: 0.7, color: '#4ade80' },
    { id: 'Nitrogen', position: [-3, -2, 0], type: 'metabolite', size: 0.5, color: '#f59e0b' }
  ];

  const edges: Edge[] = [
    { start: [0, 0, 0], end: [3, 2, -1], type: 'symbiotic', strength: 3 },
    { start: [0, 0, 0], end: [1, -2, 1], type: 'symbiotic', strength: 2 },
    { start: [3, 2, -1], end: [-1, 3, -2], type: 'neutral', strength: 1 },
    { start: [-2, 1, 2], end: [2, -1, -3], type: 'symbiotic', strength: 2.5 },
    { start: [-3, -2, 0], end: [3, 2, -1], type: 'neutral', strength: 1.5 }
  ];

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [10, 10, 10], fov: 60 }}>
        <fog attach="fog" args={['#0a1628', 10, 50]} />
        <Scene nodes={nodes} edges={edges} onSelectNode={onSelectNode} />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={viewMode === 'orbit'}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default InteractionNetwork3D;