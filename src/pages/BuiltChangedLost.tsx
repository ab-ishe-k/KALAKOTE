import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/projects';
import { IndustrialProject } from '../types';
import { Layers, HelpCircle, BookOpen, Clock } from 'lucide-react';

interface BuiltChangedLostProps {
  onOpenSourceModal: (sourceId: string) => void;
}

export const BuiltChangedLost: React.FC<BuiltChangedLostProps> = ({ onOpenSourceModal }) => {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (selectedStatusFilter === 'ALL') return true;
    return p.currentStatus === selectedStatusFilter;
  });

  const getStatusBadge = (status: IndustrialProject['currentStatus']) => {
    switch (status) {
      case 'OPERATIONAL':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">OPERATIONAL</span>;
      case 'PARTIALLY OPERATIONAL':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-950 text-amber-300 border border-amber-700">PARTIALLY OPERATIONAL</span>;
      case 'CLOSED':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-950 text-rose-300 border border-rose-700">CLOSED / DECOMMISSIONED</span>;
      case 'SUSPENDED':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-950 text-purple-300 border border-purple-700">SUSPENDED</span>;
      case 'UNDER CONSTRUCTION':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-950 text-blue-300 border border-blue-700">UNDER CONSTRUCTION</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-stone-900 text-stone-300 border border-stone-700">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#080B09] text-[#F4F1E8] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Page Header */}
      <div className="border-b border-white/10 pb-6 space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A] flex items-center gap-2">
          <Layers className="w-4 h-4" />
          Investigative Infrastructure Ledger
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F4F1E8]">
          Built, Changed & Lost
        </h1>
        <p className="text-xs sm:text-sm text-[#A4ADA5] max-w-3xl leading-relaxed">
          Tracking the full verified lifecycle of public institutions, industrial initiatives, road linkages, and civic projects in Kalakote. No proposed project is represented as completed; unanswered questions are explicitly recorded.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-lg bg-[#111713] border border-white/10 text-xs font-mono">
        {['ALL', 'OPERATIONAL', 'PARTIALLY OPERATIONAL', 'CLOSED'].map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatusFilter(st)}
            className={`px-3 py-1.5 rounded transition-colors ${
              selectedStatusFilter === st
                ? 'bg-[#C5A56A] text-[#080B09] font-bold'
                : 'text-[#A4ADA5] hover:text-white'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="space-y-8">
        {filteredProjects.map((prj) => (
          <div
            key={prj.id}
            className="p-6 sm:p-8 rounded-xl bg-[#111713] border border-white/10 space-y-5 shadow-xl hover:border-[#C5A56A]/40 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
              <div>
                <span className="text-xs font-mono text-[#C5A56A] font-bold">{prj.id}</span>
                <h2 className="text-2xl font-serif font-bold text-[#F4F1E8] mt-1">
                  {prj.projectName}
                </h2>
              </div>
              <div>{getStatusBadge(prj.currentStatus)}</div>
            </div>

            <p className="text-xs sm:text-sm text-[#A4ADA5] leading-relaxed">
              {prj.purpose}
            </p>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-black/40 rounded border border-white/5 text-xs font-mono text-[#A4ADA5]">
              <div>
                <strong className="text-white block">Responsible Entity:</strong>
                <span className="text-white/80">{prj.responsibleDepartment}</span>
              </div>
              <div>
                <strong className="text-white block">Announcement / Foundation:</strong>
                <span className="text-white/80">{prj.announcementDate}</span>
              </div>
              <div>
                <strong className="text-white block">Construction / Active Span:</strong>
                <span className="text-white/80">{prj.constructionDate || 'N/A'}</span>
              </div>
            </div>

            {/* Documented Changes & Closure Reasons */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-[#C5A56A] tracking-wider">
                Documented Operational Evolutions:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-xs text-[#A4ADA5]">
                {prj.majorChanges.map((change, idx) => (
                  <li key={idx} className="leading-relaxed">{change}</li>
                ))}
              </ul>
            </div>

            {/* Community Impact */}
            <div className="p-3.5 bg-black/30 rounded border-l-2 border-[#C5A56A] text-xs text-[#F4F1E8]/90">
              <strong className="text-[#C5A56A] block mb-1 font-mono uppercase">Verified Community Impact:</strong>
              <p className="leading-relaxed">{prj.communityImpact}</p>
            </div>

            {/* Unresolved Questions in Archival Ledger */}
            {prj.unresolvedQuestions.length > 0 && (
              <div className="p-3.5 bg-amber-950/20 rounded border border-amber-800/40 text-xs text-amber-200/90 space-y-1">
                <strong className="text-amber-400 font-mono uppercase flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Archival Gaps / Unresolved Questions:
                </strong>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] font-mono">
                  {prj.unresolvedQuestions.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Citations Footer */}
            <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#A4ADA5]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C5A56A]" />
                <span>Audited Through: {prj.lastVerifiedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                {prj.sourceIds.map((srcId) => (
                  <button
                    key={srcId}
                    onClick={() => onOpenSourceModal(srcId)}
                    className="px-2.5 py-1 bg-[#20392C] hover:bg-[#20392C]/80 text-[#C5A56A] rounded border border-[#C5A56A]/40 flex items-center gap-1"
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

