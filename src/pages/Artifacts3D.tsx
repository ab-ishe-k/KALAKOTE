import React from 'react';
import { HistoricalArtifact3D } from '../components/3d/HistoricalArtifact3D';
import { useDeviceMotion } from '../hooks/useDeviceMotion';
import { Box, Compass, ShieldCheck, Cpu, Flame, LandPlot, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Artifacts3DProps {
  onOpenSourceModal?: (sourceId: string) => void;
}

export const Artifacts3D: React.FC<Artifacts3DProps> = ({ onOpenSourceModal }) => {
  const motion = useDeviceMotion();

  return (
    <div className="min-h-screen bg-[#080B09] text-[#F4F1E8] pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Editorial Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A] px-2.5 py-1 rounded bg-[#C5A56A]/10 border border-[#C5A56A]/30">
            3D DIGITAL ARCHIVE & INDUSTRIAL MUSEUM
          </span>
          <span className="flex items-center gap-1 text-emerald-400 font-mono text-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            HISTORICAL RECONSTRUCTIONS
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#F4F1E8] tracking-tight">
          Machinery, Relics & Sacred Stone in 3D
        </h1>

        <p className="text-base sm:text-lg text-[#A4ADA5] leading-relaxed">
          Interactive digital reconstructions of Kalakote’s industrial turbo-machinery, underground coal safety apparatus, and medieval Kashmiri stone temple architecture. Powered by WebGL Three.js and real-time physical device gyroscope tracking.
        </p>
      </div>

      {/* Main 3D Artifact Viewer */}
      <section>
        <HistoricalArtifact3D onOpenSourceModal={onOpenSourceModal} />
      </section>

      {/* Real-time Gyroscope & Motion Sensor Diagnostics Card */}
      <section className="p-6 rounded-2xl bg-[#111713]/80 border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#C5A56A]">
            <Compass className="w-4 h-4" />
            <h4 className="font-bold text-sm text-white">Motion Sensor Diagnostics</h4>
          </div>
          <p className="text-[#A4ADA5] text-[11px] leading-relaxed">
            {motion.isMobile
              ? 'Physical gyroscope readings streamed directly from your device accelerometer.'
              : 'Desktop virtual motion sensor tracking normalized pointer parallax.'}
          </p>
        </div>

        <div className="space-y-2 bg-black/40 p-4 rounded-xl border border-white/5">
          <div className="text-white/60">Horizontal Tilt ($\gamma$ / Roll):</div>
          <div className="text-lg font-bold text-[#C5A56A]">
            {motion.gamma > 0 ? `+${motion.gamma.toFixed(1)}°` : `${motion.gamma.toFixed(1)}°`}
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#C5A56A] h-full transition-all duration-75"
              style={{ width: `${Math.min(100, Math.max(0, (motion.x + 1) * 50))}%` }}
            />
          </div>
        </div>

        <div className="space-y-2 bg-black/40 p-4 rounded-xl border border-white/5">
          <div className="text-white/60">Vertical Pitch ($\beta$ / Tilt):</div>
          <div className="text-lg font-bold text-emerald-400">
            {motion.beta > 0 ? `+${motion.beta.toFixed(1)}°` : `${motion.beta.toFixed(1)}°`}
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-400 h-full transition-all duration-75"
              style={{ width: `${Math.min(100, Math.max(0, (motion.y + 1) * 50))}%` }}
            />
          </div>
        </div>
      </section>

      {/* Historical Context Grid */}
      <section className="space-y-8">
        <div className="border-b border-white/10 pb-4">
          <h2 className="text-2xl font-serif font-bold text-[#F4F1E8]">Historical Significance of the Artifacts</h2>
          <p className="text-sm font-mono text-[#A4ADA5] mt-1">
            Understanding why each of these three models represents a distinct epoch in Kalakote's documented chronicle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-xl bg-[#111713]/60 border border-white/10 hover:border-[#C5A56A]/50 transition-all space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#C5A56A]/10 border border-[#C5A56A]/30 flex items-center justify-center text-[#C5A56A]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#C5A56A] uppercase tracking-wider">1968 Industrial Era</span>
              <h3 className="text-lg font-serif font-bold text-[#F4F1E8] mt-1">Czechoslovak Turbo-Engineering</h3>
            </div>
            <p className="text-xs text-[#A4ADA5] leading-relaxed">
              The Škoda 7.5 MW condensing turbine units at Sair represented the zenith of post-independence heavy industrialisation in the Jammu hills, connecting bilateral Czechoslovak engineering with Jammu & Kashmir’s high-pressure power grid.
            </p>
            <Link
              to="/thermal-plant"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C5A56A] hover:underline pt-2"
            >
              Explore Thermal Plant Dossier <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-xl bg-[#111713]/60 border border-white/10 hover:border-[#C5A56A]/50 transition-all space-y-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">Mining Safety Epoch</span>
              <h3 className="text-lg font-serif font-bold text-[#F4F1E8] mt-1">The Marsaut Flame Barrier</h3>
            </div>
            <p className="text-xs text-[#A4ADA5] leading-relaxed">
              Underground coal seams in the Subathu formation presented severe geological friction, folding, and firedamp pockets. Davy and Marsaut gauze lamps allowed workers to safely detect carbon monoxide and methane before modern electronic sensors.
            </p>
            <Link
              to="/mining"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C5A56A] hover:underline pt-2"
            >
              Explore Coalfields & DGMS Directives <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-xl bg-[#111713]/60 border border-white/10 hover:border-[#C5A56A]/50 transition-all space-y-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <LandPlot className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Classical Medieval Epoch</span>
              <h3 className="text-lg font-serif font-bold text-[#F4F1E8] mt-1">Kashmiri Monolithic Masons</h3>
            </div>
            <p className="text-xs text-[#A4ADA5] leading-relaxed">
              The stone colonnades and sacred water sanctums of Panjnara (Pandu Kund) establish that medieval Kashmiri stone architectural traditions crossed the Pir Panjal passes into the outer hill valleys of Rajouri.
            </p>
            <Link
              to="/heritage"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C5A56A] hover:underline pt-2"
            >
              Explore Heritage & Pandu Kund <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Archival Research Disclaimer */}
      <div className="p-6 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white/60 space-y-2">
        <div className="flex items-center gap-2 text-[#C5A56A]">
          <Box className="w-4 h-4" />
          <span className="font-bold uppercase tracking-wider">3D Reconstruction Methodology Notice</span>
        </div>
        <p>
          These 3D models are architectural and engineering reconstructions synthesized from verified archival blueprints, Geological Survey of India memoirs, J&K Legislative Assembly proceedings, and on-site photographic surveys. They are intended for educational inspection and digital heritage preservation.
        </p>
      </div>
    </div>
  );
};

