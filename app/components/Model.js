// components/Model.js
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';

export default function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });

  // Center the model and adjust the scale as needed
  scene.position.set(120, 0, 0); // Adjust based on your model
  scene.scale.set(1, 1, 1); // Adjust the scale if necessary

  // Update mouse position and dragging state
  const handleMouseDown = (event) => {
    setIsDragging(true);
    setPreviousMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y,
      };

      // Invert the rotation direction
      modelRef.current.rotation.y -= deltaMove.x * 0.01; // Adjust speed as needed
      modelRef.current.rotation.x += deltaMove.y * 0.01; // Adjust speed as needed

      setPreviousMousePosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, previousMousePosition]);

  useFrame(() => {
    if (!isDragging && modelRef.current) {
      // Optional: Add continuous rotation for visual effect
      modelRef.current.rotation.y += 0.01; // Adjust speed as needed
    }
  });

  return <primitive ref={modelRef} object={scene} />;
}
