import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TIME_MACHINE_CHAPTERS } from '../data/timeMachineChapters';
import { SOURCES_DATA } from '../data/sources';
import { VerificationBadge } from '../components/common/VerificationBadge';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Info,
  Calendar,
  Sparkles,
  BookOpen,
  X,
  ExternalLink,
  Sliders,
  Compass
} from 'lucide-react';
import { useDeviceMotion } from '../hooks/useDeviceMotion';

interface TimeMachineProps {
  onOpenSourceModal: (sourceId: string) => void;
}

export const TimeMachine: React.FC<TimeMachineProps> = ({ onOpenSourceModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isSourcePanelOpen, setIsSourcePanelOpen] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  // Parallax motion sensor & pointer position
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const motion = useDeviceMotion();
  const effectiveOffset = motion.isSensorActive
    ? { x: motion.x * 24, y: motion.y * 12 }
    : mousePos;

  const containerRef = useRef<HTMLDivElement>(null);
  const visualStageRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const distantMountainsRef = useRef<SVGPathElement>(null);
  const midHillsRef = useRef<SVGPathElement>(null);
  const eraFocalRef = useRef<SVGGElement>(null);

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const currentChapter = TIME_MACHINE_CHAPTERS[currentIndex];
  const activeSources = SOURCES_DATA.filter((s) => currentChapter.primarySources.includes(s.id));

  // GSAP Transition on Chapter Change
  useEffect(() => {
    if (prefersReducedMotion) return;

    if (visualStageRef.current) {
      gsap.fromTo(
        visualStageRef.current,
        { opacity: 0.6, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' }
      );
    }

    if (eraFocalRef.current) {
      gsap.fromTo(
        eraFocalRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.1, ease: 'back.out(1.2)' }
      );
    }
  }, [currentIndex, prefersReducedMotion]);

  // Autoplay progression timer
  useEffect(() => {
    let animFrame: number;
    let startTime: number | null = null;
    const duration = 8000; // 8 seconds per era

    if (isPlaying) {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const prog = Math.min(100, (elapsed / duration) * 100);
        setProgressPercent(prog);

        if (elapsed >= duration) {
          setCurrentIndex((prev) => (prev + 1) % TIME_MACHINE_CHAPTERS.length);
          startTime = timestamp;
          setProgressPercent(0);
        } else {
          animFrame = requestAnimationFrame(step);
        }
      };
      animFrame = requestAnimationFrame(step);
    } else {
      setProgressPercent(0);
    }

    return () => cancelAnimationFrame(animFrame);
  }, [isPlaying, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => Math.min(TIME_MACHINE_CHAPTERS.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsSourcePanelOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.log(err));
      setIsFullscreen(false);
    }
  };

  // Web Audio Ambient Wind Synthesizer (Zero external dependencies)
  const toggleAudio = () => {
    if (!isAudioEnabled) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Generate pink-noise buffer for mountain wind
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= 0.11;
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Low-pass filter for distant mountain wind character
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        whiteNoise.start(0);

        noiseNodeRef.current = whiteNoise;
        gainNodeRef.current = gainNode;
        setIsAudioEnabled(true);
      } catch (err) {
        console.error('Audio synthesizer error:', err);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      setIsAudioEnabled(false);
    }
  };

  // Mouse Parallax Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full min-h-[92vh] bg-[#080B09] text-[#F4F1E8] flex flex-col justify-between overflow-hidden select-none ${
        isFullscreen ? 'h-screen p-4 sm:p-8' : 'py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'
      }`}
    >
      {/* Top Header Controls Bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#20392C] text-[#C5A56A] flex items-center justify-center border border-[#C5A56A]/40 shadow-inner">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="font-serif text-lg sm:text-2xl font-bold tracking-wider text-[#F4F1E8]">
              CINEMATIC TIME MACHINE
            </h1>
            <p className="text-[10px] font-mono text-[#A4ADA5] uppercase tracking-wider">
              Documented Eras of Kalakote &bull; Chapter {currentIndex + 1} of {TIME_MACHINE_CHAPTERS.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio Atmosphere Indicator */}
          <button
            onClick={toggleAudio}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-all shadow-md ${
              isAudioEnabled
                ? 'bg-[#20392C] text-[#C5A56A] border-[#C5A56A]'
                : 'bg-black/40 text-white/50 border-white/10 hover:text-white'
            }`}
            title="Toggle Synthesized Mountain Wind Atmosphere"
          >
            {isAudioEnabled ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">
              {isAudioEnabled ? 'Mountain Ambiance On' : 'Ambiance Muted'}
            </span>
          </button>

          {/* Gyroscope / Motion Parallax Status Pill */}
          {motion.isSensorActive && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C5A56A]/30 bg-black/40 text-[#C5A56A] text-xs font-mono">
              <Compass className="w-3.5 h-3.5" />
              <span>{motion.isMobile ? 'Gyro Tilt Active' : 'Pointer Parallax'}</span>
            </div>
          )}

          {/* Source Drawer Toggle */}
          <button
            onClick={() => setIsSourcePanelOpen(!isSourcePanelOpen)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-all ${
              isSourcePanelOpen
                ? 'bg-[#C5A56A] text-[#080B09] font-bold border-[#C5A56A]'
                : 'bg-black/40 text-white/70 border-white/10 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Evidence Drawer</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-black/40 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Cinematic Visual & Narrative Stage */}
      <div
        ref={visualStageRef}
        className="relative z-10 flex-1 my-5 rounded-2xl overflow-hidden border border-[#C5A56A]/30 bg-black flex flex-col justify-end p-6 sm:p-10 shadow-2xl min-h-[480px]"
      >
        {/* Layer 0: Sky Gradient */}
        <div
          ref={skyRef}
          className={`absolute inset-0 bg-gradient-to-b ${currentChapter.landscapeLayer.skyTint} transition-colors duration-1000`}
        />

        {/* 2.5D Layered Parallax Vector Landscape Canvas */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 1200 700"
            preserveAspectRatio="none"
          >
            {/* Layer 1: Distant Pir Panjal Crests */}
            <path
              ref={distantMountainsRef}
              d="M0 320 Q220 180 480 290 T1200 240 L1200 700 L0 700 Z"
              fill="#0e1712"
              opacity="0.85"
              style={{
                transform: `translateX(${effectiveOffset.x * 0.25}px) translateY(${effectiveOffset.y * 0.25}px)`,
                transition: prefersReducedMotion ? 'none' : 'transform 0.2s ease-out'
              }}
            />

            {/* Layer 2: Subathu Folded Hillside Limb */}
            <path
              ref={midHillsRef}
              d="M0 400 Q360 300 720 380 T1200 340 L1200 700 L0 700 Z"
              fill="#09100c"
              style={{
                transform: `translateX(${effectiveOffset.x * 0.5}px) translateY(${effectiveOffset.y * 0.5}px)`,
                transition: prefersReducedMotion ? 'none' : 'transform 0.2s ease-out'
              }}
            />

            {/* Layer 3: Era-Specific Architectural / Industrial Anchor */}
            <g
              ref={eraFocalRef}
              style={{
                transform: `translateX(${effectiveOffset.x * 0.8}px)`,
                transition: prefersReducedMotion ? 'none' : 'transform 0.2s ease-out'
              }}
            >
              {/* Era 1: Ancient Kashmiri Stone Shrines at Panjnara */}
              {currentIndex === 0 && (
                <g opacity="0.9">
                  {/* Trefoil Temple Sanctum */}
                  <polygon points="760,440 820,320 880,440" fill="#242c26" stroke="#C5A56A" strokeWidth="2" />
                  <polygon points="785,440 820,360 855,440" fill="#131915" />
                  {/* Water Kund Basin */}
                  <rect x="740" y="440" width="160" height="25" fill="#183025" rx="3" stroke="#C5A56A" strokeWidth="1" />
                  <path d="M750 452 Q820 445 890 452" stroke="#5eead4" strokeWidth="2" fill="none" opacity="0.6" />
                </g>
              )}

              {/* Era 2: Mughal Foothill Watchtower (Kota) */}
              {currentIndex === 1 && (
                <g opacity="0.85">
                  <rect x="800" y="340" width="45" height="90" fill="#29231c" stroke="#8a7359" strokeWidth="2" />
                  <polygon points="790,340 822,305 855,340" fill="#3b3228" />
                  <circle cx="822" cy="365" r="5" fill="#ffd175" opacity="0.8" />
                </g>
              )}

              {/* Era 3: Dogra Theodolite Surveyor Post */}
              {currentIndex === 2 && (
                <g opacity="0.9">
                  <line x1="820" y1="410" x2="805" y2="460" stroke="#C5A56A" strokeWidth="3" />
                  <line x1="820" y1="410" x2="835" y2="460" stroke="#C5A56A" strokeWidth="3" />
                  <circle cx="820" cy="405" r="8" fill="#C5A56A" />
                  <line x1="810" y1="405" x2="840" y2="405" stroke="#ffffff" strokeWidth="3" />
                </g>
              )}

              {/* Era 4: C.S. Middlemiss 1929 Field Geological Survey */}
              {currentIndex === 3 && (
                <g opacity="0.95">
                  {/* Exposed Folded Coal Seam (Black Bed) */}
                  <path d="M680 430 Q780 390 920 440" stroke="#000000" strokeWidth="16" fill="none" />
                  <path d="M680 430 Q780 390 920 440" stroke="#C5A56A" strokeWidth="2" fill="none" strokeDasharray="6,4" />
                  <rect x="790" y="390" width="50" height="35" fill="#2b3b30" rx="3" stroke="#C5A56A" strokeWidth="1.5" />
                  <text x="798" y="412" fill="#C5A56A" fontSize="11" fontFamily="monospace">GSI 1929</text>
                </g>
              )}

              {/* Era 5: JKML Mine Adit Portal & Coal Car */}
              {currentIndex === 4 && (
                <g opacity="0.95">
                  {/* Underground Incline Adit Mouth */}
                  <polygon points="760,450 820,360 880,450" fill="#000000" stroke="#8a7359" strokeWidth="5" />
                  {/* Timber Props */}
                  <line x1="785" y1="450" x2="785" y2="400" stroke="#966d4b" strokeWidth="6" />
                  <line x1="855" y1="450" x2="855" y2="400" stroke="#966d4b" strokeWidth="6" />
                  <line x1="780" y1="400" x2="860" y2="400" stroke="#966d4b" strokeWidth="6" />
                  {/* Mine Wagon */}
                  <rect x="870" y="435" width="40" height="20" fill="#1b1c1d" stroke="#555" />
                  <circle cx="878" cy="458" r="5" fill="#000" />
                  <circle cx="902" cy="458" r="5" fill="#000" />
                </g>
              )}

              {/* Era 6: Kalakote Thermal Power Station (1968-1987) Active Skoda Chimneys */}
              {currentIndex === 5 && (
                <g opacity="0.95">
                  {/* Twin 45m Industrial Chimneys */}
                  <rect x="790" y="270" width="16" height="150" fill="#4d3a2b" rx="2" stroke="#222" />
                  <rect x="825" y="285" width="14" height="135" fill="#4d3a2b" rx="2" stroke="#222" />
                  {/* Active Steam Plumes */}
                  <path d="M798 270 Q780 200 730 140 T630 60" stroke="#f4f1e8" strokeWidth="20" fill="none" opacity="0.4" strokeLinecap="round" />
                  <path d="M832 285 Q815 220 770 160 T680 80" stroke="#f4f1e8" strokeWidth="16" fill="none" opacity="0.3" strokeLinecap="round" />
                  {/* Turbine Hall with Bright Glow */}
                  <polygon points="720,420 890,420 860,370 740,370" fill="#2b231a" stroke="#C5A56A" strokeWidth="1" />
                  <rect x="750" y="385" width="22" height="14" fill="#ffd175" opacity="0.85" />
                  <rect x="785" y="385" width="22" height="14" fill="#ffd175" opacity="0.85" />
                  <rect x="820" y="385" width="22" height="14" fill="#ffd175" opacity="0.85" />
                </g>
              )}

              {/* Era 7: Mothballed Decommissioned Plant & Silent Chimneys */}
              {currentIndex === 6 && (
                <g opacity="0.85">
                  <rect x="790" y="270" width="16" height="150" fill="#2d332f" rx="2" />
                  <rect x="825" y="285" width="14" height="135" fill="#2d332f" rx="2" />
                  {/* Overgrown Roof */}
                  <polygon points="720,420 890,420 860,370 740,370" fill="#1a211d" />
                  <circle cx="710" cy="425" r="25" fill="#142c1e" opacity="0.7" />
                  <circle cx="890" cy="425" r="30" fill="#142c1e" opacity="0.7" />
                </g>
              )}

              {/* Era 8: The 2018 Civil Agitation Assemblage */}
              {currentIndex === 7 && (
                <g opacity="0.95">
                  <rect x="730" y="400" width="140" height="35" fill="#111713" rx="4" stroke="#C5A56A" strokeWidth="2" />
                  <text x="742" y="422" fill="#ffd175" fontSize="12" fontWeight="bold" fontFamily="monospace">ADC KALAKOTE 2018</text>
                  {/* Crowd silhouettes */}
                  <circle cx="720" cy="435" r="6" fill="#C5A56A" />
                  <circle cx="740" cy="432" r="7" fill="#C5A56A" />
                  <circle cx="760" cy="434" r="6" fill="#C5A56A" />
                  <circle cx="860" cy="433" r="7" fill="#C5A56A" />
                  <circle cx="880" cy="435" r="6" fill="#C5A56A" />
                </g>
              )}

              {/* Era 9: Modern 2026 Resurfaced Highway & Silent Ridge */}
              {currentIndex === 8 && (
                <g opacity="0.9">
                  {/* Silent Chimneys in Distance */}
                  <rect x="790" y="270" width="16" height="150" fill="#1c2420" rx="2" opacity="0.6" />
                  <rect x="825" y="285" width="14" height="135" fill="#1c2420" rx="2" opacity="0.6" />
                  {/* Modern Blacktop Road with Yellow Dividing Line */}
                  <polygon points="620,480 880,480 940,700 520,700" fill="#1a1c1b" />
                  <line x1="750" y1="480" x2="730" y2="700" stroke="#ffd175" strokeWidth="3" strokeDasharray="14,10" />
                </g>
              )}
            </g>

            {/* Layer 4: Foreground Valley Floor */}
            <path
              d="M0 480 Q500 420 1200 460 L1200 700 L0 700 Z"
              fill="#060907"
            />
          </svg>
        </div>

        {/* Ambient Overlay Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent pointer-events-none" />

        {/* Narrative Box Overlay */}
        <div className="relative z-20 max-w-3xl space-y-4 animate-fadeIn">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-black/80 border border-[#C5A56A]/60 text-[#C5A56A] font-mono text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-xl">
              <Calendar className="w-3.5 h-3.5" />
              {currentChapter.timeSpan}
            </span>
            <VerificationBadge status={currentChapter.evidenceLabel} size="md" />
            <span className="text-xs font-mono text-white/60">
              Era #{currentChapter.eraNumber}: {currentChapter.eraName}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F4F1E8] drop-shadow-xl">
            {currentChapter.title}
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-[#C5A56A] drop-shadow">
            {currentChapter.subtitle}
          </p>

          <p className="font-sans text-sm sm:text-base text-[#F4F1E8]/95 leading-relaxed bg-black/60 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-white/10 shadow-2xl">
            {currentChapter.narrative}
          </p>

          {/* Key Evidential Facts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs font-mono">
            {currentChapter.keyFacts.map((fact, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-black/60 border border-white/5 text-[#A4ADA5] flex items-start gap-2 shadow-sm"
              >
                <span className="text-[#C5A56A] font-bold">&bull;</span>
                <span>{fact}</span>
              </div>
            ))}
          </div>

          {/* Verification & Audio Indicator */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-white/50">
            <span>
              Atmospheric Soundscape: <em>{currentChapter.landscapeLayer.ambientSoundLabel}</em>
            </span>
            <div className="flex items-center gap-2">
              <span>Primary Documentary Evidence:</span>
              {currentChapter.primarySources.map((srcId) => (
                <button
                  key={srcId}
                  onClick={() => onOpenSourceModal(srcId)}
                  className="px-2 py-0.5 rounded bg-[#20392C] text-[#C5A56A] hover:underline border border-[#C5A56A]/30 transition-colors"
                >
                  {srcId}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mandatory Reconstruction Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 bg-black/85 backdrop-blur-md rounded-full text-[10px] font-mono text-amber-300 border border-amber-500/40 uppercase tracking-wider flex items-center gap-1.5 shadow-xl">
            <Info className="w-3.5 h-3.5" />
            HISTORICAL RECONSTRUCTION — NOT AN ORIGINAL ARCHIVAL IMAGE
          </span>
        </div>
      </div>

      {/* Bottom Controls Stage: Scrubber, Controls & Progression */}
      <div className="relative z-20 space-y-4 bg-black/70 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-2xl">
        {/* Continuous Autoplay Progress Bar */}
        {isPlaying && (
          <div className="w-full h-1 bg-black/60 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-[#C5A56A] transition-all duration-100 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {/* Timeline Era Nodes Scrubber */}
        <div className="relative flex items-center justify-between gap-1 overflow-x-auto pb-2">
          {TIME_MACHINE_CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => {
                setCurrentIndex(idx);
                setProgressPercent(0);
              }}
              className={`flex-1 min-w-[75px] text-left p-2.5 rounded-lg border transition-all ${
                currentIndex === idx
                  ? 'bg-[#C5A56A] text-[#080B09] border-[#C5A56A] font-bold shadow-xl scale-105'
                  : 'bg-black/40 text-white/50 border-white/5 hover:border-white/20 hover:text-white'
              }`}
            >
              <div className="text-[10px] font-mono">#{ch.eraNumber}</div>
              <div className="text-[11px] font-serif truncate">{ch.timeSpan}</div>
            </button>
          ))}
        </div>

        {/* Slider Scrubber */}
        <div className="flex items-center gap-3">
          <Sliders className="w-3.5 h-3.5 text-[#C5A56A]" />
          <input
            type="range"
            min="0"
            max={TIME_MACHINE_CHAPTERS.length - 1}
            value={currentIndex}
            onChange={(e) => {
              setCurrentIndex(Number(e.target.value));
              setProgressPercent(0);
            }}
            className="w-full h-1.5 bg-black/60 rounded-lg appearance-none cursor-pointer accent-[#C5A56A]"
            aria-label="Timeline Era Scrubber"
          />
          <span className="text-xs font-mono text-[#C5A56A] min-w-[45px] text-right">
            {currentIndex + 1} / {TIME_MACHINE_CHAPTERS.length}
          </span>
        </div>

        {/* Playback Buttons & Accessibility Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => {
                setCurrentIndex((prev) => Math.max(0, prev - 1));
                setProgressPercent(0);
              }}
              disabled={currentIndex === 0}
              className="p-2 rounded-lg bg-[#111713] hover:bg-[#20392C] border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Previous Chapter (Left Arrow Key)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 rounded-lg bg-[#C5A56A] hover:bg-[#DFC38E] text-[#080B09] font-bold flex items-center gap-1.5 transition-colors shadow-lg"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause' : 'Autoplay'}</span>
            </button>

            <button
              onClick={() => {
                setCurrentIndex((prev) => Math.min(TIME_MACHINE_CHAPTERS.length - 1, prev + 1));
                setProgressPercent(0);
              }}
              disabled={currentIndex === TIME_MACHINE_CHAPTERS.length - 1}
              className="p-2 rounded-lg bg-[#111713] hover:bg-[#20392C] border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Next Chapter (Right Arrow Key)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setCurrentIndex(0);
                setIsPlaying(false);
                setProgressPercent(0);
              }}
              className="p-2 rounded-lg bg-[#111713] hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
              title="Reset Timeline to Era #1"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-white/50">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={prefersReducedMotion}
                onChange={(e) => setPrefersReducedMotion(e.target.checked)}
                className="rounded bg-black border-white/20 text-[#C5A56A] focus:ring-0"
              />
              <span>Reduced Motion</span>
            </label>
            <span className="hidden md:inline">&larr; &rarr; Arrow Keys to Scrub &bull; Space to Pause</span>
          </div>
        </div>
      </div>

      {/* Slide-Out Source Drawer / Evidence Panel */}
      {isSourcePanelOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-[#111713] border-l border-[#C5A56A]/40 shadow-2xl p-6 overflow-y-auto animate-fadeIn space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-[#C5A56A] font-mono text-xs uppercase tracking-wider font-bold">
              <BookOpen className="w-4 h-4" />
              <span>Evidence Drawer &bull; Era #{currentChapter.eraNumber}</span>
            </div>
            <button
              onClick={() => setIsSourcePanelOpen(false)}
              className="p-1.5 text-white/50 hover:text-white rounded-md hover:bg-white/10"
              aria-label="Close evidence panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase text-white/50">Active Chapter</span>
            <h3 className="text-xl font-serif font-bold text-[#F4F1E8]">
              {currentChapter.title}
            </h3>
            <p className="text-xs text-[#C5A56A] font-mono">{currentChapter.timeSpan}</p>
          </div>

          <div className="p-3.5 bg-black/40 rounded-lg border border-white/5 text-xs text-[#A4ADA5] space-y-1">
            <strong className="text-white block font-mono text-[11px] uppercase">
              Evidential Note:
            </strong>
            <p className="leading-relaxed font-sans">{currentChapter.verificationNote}</p>
          </div>

          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-mono uppercase text-[#C5A56A] tracking-wider">
              Primary Archival Citations:
            </h4>
            {activeSources.map((src) => (
              <div
                key={src.id}
                className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#C5A56A] font-bold">{src.id}</span>
                  <VerificationBadge status={src.verificationStatus} />
                </div>
                <h5 className="text-sm font-serif font-bold text-white">{src.title}</h5>
                <p className="text-xs font-mono text-white/60">
                  {src.institutionOrAuthor} ({src.publicationDate})
                </p>
                <blockquote className="p-2.5 bg-[#161F1A] border-l border-[#C5A56A] rounded text-xs text-[#F4F1E8]/90 italic">
                  "{src.relevantExcerpt}"
                </blockquote>
                <div className="pt-1 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-white/40">Audited: {src.lastVerificationDate}</span>
                  {src.url && (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C5A56A] hover:underline flex items-center gap-1"
                    >
                      <span>Repository</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-white/40 text-center">
            KALAKOTE OVERLOOK &bull; Strictly Evidence-Based Historiography
          </div>
        </div>
      )}
    </div>
  );
};
