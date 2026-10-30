import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Calendar, MapPin, Pickaxe, Flame, FileText, ArrowRight } from 'lucide-react';
import { HISTORICAL_EVENTS } from '../../data/events';
import { MINES_DATA } from '../../data/mines';
import { PROJECTS_DATA } from '../../data/projects';
import { LOCATIONS_DATA } from '../../data/locations';
import { SOURCES_DATA } from '../../data/sources';
import { MYTHS_EVIDENCE_DATA } from '../../data/myths';
import { HERITAGE_SITES_DATA } from '../../data/heritage';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSource: (sourceId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSource
}) => {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'EVENTS' | 'MINES' | 'PROJECTS' | 'LOCATIONS' | 'SOURCES'>('ALL');
  const navigate = useNavigate();

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: {
      id: string;
      title: string;
      subtitle: string;
      category: 'EVENTS' | 'MINES' | 'PROJECTS' | 'LOCATIONS' | 'SOURCES' | 'MYTHS';
      badge?: string;
      route?: string;
      sourceId?: string;
    }[] = [];

    // Search Events
    if (selectedFilter === 'ALL' || selectedFilter === 'EVENTS') {
      HISTORICAL_EVENTS.forEach(e => {
        if (
          e.title.toLowerCase().includes(q) ||
          e.summary.toLowerCase().includes(q) ||
          e.detailedAnalysis.toLowerCase().includes(q) ||
          e.era.toLowerCase().includes(q)
        ) {
          results.push({
            id: e.id,
            title: e.title,
            subtitle: `${e.eventDate} • ${e.era}`,
            category: 'EVENTS',
            badge: e.verificationStatus,
            route: `/history?event=${e.id}`
          });
        }
      });
    }

    // Search Mines
    if (selectedFilter === 'ALL' || selectedFilter === 'MINES') {
      MINES_DATA.forEach(m => {
        if (
          m.officialName.toLowerCase().includes(q) ||
          m.blockOrArea.toLowerCase().includes(q) ||
          m.geologicalFormation.toLowerCase().includes(q) ||
          m.statusNotes.toLowerCase().includes(q)
        ) {
          results.push({
            id: m.id,
            title: m.officialName,
            subtitle: `${m.blockOrArea} • ${m.coalRank}`,
            category: 'MINES',
            badge: m.currentStatus,
            route: `/mining?mine=${m.id}`
          });
        }
      });
    }

    // Search Projects
    if (selectedFilter === 'ALL' || selectedFilter === 'PROJECTS') {
      PROJECTS_DATA.forEach(p => {
        if (
          p.projectName.toLowerCase().includes(q) ||
          p.purpose.toLowerCase().includes(q) ||
          p.responsibleDepartment.toLowerCase().includes(q)
        ) {
          results.push({
            id: p.id,
            title: p.projectName,
            subtitle: `${p.purpose.slice(0, 90)}...`,
            category: 'PROJECTS',
            badge: p.currentStatus,
            route: p.id === 'PRJ-001' ? '/thermal-station' : '/built-changed-lost'
          });
        }
      });
    }

    // Search Locations
    if (selectedFilter === 'ALL' || selectedFilter === 'LOCATIONS') {
      LOCATIONS_DATA.forEach(l => {
        if (
          l.name.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.historicalSignificance.toLowerCase().includes(q)
        ) {
          results.push({
            id: l.id,
            title: l.name,
            subtitle: `${l.category} • Elevation: ${l.elevationMeters || 'N/A'}m`,
            category: 'LOCATIONS',
            route: `/map?loc=${l.id}`
          });
        }
      });
    }

    // Search Sources
    if (selectedFilter === 'ALL' || selectedFilter === 'SOURCES') {
      SOURCES_DATA.forEach(s => {
        if (
          s.title.toLowerCase().includes(q) ||
          s.institutionOrAuthor.toLowerCase().includes(q) ||
          s.relevantExcerpt.toLowerCase().includes(q)
        ) {
          results.push({
            id: s.id,
            title: s.title,
            subtitle: `${s.institutionOrAuthor} (${s.publicationDate})`,
            category: 'SOURCES',
            badge: s.verificationStatus,
            sourceId: s.id
          });
        }
      });
    }

    // Search Myths
    if (selectedFilter === 'ALL') {
      MYTHS_EVIDENCE_DATA.forEach(m => {
        if (
          m.claim.toLowerCase().includes(q) ||
          m.whatIsEstablished.toLowerCase().includes(q) ||
          m.popularPerception.toLowerCase().includes(q)
        ) {
          results.push({
            id: m.id,
            title: m.claim,
            subtitle: `Evidence status: ${m.whatIsEstablished.slice(0, 90)}...`,
            category: 'MYTHS',
            badge: m.verificationStatus,
            route: `/myths#${m.id}`
          });
        }
      });

      // Search Heritage Sites
      HERITAGE_SITES_DATA.forEach(h => {
        if (
          h.name.toLowerCase().includes(q) ||
          h.location.toLowerCase().includes(q) ||
          h.culturalSignificance.toLowerCase().includes(q) ||
          h.alternateNames.some(a => a.toLowerCase().includes(q))
        ) {
          results.push({
            id: h.id,
            title: h.name,
            subtitle: `${h.location} • ${h.architecturalStyle.slice(0, 80)}...`,
            category: 'LOCATIONS',
            route: `/heritage#${h.id}`
          });
        }
      });
    }

    return results;
  }, [query, selectedFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-3xl bg-[#111713] border border-[#C5A56A]/40 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Bar */}
        <div className="flex items-center px-3.5 sm:px-4 py-3 sm:py-3.5 border-b border-white/10 bg-black/40">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#C5A56A] mr-2.5 sm:mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, mines, documents, coordinates..."
            className="w-full bg-transparent text-sm sm:text-base text-[#F4F1E8] placeholder-[#A4ADA5]/60 focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-white/50 hover:text-white mr-1.5"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 sm:px-2 sm:py-0.5 text-xs font-mono text-[#C5A56A] hover:text-[#DFC38E] bg-white/5 rounded border border-white/10 flex items-center gap-1 shrink-0"
            aria-label="Close search modal"
          >
            <X className="w-4 h-4 sm:hidden" />
            <span className="hidden sm:inline">ESC</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-white/5 bg-[#0D130F] overflow-x-auto text-xs font-mono">
          {(['ALL', 'EVENTS', 'MINES', 'PROJECTS', 'LOCATIONS', 'SOURCES'] as const).map(f => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
                selectedFilter === f
                  ? 'bg-[#C5A56A] text-[#080B09] font-bold'
                  : 'text-[#A4ADA5] hover:text-[#F4F1E8] hover:bg-white/5'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {!query.trim() ? (
            <div className="py-12 text-center text-sm text-[#A4ADA5] space-y-3">
              <p className="font-serif italic text-lg text-[#F4F1E8]/70">
                "Every Mountain Has a Story. Every Era Leaves a Mark."
              </p>
              <p>Type to search across verified archives, coalfield data, court records, and cartographic points.</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2 text-xs font-mono">
                <span className="px-2 py-1 bg-white/5 rounded text-[#C5A56A] cursor-pointer hover:bg-white/10" onClick={() => setQuery('Skoda')}>
                  Try "Skoda"
                </span>
                <span className="px-2 py-1 bg-white/5 rounded text-[#C5A56A] cursor-pointer hover:bg-white/10" onClick={() => setQuery('Metka')}>
                  Try "Metka"
                </span>
                <span className="px-2 py-1 bg-white/5 rounded text-[#C5A56A] cursor-pointer hover:bg-white/10" onClick={() => setQuery('ADC')}>
                  Try "ADC"
                </span>
                <span className="px-2 py-1 bg-white/5 rounded text-[#C5A56A] cursor-pointer hover:bg-white/10" onClick={() => setQuery('Tatapani')}>
                  Try "Tatapani"
                </span>
                <span className="px-2 py-1 bg-white/5 rounded text-[#C5A56A] cursor-pointer hover:bg-white/10" onClick={() => setQuery('Census')}>
                  Try "Census"
                </span>
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#A4ADA5] space-y-2">
              <p className="text-[#F4F1E8] font-medium">No verified archival records match "{query}"</p>
              <p className="text-xs">
                In adherence to our research guidelines: "Available sources do not currently establish this detail."
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-xs font-mono text-[#A4ADA5] px-2 py-1">
                Showing {searchResults.length} verified records
              </div>
              {searchResults.map((item) => (
                <div
                  key={`${item.category}-${item.id}`}
                  onClick={() => {
                    if (item.sourceId) {
                      onSelectSource(item.sourceId);
                    } else if (item.route) {
                      navigate(item.route);
                      onClose();
                    }
                  }}
                  className="flex items-start justify-between p-3 rounded-lg bg-black/30 hover:bg-[#161F1A] border border-white/5 hover:border-[#C5A56A]/40 transition-all cursor-pointer group"
                >
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#C5A56A] flex items-center gap-1">
                        {item.category === 'EVENTS' && <Calendar className="w-3 h-3" />}
                        {item.category === 'MINES' && <Pickaxe className="w-3 h-3" />}
                        {item.category === 'PROJECTS' && <Flame className="w-3 h-3" />}
                        {item.category === 'LOCATIONS' && <MapPin className="w-3 h-3" />}
                        {item.category === 'SOURCES' && <FileText className="w-3 h-3" />}
                        {item.category}
                      </span>
                      <h4 className="text-sm font-semibold text-[#F4F1E8] group-hover:text-[#C5A56A] transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#A4ADA5] line-clamp-2">{item.subtitle}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {item.badge && (
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-white/10 text-white/70">
                        {item.badge}
                      </span>
                    )}
                    <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#C5A56A] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

