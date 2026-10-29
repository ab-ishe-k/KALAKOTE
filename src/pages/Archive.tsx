import React, { useState, useMemo } from 'react';
import { SOURCES_DATA } from '../data/sources';
import { HISTORICAL_EVENTS } from '../data/events';
import { MINES_DATA } from '../data/mines';
import { PROJECTS_DATA } from '../data/projects';
import { VerificationBadge } from '../components/common/VerificationBadge';
import { Archive, Search, ExternalLink, Download, BookOpen, Layers } from 'lucide-react';

interface ArchiveProps {
  onOpenSourceModal: (sourceId: string) => void;
}

export const ArchivePage: React.FC<ArchiveProps> = ({ onOpenSourceModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const sourceTypes = [
    'ALL',
    'Official Government Order',
    'Court Judgment',
    'Geological Survey (GSI)',
    'Census of India',
    'Assembly Proceeding',
    'Gazetteer / Archival Record',
    'News Report'
  ];

  const statuses = [
    'ALL',
    'VERIFIED',
    'PARTIALLY VERIFIED',
    'CONFLICTING SOURCES',
    'RESEARCH PENDING'
  ];

  // Helper to count cross references
  const getCitationCount = (sourceId: string) => {
    const eventCount = HISTORICAL_EVENTS.filter(e => e.sourceIds.includes(sourceId)).length;
    const mineCount = MINES_DATA.filter(m => m.sourceIds.includes(sourceId)).length;
    const projCount = PROJECTS_DATA.filter(p => p.sourceIds.includes(sourceId)).length;
    return { eventCount, mineCount, projCount, total: eventCount + mineCount + projCount };
  };

  const filteredSources = useMemo(() => {
    return SOURCES_DATA.filter(src => {
      const matchesSearch =
        src.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        src.institutionOrAuthor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        src.relevantExcerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === 'ALL' || src.sourceType === selectedType;
      const matchesStatus = selectedStatus === 'ALL' || src.verificationStatus === selectedStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchQuery, selectedType, selectedStatus]);

  const exportSourceRegister = () => {
    const data = filteredSources.map(s => ({
      id: s.id,
      title: s.title,
      institution: s.institutionOrAuthor,
      publicationDate: s.publicationDate,
      type: s.sourceType,
      accessStatus: s.accessStatus,
      verificationStatus: s.verificationStatus,
      lastVerificationDate: s.lastVerificationDate,
      excerpt: s.relevantExcerpt,
      url: s.url || 'Not available online'
    }));

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kalakote-source-register-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#080B09] text-[#F4F1E8] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Page Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A] flex items-center gap-2">
            <Archive className="w-4 h-4" />
            Documentary Register & Primary Sources
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F4F1E8] mt-1">
            Historical Document Archive
          </h1>
          <p className="text-xs sm:text-sm text-[#A4ADA5] mt-2 max-w-3xl leading-relaxed">
            The verified documentary catalog underpinning KALAKOTE OVERLOOK. Contains exact citations, institutional metadata, and direct access references to legislative debates, court rulings, GSI memoirs, and census publications.
          </p>
        </div>

        <button
          onClick={exportSourceRegister}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#111713] hover:bg-[#20392C] border border-white/10 text-xs font-mono text-[#C5A56A] transition-colors shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Source Ledger (JSON)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-5 rounded-xl bg-[#111713] border border-white/10 space-y-4 shadow-xl">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#C5A56A] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, author, court docket, or keyword..."
            className="w-full pl-9 pr-4 py-2 bg-black/50 border border-white/10 rounded-lg text-xs font-mono text-white placeholder-white/40 focus:outline-none focus:border-[#C5A56A]"
          />
        </div>

        {/* Dual Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-1">
          <div>
            <label className="text-[11px] text-[#A4ADA5] block mb-1">Filter by Record Type:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded p-2 text-white focus:outline-none"
            >
              {sourceTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] text-[#A4ADA5] block mb-1">Filter by Verification Rating:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded p-2 text-white focus:outline-none"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="space-y-4">
        <div className="text-xs font-mono text-[#A4ADA5] flex items-center justify-between">
          <span>Showing {filteredSources.length} cataloged primary and secondary records</span>
          <span className="text-white/40 text-[11px]">Strict negative statement protocol active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSources.map((source) => {
            const citations = getCitationCount(source.id);
            return (
              <div
                key={source.id}
                className="p-6 rounded-xl bg-[#111713] border border-white/10 space-y-4 hover:border-[#C5A56A]/50 transition-all shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
                    <span className="text-xs font-mono text-[#C5A56A] font-bold">
                      {source.id} &bull; {source.sourceType}
                    </span>
                    <VerificationBadge status={source.verificationStatus} />
                  </div>

                  <h2 className="text-lg font-serif font-bold text-[#F4F1E8]">
                    {source.title}
                  </h2>

                  <div className="text-xs font-mono text-[#A4ADA5] space-y-1">
                    <div>
                      <strong>Author / Institution:</strong> {source.institutionOrAuthor}
                    </div>
                    <div>
                      <strong>Publication Date:</strong> {source.publicationDate}
                    </div>
                    <div>
                      <strong>Access Status:</strong> <span className="text-white">{source.accessStatus}</span>
                    </div>
                  </div>

                  <blockquote className="p-3 bg-black/40 border-l-2 border-[#C5A56A] rounded text-xs text-[#F4F1E8]/90 italic leading-relaxed">
                    "{source.relevantExcerpt}"
                  </blockquote>

                  {/* Cross References Badge */}
                  <div className="p-2 bg-white/5 rounded border border-white/5 text-[11px] font-mono text-white/70 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#C5A56A]" />
                    <span>
                      Cited in {citations.eventCount} historical events &bull; {citations.mineCount} mine records &bull; {citations.projCount} projects
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <span className="text-white/40 text-[11px]">
                    Audited: {source.lastVerificationDate}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenSourceModal(source.id)}
                      className="px-3 py-1 bg-[#20392C] hover:bg-[#20392C]/80 text-[#C5A56A] rounded border border-[#C5A56A]/30 transition-colors flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Inspect Dossier</span>
                    </button>
                    {source.url && (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-white/50 hover:text-white"
                        title="Open external URL"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
