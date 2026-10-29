import React from 'react';
import { Building2, Landmark, Users, Scale } from 'lucide-react';
import { VerificationBadge } from '../components/common/VerificationBadge';

interface AdministrationProps {
  onOpenSourceModal: (sourceId: string) => void;
}

export const Administration: React.FC<AdministrationProps> = ({ onOpenSourceModal }) => {
  return (
    <div className="min-h-screen bg-[#080B09] text-[#F4F1E8] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A] flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Civic Governance & Citizen Mobilization
          </span>
          <VerificationBadge status="VERIFIED" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F4F1E8]">
          Administration & Public Movements
        </h1>
        <p className="text-xs sm:text-sm text-[#A4ADA5] max-w-3xl leading-relaxed">
          Documenting the administrative evolution of Kalakote from Dogra-era revenue circles and the 1968 formation of Rajouri district, to the historic 2018 civil agitation that secured an independent Additional Deputy Commissioner (ADC).
        </p>
      </div>

      {/* Constitutional and Administrative Distinction Banner */}
      <div className="p-5 rounded-xl bg-[#111713] border border-amber-600/30 text-xs font-mono space-y-2 text-[#A4ADA5]">
        <div className="flex items-center gap-2 text-amber-300 font-bold uppercase text-[11px]">
          <Scale className="w-4 h-4 text-[#C5A56A]" />
          <span>Crucial Constitutional & Administrative Distinctions:</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="p-3 bg-black/40 rounded border border-white/5 space-y-1">
            <strong className="text-white block">Pre-1947 Era:</strong>
            <span>Princely State of Jammu and Kashmir under Dogra rulers; governed via Jagirs, Wazarats, and Thanadars.</span>
          </div>
          <div className="p-3 bg-black/40 rounded border border-white/5 space-y-1">
            <strong className="text-white block">1947 &ndash; Oct 2019:</strong>
            <span>State of Jammu & Kashmir under Constitution of J&K; Rajouri district created on Jan 1, 1968 from Poonch.</span>
          </div>
          <div className="p-3 bg-black/40 rounded border border-white/5 space-y-1">
            <strong className="text-white block">Post-Oct 31, 2019:</strong>
            <span>Union Territory of Jammu and Kashmir administered under the Jammu and Kashmir Reorganisation Act, 2019.</span>
          </div>
        </div>
        <p className="text-[11px] text-amber-200/80 pt-1">
          * Note: Kalakote is an <strong>ADC Sub-Division</strong> within Rajouri District, <strong>NOT</strong> an independent district.
        </p>
      </div>

      {/* The 2018 ADC Agitation Feature Box */}
      <div className="p-6 sm:p-8 rounded-xl bg-gradient-to-br from-[#161F1A] to-[#111713] border border-[#C5A56A]/40 space-y-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A]">
              The 40-Day Civil Agitation
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4F1E8]">
              The Great Tri-Subdivision Movement of 2018
            </h2>
          </div>
          <span className="px-3 py-1 bg-black/60 rounded-full border border-white/10 text-xs font-mono text-[#C5A56A]">
            February 15 &ndash; April 5, 2018
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-[#A4ADA5] leading-relaxed">
          <div className="space-y-3">
            <h3 className="text-base font-serif font-bold text-white">The Trigger & The Grievance</h3>
            <p>
              In February 2018, the J&K State Government issued a notification sanctioning an Additional Deputy Commissioner (ADC) for Kotranka tehsil. This sparked immediate resentment across the southern Pir Panjal subdivisions of <strong>Nowshera, Sunderbani, and Kalakote</strong>.
            </p>
            <p>
              Citizens, Bar Associations, and Beopar Mandals argued that Kalakote—with its difficult hilly terrain, dispersed population of over 72,000, and long distance from Rajouri town—suffered severe administrative deprivation. The Joint Action Committee launched indefinite shutdowns and highway blockades.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-serif font-bold text-white">Rejection of Compromise & Concession</h3>
            <p>
              The state initially attempted to defuse tensions by proposing "rotational ADCs" (where one officer would split days between Kotranka and Kalakote). Protesters rejected this as an administrative farce and intensified relay hunger strikes.
            </p>
            <p>
              On <strong>March 23, 2018</strong>, Chief Minister Mehbooba Mufti conceded to the movement: the General Administration Department issued Order No. 490-GAD of 2018, upgrading the Sub-Divisional Magistrate (SDM) posts at Nowshera, Sunderbani, and Kalakote into <strong>permanent, independent ADC secretariats</strong>.
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <span className="text-white/60">Official Primary Source: GAD Order No. 490-GAD of 2018</span>
          <button
            onClick={() => onOpenSourceModal('SRC-004')}
            className="px-4 py-2 bg-[#C5A56A] hover:bg-[#DFC38E] text-[#080B09] font-bold rounded transition-colors"
          >
            Inspect Official GAD Government Order &rarr;
          </button>
        </div>
      </div>

      {/* Governance Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tier 1: Sub-Divisional Secretariat */}
        <div className="p-6 rounded-xl bg-[#111713] border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded bg-[#20392C] text-[#C5A56A] flex items-center justify-center">
            <Landmark className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-serif font-bold text-[#F4F1E8]">
            Sub-Divisional Administration (ADC)
          </h3>
          <p className="text-xs text-[#A4ADA5] leading-relaxed">
            Headed by the Additional Deputy Commissioner (ADC), exercising executive, magisterial, and revenue jurisdiction over Kalakote Tehsil and contiguous blocks.
          </p>
          <ul className="text-[11px] font-mono text-white/60 space-y-1 pt-2">
            <li>&bull; Revenue Record Attestation</li>
            <li>&bull; Law & Order Enforcement</li>
            <li>&bull; Relief & Disaster Coordination</li>
          </ul>
        </div>

        {/* Tier 2: Municipal Committee */}
        <div className="p-6 rounded-xl bg-[#111713] border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded bg-[#20392C] text-[#C5A56A] flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-serif font-bold text-[#F4F1E8]">
            Municipal Committee Kalakote
          </h3>
          <p className="text-xs text-[#A4ADA5] leading-relaxed">
            The civic urban local body responsible for municipal sanitation, building permits, commercial licensing, and street lighting in the core town bazaar wards.
          </p>
          <ul className="text-[11px] font-mono text-white/60 space-y-1 pt-2">
            <li>&bull; Ward Administration</li>
            <li>&bull; Market Regulation & Sanitation</li>
            <li>&bull; Local Street Infrastructure</li>
          </ul>
        </div>

        {/* Tier 3: Panchayati Raj */}
        <div className="p-6 rounded-xl bg-[#111713] border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded bg-[#20392C] text-[#C5A56A] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-serif font-bold text-[#F4F1E8]">
            Panchayati Raj & Halqas
          </h3>
          <p className="text-xs text-[#A4ADA5] leading-relaxed">
            Over 30 rural Gram Panchayats and Block Development Councils (BDC) managing decentralized development, rural water schemes, and PMGSY road connectivity.
          </p>
          <ul className="text-[11px] font-mono text-white/60 space-y-1 pt-2">
            <li>&bull; Gram Sabhas & Village Plans</li>
            <li>&bull; MGNREGA Rural Employment</li>
            <li>&bull; Forest Rights Act Implementation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

