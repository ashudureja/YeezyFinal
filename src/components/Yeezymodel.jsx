import { useGLTF } from '@react-three/drei';
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

export default function YeezyModel({ mousePos, ...props }) {
  const { scene } = useGLTF('/yeezy.glb');
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.x = mousePos.y * 0.2;
      modelRef.current.rotation.y = mousePos.x * 0.2;
      modelRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    }
  });

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set('green');
        child.material.roughness = 0.6;
        child.material.metalness = 0.4;
      }
    });
  }, [scene]);

  return <primitive ref={modelRef} object={scene} {...props} />;
}