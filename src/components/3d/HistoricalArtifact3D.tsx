import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useDeviceMotion } from '../../hooks/useDeviceMotion';
import { RotateCw, Lightbulb, Smartphone, ShieldCheck, Box } from 'lucide-react';

export type ArtifactId = 'skoda_turbine' | 'mining_lamp' | 'pandu_kund_pillar';

interface ArtifactMetadata {
  id: ArtifactId;
  name: string;
  subheading: string;
  era: string;
  material: string;
  verifiedSourceId: string;
  sourceTitle: string;
  historicalContext: string;
  engineeringSpecs: string[];
}

export const ARTIFACTS_CATALOG: Record<ArtifactId, ArtifactMetadata> = {
  skoda_turbine: {
    id: 'skoda_turbine',
    name: 'Škoda 7.5 MW Steam Turbine Rotor & Casing',
    subheading: 'High-Pressure Condensing Turbo-Generator Assembly',
    era: '1968 Industrial Era (Czechoslovakia Supply)',
    material: 'Forged Chrome-Molybdenum Steel & Phosphor Bronze Blading',
    verifiedSourceId: 'assembly-debates-ktps',
    sourceTitle: 'Jammu & Kashmir Legislative Assembly Debates, March 1989',
    historicalContext:
      'Engineered by Škoda Works (Czechoslovakia) for the 22.5 MW Kalakote Thermal Power Station. The 3 x 7.5 MW units were designed to burn pulverised local semi-anthracite coal. High ash content (35-45%) and quartz clinkering ultimately eroded the boiler water-walls, leading to decommissioning in 1989.',
    engineeringSpecs: [
      'Nameplate Rating: 7,500 kW (3 units total = 22.5 MW)',
      'Design Steam Pressure: 38 kg/cm² at 450°C',
      'Shaft Speed: 3,000 RPM (50 Hz synchronous)',
      'Manufacturer: Škoda Export / ZVÚ Hradec Králové, Czechoslovakia'
    ]
  },
  mining_lamp: {
    id: 'mining_lamp',
    name: 'Marsaut Flame Safety Lamp & Miner’s Pick',
    subheading: 'Underground Methane & Gas Detection Apparatus',
    era: '1920s–1960s Dogra / JKML Mining Heritage',
    material: 'Cast Brass, Double Brass Gauze Mesh & Forged Carbon Steel',
    verifiedSourceId: 'gsi-memoirs-coal',
    sourceTitle: 'Geological Survey of India & DGMS Safety Directives',
    historicalContext:
      'Compulsory safety equipment in Metka and Moghla underground coal workings. Because Kalakote coal is semi-anthracite with localized explosive coal dust and methane risks, flame safety lamps were used to test atmospheric oxygen and firedamp gas levels before electric cap lamps were mandated.',
    engineeringSpecs: [
      'Pattern: Double-gauze Marsaut flame safety design',
      'Fuel: Refined colza oil / paraffin wick reservoir',
      'Safety Mechanism: Dual wire gauze dissipates flame heat below ignition threshold',
      'Used By: Underground sirdars and timber mistris across J&K Minerals Ltd'
    ]
  },
  pandu_kund_pillar: {
    id: 'pandu_kund_pillar',
    name: 'Panjnara (Pandu Kund) Stone Sanctum Pillar',
    subheading: 'Medieval Kashmiri Temple Architectural Monolith',
    era: '8th–11th Century CE (Utpala / Lohara Dynasty Influence)',
    material: 'Grey Pir Panjal Sandstone / Limestone',
    verifiedSourceId: 'pandu-kund-archaeology',
    sourceTitle: 'Archaeological Survey & Regional Temple Architecture Monographs',
    historicalContext:
      'Surviving sculpted stone column at Panjnara sacred tanks. Reflects classical Kashmiri Hindu temple architecture (characterized by fluted monolithic columns, trefoil arches, and pyramidal pediments similar to Martand and Payar temples), showing historic connectivity between the Kashmir Valley and Rajapuri.',
    engineeringSpecs: [
      'Architectural Style: Kashmiri Classical Hill Style',
      'Monolithic Features: Fluted circular shaft with stepped square base',
      'Capital Ornamentation: Bracket capital with stylised lotus padma motifs',
      'Preservation: Weathered stone pillar surviving in situ near sacred spring'
    ]
  }
};

interface HistoricalArtifact3DProps {
  initialArtifact?: ArtifactId;
  onOpenSourceModal?: (sourceId: string) => void;
}

