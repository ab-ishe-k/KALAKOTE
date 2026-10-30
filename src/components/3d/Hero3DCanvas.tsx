import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useDeviceMotion } from '../../hooks/useDeviceMotion';
import { Compass, Smartphone, Eye, Flame, Layers } from 'lucide-react';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const motion = useDeviceMotion();
  const [motionMode, setMotionMode] = useState<boolean>(true);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const coalMeshRef = useRef<THREE.Mesh | null>(null);
  const wireframeMeshRef = useRef<THREE.LineSegments | null>(null);
  const terrainMeshRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.warn('WebGL is unavailable in this environment, falling back to CSS canvas:', e);
      setHasWebGL(false);
      return;
    }

    // 1. Scene with Clean Light Slate Atmosphere
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xF8FAFC, 0.032);
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 7.8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. WebGL Renderer configuration
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Bright Studio Lighting for High-Contrast Black Coal Ore
    const ambientLight = new THREE.AmbientLight(0xE2E8F0, 2.4);
    scene.add(ambientLight);

    // Warm Sun Spotlight
    const goldSpot = new THREE.SpotLight(0xD97706, 5.0, 30, Math.PI / 4, 0.3);
    goldSpot.position.set(5, 8, 7);
    scene.add(goldSpot);

    // Crisp Sky Blue Fill Light
    const skyFill = new THREE.DirectionalLight(0x0284C7, 2.5);
    skyFill.position.set(-6, 4, 3);
    scene.add(skyFill);

    // Back Light to highlight jet black coal silhouette
    const backRim = new THREE.DirectionalLight(0xF59E0B, 3.0);
    backRim.position.set(0, -3, -6);
    scene.add(backRim);

    // 5. 🪨 THE HERO 3D ANTHRACITE COAL ORE (Procedural Fractured Mineral)
    // Detailed Dodecahedron deformed with noise-like displacement to create faceted coal rock
    const coalGeo = new THREE.DodecahedronGeometry(2.0, 2);
    const coalPos = coalGeo.attributes.position;
    for (let i = 0; i < coalPos.count; i++) {
      const vx = coalPos.getX(i);
      const vy = coalPos.getY(i);
      const vz = coalPos.getZ(i);

      // Fractured geological cleavage displacement
      const noise =
        Math.sin(vx * 3.5) * Math.cos(vy * 3.2) * 0.28 +
        Math.sin(vz * 5.0 + vx * 2.0) * 0.18 +
        (Math.random() - 0.5) * 0.08;

      coalPos.setXYZ(i, vx + vx * noise, vy + vy * noise, vz + vz * noise);
    }
    coalGeo.computeVertexNormals();

    // Semi-metallic glossy Anthracite Material
    const coalMat = new THREE.MeshStandardMaterial({
      color: 0x11161B,         // Rich deep graphite / anthracite black
      roughness: 0.38,         // Vitreous sub-metallic fracture lustre
      metalness: 0.65,         // Natural sheen of high-grade Kalakote semi-anthracite
      flatShading: true
    });
    const coalMesh = new THREE.Mesh(coalGeo, coalMat);
    coalMesh.position.set(0, 0.1, 0);
    scene.add(coalMesh);
    coalMeshRef.current = coalMesh;

    // Glowing Mineral Cleavage Wireframe
    const coalWireGeo = new THREE.WireframeGeometry(coalGeo);
    const coalWireMat = new THREE.LineBasicMaterial({
      color: 0xF59E0B,
      transparent: true,
      opacity: 0.22
    });
    const coalWireMesh = new THREE.LineSegments(coalWireGeo, coalWireMat);
    coalMesh.add(coalWireMesh);
    wireframeMeshRef.current = coalWireMesh;

    // 6. Subterranean Pir Panjal Base Relief Bed (Background)
    const terrainGeo = new THREE.PlaneGeometry(30, 20, 36, 24);
    terrainGeo.rotateX(-Math.PI / 2.3);
    const tPos = terrainGeo.attributes.position;
    for (let i = 0; i < tPos.count; i++) {
      const vx = tPos.getX(i);
      const vz = tPos.getZ(i);
      const elevation =
        Math.sin(vx * 0.3) * Math.cos(vz * 0.25) * 1.5 +
        Math.cos(vx * 0.8) * 0.5;
      tPos.setY(i, elevation - 3.8);
    }
    terrainGeo.computeVertexNormals();
    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0xE2E8F0,         // Clean crisp slate mountain relief
      roughness: 0.85,
      metalness: 0.1,
      flatShading: true
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    scene.add(terrainMesh);
    terrainMeshRef.current = terrainMesh;

    // 7. Floating 3D Golden Embers & Subathu Mineral Micro-Dust
    const particleCount = 240;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 14;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 10;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xD97706,
      size: 0.08,
      transparent: true,
      opacity: 0.85
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

    // 9. Continuous Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Slow majestic tumbling of the Anthracite Coal Ore
      if (coalMeshRef.current) {
        coalMeshRef.current.rotation.y = elapsedTime * 0.18;
        coalMeshRef.current.rotation.x = Math.sin(elapsedTime * 0.12) * 0.2;
        coalMeshRef.current.position.y = Math.sin(elapsedTime * 0.6) * 0.12;
      }

      // Embers floating upward gently around the coal
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += 0.006;
          if (positions[i] > 4.5) positions[i] = -4.0;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
        particlesRef.current.rotation.y = elapsedTime * 0.04;
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
      coalGeo.dispose();
      coalWireGeo.dispose();
      terrainGeo.dispose();
      particleGeo.dispose();
    };
  }, []);

  // Wireframe toggle effect
  useEffect(() => {
    if (wireframeMeshRef.current) {
      wireframeMeshRef.current.visible = wireframeMode;
    }
  }, [wireframeMode]);

  // Update Camera based on Physical Gyroscope / Mouse Parallax
  useEffect(() => {
    if (!cameraRef.current || !motionMode) return;

    // Smoothly shift camera angle with phone tilt (-1 to 1)
    const targetX = motion.x * 2.4;
    const targetY = 1.2 + motion.y * 1.6;
    const targetZ = 7.8 - Math.abs(motion.x) * 0.8;

    cameraRef.current.position.x = targetX;
    cameraRef.current.position.y = targetY;
    cameraRef.current.position.z = targetZ;
    cameraRef.current.lookAt(motion.x * 0.3, 0.1, 0);
  }, [motion.x, motion.y, motionMode]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden">
      {/* Three.js Canvas Container or Clean Fallback */}
      {hasWebGL ? (
        <div ref={mountRef} className="w-full h-full" />
      ) : (
        <div className="w-full h-full bg-gradient-to-b from-slate-100 via-slate-50 to-white flex items-center justify-center">
          <div className="w-48 h-48 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <Flame className="w-16 h-16 text-amber-600 animate-pulse" />
          </div>
        </div>
      )}

      {/* Sensor Calibration & Status Badge */}
      <div className="absolute bottom-4 right-4 sm:bottom-auto sm:top-24 sm:right-8 z-20 flex flex-col items-end gap-1.5 font-mono text-[11px]">
        {/* iOS Permission Prompt */}
        {motion.requiresPermissionPrompt && !motion.permissionGranted && (
          <button
            onClick={() => motion.requestPermission()}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold shadow-lg hover:brightness-110 transition-all animate-bounce text-xs"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Enable 3D Coal Gyroscope</span>
          </button>
        )}

        {/* Live Motion Status Pill */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-300 text-slate-800 shadow-md">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
          {motion.isMobile ? (
            <span className="flex items-center gap-1.5 text-amber-800 font-semibold text-[10px] sm:text-xs">
              <Compass className="w-3.5 h-3.5 shrink-0 text-amber-600" />
              <span>Coal Tilt: {motion.gamma > 0 ? `+${motion.gamma.toFixed(0)}°` : `${motion.gamma.toFixed(0)}°`}</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-slate-800 font-semibold text-[10px] sm:text-xs">
              <Eye className="w-3.5 h-3.5 shrink-0 text-amber-600" />
              <span>3D Motion Parallax</span>
            </span>
          )}

          {/* Wireframe Cleavage Toggle */}
          <button
            onClick={() => setWireframeMode(!wireframeMode)}
            className="ml-1 text-sky-700 hover:text-sky-900 text-[10px] uppercase border-l border-slate-300 pl-2 flex items-center gap-1 font-semibold"
            title="Toggle Mineral Strata Wireframe"
          >
            <Layers className="w-3 h-3 text-sky-600" />
            <span className="hidden sm:inline">{wireframeMode ? 'Solid' : 'Strata'}</span>
          </button>

          {/* Motion Toggle Button */}
          <button
            onClick={() => setMotionMode(!motionMode)}
            className="text-slate-500 hover:text-slate-800 text-[10px] uppercase border-l border-slate-300 pl-2 font-semibold"
            title="Toggle camera motion"
          >
            {motionMode ? 'Pause' : 'Resume'}
          </button>
        </div>

        {/* Informative Sub-label */}
        <span className="hidden sm:inline-block text-[10px] text-slate-600 bg-white/80 px-2.5 py-0.5 rounded border border-slate-200 shadow-sm backdrop-blur-sm">
          {motion.isMobile ? 'Tilt phone to inspect Kalakote Anthracite cleavage' : 'Move cursor to rotate 3D Anthracite specimen'}
        </span>
      </div>

      {/* Atmospheric Soft Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-transparent to-[#F8FAFC]/40 pointer-events-none" />
    </div>
  );
};
