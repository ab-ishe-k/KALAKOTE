import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hero3DCanvas } from '../components/3d/Hero3DCanvas';
import { VerificationBadge } from '../components/common/VerificationBadge';
import { KalakoteMap } from '../components/map/KalakoteMap';
import { ThenAndNowComparison } from '../components/home/ThenAndNowComparison';
import { SOURCES_DATA } from '../data/sources';
import {
  Clock,
  Pickaxe,
  Flame,
  Building2,
  Map,
  BookOpen,
  Box,
  Sparkles,
  Landmark
} from 'lucide-react';

interface HomeProps {
  onOpenSourceModal: (sourceId: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenSourceModal }) => {
  // Story Exploration Tabs to make homepage clean, structured and not overwhelmed
  const [activeStoryTab, setActiveStoryTab] = useState<'MINING_POWER' | 'ADMIN_PEOPLE' | 'HERITAGE_3D'>('MINING_POWER');

  const featuredSource = SOURCES_DATA[0]; // J&K Reorganisation Act 2019

  return (
    <div className="space-y-16 sm:space-y-24 bg-[#F8FAFC] text-[#0F172A] min-h-screen">
      {/* =========================================================
          HERO SECTION: 3D ANTHRACITE COAL + MOTION SENSOR + CLEAR HOOK
          ========================================================= */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-slate-200">
        <Hero3DCanvas />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5 sm:space-y-6 pointer-events-none py-16 sm:py-24">
          {/* Badge: Mineral & Regional Trust Anchor */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-amber-500/40 text-amber-800 text-xs font-mono font-semibold tracking-wider uppercase backdrop-blur-md shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Kashmir's Historic Anthracite Coal Basin &bull; Rajouri, J&amp;K</span>
          </div>

          {/* Primary Clean Headline */}
          <h1 className="font-serif text-3xl xs:text-5xl sm:text-7xl font-bold tracking-tight text-slate-900 drop-shadow-sm leading-tight break-words">
            KALAKOTE OVERLOOK
          </h1>

          {/* Elegant Subtitle with High Contrast */}
          <p className="font-serif italic text-base sm:text-2xl text-amber-800 max-w-2xl mx-auto leading-snug drop-shadow-sm font-semibold">
            "The Fire in the Foothills, the Steam of Sair, and the Living Memory of Pir Panjal."
          </p>

          {/* Editorial Hook Paragraph */}
          <p className="font-sans text-xs sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed px-2 font-normal">
            An open digital research archive documenting the subterranean coal mines of Subathu, North India's first pit-head thermal powerhouse, administrative agitations, and classical Kashmiri temple relics.
          </p>

          {/* Focused Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-3 pointer-events-auto max-w-md sm:max-w-none mx-auto w-full">
            <Link
              to="/time-machine"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 text-white font-mono text-xs sm:text-sm font-bold tracking-wider hover:brightness-110 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Clock className="w-4 h-4 shrink-0" />
              <span>LAUNCH TIME MACHINE (2.5D)</span>
            </Link>

            <Link
              to="/artifacts-3d"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-mono text-xs sm:text-sm tracking-wider transition-all shadow-md flex items-center justify-center gap-2 font-semibold"
            >
              <Box className="w-4 h-4 text-amber-600 shrink-0" />
              <span>3D COAL &amp; RELICS MUSEUM</span>
            </Link>

            <Link
              to="/map"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-mono text-xs sm:text-sm tracking-wider transition-all shadow-md flex items-center justify-center gap-2 font-semibold"
            >
              <Map className="w-4 h-4 text-sky-600 shrink-0" />
              <span>EXPLORE ATLAS</span>
            </Link>
          </div>

          <p className="text-[11px] font-mono text-slate-600 pt-4 font-medium">
            Audited Against 13 Official Gazettes &bull; GSI Subathu Memoirs &bull; Census of India 2011
          </p>
        </div>
      </section>

      {/* =========================================================
          SECTION 2: GLANCE STATS — 4 CLEAN KEY PILLARS (BRIGHT CLEAN CARDS)
          ========================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto -mt-6 sm:-mt-10 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Mining Coal */}
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 hover:border-amber-500/50 hover:shadow-lg transition-all shadow-sm space-y-1.5">
            <div className="flex items-center gap-2 text-amber-700 font-mono text-xs font-semibold">
              <Pickaxe className="w-4 h-4" />
              <span className="uppercase tracking-wider">Subathu Coal</span>
            </div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-slate-900">9.38 MT</div>
            <div className="text-[11px] text-slate-600">Anthracite belt (Metka, Moghla, Ber-Goa)</div>
          </div>

          {/* Card 2: Thermal Station */}
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 hover:border-amber-500/50 hover:shadow-lg transition-all shadow-sm space-y-1.5">
            <div className="flex items-center gap-2 text-amber-700 font-mono text-xs font-semibold">
              <Flame className="w-4 h-4" />
              <span className="uppercase tracking-wider">Skoda Thermal</span>
            </div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-slate-900">22.5 MW</div>
            <div className="text-[11px] text-slate-600">North India's 1st pit-head station (1968–1987)</div>
          </div>

          {/* Card 3: Administrative Tehsil */}
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 hover:border-sky-500/50 hover:shadow-lg transition-all shadow-sm space-y-1.5">
            <div className="flex items-center gap-2 text-sky-700 font-mono text-xs font-semibold">
              <Building2 className="w-4 h-4" />
              <span className="uppercase tracking-wider">Tehsil Scale</span>
            </div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-slate-900">72,667</div>
            <div className="text-[11px] text-slate-600">Population across 413 km² (Census 2011)</div>
          </div>

          {/* Card 4: Historical Heritage */}
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 hover:border-emerald-500/50 hover:shadow-lg transition-all shadow-sm space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-700 font-mono text-xs font-semibold">
              <Landmark className="w-4 h-4" />
              <span className="uppercase tracking-wider">Heritage Sites</span>
            </div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-slate-900">8th–10th c.</div>
            <div className="text-[11px] text-slate-600">Panjnara stone Kunds &amp; Mughal kotas</div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 3: STRUCTURED TABBED STORY EXPLORER
          ========================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-semibold">
            Structured Narrative Chapters
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900">
            What Would You Like to Uncover First?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Choose a domain to explore without clutter. Switch anytime.
          </p>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex items-center justify-center p-1.5 bg-slate-200/80 rounded-xl border border-slate-300 max-w-xl mx-auto gap-1 text-xs font-mono">
          <button
            onClick={() => setActiveStoryTab('MINING_POWER')}
            className={`flex-1 py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeStoryTab === 'MINING_POWER'
                ? 'bg-white text-slate-900 font-bold shadow-md'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Pickaxe className="w-3.5 h-3.5 shrink-0 text-amber-600" />
            <span>Mines &amp; Power</span>
          </button>

          <button
            onClick={() => setActiveStoryTab('ADMIN_PEOPLE')}
            className={`flex-1 py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeStoryTab === 'ADMIN_PEOPLE'
                ? 'bg-white text-slate-900 font-bold shadow-md'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 shrink-0 text-sky-600" />
            <span>Admin &amp; People</span>
          </button>

          <button
            onClick={() => setActiveStoryTab('HERITAGE_3D')}
            className={`flex-1 py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeStoryTab === 'HERITAGE_3D'
                ? 'bg-white text-slate-900 font-bold shadow-md'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Box className="w-3.5 h-3.5 shrink-0 text-amber-600" />
            <span>3D Relics &amp; Stone</span>
          </button>
        </div>

        {/* Tab 1 Content: Mines & Thermal Power */}
        {activeStoryTab === 'MINING_POWER' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-semibold flex items-center gap-2">
                  <Pickaxe className="w-4 h-4" />
                  Subathu Coal Seams
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  The Subterranean Coal Mines
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Kalakote is home to high-grade semi-anthracite trapped within folded Tertiary limestone. Explore the incline adits of Metka, Moghla, and Ber-Goa, JKML operations, and safety directives issued by DGMS.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px] text-amber-800">
                  <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 font-medium">Metka Adits</span>
                  <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 font-medium">Moghla Incline</span>
                  <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 font-medium">~7,000 Kcal/kg Heat</span>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <Link
                  to="/mining"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-mono text-xs transition-colors shadow-sm"
                >
                  <span>Open Mine Directory &amp; Records &rarr;</span>
                </Link>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-semibold flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  Skoda Steam Turbines
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  The Silent Chimneys of Sair
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Commissioned in 1968 with three 7.5 MW Czechoslovakian Škoda turbines, this was North India's pioneer coal plant. Discover the abrasive coal failures, 1987 shutdown, and 1989 Cabinet closure.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px] text-amber-800">
                  <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 font-medium">3x 7.5 MW</span>
                  <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 font-medium">Sair Village</span>
                  <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 font-medium">Decommissioned 1989</span>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <Link
                  to="/thermal-station"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-mono text-xs transition-colors shadow-sm"
                >
                  <span>Examine Thermal Plant Dossier &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2 Content: Administration & People */}
        {activeStoryTab === 'ADMIN_PEOPLE' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-sky-700 font-semibold flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Civil Demands &amp; GAD Orders
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  The 2018 ADC Kalakote Movement
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  In early 2018, citizen strikes and market closures across Kalakote, Sunderbani, and Nowshera prompted state government intervention, leading to rotational and full Additional Deputy Commissioner status.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <Link
                  to="/administration"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-mono text-xs transition-colors shadow-sm"
                >
                  <span>Review Administrative Governance &rarr;</span>
                </Link>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-sky-700 font-semibold flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Memories of Miners &amp; Townsfolk
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Oral Histories &amp; Miners' Testimonies
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Firsthand oral testimonies of underground coal miners who operated pneumatic jackhammers, thermal plant turbine operators, and town elders who witnessed Kalakote's demographic transition.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <Link
                  to="/people"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-mono text-xs transition-colors shadow-sm"
                >
                  <span>Listen to Oral Testimonies &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3 Content: Heritage & 3D Relics */}
        {activeStoryTab === 'HERITAGE_3D' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-semibold flex items-center gap-2">
                  <Landmark className="w-4 h-4" />
                  Sacred Springs &amp; Forts
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Medieval Panjnara Kund &amp; Mughal Kotas
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Explore ancient stone kunds at Panjnara dating from the 8th–10th century Kashmiri temple tradition, sulfur healing springs of Tatta Pani, and foothill watchtowers that protected salt routes.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <Link
                  to="/heritage"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-mono text-xs transition-colors shadow-sm"
                >
                  <span>Explore Sacred Sites &rarr;</span>
                </Link>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-semibold flex items-center gap-2">
                  <Box className="w-4 h-4" />
                  Interactive 3D Inspector
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Machinery, Relics &amp; Stone in 3D
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Inspect procedural 3D models of the Škoda steam turbine rotor, underground flame safety lamps, and temple fluted pillars using real-time physical device gyroscope tilt.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <Link
                  to="/artifacts-3d"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold rounded-lg font-mono text-xs transition-colors shadow-sm hover:brightness-110"
                >
                  <span>Launch 3D Relics Viewer &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* =========================================================
          SECTION 4: THEN AND NOW (INTERACTIVE COMPARISON)
          ========================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-semibold">
              Photographic Evidence
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
              Kalakote: Then &amp; Now (1968 vs 2026)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Drag the interactive slider to contrast active power generation against current decommissioned ruins.
            </p>
          </div>
          <Link
            to="/thermal-station"
            className="text-xs font-mono text-amber-700 font-semibold hover:underline shrink-0"
          >
            <span>Full Thermal Plant Ledger &rarr;</span>
          </Link>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-sm">
          <ThenAndNowComparison />
        </div>
      </section>

      {/* =========================================================
          SECTION 5: INTERACTIVE ATLAS (OPENFREEMAP)
          ========================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-semibold">
              Geospatial Cartography
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
              Interactive Map of Kalakote
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Pinpointed coordinates of historical coalfields, power stations, sulfur springs, and administrative centers.
            </p>
          </div>
          <Link
            to="/map"
            className="text-xs font-mono text-amber-700 font-semibold hover:underline shrink-0"
          >
            <span>Open Fullscreen Atlas &rarr;</span>
          </Link>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-sm">
          <KalakoteMap onOpenSourceModal={onOpenSourceModal} />
        </div>
      </section>

      {/* =========================================================
          SECTION 6: RESEARCH SOURCES & ARCHIVAL INTEGRITY
          ========================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-12">
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-md space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-semibold flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Featured Archival Source &bull; {featuredSource.id}
            </span>
            <VerificationBadge status={featuredSource.verificationStatus} />
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
            {featuredSource.title}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-600">
            <div><strong className="text-slate-900">Author / Institution:</strong> {featuredSource.institutionOrAuthor}</div>
            <div><strong className="text-slate-900">Publication:</strong> {featuredSource.publicationDate}</div>
            <div><strong className="text-slate-900">Record Type:</strong> {featuredSource.sourceType}</div>
            <div><strong className="text-slate-900">Access:</strong> {featuredSource.accessStatus}</div>
          </div>

          <blockquote className="p-4 bg-slate-50 border-l-4 border-amber-600 rounded text-slate-800 italic text-sm leading-relaxed">
            "{featuredSource.relevantExcerpt}"
          </blockquote>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono text-slate-500">
              Audited in Archival Register: {featuredSource.lastVerificationDate}
            </span>
            <button
              onClick={() => onOpenSourceModal(featuredSource.id)}
              className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-mono text-xs font-bold rounded-lg transition-colors hover:brightness-110 shadow-md"
            >
              Inspect Source Dossier
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
