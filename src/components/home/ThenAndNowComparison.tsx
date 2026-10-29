import React, { useState } from 'react';
import { VerificationBadge } from '../common/VerificationBadge';
import { Camera, Calendar, MapPin, Info } from 'lucide-react';

export const ThenAndNowComparison: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, pos)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A]">
            Visual Topography & Transformation
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4F1E8] mt-1">
            Then & Now: The Sair Industrial Landscape
          </h3>
          <p className="text-xs sm:text-sm text-[#A4ADA5] mt-1 max-w-2xl">
            Direct visual comparison of the Kalakote Thermal Power Station grounds at Sair during full operational synchronization (c. 1971) versus the quiet decommissioned valley (October 2026).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <VerificationBadge status="VERIFIED" />
        </div>
      </div>

      {/* Comparison Container */}
      <div
        className="relative w-full h-[380px] sm:h-[480px] rounded-xl overflow-hidden select-none border border-[#C5A56A]/30 cursor-ew-resize bg-black shadow-2xl"
        onMouseMove={(e) => isDragging && handleSliderMove(e)}
        onTouchMove={(e) => isDragging && handleSliderMove(e)}
        onMouseDown={(e) => { setIsDragging(true); handleSliderMove(e); }}
        onMouseUp={() => setIsDragging(false)}
        onTouchStart={(e) => { setIsDragging(true); handleSliderMove(e); }}
        onTouchEnd={() => setIsDragging(false)}
      >
        {/* AFTER (Current 2026 Landscape) Layer - Full Width Background */}
        <div className="absolute inset-0 bg-[#0c1410] flex flex-col justify-between p-6">
          {/* Stylized Modern Vector Landscape Rendering */}
          <div className="absolute inset-0 opacity-80 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="none">
              <defs>
                <linearGradient id="skyModern" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a2e22" />
                  <stop offset="100%" stopColor="#080b09" />
                </linearGradient>
                <linearGradient id="hillsModern" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#20392C" />
                  <stop offset="100%" stopColor="#0f1c15" />
                </linearGradient>
              </defs>
              <rect width="800" height="500" fill="url(#skyModern)" />
              {/* Foothill Ridges */}
              <path d="M0 260 Q180 160 380 240 T800 220 L800 500 L0 500 Z" fill="url(#hillsModern)" />
              <path d="M0 310 Q220 250 480 320 T800 290 L800 500 L0 500 Z" fill="#13241b" />
              {/* Decommissioned Chimneys without smoke */}
              <rect x="520" y="240" width="16" height="110" fill="#2d3731" rx="2" />
              <rect x="550" y="255" width="14" height="95" fill="#2d3731" rx="2" />
              {/* Plant Hall Silhouette (Overgrown) */}
              <polygon points="460,350 620,350 600,310 480,310" fill="#1c2620" />
              {/* Forest & Shrub Regrowth */}
              <circle cx="220" cy="380" r="45" fill="#1c3b28" opacity="0.6" />
              <circle cx="340" cy="390" r="55" fill="#183323" opacity="0.7" />
              <circle cx="680" cy="400" r="60" fill="#1c3b28" opacity="0.6" />
              <path d="M0 430 Q400 400 800 440 L800 500 L0 500 Z" fill="#0b130e" />
            </svg>
          </div>

          <div className="relative z-10 flex justify-end">
            <span className="px-3 py-1 bg-black/70 backdrop-blur-md text-emerald-400 border border-emerald-500/40 rounded-full font-mono text-xs flex items-center gap-1.5 shadow-lg">
              <Calendar className="w-3.5 h-3.5" />
              NOW &bull; October 2026 (Decommissioned & Natural Regrowth)
            </span>
          </div>

          <div className="relative z-10 self-end max-w-xs text-right text-xs text-[#A4ADA5] bg-black/75 backdrop-blur-md p-3 rounded-lg border border-white/10">
            <p className="text-white font-medium">Silent Sair Chimneys</p>
            <p className="text-[11px] mt-1 text-[#A4ADA5]">
              Surviving brick and concrete chimneys stand dormant amidst reclaimed pine brushwood. No active generation or steam emission.
            </p>
          </div>
        </div>

        {/* BEFORE (Historical 1971 Era) Layer - Clipped by Slider */}
        <div
          className="absolute inset-0 overflow-hidden bg-[#1a150e]"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="absolute inset-0 w-[800px] sm:w-[1200px] h-full flex flex-col justify-between p-6 bg-[#16120c]">
            {/* Historical 1971 Industrial Vector Rendering */}
            <div className="absolute inset-0 opacity-90 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="skyPast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4a3928" />
                    <stop offset="100%" stopColor="#1a140d" />
                  </linearGradient>
                  <linearGradient id="hillsPast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#302418" />
                    <stop offset="100%" stopColor="#18120b" />
                  </linearGradient>
                </defs>
                <rect width="800" height="500" fill="url(#skyPast)" />
                <path d="M0 260 Q180 160 380 240 T800 220 L800 500 L0 500 Z" fill="url(#hillsPast)" />
                <path d="M0 310 Q220 250 480 320 T800 290 L800 500 L0 500 Z" fill="#241a12" />
                {/* Active Chimneys with White Steam Plumes */}
                <rect x="520" y="240" width="16" height="110" fill="#544434" rx="2" />
                <rect x="550" y="255" width="14" height="95" fill="#544434" rx="2" />
                {/* Steam Plumes */}
                <path d="M528 240 Q510 180 470 120 T380 60" stroke="#f4f1e8" strokeWidth="18" fill="none" opacity="0.35" strokeLinecap="round" />
                <path d="M557 255 Q540 200 500 140 T420 80" stroke="#f4f1e8" strokeWidth="14" fill="none" opacity="0.25" strokeLinecap="round" />
                {/* Turbine Hall with Bright Industrial Windows */}
                <polygon points="460,350 620,350 600,310 480,310" fill="#3a2f24" />
                <rect x="490" y="325" width="20" height="12" fill="#ffd175" opacity="0.8" />
                <rect x="520" y="325" width="20" height="12" fill="#ffd175" opacity="0.8" />
                <rect x="550" y="325" width="20" height="12" fill="#ffd175" opacity="0.8" />
                {/* Coal Yard / Hopper Conveyor */}
                <line x1="390" y1="380" x2="470" y2="340" stroke="#8a7359" strokeWidth="6" />
                <polygon points="350,420 420,420 385,380" fill="#1f1812" />
                {/* Foreground Road with Coal Dispatch Truck */}
                <path d="M0 430 Q400 400 800 440 L800 500 L0 500 Z" fill="#1f170f" />
                <rect x="180" y="420" width="45" height="20" fill="#8c3a27" rx="3" />
                <circle cx="190" cy="442" r="6" fill="#080808" />
                <circle cx="215" cy="442" r="6" fill="#080808" />
              </svg>
            </div>

            <div className="relative z-10 flex justify-start">
              <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-[#C5A56A] border border-[#C5A56A]/50 rounded-full font-mono text-xs flex items-center gap-1.5 shadow-lg">
                <Camera className="w-3.5 h-3.5" />
                THEN &bull; c. 1971 (Commissioned Peak Generation)
              </span>
            </div>

            <div className="relative z-10 max-w-xs text-xs text-[#A4ADA5] bg-black/80 backdrop-blur-md p-3 rounded-lg border border-white/10">
              <p className="text-white font-medium">Active 22.5 MW Generation</p>
              <p className="text-[11px] mt-1 text-[#A4ADA5]">
                Three Skoda 7.5 MW turbogenerators synchronized with Jammu grid; active coal hopper conveyors from Ber-Goa adits.
              </p>
            </div>
          </div>
        </div>

        {/* Draggable Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-[#C5A56A] shadow-[0_0_12px_#C5A56A] pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#111713] border-2 border-[#C5A56A] text-[#C5A56A] flex items-center justify-center font-bold text-xs shadow-xl">
            &#8596;
          </div>
        </div>
      </div>

      {/* Mandatory Reconstruction Qualification & Source Metadata */}
      <div className="p-4 rounded-lg bg-[#111713] border border-white/10 text-xs text-[#A4ADA5] space-y-2">
        <div className="flex items-center gap-2 text-[#C5A56A] font-mono uppercase text-[11px] font-semibold">
          <Info className="w-4 h-4 shrink-0" />
          <span>HISTORICAL RECONSTRUCTION — NOT AN ORIGINAL ARCHIVAL PHOTOGRAPH</span>
        </div>
        <p className="leading-relaxed">
          The 1971 perspective reconstructs verified structural layouts of the Czechoslovakian Skoda installation, dual chimney stack geometry, coal conveyors, and turbine hall at Sair based on J&K Power Development Department engineering specifications and Assembly records. The present view depicts the stabilized post-closure landscape documented in 2026.
        </p>
        <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px]">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#C5A56A]" />
            Location: Sair Sector, Kalakote (33.2150°N, 74.4080°E)
          </span>
          <span className="text-white/60">Primary Documentation: SRC-006 &bull; SRC-012</span>
        </div>
      </div>
    </div>
  );
};

