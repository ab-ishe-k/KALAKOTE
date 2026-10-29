import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Compass, Clock, Pickaxe, Flame, Map, Building2, Archive, ChevronDown, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080B09]/95 backdrop-blur-md border-b border-white/10 transition-all">
      {/* Editorial Top Disclaimer Bar */}
      <div className="bg-[#111713] text-[#A4ADA5] text-[11px] font-mono py-1 px-4 border-b border-white/5 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-amber-400/90 truncate">
          <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">Non-Governmental Initiative:</span> Independent Historical Archive &bull; Rajouri, Jammu & Kashmir
        </span>
        <span className="hidden md:inline text-white/50">
          Historical Scope: Earliest Records &ndash; October 2026
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded bg-[#20392C] border border-[#C5A56A]/40 flex items-center justify-center text-[#C5A56A] shadow-md group-hover:border-[#C5A56A] transition-colors">
              <Compass className="w-5 h-5 transition-transform group-hover:rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-widest text-lg sm:text-xl font-bold text-[#F4F1E8] group-hover:text-[#C5A56A] transition-colors">
                KALAKOTE OVERLOOK
              </span>
              <span className="text-[10px] font-mono text-[#A4ADA5] hidden sm:block tracking-wide">
                Digital History & Heritage Archive
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-mono">
            <Link
              to="/history"
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive('/history') ? 'text-[#C5A56A] bg-white/5' : 'text-[#A4ADA5] hover:text-[#F4F1E8] hover:bg-white/5'
              }`}
            >
              History
            </Link>

            <Link
              to="/time-machine"
              className={`px-3 py-1.5 rounded-md border flex items-center gap-1.5 transition-all ${
                isActive('/time-machine')
                  ? 'bg-[#C5A56A] text-[#080B09] font-bold border-[#C5A56A]'
                  : 'bg-[#20392C]/50 text-[#C5A56A] border-[#C5A56A]/40 hover:bg-[#C5A56A] hover:text-[#080B09]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Time Machine</span>
            </Link>

            <Link
              to="/mining"
              className={`px-3 py-2 rounded-md transition-colors flex items-center gap-1 ${
                isActive('/mining') ? 'text-[#C5A56A] bg-white/5' : 'text-[#A4ADA5] hover:text-[#F4F1E8] hover:bg-white/5'
              }`}
            >
              <Pickaxe className="w-3.5 h-3.5" />
              <span>Coal Mines</span>
            </Link>

            <Link
              to="/thermal-station"
              className={`px-3 py-2 rounded-md transition-colors flex items-center gap-1 ${
                isActive('/thermal-station') ? 'text-[#C5A56A] bg-white/5' : 'text-[#A4ADA5] hover:text-[#F4F1E8] hover:bg-white/5'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Thermal Plant</span>
            </Link>

            <Link
              to="/map"
              className={`px-3 py-2 rounded-md transition-colors flex items-center gap-1 ${
                isActive('/map') ? 'text-[#C5A56A] bg-white/5' : 'text-[#A4ADA5] hover:text-[#F4F1E8] hover:bg-white/5'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Atlas</span>
            </Link>

            <Link
              to="/administration"
              className={`px-3 py-2 rounded-md transition-colors flex items-center gap-1 ${
                isActive('/administration') ? 'text-[#C5A56A] bg-white/5' : 'text-[#A4ADA5] hover:text-[#F4F1E8] hover:bg-white/5'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Administration</span>
            </Link>

            <Link
              to="/archive"
              className={`px-3 py-2 rounded-md transition-colors flex items-center gap-1 ${
                isActive('/archive') ? 'text-[#C5A56A] bg-white/5' : 'text-[#A4ADA5] hover:text-[#F4F1E8] hover:bg-white/5'
              }`}
            >
              <Archive className="w-3.5 h-3.5" />
              <span>Archive</span>
            </Link>

            {/* "More" Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className="px-2.5 py-2 rounded-md text-[#A4ADA5] hover:text-[#F4F1E8] hover:bg-white/5 flex items-center gap-1 transition-colors"
              >
                <span>Explorations</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {moreMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-lg bg-[#111713] border border-white/10 shadow-2xl py-2 z-50 animate-fadeIn"
                  onMouseLeave={() => setMoreMenuOpen(false)}
                >
                  <Link
                    to="/artifacts-3d"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block px-4 py-2 text-xs text-[#C5A56A] hover:bg-white/5 font-semibold flex items-center justify-between"
                  >
                    <span>3D Museum & Relics</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#C5A56A]/20 text-[#C5A56A] border border-[#C5A56A]/30">GYRO 3D</span>
                  </Link>
                  <Link
                    to="/heritage"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block px-4 py-2 text-xs text-[#A4ADA5] hover:text-[#F4F1E8] hover:bg-white/5"
                  >
                    Heritage & Sacred Sites
                  </Link>
                  <Link
                    to="/built-changed-lost"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block px-4 py-2 text-xs text-[#A4ADA5] hover:text-[#F4F1E8] hover:bg-white/5"
                  >
                    Built, Changed & Lost
                  </Link>
                  <Link
                    to="/development"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block px-4 py-2 text-xs text-[#A4ADA5] hover:text-[#F4F1E8] hover:bg-white/5"
                  >
                    Data & Development Dashboard
                  </Link>
                  <Link
                    to="/myths"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block px-4 py-2 text-xs text-[#A4ADA5] hover:text-[#F4F1E8] hover:bg-white/5"
                  >
                    Myths vs Documented Evidence
                  </Link>
                  <Link
                    to="/people"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block px-4 py-2 text-xs text-[#A4ADA5] hover:text-[#F4F1E8] hover:bg-white/5"
                  >
                    People & Oral History
                  </Link>
                  <div className="my-1 border-t border-white/5" />
                  <Link
                    to="/methodology"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block px-4 py-2 text-xs text-[#C5A56A] hover:bg-white/5"
                  >
                    Research Methodology
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block px-4 py-2 text-xs text-[#A4ADA5] hover:text-[#F4F1E8] hover:bg-white/5"
                  >
                    About & Disclaimers
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action: Search Trigger & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#A4ADA5] transition-colors"
              title="Search Archive (Cmd+K / Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-[#C5A56A]" />
              <span className="hidden sm:inline">Search Archive</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.2 bg-black/40 rounded text-[10px] text-white/50 border border-white/5">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white rounded-md hover:bg-white/5 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#111713] border-b border-white/10 px-4 pt-2 pb-6 space-y-2 animate-fadeIn text-sm font-mono">
          <Link
            to="/history"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#A4ADA5] hover:text-[#C5A56A]"
          >
            History & Timeline
          </Link>
          <Link
            to="/time-machine"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#C5A56A] font-bold"
          >
            Time Machine (Interactive 2.5D)
          </Link>
          <Link
            to="/artifacts-3d"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#C5A56A] font-bold flex items-center justify-between"
          >
            <span>3D Museum & Relics</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#C5A56A]/20 text-[#C5A56A] border border-[#C5A56A]/40">GYRO 3D</span>
          </Link>
          <Link
            to="/mining"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#A4ADA5] hover:text-[#C5A56A]"
          >
            Coal Mines Explorer
          </Link>
          <Link
            to="/thermal-station"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#A4ADA5] hover:text-[#C5A56A]"
          >
            Kalakote Thermal Power Station
          </Link>
          <Link
            to="/map"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#A4ADA5] hover:text-[#C5A56A]"
          >
            Interactive Atlas
          </Link>
          <Link
            to="/administration"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#A4ADA5] hover:text-[#C5A56A]"
          >
            Administration & Agitations
          </Link>
          <Link
            to="/heritage"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#A4ADA5] hover:text-[#C5A56A]"
          >
            Heritage & Sacred Sites
          </Link>
          <Link
            to="/built-changed-lost"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#A4ADA5] hover:text-[#C5A56A]"
          >
            Built, Changed & Lost
          </Link>
          <Link
            to="/development"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#A4ADA5] hover:text-[#C5A56A]"
          >
            Data & Development Dashboard
          </Link>
          <Link
            to="/myths"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#A4ADA5] hover:text-[#C5A56A]"
          >
            Myths vs Documented Evidence
          </Link>
          <Link
            to="/people"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#A4ADA5] hover:text-[#C5A56A]"
          >
            People & Oral History
          </Link>
          <Link
            to="/archive"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#A4ADA5] hover:text-[#C5A56A]"
          >
            Historical Archive & Sources
          </Link>
          <Link
            to="/methodology"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#C5A56A]"
          >
            Research Methodology
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#A4ADA5]"
          >
            About & Disclaimers
          </Link>
        </div>
      )}
    </header>
  );
};

