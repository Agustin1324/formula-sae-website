import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text, Environment } from '@react-three/drei';
import { ChassisModel } from './ChassisModel';

export function ChassisModelViewer() {
  const [error, setError] = useState<string | null>(null);

  // Manejo de errores globales de WebGL
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('WebGL') || event.message.includes('three.js')) {
        console.error('Error en el renderizado 3D:', event);
        setError('Error al inicializar el visualizador 3D');
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-200 rounded-lg">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <Canvas
      shadows
      style={{ height: '500px' }}
      camera={{ position: [3, 2, 3] }}
      onError={(e) => {
        console.error('Error en Canvas:', e);
        setError('Error en el visualizador 3D');
      }}
    >
      <color attach="background" args={['#f0f0f0']} />
      <PerspectiveCamera makeDefault position={[3, 2, 3]} />
      
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight
        position={[-5, 3, 0]}
        intensity={0.8}
        castShadow={false}
      />
      
      <Environment preset="warehouse" />
      <OrbitControls
        enableDamping={true}
        dampingFactor={0.25}
        rotateSpeed={0.5}
        minDistance={2}
        maxDistance={10}
        target={[0, -0.5, 0]}
      />
      
      <Suspense 
        fallback={
          <Text
            color="black"
            anchorX="center"
            anchorY="middle"
            fontSize={0.2}
            position={[0, 0, 0]}
          >
            Cargando modelo 3D...
          </Text>
        }
      >
        <ChassisModel />
      </Suspense>
    </Canvas>
  );
}
