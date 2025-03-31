import { useRef, useState, useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { MeshStandardMaterial } from 'three';

const MODEL_PATH = "/chassis/modelo_nuevo/Chasis8.glb";

export function ChassisModel() {
  const groupRef = useRef<THREE.Group>(null);
  const [error, setError] = useState<string | null>(null);
  const { scene } = useGLTF(MODEL_PATH, undefined, undefined, (error) => {
    console.error("Error al cargar el modelo:", error);
    setError("Error al cargar el modelo 3D");
  });

  const metalMaterial = useMemo(() => new MeshStandardMaterial({
    color: 0x444444,      // Color gris oscuro
    metalness: 0.9,       // Muy metálico
    roughness: 0.3,       // Bastante pulido
    envMapIntensity: 1.0  // Intensidad de reflexiones
  }), []);

  useEffect(() => {
    if (!scene || !groupRef.current) return;

    try {
      // Limpiar grupo antes de añadir la nueva escena
      while (groupRef.current.children.length > 0) {
        groupRef.current.remove(groupRef.current.children[0]);
      }

      // Crear una copia de la escena para evitar problemas de memoria
      const sceneClone = scene.clone();
      
      // Reset position and rotation
      sceneClone.position.set(0, -0.5, 0);
      sceneClone.rotation.set(0, Math.PI / 2, 0);
      sceneClone.scale.setScalar(1);

      // Aplicar el material a todos los meshes del modelo
      sceneClone.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = metalMaterial;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      groupRef.current.add(sceneClone);
    } catch (err) {
      console.error("Error al procesar el modelo:", err);
      setError("Error al procesar el modelo");
    }

    // Cleanup
    return () => {
      if (groupRef.current) {
        while (groupRef.current.children.length > 0) {
          groupRef.current.remove(groupRef.current.children[0]);
        }
      }
    };
  }, [scene, metalMaterial]);

  if (error) {
    return (
      <Text
        color="red"
        anchorX="center"
        anchorY="middle"
        fontSize={0.2}
        position={[0, 0, 0]}
      >
        {error}
      </Text>
    );
  }

  return <group ref={groupRef} />;
}
