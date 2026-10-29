import React, { useState } from 'react';
import { MINES_DATA } from '../data/mines';
import { MineRecord } from '../types';
import { Pickaxe, ShieldAlert, Layers, BookOpen, Clock } from 'lucide-react';

interface MiningProps {
  onOpenSourceModal: (sourceId: string) => void;
}

export const Mining: React.FC<MiningProps> = ({ onOpenSourceModal }) => {
  const [selectedMine, setSelectedMine] = useState<MineRecord>(MINES_DATA[0]);

  const getStatusBadge = (status: MineRecord['currentStatus']) => {
    switch (status) {
      case 'OPERATIONAL':
        return <span className="px-2.5 py-1 text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-700 rounded-full">OPERATIONAL &bull; Officially Verified</span>;
      case 'SUSPENDED':
        return <span className="px-2.5 py-1 text-xs font-mono font-bold bg-amber-950 text-amber-300 border border-amber-700 rounded-full">SUSPENDED &bull; DGMS Notice</span>;
      case 'CLOSED':
        return <span className="px-2.5 py-1 text-xs font-mono font-bold bg-rose-950 text-rose-300 border border-rose-700 rounded-full">CLOSED &bull; Decommissioned</span>;
      case 'UNDER INVESTIGATION':
        return <span className="px-2.5 py-1 text-xs font-mono font-bold bg-blue-950 text-blue-300 border border-blue-700 rounded-full">UNDER INVESTIGATION &bull; Exploratory</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-mono font-bold bg-stone-900 text-stone-300 border border-stone-700 rounded-full">STATUS UNKNOWN</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#080B09] text-[#F4F1E8] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Page Header */}
      <div className="border-b border-white/10 pb-6 space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A] flex items-center gap-2">
          <Pickaxe className="w-4 h-4" />
          Sub-Himalayan Geology & Extraction
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F4F1E8]">
          The Coalfields of Kalakote
        </h1>
        <p className="text-xs sm:text-sm text-[#A4ADA5] max-w-3xl leading-relaxed">
          Comprehensive documentary record of the Subathu Formation coal measures, underground incline adit operations, Directorate General of Mines Safety (DGMS) suspension directives, and the corporate stewardship of Jammu and Kashmir Minerals Limited (JKML).
        </p>
      </div>

      {/* Geological Overview Card */}
      <div className="p-6 sm:p-8 rounded-xl bg-gradient-to-r from-[#111713] to-[#161F1A] border border-[#C5A56A]/30 space-y-4 shadow-xl">
        <h2 className="text-2xl font-serif font-bold text-[#F4F1E8] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#C5A56A]" />
          Geological Setting: The Subathu Formation (Eocene)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-[#A4ADA5] leading-relaxed">
          <p>
            Unlike India's major peninsular Gondwana coal basins (such as Jharia or Raniganj), the Jammu coal belt is of <strong>Tertiary age</strong>, situated in the basal horizon of the Eocene Subathu Formation. These coal measures lie unconformably upon the ancient Proterozoic "Great Limestone" (Sirban inlier) and are folded tightly beneath the Murree Group red beds.
          </p>
          <p>
            Due to immense tectonic compression along the Sub-Himalayan thrust sheets, the coal was metamorphosed to <strong>semi-anthracite</strong>. It exhibits high calorific value (6,000–7,800 Kcal/kg), but intense tectonic shearing has rendered the seams friable, powdered, and heavily faulted, resulting in severe roof instability and dust hazards in underground workings.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-[#C5A56A]">
          <span>GSI Memoir 1989 [SRC-003]</span>
          <span>&bull;</span>
          <span>C.S. Middlemiss Survey 1929 [SRC-013]</span>
          <span>&bull;</span>
          <span>Ministry of Coal National Inventory 2024 [SRC-008]</span>
        </div>
      </div>

      {/* Mine Selector & Detailed Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Mine Directory Tabs */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#A4ADA5] px-1">
            Verified Mine Directory
          </h3>
          <div className="space-y-2">
            {MINES_DATA.map((mine) => (
              <button
                key={mine.id}
                onClick={() => setSelectedMine(mine)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  selectedMine.id === mine.id
                    ? 'bg-[#161F1A] border-[#C5A56A] shadow-lg scale-[1.02]'
                    : 'bg-[#111713] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#C5A56A]">{mine.id}</span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-white/10 text-white/70">
                    {mine.currentStatus}
                  </span>
                </div>
                <h4 className="text-base font-serif font-bold text-[#F4F1E8] mt-2">
                  {mine.officialName}
                </h4>
                <p className="text-xs text-[#A4ADA5] mt-1">{mine.blockOrArea}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Active Mine Dossier */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-xl bg-[#111713] border border-white/10 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A]">
                {selectedMine.blockOrArea}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4F1E8] mt-1">
                {selectedMine.officialName}
              </h3>
            </div>
            <div>{getStatusBadge(selectedMine.currentStatus)}</div>
          </div>

          {/* Key Parameters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono bg-black/40 p-4 rounded-lg border border-white/5 text-[#A4ADA5]">
            <div>
              <strong className="text-white block">Geological Formation:</strong>
              <span className="text-white/80">{selectedMine.geologicalFormation}</span>
            </div>
            <div>
              <strong className="text-white block">Coal Rank & Petrology:</strong>
              <span className="text-white/80">{selectedMine.coalRank}</span>
            </div>
            <div>
              <strong className="text-white block">Operating Entity:</strong>
              <span className="text-white/80">{selectedMine.operatingEntity}</span>
            </div>
            <div>
              <strong className="text-white block">Mining Method:</strong>
              <span className="text-white/80">{selectedMine.miningMethod}</span>
            </div>
            <div>
              <strong className="text-white block">Verified Production Window:</strong>
              <span className="text-[#C5A56A]">{selectedMine.verifiedProductionPeriod}</span>
            </div>
            <div>
              <strong className="text-white block">Coordinates (GSI/Toposheet):</strong>
              <span className="text-white/80">
                {selectedMine.coordinates.lat}°N, {selectedMine.coordinates.lng}°E {selectedMine.coordinates.isApproximate && '(Approx)'}
              </span>
            </div>
          </div>

          {/* Exploration & First Documented Reference */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#C5A56A]">
              Exploration History & First Record:
            </h4>
            <p className="text-xs sm:text-sm text-[#A4ADA5] leading-relaxed">
              {selectedMine.explorationHistory}
            </p>
            <p className="text-xs text-white/50 font-mono">
              Earliest formal survey record: {selectedMine.firstDocumentedReference}
            </p>
          </div>

          {/* Production Statistics */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#C5A56A]">
              Documented Production Statistics:
            </h4>
            <div className="overflow-x-auto rounded border border-white/5 bg-black/30">
              <table className="w-full text-left text-xs font-mono text-[#A4ADA5]">
                <thead className="bg-black/60 text-[#C5A56A] border-b border-white/10">
                  <tr>
                    <th className="p-2.5">Period</th>
                    <th className="p-2.5">Output (Metric Tonnes)</th>
                    <th className="p-2.5">Archival Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {selectedMine.productionStatistics.map((stat, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 text-white font-semibold">{stat.year || 'N/A'}</td>
                      <td className="p-2.5 text-[#C5A56A]">
                        {stat.outputMetricTonnes ? stat.outputMetricTonnes.toLocaleString() : 'Data unavailable'}
                      </td>
                      <td className="p-2.5 text-[11px]">{stat.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* DGMS Regulatory Safety Directives */}
          <div className="p-4 rounded-lg bg-amber-950/30 border border-amber-700/50 space-y-2 text-xs">
            <h4 className="font-mono uppercase font-bold text-amber-300 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              DGMS Safety & Regulatory Directives (Directorate General of Mines Safety):
            </h4>
            <ul className="list-disc list-inside space-y-1 text-amber-200/90 font-mono text-[11px]">
              {selectedMine.dgmsDirectives.map((dir, idx) => (
                <li key={idx}>{dir}</li>
              ))}
            </ul>
          </div>

          {/* Environmental Research */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#C5A56A]">
              Environmental Research & Land Status:
            </h4>
            <p className="text-xs sm:text-sm text-[#A4ADA5] leading-relaxed">
              {selectedMine.environmentalImpact}
            </p>
          </div>

          {/* Current Status Certification */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C5A56A]" />
              <span>Status Verified As Of: <strong className="text-white">{selectedMine.lastVerifiedDate}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              {selectedMine.sourceIds.map((srcId) => (
                <button
                  key={srcId}
                  onClick={() => onOpenSourceModal(srcId)}
                  className="px-2.5 py-1 bg-[#20392C] hover:bg-[#20392C]/80 text-[#C5A56A] rounded border border-[#C5A56A]/30 flex items-center gap-1 transition-colors"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Inspect {srcId}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
