import { useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { MeshStandardMaterial } from 'three';

export function ChassisModel() {
  const groupRef = useRef<THREE.Group>(null);
  const [error, setError] = useState<string | null>(null);
  const { scene } = useGLTF("/chassis/modelo_nuevo/Chasis8.glb");

  useEffect(() => {
    if (scene && groupRef.current) {
      try {
        // Reset position and rotation
        scene.position.set(0, -0.5, 0);
        scene.rotation.set(0, Math.PI / 2, 0); // 90 grados alrededor del eje Y - vista lateral

        // Escala inicial del modelo
        scene.scale.setScalar(1);

        // Crear y aplicar material metálico
        const metalMaterial = new MeshStandardMaterial({
          color: 0x444444,      // Color gris oscuro
          metalness: 0.9,       // Muy metálico
          roughness: 0.3,       // Bastante pulido
          envMapIntensity: 1.0  // Intensidad de reflexiones
        });

        // Aplicar el material a todos los meshes del modelo
        scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = metalMaterial;
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        groupRef.current.add(scene);
      } catch (err) {
        console.error("Error al procesar el modelo:", err);
        setError("Error al procesar el modelo");
      }
    }
  }, [scene]);

  if (error) {
    return <Text color="red" anchorX="center" anchorY="middle">{error}</Text>;
  }

  return <group ref={groupRef} />;
}

// Precarga del modelo
useGLTF.preload("/chassis/modelo_nuevo/Chasis8.glb");
