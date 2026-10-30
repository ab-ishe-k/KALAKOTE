import React, { useState } from 'react';
import { DEVELOPMENT_METRICS } from '../../data/development';
import { BarChart3, Table, Info, TrendingUp, Users, BookOpen } from 'lucide-react';

export const CensusCharts: React.FC = () => {
  const [viewMode, setViewMode] = useState<'VISUAL' | 'TABLE'>('VISUAL');

  return (
    <div className="space-y-6">
      {/* Header and Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A]">
            Verified Demographic & Mineral Datasets
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4F1E8] mt-1">
            Data & Development Dashboard
          </h3>
          <p className="text-xs sm:text-sm text-[#A4ADA5] mt-1 max-w-2xl">
            Strictly derived from the Census of India 2011 (Series 02, Part XII-B) and Ministry of Coal geological inventories. No projected numbers are conflated with census counts.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#111713] p-1 rounded-lg border border-white/10 text-xs font-mono self-start sm:self-auto shrink-0">
          <button
            onClick={() => setViewMode('VISUAL')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
              viewMode === 'VISUAL' ? 'bg-[#C5A56A] text-[#080B09] font-bold' : 'text-[#A4ADA5] hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Charts
          </button>
          <button
            onClick={() => setViewMode('TABLE')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
              viewMode === 'TABLE' ? 'bg-[#C5A56A] text-[#080B09] font-bold' : 'text-[#A4ADA5] hover:text-white'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            Data Table
          </button>
        </div>
      </div>

      {viewMode === 'VISUAL' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Population Structure */}
          <div className="p-5 rounded-xl bg-[#111713] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#C5A56A]" />
                <h4 className="text-base font-serif font-bold text-[#F4F1E8]">Population & Gender Split (2011)</h4>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700/50">
                Census 2011
              </span>
            </div>

            <p className="text-xs text-[#A4ADA5]">
              Total Kalakote Tehsil Population: <strong className="text-white">72,667 persons</strong> across 16,243 households. Sex ratio: 919.
            </p>

            {/* Custom Bar Comparison */}
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[#A4ADA5]">Male: 37,864</span>
                  <span className="text-[#C5A56A]">52.1%</span>
                </div>
                <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-[#C5A56A] rounded-full transition-all duration-700" style={{ width: '52.1%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[#A4ADA5]">Female: 34,803</span>
                  <span className="text-emerald-400">47.9%</span>
                </div>
                <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-emerald-600 rounded-full transition-all duration-700" style={{ width: '47.9%' }} />
                </div>
              </div>
            </div>

            <div className="p-3 bg-black/40 rounded border border-white/5 text-[11px] text-[#A4ADA5] space-y-1">
              <div><strong>Core Settlement Contrast:</strong> Historic Kalakote village recorded 558 residents.</div>
              <div><strong>Density:</strong> 176 persons per km² across 413 km² tehsil area.</div>
            </div>
          </div>

          {/* Card 2: Literacy Distribution */}
          <div className="p-5 rounded-xl bg-[#111713] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#C5A56A]" />
                <h4 className="text-base font-serif font-bold text-[#F4F1E8]">Literacy: Tehsil vs Core Town</h4>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700/50">
                Census 2011
              </span>
            </div>

            <p className="text-xs text-[#A4ADA5]">
              Contrasting wide rural foothill villages against the centralized administrative ward.
            </p>

            {/* Visual SVG Progress Ring / Bar */}
            <div className="space-y-4 pt-1">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[#A4ADA5]">Overall Kalakote Tehsil Literacy</span>
                  <span className="text-white font-bold">59.13%</span>
                </div>
                <div className="w-full h-4 bg-black/60 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-[#20392C] border-r-2 border-[#C5A56A] rounded-full" style={{ width: '59.13%' }} />
                </div>
                <span className="text-[10px] text-white/50 font-mono mt-0.5 block">35,418 literate individuals</span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[#A4ADA5]">Core Kalakote Settlement (Town Ward)</span>
                  <span className="text-[#C5A56A] font-bold">78.4%</span>
                </div>
                <div className="w-full h-4 bg-black/60 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-[#C5A56A] rounded-full" style={{ width: '78.4%' }} />
                </div>
                <span className="text-[10px] text-white/50 font-mono mt-0.5 block">Proximity to schools, hospital, and civil staff quarters</span>
              </div>
            </div>

            <div className="p-3 bg-black/40 rounded border border-white/5 text-[11px] text-[#A4ADA5]">
              <Info className="w-3.5 h-3.5 inline mr-1 text-[#C5A56A]" />
              Rural female literacy lagged significantly at ~48% in 2011, reflecting geographic remoteness across Pir Panjal slopes.
            </div>
          </div>

          {/* Card 3: Mineral Resources (GSI / Ministry of Coal) */}
          <div className="p-5 rounded-xl bg-[#111713] border border-white/10 space-y-4 md:col-span-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#C5A56A]" />
                <h4 className="text-base font-serif font-bold text-[#F4F1E8]">Tertiary Coal Resources & Installed Power History</h4>
              </div>
              <span className="text-[11px] font-mono text-[#C5A56A] bg-[#C5A56A]/10 px-2 py-0.5 rounded border border-[#C5A56A]/30">
                GSI / Min. of Coal 2024
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="p-3.5 bg-black/40 rounded-lg border border-white/5">
                <span className="text-[11px] font-mono text-[#A4ADA5] block">Subathu Coal Reserves (J&K)</span>
                <span className="text-2xl font-serif font-bold text-[#C5A56A] mt-1 block">9.38 MT</span>
                <span className="text-[10px] text-white/50 block mt-1">Million Tonnes (Kalakote-Metka-Mahogala Belt)</span>
              </div>

              <div className="p-3.5 bg-black/40 rounded-lg border border-white/5">
                <span className="text-[11px] font-mono text-[#A4ADA5] block">Historical Thermal Capacity</span>
                <span className="text-2xl font-serif font-bold text-[#E06C47] mt-1 block">22.5 MW</span>
                <span className="text-[10px] text-white/50 block mt-1">3 x 7.5 MW Skoda Steam Units (1968-1987)</span>
              </div>

              <div className="p-3.5 bg-black/40 rounded-lg border border-white/5">
                <span className="text-[11px] font-mono text-[#A4ADA5] block">Current Operational Generation</span>
                <span className="text-2xl font-serif font-bold text-white/40 mt-1 block">0 MW</span>
                <span className="text-[10px] text-emerald-400 block mt-1">Formally Decommissioned (Cabinet 1989)</span>
              </div>
            </div>

            <p className="text-xs text-[#A4ADA5] leading-relaxed pt-1">
              * Note on Mining Continuity: While geological reserves remain documented in GSI inventories, active commercial output across Metka and Moghla underground mines has been halted or heavily restricted following DGMS regulatory directives.
            </p>
          </div>
        </div>
      ) : (
        /* Full Data Table */
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#111713] scrollbar-thin">
          <table className="w-full min-w-[640px] text-left text-xs text-[#A4ADA5]">
            <thead className="bg-black/60 text-[#C5A56A] font-mono uppercase text-[11px] border-b border-white/10">
              <tr>
                <th className="p-3">Indicator</th>
                <th className="p-3">Category</th>
                <th className="p-3">Geographic Unit</th>
                <th className="p-3">Reference Year</th>
                <th className="p-3">Recorded Value</th>
                <th className="p-3">Source Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {DEVELOPMENT_METRICS.map((metric) => (
                <tr key={metric.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 font-semibold text-[#F4F1E8]">{metric.indicator}</td>
                  <td className="p-3">{metric.category}</td>
                  <td className="p-3 text-white/80">{metric.geographicUnit}</td>
                  <td className="p-3 text-[#C5A56A]">{metric.referenceYear}</td>
                  <td className="p-3 font-bold text-white">
                    {metric.value} {metric.unit || ''}
                  </td>
                  <td className="p-3 text-white/50 text-[10px]">{metric.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

