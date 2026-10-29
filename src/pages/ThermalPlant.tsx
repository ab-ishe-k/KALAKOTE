import React from 'react';
import { PROJECTS_DATA } from '../data/projects';
import { Flame, Calendar, AlertOctagon, Wrench, BookOpen, MapPin } from 'lucide-react';
import { VerificationBadge } from '../components/common/VerificationBadge';

interface ThermalPlantProps {
  onOpenSourceModal: (sourceId: string) => void;
}

export const ThermalPlant: React.FC<ThermalPlantProps> = ({ onOpenSourceModal }) => {
  const plantProject = PROJECTS_DATA.find((p) => p.id === 'PRJ-001') || PROJECTS_DATA[0];

  const timelinePhases = [
    {
      date: 'May 23, 1963',
      phase: 'Foundation Laid',
      detail: 'Foundation stone laid at Sair near Kalakote by J&K Prime Minister Bakshi Ghulam Mohammad, conceptualized as North India\'s premier pit-head coal power station.'
    },
    {
      date: '1963 - 1968',
      phase: 'Skoda Civil Construction',
      detail: 'Boiler houses, dual chimney stacks, turbine floor, and coal conveyors built with technical assistance and equipment imported from Skoda Export, Czechoslovakia.'
    },
    {
      date: 'November 1968',
      phase: 'Trial Synchronization',
      detail: 'First 7.5 MW generating unit achieved initial grid synchronization, powering Jammu regional feeder lines.'
    },
    {
      date: '1969 - 1971',
      phase: 'Full Unit Commissioning',
      detail: 'Units 2 and 3 brought online, reaching total nameplate installed capacity of 22.5 MW (3 x 7.5 MW).'
    },
    {
      date: '1972 - 1986',
      phase: 'Operational Turbulence',
      detail: 'Chronic pulverizer clogging and severe boiler tube corrosion due to Kalakote coal\'s excessive abrasive ash content (35-45%). Concurrent 3-unit generation proved rarely achievable.'
    },
    {
      date: '1987',
      phase: 'Terminal Operational Shutdown',
      detail: 'Final trip-out and permanent cessation of electrical generation. High repair costs and unviable unit costs forced boilers to remain cold.'
    },
    {
      date: '1989',
      phase: 'Formal Cabinet Closure Decree',
      detail: 'The Jammu & Kashmir State Cabinet formally adopted a resolution to close and decommission the Kalakote Thermal Station permanently.'
    },
    {
      date: 'October 2026',
      phase: 'Present-Day Site Status',
      detail: 'Site remains decommissioned under Power Development Department / JKSPDC custody. Twin chimneys stand intact; no active power revival plan sanctioned.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#080B09] text-[#F4F1E8] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Page Header */}
      <div className="border-b border-white/10 pb-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#E06C47] flex items-center gap-2">
            <Flame className="w-4 h-4" />
            Industrial Heritage & Decommissioning
          </span>
          <VerificationBadge status="VERIFIED" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F4F1E8]">
          Kalakote Thermal Power Station (KTPS)
        </h1>
        <p className="text-xs sm:text-sm text-[#A4ADA5] max-w-3xl leading-relaxed">
          The verified documentary biography of North India\'s first coal-fired power station: 22.5 MW installed capacity, Czechoslovakian Skoda turbogenerators, combustion bottlenecks, and formal 1989 decommissioning.
        </p>
      </div>

      {/* Primary Engineering Dossier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-[#111713] border border-white/10 space-y-1">
          <span className="text-[#A4ADA5] block">Installed Capacity</span>
          <span className="text-2xl font-serif font-bold text-[#C5A56A] block">22.5 MW</span>
          <span className="text-white/50 text-[10px]">3 Units x 7.5 MW Each</span>
        </div>

        <div className="p-4 rounded-xl bg-[#111713] border border-white/10 space-y-1">
          <span className="text-[#A4ADA5] block">Equipment Manufacturer</span>
          <span className="text-xl font-serif font-bold text-white block">Skoda Export</span>
          <span className="text-white/50 text-[10px]">Czechoslovak Socialist Republic</span>
        </div>

        <div className="p-4 rounded-xl bg-[#111713] border border-white/10 space-y-1">
          <span className="text-[#A4ADA5] block">Active Lifespan</span>
          <span className="text-xl font-serif font-bold text-[#E06C47] block">1968 &ndash; 1987</span>
          <span className="text-white/50 text-[10px]">Shutdown: 1987 &bull; Cabinet: 1989</span>
        </div>

        <div className="p-4 rounded-xl bg-[#111713] border border-white/10 space-y-1">
          <span className="text-[#A4ADA5] block">Current Verified Status</span>
          <span className="text-xl font-serif font-bold text-rose-400 block">DECOMMISSIONED</span>
          <span className="text-white/50 text-[10px]">Verified October 2026</span>
        </div>
      </div>

      {/* In-Depth Technical Analysis */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#111713] border border-white/10 space-y-6 shadow-xl">
        <h2 className="text-2xl font-serif font-bold text-[#F4F1E8] flex items-center gap-2">
          <Wrench className="w-5 h-5 text-[#C5A56A]" />
          Combustion Dilemma: Why the Skoda Boilers Failed
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-[#A4ADA5] leading-relaxed">
          <div className="space-y-4">
            <h3 className="text-base font-serif font-bold text-white">Fuel Incompatibility & Abrasive Wear</h3>
            <p>
              The Kalakote Thermal Power Station was engineered to utilize captive coal extracted from the abutting Ber-Goa and Metka adits. However, Czechoslovakian Skoda turbogenerators were calibrated for uniform bituminous industrial coal.
            </p>
            <p>
              Kalakote coal, being tectonically deformed Subathu semi-anthracite, possessed low volatile matter (10-14%) and exceptionally high ash content (often reaching 35% to 45%). When milled, it pulverized into fine abrasive quartz-rich dust that rapidly gouged out coal-pulverizing balls, induced extreme mechanical vibrations, and severely eroded boiler water-wall tubes.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-serif font-bold text-white">Economic & Grid Infeasibility</h3>
            <p>
              Because of high ash and clinkering, generating units tripped out repeatedly. To maintain boiler pressure, the plant had to burn significant quantities of expensive furnace oil alongside low-grade coal, inflating the per-unit cost of electricity far beyond regional hydro power alternatives.
            </p>
            <p>
              Following the breakup of Czechoslovakia, procuring specialized replacement components for Skoda turbines became nearly impossible. In 1987, generation halted permanently; on January 1989, the J&K State Cabinet formally recognized the irreversible closure.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-2 text-xs font-mono">
          <h4 className="text-[#C5A56A] uppercase font-bold">Documented Closure Reasons in Assembly Debates:</h4>
          <ul className="list-disc list-inside space-y-1 text-[#A4ADA5]">
            {plantProject.documentedClosureReasons.map((reason, idx) => (
              <li key={idx}>{reason}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Visual Plant Lifecycle Timeline */}
      <div className="space-y-6">
        <h2 className="text-2xl font-serif font-bold text-[#F4F1E8] flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#C5A56A]" />
          Visual Lifecycle: Conception to Decommissioning
        </h2>

        <div className="relative border-l border-white/10 ml-4 pl-6 space-y-8">
          {timelinePhases.map((phase, idx) => (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#111713] border-2 border-[#C5A56A] group-hover:bg-[#C5A56A] transition-colors" />
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#C5A56A] font-bold">{phase.date}</span>
                <h3 className="text-lg font-serif font-bold text-[#F4F1E8]">{phase.phase}</h3>
                <p className="text-xs text-[#A4ADA5] leading-relaxed max-w-2xl">{phase.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sair Site Today & Unresolved Questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-[#111713] border border-white/10 space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#C5A56A]" />
            <h3 className="text-lg font-serif font-bold text-[#F4F1E8]">The Sair Site in October 2026</h3>
          </div>
          <p className="text-xs text-[#A4ADA5] leading-relaxed">
            The power plant premises at Sair (Coordinates: 33.2150°N, 74.4080°E) are guarded by departmental caretakers under the Jammu & Kashmir State Power Development Corporation (JKSPDC). The two primary industrial chimneys remain standing as landmark silhouettes against the Shivalik ridges. Over four decades of scrub vegetation and pine regrowth have reclaimed the former coal stockyards.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#111713] border border-white/10 space-y-3">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-amber-400" />
            <h3 className="text-lg font-serif font-bold text-[#F4F1E8]">Unresolved Archival Questions</h3>
          </div>
          <ul className="text-xs text-[#A4ADA5] space-y-2 list-disc list-inside">
            {plantProject.unresolvedQuestions.map((q, idx) => (
              <li key={idx} className="leading-relaxed">{q}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Citations Footer */}
      <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#A4ADA5]">
        <span>Corroborated by J&K Legislative Assembly debates, High Court judgments, and PDD memoirs.</span>
        <div className="flex items-center gap-2">
          {plantProject.sourceIds.map((srcId) => (
            <button
              key={srcId}
              onClick={() => onOpenSourceModal(srcId)}
              className="px-3 py-1 bg-[#20392C] hover:bg-[#20392C]/80 text-[#C5A56A] rounded border border-[#C5A56A]/40 flex items-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Inspect Source {srcId}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
