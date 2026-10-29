import React from 'react';
import { Compass, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080B09] text-[#F4F1E8] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A] flex items-center gap-2">
          <Compass className="w-4 h-4" />
          Mission & Archival Ethos
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F4F1E8]">
          About KALAKOTE OVERLOOK
        </h1>
        <p className="font-serif italic text-lg sm:text-xl text-[#C5A56A]">
          "Every Mountain Has a Story. Every Era Leaves a Mark."
        </p>
      </div>

      {/* Mandatory Independent Legal Disclaimer */}
      <div className="p-6 rounded-xl bg-amber-950/20 border border-amber-600/40 text-xs sm:text-sm text-amber-200/90 space-y-3">
        <div className="flex items-center gap-2 text-amber-300 font-bold uppercase font-mono text-xs">
          <ShieldAlert className="w-4 h-4 text-[#C5A56A]" />
          <span>Independent Digital Archive Disclaimer & Non-Government Notice</span>
        </div>
        <p className="leading-relaxed">
          <strong>KALAKOTE OVERLOOK</strong> is an independent, non-commercial digital history, heritage, cartographic, and archival research project. This website is <strong>NOT</strong> an official government website and is not affiliated with, authorized by, sponsored by, or endorsed by the District Administration of Rajouri, the Government of Jammu and Kashmir, or any ministry or department of the Government of India.
        </p>
        <p className="leading-relaxed text-amber-300/80 font-mono text-[11px]">
          All official government orders, gazette notices, and census excerpts reproduced or cited herein remain the intellectual property of their respective public authorities and are cited under educational fair-use principles for documentary, historical, and preservation purposes.
        </p>
      </div>

      {/* Brand Personality & Concept */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="p-6 sm:p-8 rounded-xl bg-[#111713] border border-white/10 space-y-4 shadow-xl">
          <h2 className="text-2xl font-serif font-bold text-[#F4F1E8]">
            A Digital Museum & Interactive Atlas
          </h2>
          <p className="text-xs sm:text-sm text-[#A4ADA5] leading-relaxed">
            The platform bridges the divide between rigorous archival history and cinematic digital storytelling. Kalakote has long existed on the periphery of Jammu and Kashmir’s historical discourse—often reduced to brief mentions of closed coal mines or remote border geography.
          </p>
          <p className="text-xs sm:text-sm text-[#A4ADA5] leading-relaxed">
            KALAKOTE OVERLOOK brings together the Subathu geological surveys of the late 19th and early 20th centuries, the pioneering industrial ambitions of North India's first pit-head thermal station, the living memories of underground miners, and the democratic resilience of the 2018 civilian movement.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-xl bg-[#111713] border border-white/10 space-y-4 shadow-xl">
          <h2 className="text-2xl font-serif font-bold text-[#F4F1E8]">
            Core Brand Principles
          </h2>
          <div className="space-y-3 font-mono text-xs text-[#A4ADA5]">
            <div className="flex items-start gap-2.5">
              <span className="text-[#C5A56A] font-bold">&bull;</span>
              <div>
                <strong className="text-white block">Historically Responsible:</strong>
                <span>Accuracy supersedes narrative flair. Unverified claims are explicitly branded as such.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-[#C5A56A] font-bold">&bull;</span>
              <div>
                <strong className="text-white block">Documentary-Driven:</strong>
                <span>Primary legislative proceedings, court verdicts, and GSI memoirs form our evidential spine.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-[#C5A56A] font-bold">&bull;</span>
              <div>
                <strong className="text-white block">Local & Empathetic:</strong>
                <span>Honoring the labor and health sacrifices of adit miners and rural families across Kalakote Tehsil.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-[#C5A56A] font-bold">&bull;</span>
              <div>
                <strong className="text-white block">Accessible & Performant:</strong>
                <span>Responsive typography, keyboard navigation, and lightweight SVG fallbacks.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Citations & Editorial Review */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-[#111713] to-[#161F1A] border border-[#C5A56A]/30 space-y-4">
        <h3 className="text-xl font-serif font-bold text-[#F4F1E8]">
          Citations & Academic Fair Use
        </h3>
        <p className="text-xs sm:text-sm text-[#A4ADA5] leading-relaxed">
          Researchers, students, and journalists are encouraged to cite records from this archive. Please credit:
        </p>
        <blockquote className="p-3 bg-black/60 rounded border-l-2 border-[#C5A56A] font-mono text-xs text-white/90">
          "Kalakote Overlook: Digital History & Heritage Archive (October 2026), URL: https://kalakoteoverlook.org"
        </blockquote>
        <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-[#C5A56A]">
          <Link to="/methodology" className="hover:underline flex items-center gap-1">
            <span>Read Research Methodology &rarr;</span>
          </Link>
          <Link to="/archive" className="hover:underline flex items-center gap-1">
            <span>Explore Primary Source Catalog &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
