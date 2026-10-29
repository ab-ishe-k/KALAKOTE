import React from 'react';
import { CensusCharts } from '../components/charts/CensusCharts';
import { BarChart2, Database } from 'lucide-react';
import { VerificationBadge } from '../components/common/VerificationBadge';

export const Development: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080B09] text-[#F4F1E8] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Page Header */}
      <div className="border-b border-white/10 pb-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A] flex items-center gap-2">
            <BarChart2 className="w-4 h-4" />
            Empirical Statistical Ledger
          </span>
          <VerificationBadge status="VERIFIED" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F4F1E8]">
          Data & Development Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-[#A4ADA5] max-w-3xl leading-relaxed">
          Verifiable demographic, social, and geological metrics compiled from the decennial Census of India 2011 and official Ministry of Coal resource inventories. In compliance with archival principles, no hypothetical statistical projections are fabricated.
        </p>
      </div>

      {/* Methodological Caveat Banner */}
      <div className="p-4 rounded-xl bg-[#111713] border border-white/10 text-xs font-mono text-[#A4ADA5] space-y-2">
        <div className="flex items-center gap-2 text-[#C5A56A] font-bold uppercase text-[11px]">
          <Database className="w-3.5 h-3.5" />
          <span>Archival Integrity & Statistical Protocol:</span>
        </div>
        <p className="leading-relaxed">
          1. <strong>Town vs. Tehsil Differentiation:</strong> We strictly distinguish between Kalakote Tehsil (72,667 persons across 413 km²) and the core administrative settlement / bazaar ward (558 persons).<br />
          2. <strong>Census Vintage Notice:</strong> The latest comprehensive decennial census conducted by the Government of India remains the 2011 enumeration. These figures are explicitly cited with their 2011 reference date, not presented as current 2026 census counts.
        </p>
      </div>

      {/* Interactive Charts & Table Component */}
      <CensusCharts />
    </div>
  );
};
