import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text, Environment } from '@react-three/drei';
import { ChassisModel } from './ChassisModel';

export function ChassisModelViewer() {
  return (
    <Canvas shadows style={{ height: '500px' }}>
      <color attach="background" args={['#f0f0f0']} />
      <PerspectiveCamera makeDefault position={[3, 2, 3]} />
      
      {/* Luz ambiente más intensa */}
      <ambientLight intensity={0.8} />
      
      {/* Luz principal direccional más brillante */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Luz de relleno adicional */}
      <directionalLight
        position={[-5, 3, 0]}
        intensity={0.8}
        castShadow={false}
      />
      
      {/* HDRI para reflexiones metálicas realistas */}
      <Environment preset="warehouse" />
      <OrbitControls
        enableDamping={true}
        dampingFactor={0.25}
        rotateSpeed={0.5}
        minDistance={2}
        maxDistance={10}
        target={[0, -0.5, 0]} // El target coincide con la posición del modelo
      />
      <Suspense fallback={<Text color="white" anchorX="center" anchorY="middle">Cargando modelo 3D...</Text>}>
        <ChassisModel />
      </Suspense>
    </Canvas>
  );
}
