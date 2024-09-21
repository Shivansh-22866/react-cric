// pages/index.js
"use client"
import { motion } from 'framer-motion';
import Model from '../components/Model';
import Navbar from '../components/Navbar';
import { Canvas } from '@react-three/fiber';

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <motion.h1
          className="text-3xl font-bold mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to My 3D Model
        </motion.h1>
        <div style={{ width: '400px', height: '400px' }}>
          <Canvas camera={{ position: [-25, 0, 0], fov: 120 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Model modelPath="/cric_ball.glb" />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
