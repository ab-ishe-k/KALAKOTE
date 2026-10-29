import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ShieldAlert, BookOpen, Mail, ArrowUpRight } from 'lucide-react';
import { VerificationBadge } from '../common/VerificationBadge';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050706] border-t border-white/10 text-xs text-[#A4ADA5] font-sans">
      {/* Non-Government Disclaimer Banner */}
      <div className="bg-[#111713] border-b border-white/5 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-amber-300">
            <ShieldAlert className="w-4 h-4 shrink-0 text-[#C5A56A]" />
            <span className="font-semibold uppercase tracking-wider font-mono text-[11px]">
              Independent Historical Archive Disclaimer
            </span>
          </div>
          <p className="text-[11px] text-[#A4ADA5] leading-relaxed max-w-4xl">
            KALAKOTE OVERLOOK is an autonomous digital history, cartographic, and archival research platform. It is <strong>NOT</strong> an official government website and has no administrative affiliation with or endorsement from the Government of Jammu & Kashmir, the Rajouri District Administration, or the Government of India.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Purpose */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#20392C] border border-[#C5A56A]/50 flex items-center justify-center text-[#C5A56A]">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-serif text-lg font-bold text-[#F4F1E8] tracking-wider">
                KALAKOTE OVERLOOK
              </span>
            </div>
            <p className="font-serif italic text-sm text-[#C5A56A]/90">
              "Every Mountain Has a Story.<br />Every Era Leaves a Mark."
            </p>
            <p className="text-xs text-[#A4ADA5] leading-relaxed">
              Dedicated to documenting the geography, Subathu coalfields, Czechoslovakian thermal power station, administrative agitations, and oral traditions of Kalakote through October 2026.
            </p>
          </div>

          {/* Verification Standards */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#F4F1E8] border-b border-white/10 pb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#C5A56A]" />
              Verification System
            </h4>
            <p className="text-[11px] text-[#A4ADA5] leading-relaxed">
              Every factual assertion is governed by strict evidential standards:
            </p>
            <div className="flex flex-col gap-1.5 pt-1">
              <div className="flex items-center gap-2">
                <VerificationBadge status="VERIFIED" />
                <span className="text-[11px]">Direct public record located</span>
              </div>
              <div className="flex items-center gap-2">
                <VerificationBadge status="PARTIALLY VERIFIED" />
                <span className="text-[11px]">Context known, boundaries uncertain</span>
              </div>
              <div className="flex items-center gap-2">
                <VerificationBadge status="CONFLICTING SOURCES" />
                <span className="text-[11px]">Official records diverge</span>
              </div>
              <div className="flex items-center gap-2">
                <VerificationBadge status="RESEARCH PENDING" />
                <span className="text-[11px]">Pending archival access</span>
              </div>
            </div>
          </div>

          {/* Navigation Directory */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#F4F1E8] border-b border-white/10 pb-1.5">
              Research Sections
            </h4>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <Link to="/history" className="hover:text-[#C5A56A] transition-colors flex items-center justify-between">
                  <span>Historical Timeline</span>
                  <ArrowUpRight className="w-3 h-3 text-white/30" />
                </Link>
              </li>
              <li>
                <Link to="/time-machine" className="hover:text-[#C5A56A] transition-colors flex items-center justify-between text-[#C5A56A]">
                  <span>Cinematic Time Machine</span>
                  <ArrowUpRight className="w-3 h-3 text-[#C5A56A]/60" />
                </Link>
              </li>
              <li>
                <Link to="/mining" className="hover:text-[#C5A56A] transition-colors flex items-center justify-between">
                  <span>Subathu Coal Mines</span>
                  <ArrowUpRight className="w-3 h-3 text-white/30" />
                </Link>
              </li>
              <li>
                <Link to="/thermal-station" className="hover:text-[#C5A56A] transition-colors flex items-center justify-between">
                  <span>Kalakote Thermal Plant</span>
                  <ArrowUpRight className="w-3 h-3 text-white/30" />
                </Link>
              </li>
              <li>
                <Link to="/heritage" className="hover:text-[#C5A56A] transition-colors flex items-center justify-between">
                  <span>Heritage & Sacred Sites</span>
                  <ArrowUpRight className="w-3 h-3 text-white/30" />
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-[#C5A56A] transition-colors flex items-center justify-between">
                  <span>Interactive Atlas</span>
                  <ArrowUpRight className="w-3 h-3 text-white/30" />
                </Link>
              </li>
              <li>
                <Link to="/myths" className="hover:text-[#C5A56A] transition-colors flex items-center justify-between">
                  <span>Myths vs Documented Records</span>
                  <ArrowUpRight className="w-3 h-3 text-white/30" />
                </Link>
              </li>
              <li>
                <Link to="/development" className="hover:text-[#C5A56A] transition-colors flex items-center justify-between">
                  <span>Development Dashboard</span>
                  <ArrowUpRight className="w-3 h-3 text-white/30" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Archival Integrity & Submissions */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#F4F1E8] border-b border-white/10 pb-1.5">
              Archival Standards
            </h4>
            <p className="text-[11px] text-[#A4ADA5] leading-relaxed">
              If an asserted fact lacks verified documentation, our protocol requires the explicit notice:
            </p>
            <blockquote className="p-2.5 bg-black/60 rounded border-l-2 border-[#C5A56A] text-[11px] text-white/80 italic font-mono">
              "Available sources do not currently establish this detail."
            </blockquote>
            <div className="pt-2">
              <Link
                to="/methodology"
                className="inline-flex items-center gap-1.5 text-xs text-[#C5A56A] hover:underline font-mono"
              >
                <span>Read Full Research Methodology &rarr;</span>
              </Link>
            </div>
            <div className="pt-1">
              <Link
                to="/people"
                className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white font-mono"
              >
                <Mail className="w-3.5 h-3.5 text-[#C5A56A]" />
                <span>Submit Oral Record or Correction</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-white/50">
          <div>
            &copy; 2026 KALAKOTE OVERLOOK &bull; Open Archival Educational Project.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/methodology" className="hover:text-white">Methodology</Link>
            <Link to="/about" className="hover:text-white">Citation Rights</Link>
            <Link to="/about" className="hover:text-white">Privacy & Ethics</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