export const HistoricalArtifact3D: React.FC<HistoricalArtifact3DProps> = ({
  initialArtifact = 'skoda_turbine',
  onOpenSourceModal
}) => {
  const [activeArtifact, setActiveArtifact] = useState<ArtifactId>(initialArtifact);
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [lightingPreset, setLightingPreset] = useState<'museum' | 'studio'>('museum');
  const [gyroActive, setGyroActive] = useState<boolean>(true);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  const mountRef = useRef<HTMLDivElement>(null);
  const motion = useDeviceMotion();

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const spotLightRef = useRef<THREE.SpotLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Drag interaction state
  const isDraggingRef = useRef<boolean>(false);
  const previousPointerPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const userRotationRef = useRef<{ x: number; y: number }>({ x: 0.2, y: 0.6 });

  // Procedural 3D Model Generators
  const buildSkodaTurbine = useCallback((group: THREE.Group, isWireframe: boolean) => {
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x8A795D,
      metalness: 0.85,
      roughness: 0.35,
      wireframe: isWireframe
    });

    const steelMat = new THREE.MeshStandardMaterial({
      color: 0x4A524D,
      metalness: 0.9,
      roughness: 0.25,
      wireframe: isWireframe
    });

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xC5A56A,
      metalness: 0.95,
      roughness: 0.2,
      wireframe: isWireframe
    });

    // Concrete Base Pedestal
    const baseGeo = new THREE.BoxGeometry(4.2, 0.4, 2.4);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x1A221E, roughness: 0.9, wireframe: isWireframe });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = -1.4;
    group.add(base);

    // Main Cylindrical Turbine Casing
    const casingGeo = new THREE.CylinderGeometry(0.9, 1.1, 2.8, 32);
    casingGeo.rotateZ(Math.PI / 2);
    const casing = new THREE.Mesh(casingGeo, metalMat);
    casing.position.y = -0.3;
    group.add(casing);

    // High Pressure Steam Inlet Housing
    const inletGeo = new THREE.CylinderGeometry(0.35, 0.35, 1.2, 24);
    const inlet = new THREE.Mesh(inletGeo, steelMat);
    inlet.position.set(0.6, 0.8, 0);
    group.add(inlet);

    // Flanged Ring Couplings
    [-1.2, -0.4, 0.4, 1.2].forEach((x) => {
      const ringGeo = new THREE.TorusGeometry(1.05, 0.08, 16, 32);
      ringGeo.rotateY(Math.PI / 2);
      const ring = new THREE.Mesh(ringGeo, goldAccentMat);
      ring.position.set(x, -0.3, 0);
      group.add(ring);
    });

    // Rotor Shaft & Exposed Stage Blades
    const shaftGeo = new THREE.CylinderGeometry(0.2, 0.2, 3.8, 24);
    shaftGeo.rotateZ(Math.PI / 2);
    const shaft = new THREE.Mesh(shaftGeo, steelMat);
    shaft.position.y = -0.3;
    group.add(shaft);

    // Turbine Stage Discs
    [-0.8, -0.2, 0.2, 0.8].forEach((x, idx) => {
      const discGeo = new THREE.CylinderGeometry(0.8 - idx * 0.1, 0.8 - idx * 0.1, 0.12, 32);
      discGeo.rotateZ(Math.PI / 2);
      const disc = new THREE.Mesh(discGeo, goldAccentMat);
      disc.position.set(x, -0.3, 0);
      group.add(disc);
    });

    // Governor Valve Actuator (Czechoslovak Skoda trademarked valve assembly)
    const govGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const gov = new THREE.Mesh(govGeo, goldAccentMat);
    gov.position.set(-1.6, 0.4, 0);
    group.add(gov);
  }, []);

  const buildMiningLamp = useCallback((group: THREE.Group, isWireframe: boolean) => {
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      metalness: 0.8,
      roughness: 0.3,
      wireframe: isWireframe
    });

    const ironMat = new THREE.MeshStandardMaterial({
      color: 0x2A2E2C,
      metalness: 0.7,
      roughness: 0.6,
      wireframe: isWireframe
    });

    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x5C4033,
      roughness: 0.8,
      wireframe: isWireframe
    });

    // Lamp Base: Brass Oil Reservoir
    const potGeo = new THREE.CylinderGeometry(0.65, 0.75, 0.6, 32);
    const pot = new THREE.Mesh(potGeo, brassMat);
    pot.position.set(-0.4, -1.1, 0);
    group.add(pot);

    // Double Wire-Gauze Mesh Cylinder
    const gauzeGeo = new THREE.CylinderGeometry(0.55, 0.55, 1.4, 32, 8, true);
    const gauzeMat = new THREE.MeshStandardMaterial({
      color: 0xC5A56A,
      metalness: 0.9,
      roughness: 0.4,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const gauze = new THREE.Mesh(gauzeGeo, gauzeMat);
    gauze.position.set(-0.4, -0.1, 0);
    group.add(gauze);

    // Upright Brass Protection Pillars
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const colGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.4, 12);
      const col = new THREE.Mesh(colGeo, brassMat);
      col.position.set(-0.4 + Math.cos(angle) * 0.6, -0.1, Math.sin(angle) * 0.6);
      group.add(col);
    }

    // Brass Hood & Bonnet
    const hoodGeo = new THREE.ConeGeometry(0.7, 0.5, 32);
    const hood = new THREE.Mesh(hoodGeo, brassMat);
    hood.position.set(-0.4, 0.8, 0);
    group.add(hood);

    // Brass Suspension Ring
    const ringGeo = new THREE.TorusGeometry(0.25, 0.04, 12, 24);
    const ring = new THREE.Mesh(ringGeo, brassMat);
    ring.position.set(-0.4, 1.2, 0);
    group.add(ring);

    // Glowing Safety Flame Point Light
    const flameGeo = new THREE.ConeGeometry(0.08, 0.25, 16);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xFFA500 });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.set(-0.4, -0.65, 0);
    group.add(flame);

    const flameLight = new THREE.PointLight(0xFFA500, 2, 4);
    flameLight.position.set(-0.4, -0.6, 0);
    group.add(flameLight);

    // Accompanying Forged Miner's Coal Pickaxe (leaning beside lamp)
    const handleGeo = new THREE.CylinderGeometry(0.06, 0.08, 2.6, 16);
    handleGeo.rotateZ(Math.PI / 4.5);
    const handle = new THREE.Mesh(handleGeo, woodMat);
    handle.position.set(0.9, -0.2, -0.2);
    group.add(handle);

    const pickHeadGeo = new THREE.ConeGeometry(0.12, 1.3, 16);
    pickHeadGeo.rotateZ(-Math.PI / 3);
    const pickHead = new THREE.Mesh(pickHeadGeo, ironMat);
    pickHead.position.set(1.7, 0.6, -0.2);
    group.add(pickHead);
  }, []);

  const buildPanduKundPillar = useCallback((group: THREE.Group, isWireframe: boolean) => {
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x7A7D75,
      roughness: 0.9,
      metalness: 0.1,
      flatShading: true,
      wireframe: isWireframe
    });

    const carvedMat = new THREE.MeshStandardMaterial({
      color: 0x9A9C92,
      roughness: 0.85,
      metalness: 0.15,
      flatShading: true,
      wireframe: isWireframe
    });

    // Stepped Square Plinth (Kashmiri temple style)
    const plinth1 = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.35, 2.0), stoneMat);
    plinth1.position.y = -1.4;
    group.add(plinth1);

    const plinth2 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.35, 1.6), stoneMat);
    plinth2.position.y = -1.05;
    group.add(plinth2);

    // Fluted Column Shaft (16-sided faceted classical stone)
    const shaftGeo = new THREE.CylinderGeometry(0.55, 0.65, 2.2, 16);
    const shaft = new THREE.Mesh(shaftGeo, carvedMat);
    shaft.position.y = 0.2;
    group.add(shaft);

    // Shaft Ring Molding (Kalasa motif)
    const molding = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.08, 16, 24), stoneMat);
    molding.rotateX(Math.PI / 2);
    molding.position.y = -0.4;
    group.add(molding);

    // Classical Kashmiri Bracket Capital
    const capital = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.4, 1.4), stoneMat);
    capital.position.y = 1.4;
    group.add(capital);

    // Triangular Pediment Finial (Representing Kashmiri temple roof archetype)
    const pedimentGeo = new THREE.ConeGeometry(0.9, 0.7, 4);
    pedimentGeo.rotateY(Math.PI / 4);
    const pediment = new THREE.Mesh(pedimentGeo, stoneMat);
    pediment.position.y = 1.85;
    group.add(pediment);
  }, []);

  // Initialize Three.js Scene
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080B09, 0.05);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 0.8, 5.5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.warn('WebGL is unavailable for Artifact Inspector:', e);
      setHasWebGL(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x20392C, 1.2);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const spotLight = new THREE.SpotLight(0xC5A56A, 4);
    spotLight.position.set(4, 6, 4);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.5;
    spotLight.castShadow = true;
    scene.add(spotLight);
    spotLightRef.current = spotLight;

    const fillLight = new THREE.DirectionalLight(0x4ECCA3, 1.0);
    fillLight.position.set(-4, -2, -3);
    scene.add(fillLight);

    // Model Container Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Resize
    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Render loop
    const animate = () => {
      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Rebuild 3D Model when activeArtifact or wireframeMode changes
  useEffect(() => {
    if (!modelGroupRef.current) return;
    const group = modelGroupRef.current;

    // Clear previous children
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
      }
    }

    if (activeArtifact === 'skoda_turbine') {
      buildSkodaTurbine(group, wireframeMode);
    } else if (activeArtifact === 'mining_lamp') {
      buildMiningLamp(group, wireframeMode);
    } else if (activeArtifact === 'pandu_kund_pillar') {
      buildPanduKundPillar(group, wireframeMode);
    }
  }, [activeArtifact, wireframeMode, buildSkodaTurbine, buildMiningLamp, buildPanduKundPillar]);

  // Update lighting preset
  useEffect(() => {
    if (!spotLightRef.current || !ambientLightRef.current) return;
    if (lightingPreset === 'museum') {
      spotLightRef.current.intensity = 4.5;
      spotLightRef.current.color.setHex(0xC5A56A);
      ambientLightRef.current.intensity = 1.0;
    } else {
      spotLightRef.current.intensity = 2.0;
      spotLightRef.current.color.setHex(0xFFFFFF);
      ambientLightRef.current.intensity = 2.5;
    }
  }, [lightingPreset]);

  // Sync orientation motion + user drag rotation
  useEffect(() => {
    if (!modelGroupRef.current) return;
    const group = modelGroupRef.current;

    const gyroX = gyroActive ? motion.y * 0.4 : 0;
    const gyroY = gyroActive ? motion.x * 0.6 : 0;

    group.rotation.x = userRotationRef.current.x + gyroX;
    group.rotation.y = userRotationRef.current.y + gyroY;
  }, [motion.x, motion.y, gyroActive]);

  // Pointer / Touch Handlers for 360° Drag
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    previousPointerPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !modelGroupRef.current) return;
    const deltaX = e.clientX - previousPointerPosition.current.x;
    const deltaY = e.clientY - previousPointerPosition.current.y;

    userRotationRef.current.y += deltaX * 0.01;
    userRotationRef.current.x += deltaY * 0.01;

    // Clamp vertical tilt
    userRotationRef.current.x = Math.max(-0.8, Math.min(0.8, userRotationRef.current.x));

    previousPointerPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const metadata = ARTIFACTS_CATALOG[activeArtifact];

  return (
    <div className="w-full bg-[#080B09] rounded-2xl border border-[#C5A56A]/30 overflow-hidden shadow-2xl flex flex-col lg:flex-row">
      {/* Left/Main: 3D Interactive Viewport */}
      <div className="relative w-full lg:w-3/5 h-[500px] sm:h-[600px] bg-gradient-to-b from-[#111713] to-[#080B09] select-none cursor-grab active:cursor-grabbing">
        {/* Three.js Canvas or Fallback */}
        {hasWebGL ? (
          <div
            ref={mountRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
            <Box className="w-16 h-16 text-[#C5A56A]/50 animate-pulse" />
            <h4 className="text-lg font-serif text-[#F4F1E8]">{metadata.name}</h4>
            <p className="max-w-md text-xs font-mono text-[#A4ADA5]">
              Hardware 3D rendering unavailable on this device. Full verified archival specifications and historical documentation are available in the dossier panel.
            </p>
          </div>
        )}

        {/* Top Floating Controls */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-1.5 p-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 font-mono text-xs">
            <button
              onClick={() => setWireframeMode(!wireframeMode)}
              className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
                wireframeMode ? 'bg-[#C5A56A] text-black font-semibold' : 'text-[#A4ADA5] hover:text-white'
              }`}
              title="Toggle Wireframe inspection"
            >
              <Box className="w-3.5 h-3.5" />
              <span>Wireframe</span>
            </button>
            <button
              onClick={() => setLightingPreset(lightingPreset === 'museum' ? 'studio' : 'museum')}
              className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
                lightingPreset === 'museum' ? 'bg-[#C5A56A] text-black font-semibold' : 'text-[#A4ADA5] hover:text-white'
              }`}
              title="Toggle Lighting Mode"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{lightingPreset === 'museum' ? 'Museum Beam' : 'Studio Diffuse'}</span>
            </button>
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={() => setGyroActive(!gyroActive)}
              className={`px-3 py-1 rounded-full font-mono text-xs flex items-center gap-1.5 backdrop-blur-md border transition-all ${
                gyroActive
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-lg'
                  : 'bg-black/60 text-white/50 border-white/10'
              }`}
              title="Toggle Gyroscope / Motion Sensor response"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{gyroActive ? 'Gyro Motion ON' : 'Gyro Paused'}</span>
            </button>
          </div>
        </div>

        {/* Drag Instruction Overlay at Bottom */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-[#A4ADA5] flex items-center gap-2">
          <RotateCw className="w-3 h-3 text-[#C5A56A] animate-spin" />
          <span>Drag to inspect 360° &bull; {motion.isMobile ? 'Tilt phone for live gyro' : 'Move cursor for depth'}</span>
        </div>

        {/* Watermark Archival Tag */}
        <div className="absolute bottom-4 left-4 z-20 pointer-events-none text-[10px] font-mono uppercase tracking-widest text-white/30">
          HISTORICAL 3D ARCHIVE RECONSTRUCTION
        </div>
      </div>

      {/* Right: Artifact Dossier & Selector */}
      <div className="w-full lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-[#111713]/70 backdrop-blur-md border-t lg:border-t-0 lg:border-l border-white/10">
        <div className="space-y-6">
          {/* Artifact Selector Tabs */}
          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-[#C5A56A] block mb-2">
              Select 3D Museum Artifact
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setActiveArtifact('skoda_turbine')}
                className={`p-2 rounded-lg text-left font-mono text-xs border transition-all ${
                  activeArtifact === 'skoda_turbine'
                    ? 'border-[#C5A56A] bg-[#C5A56A]/15 text-[#F4F1E8] font-bold shadow'
                    : 'border-white/10 text-[#A4ADA5] hover:border-white/30'
                }`}
              >
                Škoda Turbine
              </button>
              <button
                onClick={() => setActiveArtifact('mining_lamp')}
                className={`p-2 rounded-lg text-left font-mono text-xs border transition-all ${
                  activeArtifact === 'mining_lamp'
                    ? 'border-[#C5A56A] bg-[#C5A56A]/15 text-[#F4F1E8] font-bold shadow'
                    : 'border-white/10 text-[#A4ADA5] hover:border-white/30'
                }`}
              >
                Safety Lamp
              </button>
              <button
                onClick={() => setActiveArtifact('pandu_kund_pillar')}
                className={`p-2 rounded-lg text-left font-mono text-xs border transition-all ${
                  activeArtifact === 'pandu_kund_pillar'
                    ? 'border-[#C5A56A] bg-[#C5A56A]/15 text-[#F4F1E8] font-bold shadow'
                    : 'border-white/10 text-[#A4ADA5] hover:border-white/30'
                }`}
              >
                Temple Pillar
              </button>
            </div>
          </div>

          {/* Dossier Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#C5A56A] px-2 py-0.5 rounded bg-[#C5A56A]/10 border border-[#C5A56A]/30">
                {metadata.era}
              </span>
              <span className="flex items-center gap-1 text-emerald-400 font-mono text-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                VERIFIED HISTORICAL SPEC
              </span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#F4F1E8] leading-tight">
              {metadata.name}
            </h3>
            <p className="text-xs font-mono text-[#A4ADA5]">{metadata.subheading}</p>
          </div>

          {/* Materials & Context */}
          <div className="space-y-3 text-sm text-[#A4ADA5] leading-relaxed">
            <p>{metadata.historicalContext}</p>
            <div className="p-3 bg-black/40 rounded-lg border border-white/5 space-y-2 font-mono text-xs">
              <div className="text-white/80">
                <strong className="text-[#C5A56A]">Material Construction:</strong> {metadata.material}
              </div>
              <div className="space-y-1">
                <strong className="text-[#C5A56A] block">Documented Specifications:</strong>
                <ul className="list-disc pl-4 space-y-1 text-white/70 text-[11px]">
                  {metadata.engineeringSpecs.map((spec, idx) => (
                    <li key={idx}>{spec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Citation & Primary Source Action */}
        <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono">
          <div className="text-white/50 truncate max-w-[220px]">
            Citation: <span className="text-white/80">{metadata.sourceTitle}</span>
          </div>
          {onOpenSourceModal && (
            <button
              onClick={() => onOpenSourceModal(metadata.verifiedSourceId)}
              className="text-[#C5A56A] hover:underline font-semibold flex items-center gap-1 shrink-0"
            >
              Inspect Source &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

