import React from 'react';
import { HERITAGE_SITES_DATA } from '../data/heritage';
import { Sparkles, MapPin, Compass, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeritageProps {
  onOpenSourceModal: (sourceId: string) => void;
}

export const Heritage: React.FC<HeritageProps> = ({ onOpenSourceModal }) => {
  const getConservationBadge = (status: string) => {
    switch (status) {
      case 'Protected':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">Centrally Protected</span>;
      case 'Local Custodianship':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-950 text-amber-300 border border-amber-700">Local Village Custodianship</span>;
      case 'Vulnerable / Neglected':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-950 text-rose-300 border border-rose-700">Vulnerable / Conservation Urgent</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-stone-900 text-stone-300 border border-stone-700">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#080B09] text-[#F4F1E8] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Page Header */}
      <div className="border-b border-white/10 pb-6 space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A] flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Archaeological & Natural Heritage
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F4F1E8]">
          Heritage & Sacred Topography
        </h1>
        <p className="text-xs sm:text-sm text-[#A4ADA5] max-w-3xl leading-relaxed">
          Documenting the ancient stone sanctums, geothermal springs, and sacred caverns of Kalakote. In compliance with strict research ethics, local folklore and epic traditions are clearly demarcated from verified architectural and historical evidence.
        </p>
      </div>

      {/* Sites Grid */}
      <div className="space-y-10">
        {HERITAGE_SITES_DATA.map((site) => (
          <div
            key={site.id}
            id={site.id}
            className="p-6 sm:p-8 rounded-xl bg-[#111713] border border-white/10 space-y-6 shadow-xl hover:border-[#C5A56A]/40 transition-colors"
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/5 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#C5A56A] font-bold">
                  {site.id} &bull; {site.location}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4F1E8]">
                  {site.name}
                </h2>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono text-[#A4ADA5]">
                  <span>Alternate Titles:</span>
                  {site.alternateNames.map((alt, idx) => (
                    <span key={idx} className="text-white/80 italic">
                      "{alt}"{idx < site.alternateNames.length - 1 ? ',' : ''}
                    </span>
                  ))}
                </div>
              </div>
              <div>{getConservationBadge(site.conservationStatus)}</div>
            </div>

            {/* Architecture & Age */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-[#A4ADA5] leading-relaxed">
              <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-2">
                <strong className="text-[#C5A56A] font-mono uppercase text-xs block">
                  Architectural Style & Structural Traits:
                </strong>
                <p>{site.architecturalStyle}</p>
                {site.approximateAge && (
                  <p className="pt-2 text-[11px] font-mono text-white/70">
                    <strong>Chronological Age:</strong> {site.approximateAge}
                  </p>
                )}
              </div>

              <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-2">
                <strong className="text-white font-mono uppercase text-xs block">
                  Cultural & Regional Significance:
                </strong>
                <p>{site.culturalSignificance}</p>
                <p className="pt-2 text-[11px] font-mono text-white/70">
                  <strong>Accessibility:</strong> {site.accessibility}
                </p>
              </div>
            </div>

            {/* Folklore vs Fact Audit Box */}
            <div className="p-4 sm:p-5 rounded-lg bg-[#161F1A] border-l-2 border-[#C5A56A] space-y-2 text-xs sm:text-sm">
              <span className="font-mono uppercase font-bold text-[#C5A56A] tracking-wider text-xs block">
                Folklore vs. Documented Historiography:
              </span>
              <p className="text-[#F4F1E8]/90 leading-relaxed font-sans">
                {site.folkloreVsFact}
              </p>
            </div>

            {/* Coordinates & Citations */}
            <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#A4ADA5]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A56A]" />
                <span>
                  Coordinates: {site.coordinates[0].toFixed(4)}°N, {site.coordinates[1].toFixed(4)}°E
                  {site.isApproximateCoordinates && <span className="text-amber-400 ml-1">(Toposheet Zone)</span>}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to="/map"
                  className="text-xs text-white/70 hover:text-[#C5A56A] flex items-center gap-1 transition-colors"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Locate in Atlas &rarr;</span>
                </Link>

                {site.sourceIds.map((srcId) => (
                  <button
                    key={srcId}
                    onClick={() => onOpenSourceModal(srcId)}
                    className="px-2.5 py-1 bg-[#20392C] hover:bg-[#20392C]/80 text-[#C5A56A] rounded border border-[#C5A56A]/40 flex items-center gap-1 transition-colors"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>Inspect {srcId}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
