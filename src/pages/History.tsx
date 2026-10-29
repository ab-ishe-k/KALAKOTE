import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HISTORICAL_EVENTS } from '../data/events';
import { VerificationBadge } from '../components/common/VerificationBadge';
import { HistoricalEvent } from '../types';
import { Search, ArrowUpDown, BookOpen, Download, Calendar, MapPin, X, ChevronRight, Share2, Check } from 'lucide-react';

interface HistoryProps {
  onOpenSourceModal: (sourceId: string) => void;
}

export const History: React.FC<HistoryProps> = ({ onOpenSourceModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const eventParam = searchParams.get('event');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEra, setSelectedEra] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [detailedEvent, setDetailedEvent] = useState<HistoricalEvent | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync URL search param with detailedEvent
  useEffect(() => {
    if (eventParam) {
      const match = HISTORICAL_EVENTS.find((e) => e.id === eventParam);
      if (match) setDetailedEvent(match);
    }
  }, [eventParam]);

  const openEventDetail = (evt: HistoricalEvent) => {
    setDetailedEvent(evt);
    setSearchParams({ event: evt.id });
  };

  const closeEventDetail = () => {
    setDetailedEvent(null);
    setSearchParams({});
  };

  const copyEventLink = (id: string) => {
    const url = `${window.location.origin}/history?event=${id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const eras = [
    'ALL',
    'Ancient & Classical',
    'Medieval Hill Kingdoms',
    'Sikh & Dogra Period',
    'Colonial Era & Early Geology',
    'Post-Independence & Industrial Dawn',
    'Thermal Era & Coal Expansion',
    'Militancy, Decline & Reorganization',
    'Contemporary Administration (2018-2026)'
  ];

  const categories = [
    'ALL',
    'Industrial & Mining',
    'Governance & Politics',
    'Geology',
    'Heritage & Culture',
    'Infrastructure',
    'Dispute / Litigation'
  ];

  const statuses = [
    'ALL',
    'VERIFIED',
    'PARTIALLY VERIFIED',
    'UNVERIFIED',
    'CONFLICTING SOURCES',
    'RESEARCH PENDING'
  ];

  const filteredEvents = useMemo(() => {
    return HISTORICAL_EVENTS.filter((evt) => {
      const matchesSearch =
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.detailedAnalysis.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesEra = selectedEra === 'ALL' || evt.era === selectedEra;
      const matchesCategory = selectedCategory === 'ALL' || evt.category === selectedCategory;
      const matchesStatus = selectedStatus === 'ALL' || evt.verificationStatus === selectedStatus;

      return matchesSearch && matchesEra && matchesCategory && matchesStatus;
    }).sort((a, b) => {
      return sortOrder === 'ASC' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
    });
  }, [searchQuery, selectedEra, selectedCategory, selectedStatus, sortOrder]);

  const exportBibliography = () => {
    const biblio = filteredEvents.map((e) => ({
      eventId: e.id,
      title: e.title,
      eventDate: e.eventDate,
      datePrecision: e.datePrecision,
      era: e.era,
      category: e.category,
      geographicScope: e.geographicScope,
      verificationStatus: e.verificationStatus,
      sources: e.sourceIds,
      summary: e.summary,
      detailedAnalysis: e.detailedAnalysis,
      lastVerifiedDate: e.lastVerifiedDate
    }));

    const blob = new Blob([JSON.stringify(biblio, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kalakote-historical-ledger-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#080B09] text-[#F4F1E8] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A]">
            Archival Chronology & Historiography
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F4F1E8] mt-1">
            Historical Timeline of Kalakote
          </h1>
          <p className="text-xs sm:text-sm text-[#A4ADA5] mt-2 max-w-3xl leading-relaxed">
            Every recorded entry distinguishes verified historical events from regional traditions. The database enforces precise separation between the date of historical events and the publication date of surviving documentary evidence.
          </p>
        </div>

        <button
          onClick={exportBibliography}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#111713] hover:bg-[#20392C] border border-white/10 text-xs font-mono text-[#C5A56A] transition-colors shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Research Ledger (JSON)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-5 rounded-xl bg-[#111713] border border-white/10 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#C5A56A] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search historical events, legal judgments, or geological records..."
              className="w-full pl-9 pr-4 py-2 bg-black/50 border border-white/10 rounded-lg text-xs font-mono text-white placeholder-white/40 focus:outline-none focus:border-[#C5A56A]"
            />
          </div>

          <button
            onClick={() => setSortOrder((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'))}
            className="w-full sm:w-auto px-4 py-2 bg-black/40 hover:bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-[#A4ADA5] hover:text-white flex items-center justify-center gap-2 shrink-0 transition-colors"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-[#C5A56A]" />
            <span>Sort: {sortOrder === 'ASC' ? 'Earliest First' : 'Latest First'}</span>
          </button>
        </div>

        {/* Multi-Facet Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div>
            <label className="text-[11px] text-[#A4ADA5] block mb-1">Historical Era:</label>
            <select
              value={selectedEra}
              onChange={(e) => setSelectedEra(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded p-2 text-white focus:outline-none"
            >
              {eras.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] text-[#A4ADA5] block mb-1">Thematic Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded p-2 text-white focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] text-[#A4ADA5] block mb-1">Verification Rating:</label>
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

      {/* Events Timeline List */}
      <div className="space-y-4">
        <div className="text-xs font-mono text-[#A4ADA5] flex items-center justify-between">
          <span>Showing {filteredEvents.length} documented historical events</span>
          <span className="text-white/50">Click any card to inspect full evidential dossier</span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="py-16 text-center text-[#A4ADA5] bg-[#111713] rounded-xl border border-white/10 p-8 space-y-2">
            <p className="text-white font-medium">No verified events match your current filter parameters.</p>
            <p className="text-xs">"Available sources do not currently establish this detail."</p>
          </div>
        ) : (
          filteredEvents.map((evt) => (
            <div
              key={evt.id}
              onClick={() => openEventDetail(evt)}
              className="p-6 rounded-xl border border-white/10 bg-[#111713] hover:border-[#C5A56A]/50 hover:bg-[#161F1A] transition-all cursor-pointer shadow-lg space-y-3 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#C5A56A] px-2.5 py-1 rounded bg-black/40 border border-[#C5A56A]/30">
                    {evt.eventDate}
                  </span>
                  <span className="text-xs font-mono text-[#A4ADA5] hidden sm:inline">
                    {evt.era}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-white/50 uppercase px-2 py-0.5 rounded bg-white/5">
                    {evt.category}
                  </span>
                  <VerificationBadge status={evt.verificationStatus} />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-serif font-bold text-[#F4F1E8] group-hover:text-[#C5A56A] transition-colors">
                  {evt.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A4ADA5] leading-relaxed">
                  {evt.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/50">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A56A]" />
                  Scope: <strong className="text-white/80">{evt.geographicScope}</strong>
                </span>
                <span className="text-[#C5A56A] group-hover:underline flex items-center gap-1">
                  <span>Open Dossier</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Full Event Detail Modal */}
      {detailedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#111713] border border-[#C5A56A]/40 rounded-2xl shadow-2xl overflow-y-auto p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="space-y-1 pr-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#C5A56A] font-bold">
                    {detailedEvent.id} &bull; {detailedEvent.eventDate}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-white/60">
                    {detailedEvent.category}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4F1E8]">
                  {detailedEvent.title}
                </h2>
                <p className="text-xs font-mono text-[#A4ADA5]">
                  Era: {detailedEvent.era} &bull; Scope: {detailedEvent.geographicScope}
                </p>
              </div>

              <button
                onClick={closeEventDetail}
                className="p-1.5 text-white/60 hover:text-white rounded-md hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Verification Status */}
            <div className="flex items-center justify-between p-3.5 bg-black/40 rounded-lg border border-white/5">
              <span className="text-xs font-mono text-[#A4ADA5]">Archival Verification Rating:</span>
              <VerificationBadge status={detailedEvent.verificationStatus} size="md" />
            </div>

            {/* Core Summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-[#C5A56A] tracking-wider">
                Historical Summary:
              </h4>
              <p className="text-sm text-[#F4F1E8]/90 leading-relaxed font-sans">
                {detailedEvent.summary}
              </p>
            </div>

            {/* Detailed Historical Analysis & Evidential Nuance */}
            <div className="p-4 sm:p-5 rounded-lg bg-black/50 border border-white/5 space-y-2">
              <h4 className="text-xs font-mono uppercase text-[#C5A56A] tracking-wider">
                In-Depth Historical Analysis & Evidential Context:
              </h4>
              <p className="text-xs sm:text-sm text-[#A4ADA5] leading-relaxed font-sans">
                {detailedEvent.detailedAnalysis}
              </p>
            </div>

            {/* Metadata Footer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-[#A4ADA5] p-3.5 bg-black/30 rounded border border-white/5">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C5A56A]" />
                <span>Date Precision: <strong className="text-white">{detailedEvent.datePrecision}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C5A56A]" />
                <span>Geographic Scope: <strong className="text-white">{detailedEvent.geographicScope}</strong></span>
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <span className="text-white/60">Last Verification Audit:</span>
                <span className="text-white font-bold">{detailedEvent.lastVerifiedDate}</span>
              </div>
            </div>

            {/* Primary Citations */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono uppercase text-[#C5A56A] tracking-wider">
                Primary Citations & Documentary Evidence:
              </h4>
              <div className="flex flex-wrap gap-2">
                {detailedEvent.sourceIds.map((srcId) => (
                  <button
                    key={srcId}
                    onClick={() => onOpenSourceModal(srcId)}
                    className="px-3 py-1.5 bg-[#20392C] hover:bg-[#20392C]/80 text-[#C5A56A] rounded border border-[#C5A56A]/40 text-xs font-mono flex items-center gap-1.5 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Inspect Source Record [{srcId}] &rarr;</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <button
                onClick={() => copyEventLink(detailedEvent.id)}
                className="inline-flex items-center gap-1.5 text-[#A4ADA5] hover:text-white transition-colors"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedLink ? 'Direct Link Copied!' : 'Share Direct Event Link'}</span>
              </button>

              <button
                onClick={closeEventDetail}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
