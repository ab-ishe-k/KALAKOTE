import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useDeviceMotion } from '../../hooks/useDeviceMotion';
import { Compass, Smartphone, Eye } from 'lucide-react';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const motion = useDeviceMotion();
  const [motionMode, setMotionMode] = useState<boolean>(true);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const terrainMeshRef = useRef<THREE.Mesh | null>(null);
  const wireframeMeshRef = useRef<THREE.LineSegments | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080B09, 0.035);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, 4.5, 9);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0x20392C, 1.2);
    scene.add(ambientLight);

    const goldSpotlight = new THREE.DirectionalLight(0xC5A56A, 2.5);
    goldSpotlight.position.set(5, 8, 5);
    scene.add(goldSpotlight);

    const rimLight = new THREE.DirectionalLight(0x4ECCA3, 1.2);
    rimLight.position.set(-6, 3, -4);
    scene.add(rimLight);

    // 5. Procedural Pir Panjal Mountain Terrain
    const terrainWidth = 24;
    const terrainHeight = 24;
    const segments = 64;
    const terrainGeo = new THREE.PlaneGeometry(terrainWidth, terrainHeight, segments, segments);
    terrainGeo.rotateX(-Math.PI / 2.2);

    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vz = pos.getZ(i);

      // Simulating Pir Panjal mountain ridges and Kalakote valley
      const elevation =
        Math.sin(vx * 0.4) * Math.cos(vz * 0.35) * 1.8 +
        Math.sin(vx * 0.9 + vz * 0.7) * 0.8 +
        Math.cos(vx * 1.8) * 0.35 -
        Math.exp(-((vx * vx + vz * vz) * 0.04)) * 0.8; // Valley dip

      pos.setY(i, elevation);
    }
    terrainGeo.computeVertexNormals();

    // Dark Basalt / Carbonaceous Solid Terrain Material
    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x0E1410,
      roughness: 0.85,
      metalness: 0.25,
      flatShading: true
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.position.set(0, -1.2, 0);
    scene.add(terrainMesh);
    terrainMeshRef.current = terrainMesh;

    // Warm Gold Contour Wireframe Mesh
    const wireframeGeo = new THREE.WireframeGeometry(terrainGeo);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0xC5A56A,
      transparent: true,
      opacity: 0.35
    });
    const wireframeMesh = new THREE.LineSegments(wireframeGeo, wireframeMat);
    wireframeMesh.position.set(0, -1.18, 0);
    scene.add(wireframeMesh);
    wireframeMeshRef.current = wireframeMesh;

    // 6. Subathu Geological Coal Stratum (Glowing Carbon Vein)
    const seamGeo = new THREE.CylinderGeometry(8, 8.5, 0.2, 32, 1, true);
    const seamMat = new THREE.MeshBasicMaterial({
      color: 0xD4AF37,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const seamMesh = new THREE.Mesh(seamGeo, seamMat);
    seamMesh.position.set(0, -1.1, 0);
    scene.add(seamMesh);

    // 7. Floating 3D Golden Coal Embers / Atmospheric Dust
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 16;
      particlePositions[i + 1] = Math.random() * 6 - 1;
      particlePositions[i + 2] = (Math.random() - 0.5) * 14;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xC5A56A,
      size: 0.06,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 8. Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Gentle mountain breathing / subtle rotation
      if (terrainMeshRef.current && wireframeMeshRef.current) {
        terrainMeshRef.current.rotation.y = elapsedTime * 0.02;
        wireframeMeshRef.current.rotation.y = elapsedTime * 0.02;
      }

      // Embers floating upward
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += 0.004;
          if (positions[i] > 5) positions[i] = -1.2;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
        particlesRef.current.rotation.y = -elapsedTime * 0.015;
      }

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      terrainGeo.dispose();
      wireframeGeo.dispose();
      particleGeo.dispose();
    };
  }, []);

  // Update Camera based on Gyroscope / Mouse Motion
  useEffect(() => {
    if (!cameraRef.current || !motionMode) return;

    // Motion range: -1 to 1
    // Base camera position: (0, 4.5, 9)
    const targetX = motion.x * 2.2;
    const targetY = 4.5 + motion.y * 1.4;
    const targetZ = 9 - Math.abs(motion.x) * 0.6;

    cameraRef.current.position.x = targetX;
    cameraRef.current.position.y = targetY;
    cameraRef.current.position.z = targetZ;
    cameraRef.current.lookAt(motion.x * 0.6, -0.6, 0);
  }, [motion.x, motion.y, motionMode]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Sensor Calibration & Status Badge (Top Right of Hero) */}
      <div className="absolute top-24 right-4 sm:right-8 z-20 flex flex-col items-end gap-2 font-mono text-[11px]">
        {/* iOS Permission Prompt if needed */}
        {motion.requiresPermissionPrompt && !motion.permissionGranted && (
          <button
            onClick={() => motion.requestPermission()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C5A56A] text-black font-semibold shadow-lg hover:bg-white transition-all animate-bounce"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Enable 3D Gyroscope</span>
          </button>
        )}

        {/* Live Motion Status Pill */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#C5A56A]/30 text-white/80 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {motion.isMobile ? (
            <span className="flex items-center gap-1.5 text-[#C5A56A]">
              <Compass className="w-3.5 h-3.5" />
              <span>Gyro Active: {motion.gamma > 0 ? `+${motion.gamma.toFixed(0)}°` : `${motion.gamma.toFixed(0)}°`}</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-[#C5A56A]">
              <Eye className="w-3.5 h-3.5" />
              <span>3D Parallax: Cursor Active</span>
            </span>
          )}

          {/* Toggle Button */}
          <button
            onClick={() => setMotionMode(!motionMode)}
            className="ml-1 text-white/50 hover:text-white text-[10px] uppercase border-l border-white/20 pl-2"
            title="Toggle camera motion"
          >
            {motionMode ? 'Pause' : 'Resume'}
          </button>
        </div>

        {/* Subtle Hint */}
        <span className="text-[10px] text-white/50 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
          {motion.isMobile ? 'Tilt your device in 3D' : 'Move cursor across Pir Panjal relief'}
        </span>
      </div>

      {/* Gradient Overlay for Editorial Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080B09] via-transparent to-[#080B09]/70 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#080B09]/40 to-[#080B09]/90 pointer-events-none" />
    </div>
  );
};
