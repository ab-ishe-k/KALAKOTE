import React from 'react';
import { SOURCES_DATA } from '../../data/sources';
import { VerificationBadge } from './VerificationBadge';
import { X, ExternalLink, BookOpen, Building2, Calendar, FileText } from 'lucide-react';

interface SourceModalProps {
  sourceId: string | null;
  onClose: () => void;
}

export const SourceModal: React.FC<SourceModalProps> = ({ sourceId, onClose }) => {
  if (!sourceId) return null;

  const source = SOURCES_DATA.find(s => s.id === sourceId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#111713] border border-[#C5A56A]/30 rounded-xl shadow-2xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-3 sm:pb-4 gap-2">
          <div className="space-y-1">
            <span className="text-[10px] sm:text-xs font-mono text-[#C5A56A] uppercase tracking-widest flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              Primary Archival Record &bull; {sourceId}
            </span>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#F4F1E8] leading-snug">
              {source ? source.title : 'Source Record Not Located'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {source ? (
          <div className="mt-5 space-y-5 text-sm">
            {/* Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-black/40 rounded border border-white/5 font-mono text-xs text-[#A4ADA5]">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#C5A56A]" />
                <span>
                  <strong className="text-white/80">Institution:</strong> {source.institutionOrAuthor}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C5A56A]" />
                <span>
                  <strong className="text-white/80">Publication:</strong> {source.publicationDate}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#C5A56A]" />
                <span>
                  <strong className="text-white/80">Record Type:</strong> {source.sourceType}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/80 font-bold">Access:</span>
                <span className="text-[#C5A56A]">{source.accessStatus}</span>
              </div>
            </div>

            {/* Verification status */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-[#A4ADA5]">Archival Verification Rating:</span>
              <VerificationBadge status={source.verificationStatus} size="md" />
            </div>

            {/* Relevant Evidence Excerpt */}
            <div>
              <h4 className="text-xs font-mono text-[#C5A56A] uppercase tracking-wider mb-2">
                Verified Excerpt / Archival Evidence:
              </h4>
              <blockquote className="p-3.5 bg-[#161F1A] border-l-2 border-[#C5A56A] rounded-r text-[#F4F1E8]/90 italic text-sm leading-relaxed">
                "{source.relevantExcerpt}"
              </blockquote>
            </div>

            {/* Verification Date & Link */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs text-[#A4ADA5]">
              <span>Last Audited by Researchers: {source.lastVerificationDate}</span>
              {source.url && (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#20392C] hover:bg-[#20392C]/80 text-[#F4F1E8] rounded border border-white/10 transition-colors"
                >
                  <span>Visit Document / Official Repository</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C5A56A]" />
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-[#A4ADA5]">
            <p>Available sources do not currently establish this detail.</p>
          </div>
        )}
      </div>
    </div>
  );
};

