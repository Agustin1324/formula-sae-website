import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

const MODEL_PATH = "/chassis/modelo_nuevo/Chasis8.glb";

export function useChassisLoader() {
  useEffect(() => {
    useGLTF.preload(MODEL_PATH);
    return () => {
      useGLTF.clear(MODEL_PATH);
    };
  }, []);
}

export function ChassisLoader() {
  useChassisLoader();
  return null;
}
