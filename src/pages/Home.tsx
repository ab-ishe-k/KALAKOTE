import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Clock, Pickaxe, Flame, Map, Building2, BookOpen, ChevronRight, FileText, ArrowRight, Layers, Box } from 'lucide-react';
import { HISTORICAL_EVENTS } from '../data/events';
import { PROJECTS_DATA } from '../data/projects';
import { SOURCES_DATA } from '../data/sources';
import { VerificationBadge } from '../components/common/VerificationBadge';
import { ThenAndNowComparison } from '../components/home/ThenAndNowComparison';
import { KalakoteMap } from '../components/map/KalakoteMap';
import { Hero3DCanvas } from '../components/3d/Hero3DCanvas';
import { HistoricalArtifact3D } from '../components/3d/HistoricalArtifact3D';

interface HomeProps {
  onOpenSourceModal: (sourceId: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenSourceModal }) => {
  const featuredEvents = HISTORICAL_EVENTS.slice(0, 4);
  const featuredSource = SOURCES_DATA.find(s => s.id === 'SRC-013') || SOURCES_DATA[0];

  return (
    <div className="min-h-screen bg-[#080B09] text-[#F4F1E8]">
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        {/* Interactive 3D Terrain & Gyroscope / Motion Parallax */}
        <Hero3DCanvas />

        {/* Film grain texture */}
        <div className="absolute inset-0 film-grain opacity-30 z-0 pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-24 space-y-4 sm:space-y-6 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#C5A56A]/40 text-[#C5A56A] text-[10px] sm:text-xs font-mono tracking-wider sm:tracking-widest uppercase shadow-2xl animate-fadeIn pointer-events-auto">
            <Compass className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Independent Digital Archive &bull; Rajouri, J&K</span>
          </div>

          <h1 className="font-serif text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F4F1E8] drop-shadow-2xl leading-tight">
            KALAKOTE OVERLOOK
          </h1>

          <p className="font-serif italic text-base sm:text-2xl md:text-3xl text-[#C5A56A] max-w-3xl mx-auto drop-shadow-lg leading-snug">
            "Every Mountain Has a Story. Every Era Leaves a Mark."
          </p>

          <p className="font-sans text-xs sm:text-base md:text-lg text-[#A4ADA5] max-w-2xl mx-auto leading-relaxed drop-shadow px-2">
            Explore the history, Subathu coalfields, Czechoslovakian thermal station, administrative agitations, people, and verified transformations of Kalakote, Rajouri district.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 pt-2 pointer-events-auto max-w-md sm:max-w-none mx-auto w-full">
            <Link
              to="/history"
              className="w-full sm:w-auto px-5 py-3 rounded-lg bg-[#C5A56A] text-[#080B09] font-mono text-xs sm:text-sm font-bold tracking-wider hover:bg-[#DFC38E] transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <span>EXPLORE THE HISTORY</span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </Link>

            <Link
              to="/time-machine"
              className="w-full sm:w-auto px-5 py-3 rounded-lg bg-[#20392C]/90 hover:bg-[#20392C] text-[#F4F1E8] border border-[#C5A56A]/40 font-mono text-xs sm:text-sm tracking-wider transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <Clock className="w-4 h-4 text-[#C5A56A] shrink-0" />
              <span>TIME MACHINE (2.5D)</span>
            </Link>

            <Link
              to="/artifacts-3d"
              className="w-full sm:w-auto px-5 py-3 rounded-lg bg-black/75 hover:bg-black text-[#F4F1E8] border border-[#C5A56A]/50 font-mono text-xs sm:text-sm tracking-wider transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <Box className="w-4 h-4 text-[#C5A56A] shrink-0" />
              <span>3D RELICS & GYRO</span>
            </Link>
          </div>

          <p className="text-[11px] font-mono text-[#A4ADA5]/90 pt-6">
            Strictly evidence-based &bull; All claims verified against official gazettes, GSI memoirs, and census records.
          </p>
        </div>
      </section>

      {/* SECTION 2: INTRODUCTION & VERIFIED CONTEXT */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A]">
              Geographical & Administrative Reality
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F4F1E8]">
              Understanding Kalakote in the Pir Panjal Foothills
            </h2>
            <p className="text-sm sm:text-base text-[#A4ADA5] leading-relaxed">
              Situated in the rugged southeastern sector of Rajouri district, Kalakote occupies a distinctive geological and cultural niche in Jammu and Kashmir. Encompassing an area of 413 square kilometers and a tehsil population of 72,667 (Census 2011), the region is defined by the Subathu sedimentary formation—one of the only Tertiary coal basins in northwestern India.
            </p>
            <p className="text-sm sm:text-base text-[#A4ADA5] leading-relaxed">
              Unlike the wider Kashmir Valley to its north or the plains of Jammu to its south, Kalakote\'s 20th-century history was radically molded by heavy industrial ambitions: the driving of underground adits by Jammu and Kashmir Minerals Limited (JKML) and the commissioning of North India\'s first pit-head coal power station at Sair in the late 1960s.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono">
              <button
                onClick={() => onOpenSourceModal('SRC-002')}
                className="text-[#C5A56A] hover:underline flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Census 2011 Verification [SRC-002] &rarr;</span>
              </button>
              <button
                onClick={() => onOpenSourceModal('SRC-003')}
                className="text-[#C5A56A] hover:underline flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>GSI Subathu Memoir [SRC-003] &rarr;</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-xl bg-[#111713] border border-white/10 space-y-4 font-mono text-xs shadow-xl">
            <h3 className="font-serif text-lg font-bold text-[#F4F1E8] border-b border-white/10 pb-2">
              Geographic Baseline
            </h3>
            <div className="space-y-2.5 text-[#A4ADA5]">
              <div className="flex justify-between">
                <span>District:</span>
                <span className="text-white">Rajouri (Carved 1968 from Poonch)</span>
              </div>
              <div className="flex justify-between">
                <span>Sub-Division Status:</span>
                <span className="text-[#C5A56A]">ADC Sub-Division (Sanctioned 2018)</span>
              </div>
              <div className="flex justify-between">
                <span>Geographic Area:</span>
                <span className="text-white">413 km² (Tehsil)</span>
              </div>
              <div className="flex justify-between">
                <span>Core Coordinates:</span>
                <span className="text-white">33.2105° N, 74.4172° E</span>
              </div>
              <div className="flex justify-between">
                <span>Principal Drainage:</span>
                <span className="text-white">Ans River / Tawi Tributary Nullhas</span>
              </div>
              <div className="flex justify-between">
                <span>Geological Bed:</span>
                <span className="text-[#C5A56A]">Basal Subathu (Eocene) over Great Limestone</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: EXPLORE KALAKOTE (EDITORIAL TILES) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A]">
            Curated Research Domains
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F4F1E8]">
            Explore the Digital Archive
          </h2>
          <p className="text-sm text-[#A4ADA5]">
            Eight primary investigative modules preserving verified documents, cartography, industrial records, and oral testimonies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* History */}
          <Link
            to="/history"
            className="group p-6 rounded-xl bg-[#111713] hover:bg-[#161F1A] border border-white/10 hover:border-[#C5A56A]/50 transition-all shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#20392C] text-[#C5A56A] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#F4F1E8] group-hover:text-[#C5A56A] transition-colors">
                Historical Timeline
              </h3>
              <p className="text-xs text-[#A4ADA5] leading-relaxed">
                Chronological ledger spanning ancient Khasa foothill routes through Dogra consolidation and the modern Union Territory.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-mono text-[#C5A56A]">
              <span>Explore events</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Coal Mines */}
          <Link
            to="/mining"
            className="group p-6 rounded-xl bg-[#111713] hover:bg-[#161F1A] border border-white/10 hover:border-[#C5A56A]/50 transition-all shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#20392C] text-[#C5A56A] flex items-center justify-center">
                <Pickaxe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#F4F1E8] group-hover:text-[#C5A56A] transition-colors">
                Subathu Coal Mines
              </h3>
              <p className="text-xs text-[#A4ADA5] leading-relaxed">
                Metka, Moghla, Ber-Goa, and Badhog blocks. Geological petrography, JKML operations, and DGMS safety suspension records.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-mono text-[#C5A56A]">
              <span>Inspect mines</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Thermal Plant */}
          <Link
            to="/thermal-station"
            className="group p-6 rounded-xl bg-[#111713] hover:bg-[#161F1A] border border-white/10 hover:border-[#C5A56A]/50 transition-all shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#20392C] text-[#C5A56A] flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#F4F1E8] group-hover:text-[#C5A56A] transition-colors">
                Thermal Power Station
              </h3>
              <p className="text-xs text-[#A4ADA5] leading-relaxed">
                The 22.5 MW Skoda installation at Sair. Foundation in 1963, 1987 shutdown, 1989 Cabinet closure, and legal disputes.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-mono text-[#C5A56A]">
              <span>View plant history</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Administration & Agitations */}
          <Link
            to="/administration"
            className="group p-6 rounded-xl bg-[#111713] hover:bg-[#161F1A] border border-white/10 hover:border-[#C5A56A]/50 transition-all shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#20392C] text-[#C5A56A] flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#F4F1E8] group-hover:text-[#C5A56A] transition-colors">
                Administration & Agitations
              </h3>
              <p className="text-xs text-[#A4ADA5] leading-relaxed">
                The 2018 tri-subdivision movement, GAD government order for ADC Kalakote, Panchayati Raj, and municipal history.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-mono text-[#C5A56A]">
              <span>Review governance</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Atlas */}
          <Link
            to="/map"
            className="group p-6 rounded-xl bg-[#111713] hover:bg-[#161F1A] border border-white/10 hover:border-[#C5A56A]/50 transition-all shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#20392C] text-[#C5A56A] flex items-center justify-center">
                <Map className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#F4F1E8] group-hover:text-[#C5A56A] transition-colors">
                Interactive Atlas
              </h3>
              <p className="text-xs text-[#A4ADA5] leading-relaxed">
                Interactive geographic cartography featuring verified coordinates of coal adits, Sair power site, Tatapani, and Pandu Kund.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-mono text-[#C5A56A]">
              <span>Launch map</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Built, Changed & Lost */}
          <Link
            to="/built-changed-lost"
            className="group p-6 rounded-xl bg-[#111713] hover:bg-[#161F1A] border border-white/10 hover:border-[#C5A56A]/50 transition-all shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#20392C] text-[#C5A56A] flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#F4F1E8] group-hover:text-[#C5A56A] transition-colors">
                Built, Changed & Lost
              </h3>
              <p className="text-xs text-[#A4ADA5] leading-relaxed">
                Investigative project tracking ledger for industrial and public infrastructure: statuses from proposed to decommissioned.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-mono text-[#C5A56A]">
              <span>Investigate projects</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* People & Oral History */}
          <Link
            to="/people"
            className="group p-6 rounded-xl bg-[#111713] hover:bg-[#161F1A] border border-white/10 hover:border-[#C5A56A]/50 transition-all shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#20392C] text-[#C5A56A] flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#F4F1E8] group-hover:text-[#C5A56A] transition-colors">
                People & Oral History
              </h3>
              <p className="text-xs text-[#A4ADA5] leading-relaxed">
                Testimonies of former Metka adit supervisors, KTPS turbine operators, and civil leaders of the 2018 movement.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-mono text-[#C5A56A]">
              <span>Listen to testimonies</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Historical Archive */}
          <Link
            to="/archive"
            className="group p-6 rounded-xl bg-[#111713] hover:bg-[#161F1A] border border-white/10 hover:border-[#C5A56A]/50 transition-all shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded bg-[#20392C] text-[#C5A56A] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#F4F1E8] group-hover:text-[#C5A56A] transition-colors">
                Historical Archive
              </h3>
              <p className="text-xs text-[#A4ADA5] leading-relaxed">
                Searchable repository of official court judgments, geological surveys, assembly proceedings, and gazetteers.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-mono text-[#C5A56A]">
              <span>Browse records</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* SECTION 4: THE HISTORICAL TIMELINE (FEATURED CARDS) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A]">
              Chronological Epochs
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F4F1E8] mt-1">
              Key Documented Milestones
            </h2>
          </div>
          <Link
            to="/history"
            className="text-xs font-mono text-[#C5A56A] hover:underline flex items-center gap-1"
          >
            <span>View all 15 structured events &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredEvents.map((evt) => (
            <div
              key={evt.id}
              className="p-6 rounded-xl bg-[#111713] border border-white/10 space-y-3 hover:border-[#C5A56A]/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-[#C5A56A] font-bold">
                    {evt.eventDate}
                  </span>
                  <VerificationBadge status={evt.verificationStatus} />
                </div>
                <h3 className="text-lg font-serif font-bold text-[#F4F1E8]">
                  {evt.title}
                </h3>
                <p className="text-xs text-[#A4ADA5] leading-relaxed">
                  {evt.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/50">
                <span>Scope: {evt.geographicScope}</span>
                <Link to={`/history?event=${evt.id}`} className="text-[#C5A56A] hover:underline">
                  Examine Analysis &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: THE INDUSTRIAL STORY SPOTLIGHT */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Subathu Coalfield */}
          <div className="p-8 rounded-xl bg-[#111713] border border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A] flex items-center gap-1.5">
                <Pickaxe className="w-3.5 h-3.5" />
                The Mineral Bed
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#F4F1E8]">
                The Subathu Coalfields of Kalakote
              </h3>
              <p className="text-xs sm:text-sm text-[#A4ADA5] leading-relaxed">
                Hosting an estimated 9.38 million tonnes of Tertiary coal reserves across the Jammu belt, the Kalakote-Metka-Mahogala deposits represent an unusual geological formation: semi-anthracite squeezed and fractured by Himalayan tectonic orogeny. High heat values (~7,000 Kcal/kg) are countered by high ash content and friability, presenting unique subterranean engineering challenges.
              </p>
            </div>
            <div className="pt-4">
              <Link
                to="/mining"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#20392C] hover:bg-[#20392C]/80 text-[#F4F1E8] rounded-md font-mono text-xs border border-white/10 transition-colors"
              >
                <span>Read Mine Directory & DGMS Records</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A56A]" />
              </Link>
            </div>
          </div>

          {/* Kalakote Thermal Station */}
          <div className="p-8 rounded-xl bg-[#111713] border border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E06C47] flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                The Power Project
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#F4F1E8]">
                The Silent Chimneys of Sair
              </h3>
              <p className="text-xs sm:text-sm text-[#A4ADA5] leading-relaxed">
                Conceived in the 1960s with Czechoslovakian Skoda steam turbogenerators (3 x 7.5 MW), the Kalakote Thermal Power Station was North India's first coal-fired power station. Despite high engineering aspirations, severe boiler tube abrasion from local coal caused repeated failures, culminating in shutdown in 1987 and formal Cabinet closure in 1989.
              </p>
            </div>
            <div className="pt-4">
              <Link
                to="/thermal-station"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#20392C] hover:bg-[#20392C]/80 text-[#F4F1E8] rounded-md font-mono text-xs border border-white/10 transition-colors"
              >
                <span>Examine Technical Plant Dossier</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A56A]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: BUILT, CHANGED & LOST PREVIEW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A]">
              Investigative Ledger
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F4F1E8] mt-1">
              Built, Changed & Lost
            </h2>
            <p className="text-xs sm:text-sm text-[#A4ADA5] mt-1">
              Tracking documented civic, infrastructure, and mineral initiatives across verified lifecycle statuses.
            </p>
          </div>
          <Link
            to="/built-changed-lost"
            className="text-xs font-mono text-[#C5A56A] hover:underline"
          >
            <span>View Full Project Archive &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS_DATA.slice(0, 3).map((prj) => (
            <div key={prj.id} className="p-5 rounded-xl bg-[#111713] border border-white/10 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#C5A56A]">{prj.id}</span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-white/10 text-white/80">
                    {prj.currentStatus}
                  </span>
                </div>
                <h3 className="text-base font-serif font-bold text-[#F4F1E8]">{prj.projectName}</h3>
                <p className="text-xs text-[#A4ADA5] line-clamp-3">{prj.purpose}</p>
              </div>
              <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-white/50">
                Audited: {prj.lastVerifiedDate}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: THEN AND NOW (INTERACTIVE SLIDER) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b border-white/10">
        <ThenAndNowComparison />
      </section>

      {/* SECTION 7.5: 3D HISTORICAL ARTIFACTS & MACHINERY SHOWCASE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b border-white/10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A]">
                3D Digital Museum
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                GYRO SENSOR ENABLED
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F4F1E8] mt-1">
              Industrial Relics & Monoliths in 3D
            </h2>
            <p className="text-xs sm:text-sm text-[#A4ADA5] mt-1 max-w-2xl">
              Inspect Czechoslovakian Škoda turbo-machinery, Dogra-era underground coal safety lamps, and classical Kashmiri stone sanctum pillars. Drag 360° or tilt your physical device.
            </p>
          </div>

          <Link
            to="/artifacts-3d"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C5A56A]/10 hover:bg-[#C5A56A]/20 text-[#C5A56A] border border-[#C5A56A]/40 font-mono text-xs transition-colors shrink-0"
          >
            <Box className="w-4 h-4" />
            <span>Open Full 3D Gallery &rarr;</span>
          </Link>
        </div>

        <HistoricalArtifact3D onOpenSourceModal={onOpenSourceModal} />
      </section>

      {/* SECTION 8: MAP OF KALAKOTE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A]">
              Geospatial Cartography
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F4F1E8] mt-1">
              Interactive Map of Kalakote
            </h2>
            <p className="text-xs sm:text-sm text-[#A4ADA5] mt-1">
              Verified coordinates of historical coalfields, thermal plant site, sulfur springs, and administrative hubs.
            </p>
          </div>
          <Link
            to="/map"
            className="text-xs font-mono text-[#C5A56A] hover:underline"
          >
            <span>Open Fullscreen Atlas &rarr;</span>
          </Link>
        </div>

        <KalakoteMap onOpenSourceModal={onOpenSourceModal} />
      </section>

      {/* SECTION 9: SOURCE OF THE MONTH FEATURE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="p-8 rounded-xl bg-gradient-to-br from-[#161F1A] to-[#111713] border border-[#C5A56A]/40 shadow-2xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A] flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Featured Archival Source &bull; {featuredSource.id}
            </span>
            <VerificationBadge status={featuredSource.verificationStatus} />
          </div>

          <h3 className="text-2xl font-serif font-bold text-[#F4F1E8]">
            {featuredSource.title}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-[#A4ADA5]">
            <div><strong>Author / Institution:</strong> {featuredSource.institutionOrAuthor}</div>
            <div><strong>Publication Date:</strong> {featuredSource.publicationDate}</div>
            <div><strong>Source Type:</strong> {featuredSource.sourceType}</div>
            <div><strong>Accessibility:</strong> {featuredSource.accessStatus}</div>
          </div>

          <blockquote className="p-4 bg-black/50 border-l-2 border-[#C5A56A] rounded text-[#F4F1E8]/90 italic text-sm leading-relaxed">
            "{featuredSource.relevantExcerpt}"
          </blockquote>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono text-[#A4ADA5]">
              Audited in Archival Register: {featuredSource.lastVerificationDate}
            </span>
            <button
              onClick={() => onOpenSourceModal(featuredSource.id)}
              className="px-4 py-2 bg-[#C5A56A] hover:bg-[#DFC38E] text-[#080B09] font-mono text-xs font-bold rounded transition-colors"
            >
              Inspect Source Dossier
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

