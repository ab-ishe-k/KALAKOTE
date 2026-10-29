import React, { useState } from 'react';
import { UNRESOLVED_QUESTIONS_DATA } from '../data/unresolvedQuestions';
import { ShieldCheck, Scale, ChevronDown, ChevronUp } from 'lucide-react';
import { VerificationBadge } from '../components/common/VerificationBadge';

export const Methodology: React.FC = () => {
  const [selectedPriority, setSelectedPriority] = useState<string>('ALL');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(UNRESOLVED_QUESTIONS_DATA[0].id);

  const filteredQuestions = UNRESOLVED_QUESTIONS_DATA.filter(q => {
    if (selectedPriority === 'ALL') return true;
    return q.researchPriority === selectedPriority;
  });

  return (
    <div className="min-h-screen bg-[#080B09] text-[#F4F1E8] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A] flex items-center gap-2">
          <Scale className="w-4 h-4" />
          Academic Rigor & Archival Ethics
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F4F1E8]">
          Research Methodology & Evidential Ledger
        </h1>
        <p className="text-xs sm:text-sm text-[#A4ADA5] max-w-3xl leading-relaxed">
          KALAKOTE OVERLOOK adheres to strict historical research principles. We prioritize empirical documentation over narrative dramatization, never invent missing details to fill timelines, and explicitly demarcate unverified traditions from established legal and administrative facts.
        </p>
      </div>

      {/* Non-Negotiable Research Rules */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#111713] border border-white/10 space-y-4 shadow-xl">
        <h2 className="text-2xl font-serif font-bold text-[#F4F1E8] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#C5A56A]" />
          Non-Negotiable Archival Protocols
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-[#A4ADA5] leading-relaxed">
          <ul className="space-y-2.5 list-disc list-inside">
            <li><strong>No Historical Fabrication:</strong> We never invent historical rulers, monuments, mine coordinates, production figures, project costs, or reasons for industrial closures.</li>
            <li><strong>Source Hierarchy:</strong> Official J&K Government Orders, Directorate of Census Operations, Geological Survey of India memoirs, and High Court judgments take precedence over secondary newspaper reportage. Wikipedia and informal blogs are not treated as authoritative evidence.</li>
            <li><strong>Separation of Vintage:</strong> The date of an event (e.g. 1963 foundation stone) is strictly distinguished from the publication date of its surviving documentation (e.g. 2013 Assembly Debates).</li>
          </ul>
          <ul className="space-y-2.5 list-disc list-inside">
            <li><strong>Geographic Boundary Integrity:</strong> Kalakote tehsil is never conflated with the wider Rajouri district, Jammu province, or Kashmir valley. Regional military or administrative actions are not attributed to Kalakote without localized evidence.</li>
            <li><strong>Mandatory Negative Statement:</strong> When reliable records for an event or detail cannot be located, the platform explicitly displays: <br />
              <span className="p-1.5 bg-black/60 rounded text-[#C5A56A] font-mono text-xs inline-block mt-1 border border-white/10">
                "Available sources do not currently establish this detail."
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* The 5 Verification Badges Explained */}
      <div className="space-y-6">
        <h2 className="text-2xl font-serif font-bold text-[#F4F1E8]">
          The 5 Verification Ratings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
          {/* VERIFIED */}
          <div className="p-5 rounded-xl bg-[#111713] border border-emerald-800/40 space-y-3">
            <div className="flex items-center justify-between">
              <VerificationBadge status="VERIFIED" size="md" />
            </div>
            <p className="text-[#A4ADA5] text-xs leading-relaxed">
              Supported by official primary documents (Gazette notifications, court rulings, GSI memoirs, or Census tables) directly referencing the specific Kalakote event.
            </p>
          </div>

          {/* PARTIALLY VERIFIED */}
          <div className="p-5 rounded-xl bg-[#111713] border border-amber-800/40 space-y-3">
            <div className="flex items-center justify-between">
              <VerificationBadge status="PARTIALLY VERIFIED" size="md" />
            </div>
            <p className="text-[#A4ADA5] text-xs leading-relaxed">
              Broader regional context or archaeological styles are established (e.g., Kashmiri stone traits at Panjnara), but specific local dates or royal charters remain unverified.
            </p>
          </div>

          {/* UNVERIFIED */}
          <div className="p-5 rounded-xl bg-[#111713] border border-rose-800/40 space-y-3">
            <div className="flex items-center justify-between">
              <VerificationBadge status="UNVERIFIED" size="md" />
            </div>
            <p className="text-[#A4ADA5] text-xs leading-relaxed">
              A claim exists in informal local hearsay or online blogs, but reliable archival or administrative evidence has not been located.
            </p>
          </div>

          {/* CONFLICTING SOURCES */}
          <div className="p-5 rounded-xl bg-[#111713] border border-purple-800/40 space-y-3">
            <div className="flex items-center justify-between">
              <VerificationBadge status="CONFLICTING SOURCES" size="md" />
            </div>
            <p className="text-[#A4ADA5] text-xs leading-relaxed">
              Multiple reputable publications or official agencies report divergent dates, capacity numbers, or administrative orders.
            </p>
          </div>

          {/* RESEARCH PENDING */}
          <div className="p-5 rounded-xl bg-[#111713] border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <VerificationBadge status="RESEARCH PENDING" size="md" />
            </div>
            <p className="text-[#A4ADA5] text-xs leading-relaxed">
              Identified as a critical historical inquiry currently awaiting physical access to un-digitized state archives, DGMS regional files, or PDD depots.
            </p>
          </div>
        </div>
      </div>

      {/* Unresolved Research Questions Ledger */}
      <div className="p-6 sm:p-8 rounded-xl bg-gradient-to-br from-[#161F1A] to-[#111713] border border-[#C5A56A]/40 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A]">
              Archival Transparency & Open Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4F1E8]">
              Ledger of Unresolved Research Questions (October 2026)
            </h2>
            <p className="text-xs sm:text-sm text-[#A4ADA5]">
              In compliance with our non-negotiable research rules, these historical questions remain open rather than fabricated:
            </p>
          </div>

          {/* Filter by Priority */}
          <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded border border-white/10 text-xs font-mono">
            {['ALL', 'High', 'Medium'].map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPriority(p)}
                className={`px-3 py-1 rounded transition-colors ${
                  selectedPriority === p ? 'bg-[#C5A56A] text-black font-bold' : 'text-[#A4ADA5] hover:text-white'
                }`}
              >
                {p === 'ALL' ? 'All Priorities' : `${p} Priority`}
              </button>
            ))}
          </div>
        </div>

        {/* Structured Questions Accordion */}
        <div className="space-y-3">
          {filteredQuestions.map((q) => {
            const isExpanded = expandedQuestionId === q.id;
            return (
              <div
                key={q.id}
                className="rounded-xl border border-white/10 bg-[#111713] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-white/5 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#C5A56A] font-bold">
                        #{q.questionNumber} &bull; {q.id}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70">
                        {q.topic}
                      </span>
                      <VerificationBadge status={q.verificationStatus} />
                    </div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-[#F4F1E8]">
                      {q.title}
                    </h3>
                  </div>
                  <div className="p-1 rounded bg-white/5 text-white/50 shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-4 sm:p-5 pt-0 space-y-4 text-xs font-mono border-t border-white/5 animate-fadeIn">
                    <div className="p-3.5 bg-black/40 rounded border border-white/5 space-y-1">
                      <strong className="text-white block uppercase text-[11px]">
                        What Available Sourced Records Establish:
                      </strong>
                      <p className="text-[#A4ADA5] font-sans text-xs leading-relaxed">
                        {q.currentFinding}
                      </p>
                    </div>

                    <div className="p-3.5 bg-amber-950/20 rounded border border-amber-800/40 space-y-1 text-amber-200/90">
                      <strong className="text-amber-400 block uppercase text-[11px]">
                        Why It Remains Historically Unresolved:
                      </strong>
                      <p className="font-sans text-xs leading-relaxed">
                        {q.unresolvedDetail}
                      </p>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#A4ADA5]">
                      <div className="flex flex-wrap items-center gap-2">
                        <strong className="text-white">Primary Institutions for Further Research:</strong>
                        {q.primaryInstitutionsInvolved.map((inst, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80">
                            {inst}
                          </span>
                        ))}
                      </div>
                      <span className="text-white/40">Audited: {q.lastReviewedDate}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
