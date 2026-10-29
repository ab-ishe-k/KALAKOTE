import React, { useState } from 'react';
import { KalakoteMap } from '../components/map/KalakoteMap';
import { LOCATIONS_DATA } from '../data/locations';
import { Map, Layers, Search } from 'lucide-react';

interface AtlasMapProps {
  onOpenSourceModal: (sourceId: string) => void;
}

export const AtlasMap: React.FC<AtlasMapProps> = ({ onOpenSourceModal }) => {
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocations = LOCATIONS_DATA.filter(loc =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#080B09] text-[#F4F1E8] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Page Header */}
      <div className="border-b border-white/10 pb-6 space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A] flex items-center gap-2">
          <Map className="w-4 h-4" />
          Geospatial Atlas & Verified Topography
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F4F1E8]">
          Interactive Atlas of Kalakote
        </h1>
        <p className="text-xs sm:text-sm text-[#A4ADA5] max-w-3xl leading-relaxed">
          Cartographic register combining Geological Survey of India (GSI) coordinates, Survey of India toposheet landmarks, administrative subdivisions, and perennial mountain springs across Kalakote Tehsil.
        </p>
      </div>

      {/* Interactive Map Component */}
      <div className="shadow-2xl">
        <KalakoteMap
          selectedLocationId={selectedLocationId}
          onSelectLocation={(loc) => setSelectedLocationId(loc.id)}
          onOpenSourceModal={onOpenSourceModal}
        />
      </div>

      {/* Sourced Geographic Points Table */}
      <div className="p-6 rounded-xl bg-[#111713] border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#C5A56A]" />
            <h2 className="text-xl font-serif font-bold text-[#F4F1E8]">
              Verified Topographic Points Registry
            </h2>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-[#C5A56A] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search points..."
              className="w-full pl-8 pr-3 py-1.5 bg-black/50 border border-white/10 rounded text-xs font-mono text-white placeholder-white/40 focus:outline-none focus:border-[#C5A56A]"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded border border-white/5 bg-black/20">
          <table className="w-full text-left text-xs font-mono text-[#A4ADA5]">
            <thead className="bg-black/60 text-[#C5A56A] uppercase text-[11px] border-b border-white/10">
              <tr>
                <th className="p-3">Location Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Coordinates</th>
                <th className="p-3">Elevation</th>
                <th className="p-3">Precision Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLocations.map((loc) => (
                <tr key={loc.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 font-semibold text-[#F4F1E8]">{loc.name}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-white/70">
                      {loc.category}
                    </span>
                  </td>
                  <td className="p-3 text-white/90">
                    {loc.coordinates[0].toFixed(4)}° N, {loc.coordinates[1].toFixed(4)}° E
                  </td>
                  <td className="p-3">
                    {loc.elevationMeters ? `~${loc.elevationMeters} m` : 'N/A'}
                  </td>
                  <td className="p-3">
                    {loc.isApproximate ? (
                      <span className="text-amber-400">Approximate Toposheet Zone</span>
                    ) : (
                      <span className="text-emerald-400">Verified Exact Landmark</span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => {
                        setSelectedLocationId(loc.id);
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }}
                      className="px-2.5 py-1 bg-[#20392C] hover:bg-[#C5A56A] hover:text-[#080B09] text-[#C5A56A] rounded transition-colors text-[11px]"
                    >
                      Focus Map &rarr;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-[11px] font-mono text-white/40 pt-2 flex flex-wrap items-center justify-between gap-2">
          <span>* Coordinates derived from public Survey of India toposheets and Geological Survey of India reports.</span>
          <span>No classified boundaries or sensitive defense installations are recorded.</span>
        </div>
      </div>
    </div>
  );
};

