import React from 'react';
import { MYTHS_EVIDENCE_DATA } from '../data/myths';
import { Scale } from 'lucide-react';
import { VerificationBadge } from '../components/common/VerificationBadge';

interface MythsEvidenceProps {
  onOpenSourceModal?: (sourceId: string) => void;
}

export const MythsEvidence: React.FC<MythsEvidenceProps> = () => {
  return (
    <div className="min-h-screen bg-[#080B09] text-[#F4F1E8] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Page Header */}
      <div className="border-b border-white/10 pb-6 space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A] flex items-center gap-2">
          <Scale className="w-4 h-4" />
          Evidential Audit & Historiography
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F4F1E8]">
          Myths vs Documented Evidence
        </h1>
        <p className="text-xs sm:text-sm text-[#A4ADA5] max-w-3xl leading-relaxed">
          Evaluating popular regional perceptions, folk etymologies, and online misconceptions against verifiable primary sources, court records, geological surveys, and official gazettes.
        </p>
      </div>

      {/* Grid of Myths Tested */}
      <div className="space-y-8">
        {MYTHS_EVIDENCE_DATA.map((item, index) => (
          <div
            key={item.id}
            id={item.id}
            className="p-6 sm:p-8 rounded-xl bg-[#111713] border border-white/10 space-y-6 shadow-xl hover:border-[#C5A56A]/40 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/5 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#C5A56A] font-bold">
                  Inquiry #{index + 1} &bull; {item.id}
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F4F1E8]">
                  "{item.claim}"
                </h2>
              </div>
              <VerificationBadge status={item.verificationStatus} size="md" />
            </div>

            {/* Popular Claim vs Documented Evidence Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm leading-relaxed">
              <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-2">
                <strong className="text-rose-300 font-mono uppercase text-xs block">
                  Popular Perception / Casual Claim:
                </strong>
                <p className="text-[#A4ADA5]">{item.popularPerception}</p>
              </div>

              <div className="p-4 rounded-lg bg-[#161F1A] border border-[#20392C] space-y-2">
                <strong className="text-[#C5A56A] font-mono uppercase text-xs block">
                  What Primary Records & Evidence Disclose:
                </strong>
                <p className="text-[#F4F1E8]/90">{item.documentedEvidence}</p>
              </div>
            </div>

            {/* What is Established vs What Remains Uncertain */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-2">
              <div className="p-3.5 bg-black/20 rounded border-l-2 border-emerald-500 space-y-1">
                <span className="text-emerald-400 font-bold uppercase block text-[11px]">
                  What is Historically Established:
                </span>
                <p className="text-white/80">{item.whatIsEstablished}</p>
              </div>

              <div className="p-3.5 bg-black/20 rounded border-l-2 border-amber-500 space-y-1">
                <span className="text-amber-400 font-bold uppercase block text-[11px]">
                  What Remains Uncertain:
                </span>
                <p className="text-white/80">{item.whatRemainsUncertain}</p>
              </div>
            </div>

            {/* Sources Audited */}
            <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#A4ADA5]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-white/60">Sources Reviewed:</span>
                {item.sourcesReviewed.map((src, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-white/5 text-white/80 border border-white/10 text-[11px]">
                    {src}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
