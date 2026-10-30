import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import { maplibreGL } from '@maplibre/maplibre-gl-leaflet';
import { LOCATIONS_DATA } from '../../data/locations';
import { GeographicLocation } from '../../types';
import { Layers, Pickaxe, Flame, Sparkles, Building, AlertCircle, Compass, Globe } from 'lucide-react';

interface KalakoteMapProps {
  selectedLocationId?: string | null;
  onSelectLocation?: (loc: GeographicLocation) => void;
  onOpenSourceModal?: (sourceId: string) => void;
}

type MapTheme = 'dark' | 'liberty' | 'positron';

const OPENFREEMAP_STYLES: Record<MapTheme, { name: string; url: string; desc: string }> = {
  dark: {
    name: 'OFM Dark',
    url: 'https://tiles.openfreemap.org/styles/dark',
    desc: 'Cinematic obsidian contrast'
  },
  liberty: {
    name: 'OFM Liberty (Terrain)',
    url: 'https://tiles.openfreemap.org/styles/liberty',
    desc: 'Topographical terrain & roads'
  },
  positron: {
    name: 'OFM Positron',
    url: 'https://tiles.openfreemap.org/styles/positron',
    desc: 'Clean minimal cartography'
  }
};

export const KalakoteMap: React.FC<KalakoteMapProps> = ({
  selectedLocationId,
  onSelectLocation,
  onOpenSourceModal
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const baseLayerRef = useRef<L.Layer | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  const [mapTheme, setMapTheme] = useState<MapTheme>('dark');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [mapError, setMapError] = useState<boolean>(false);
  const [selectedLoc, setSelectedLoc] = useState<GeographicLocation | null>(null);
  const [isStyleMenuOpen, setIsStyleMenuOpen] = useState<boolean>(false);

  // Initialize Map container once
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    try {
      const map = L.map(mapContainerRef.current, {
        center: [33.212, 74.43],
        zoom: 12,
        minZoom: 9,
        maxZoom: 18,
        zoomControl: true,
        attributionControl: true
      });

      mapInstanceRef.current = map;

      // Apply initial OpenFreeMap vector layer
      try {
        const glLayer = maplibreGL({
          style: OPENFREEMAP_STYLES.dark.url
        });
        glLayer.addTo(map);
        baseLayerRef.current = glLayer;
      } catch (vectorErr) {
        console.warn('OpenFreeMap vector layer initialization fallback:', vectorErr);
        // Fallback to standard OpenStreetMap raster tiles
        const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19
        });
        osmLayer.addTo(map);
        baseLayerRef.current = osmLayer;
      }
    } catch (err) {
      console.error('Error initializing Leaflet map:', err);
      setMapError(true);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Base Layer when Theme changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (baseLayerRef.current) {
      map.removeLayer(baseLayerRef.current);
      baseLayerRef.current = null;
    }

    try {
      const glLayer = maplibreGL({
        style: OPENFREEMAP_STYLES[mapTheme].url
      });
      glLayer.addTo(map);
      baseLayerRef.current = glLayer;
    } catch {
      const osmFallback = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      });
      osmFallback.addTo(map);
      baseLayerRef.current = osmFallback;
    }
  }, [mapTheme]);

  // Update Markers based on category filter
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    const filtered = LOCATIONS_DATA.filter(loc => {
      if (activeCategory === 'ALL') return true;
      if (activeCategory === 'MINES') return loc.category === 'Mine / Coalfield';
      if (activeCategory === 'THERMAL') return loc.category === 'Industrial Site';
      if (activeCategory === 'HERITAGE') return loc.category === 'Heritage & Sacred Site' || loc.category === 'Natural Feature / Spring';
      if (activeCategory === 'ADMIN') return loc.category === 'Town / Village' || loc.category === 'Administrative Office';
      return true;
    });

    filtered.forEach(loc => {
      // Determine marker color / styling
      let color = '#C5A56A';
      if (loc.category === 'Mine / Coalfield') color = '#A4ADA5';
      if (loc.category === 'Industrial Site') color = '#E06C47';
      if (loc.category === 'Natural Feature / Spring' || loc.category === 'Heritage & Sacred Site') color = '#4ECCA3';
      if (loc.category === 'Town / Village' || loc.category === 'Administrative Office') color = '#D4AF37';

      const customHtml = `
        <div style="
          background-color: ${color};
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 2px solid #080B09;
          box-shadow: 0 0 12px ${color}aa;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #080B09;
          font-weight: bold;
          font-size: 14px;
          cursor: pointer;
        ">
          &bull;
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: customHtml,
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });

      const marker = L.marker(loc.coordinates, { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setSelectedLoc(loc);
        if (onSelectLocation) onSelectLocation(loc);
      });

      markersRef.current[loc.id] = marker;
    });
  }, [activeCategory, onSelectLocation]);

  // Handle selected location externally
  useEffect(() => {
    if (!selectedLocationId || !mapInstanceRef.current) return;
    const targetLoc = LOCATIONS_DATA.find(l => l.id === selectedLocationId);
    if (targetLoc && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(targetLoc.coordinates, 13, { duration: 1.5 });
      setSelectedLoc(targetLoc);
    }
  }, [selectedLocationId]);

  return (
    <div className="relative w-full h-[480px] sm:h-[620px] rounded-xl overflow-hidden border border-[#C5A56A]/30 bg-[#080B09] shadow-2xl">
      {/* Top Left: Category Filter Controls (Scrollable row on mobile, no wrapping overlap) */}
      <div className="absolute top-3 left-3 right-20 sm:right-auto sm:left-4 sm:top-4 z-[400] flex items-center gap-1.5 p-1 sm:p-1.5 bg-[#111713]/95 backdrop-blur-md rounded-lg border border-white/10 shadow-lg text-xs font-mono overflow-x-auto no-scrollbar whitespace-nowrap">
        <button
          onClick={() => setActiveCategory('ALL')}
          className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded transition-colors flex items-center gap-1.5 shrink-0 ${
            activeCategory === 'ALL' ? 'bg-[#C5A56A] text-black font-semibold shadow' : 'text-[#A4ADA5] hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All</span>
        </button>
        <button
          onClick={() => setActiveCategory('MINES')}
          className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded transition-colors flex items-center gap-1.5 shrink-0 ${
            activeCategory === 'MINES' ? 'bg-[#C5A56A] text-black font-semibold shadow' : 'text-[#A4ADA5] hover:text-white'
          }`}
        >
          <Pickaxe className="w-3.5 h-3.5" />
          <span>Coalfields</span>
        </button>
        <button
          onClick={() => setActiveCategory('THERMAL')}
          className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded transition-colors flex items-center gap-1.5 shrink-0 ${
            activeCategory === 'THERMAL' ? 'bg-[#C5A56A] text-black font-semibold shadow' : 'text-[#A4ADA5] hover:text-white'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Thermal</span>
        </button>
        <button
          onClick={() => setActiveCategory('HERITAGE')}
          className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded transition-colors flex items-center gap-1.5 shrink-0 ${
            activeCategory === 'HERITAGE' ? 'bg-[#C5A56A] text-black font-semibold shadow' : 'text-[#A4ADA5] hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Heritage</span>
        </button>
        <button
          onClick={() => setActiveCategory('ADMIN')}
          className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded transition-colors flex items-center gap-1.5 shrink-0 ${
            activeCategory === 'ADMIN' ? 'bg-[#C5A56A] text-black font-semibold shadow' : 'text-[#A4ADA5] hover:text-white'
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          <span>Admin</span>
        </button>
      </div>

      {/* Top Right: OpenFreeMap Theme Switcher */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[400]">
        <div className="relative">
          <button
            onClick={() => setIsStyleMenuOpen(!isStyleMenuOpen)}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#111713]/90 hover:bg-[#161F1A] backdrop-blur-md rounded-lg border border-[#C5A56A]/40 text-[#C5A56A] font-mono text-xs shadow-lg transition-colors"
            title="Switch OpenFreeMap style"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-semibold">{OPENFREEMAP_STYLES[mapTheme].name}</span>
            <span className="sm:hidden font-semibold text-[11px]">Map</span>
          </button>

          {isStyleMenuOpen && (
            <div className="absolute right-0 mt-2 w-52 sm:w-56 bg-[#111713] rounded-lg border border-[#C5A56A]/30 shadow-2xl p-2 font-mono text-xs space-y-1 animate-fadeIn">
              <div className="px-2 py-1 text-[10px] uppercase text-[#A4ADA5] tracking-wider border-b border-white/10 flex items-center justify-between">
                <span>Map Style</span>
                <span className="text-emerald-400 font-bold">Free OFM</span>
              </div>
              {(Object.keys(OPENFREEMAP_STYLES) as MapTheme[]).map((key) => {
                const item = OPENFREEMAP_STYLES[key];
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setMapTheme(key);
                      setIsStyleMenuOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded transition-colors flex flex-col ${
                      mapTheme === key ? 'bg-[#C5A56A]/20 text-[#C5A56A] font-semibold' : 'text-[#A4ADA5] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className="text-[10px] text-white/50">{item.desc}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Map or Error Fallback */}
      {mapError ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#111713] text-[#A4ADA5] space-y-3">
          <AlertCircle className="w-10 h-10 text-amber-400" />
          <h4 className="text-lg font-serif text-[#F4F1E8]">Map Tiles Offline or Restricted</h4>
          <p className="max-w-md text-xs">
            OpenFreeMap vector tile service could not be loaded directly. You can inspect verified coordinates and geological sites in the table below.
          </p>
        </div>
      ) : (
        <div ref={mapContainerRef} className="w-full h-full z-0" />
      )}

      {/* Selected Location Card Overlay */}
      {selectedLoc && (
        <div className="absolute bottom-9 left-3 right-3 sm:left-auto sm:right-4 sm:bottom-12 sm:max-w-sm z-[400] max-h-[55vh] overflow-y-auto bg-[#111713]/95 backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-[#C5A56A]/40 shadow-2xl animate-fadeIn space-y-2.5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A56A] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                {selectedLoc.category}
              </span>
              <h4 className="text-base font-serif font-bold text-[#F4F1E8] mt-1">{selectedLoc.name}</h4>
            </div>
            <button
              onClick={() => setSelectedLoc(null)}
              className="text-white/60 hover:text-white p-1 rounded hover:bg-white/10 text-sm"
              aria-label="Close location card"
            >
              &times;
            </button>
          </div>

          <div className="text-xs text-[#A4ADA5] space-y-2">
            <p>{selectedLoc.description}</p>
            <div className="p-2 bg-black/40 rounded border border-white/5 font-mono text-[11px] space-y-1">
              <div>
                <strong className="text-white/80">Coordinates:</strong> {selectedLoc.coordinates[0].toFixed(4)}°N, {selectedLoc.coordinates[1].toFixed(4)}°E
                {selectedLoc.isApproximate && <span className="text-amber-400 ml-1">(Approximate)</span>}
              </div>
              {selectedLoc.elevationMeters && (
                <div>
                  <strong className="text-white/80">Elevation:</strong> ~{selectedLoc.elevationMeters} meters ASL
                </div>
              )}
            </div>
            <p className="italic text-[#F4F1E8]/80 text-[11px]">
              {selectedLoc.historicalSignificance}
            </p>
          </div>

          {selectedLoc.sourceIds.length > 0 && onOpenSourceModal && (
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-white/50 font-mono text-[11px]">Source Evidence:</span>
              <button
                onClick={() => onOpenSourceModal(selectedLoc.sourceIds[0])}
                className="text-[#C5A56A] hover:underline font-mono text-xs"
              >
                Inspect {selectedLoc.sourceIds[0]} &rarr;
              </button>
            </div>
          )}
        </div>
      )}

      {/* Attribution & Precision Disclaimer */}
      <div className="absolute bottom-2 left-2 right-2 sm:right-auto z-[400] text-[9px] sm:text-[10px] font-mono text-white/60 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded border border-white/10 flex items-center gap-1.5 truncate">
        <Globe className="w-3 h-3 text-[#C5A56A] shrink-0" />
        <span className="truncate">Base: <a href="https://openfreemap.org" target="_blank" rel="noreferrer" className="text-[#C5A56A] underline">OpenFreeMap</a> &bull; OSM contributors</span>
      </div>
    </div>
  );
};
