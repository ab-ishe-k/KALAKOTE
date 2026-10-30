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
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-sm">
      {/* Editorial Top Disclaimer Bar */}
      <div className="bg-[#F8FAFC] text-slate-600 text-[10px] sm:text-[11px] font-mono py-1 px-3 sm:px-4 border-b border-slate-200 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-amber-700 truncate mr-2">
          <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-amber-600" />
          <span className="hidden sm:inline font-semibold">Non-Governmental Initiative:</span> Independent Historical Archive &bull; Rajouri, J&amp;K
        </span>
        <span className="hidden md:inline text-slate-500 shrink-0">
          Historical Scope: Earliest Records &ndash; October 2026
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-600/30 flex items-center justify-center text-amber-700 shadow-sm group-hover:border-amber-600 transition-colors">
              <Compass className="w-5 h-5 transition-transform group-hover:rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-widest text-lg sm:text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                KALAKOTE OVERLOOK
              </span>
              <span className="text-[10px] font-mono text-slate-500 hidden sm:block tracking-wide">
                Digital History &amp; Heritage Archive
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-mono">
            <Link
              to="/history"
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive('/history') ? 'text-amber-800 bg-amber-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              History
            </Link>

            <Link
              to="/time-machine"
              className={`px-3 py-1.5 rounded-md border flex items-center gap-1.5 transition-all ${
                isActive('/time-machine')
                  ? 'bg-amber-600 text-white font-bold border-amber-600 shadow-sm'
                  : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-600 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Time Machine</span>
            </Link>

            <Link
              to="/mining"
              className={`px-3 py-2 rounded-md transition-colors flex items-center gap-1 ${
                isActive('/mining') ? 'text-amber-800 bg-amber-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Pickaxe className="w-3.5 h-3.5" />
              <span>Coal Mines</span>
            </Link>

            <Link
              to="/thermal-station"
              className={`px-3 py-2 rounded-md transition-colors flex items-center gap-1 ${
                isActive('/thermal-station') ? 'text-amber-800 bg-amber-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Thermal Plant</span>
            </Link>

            <Link
              to="/map"
              className={`px-3 py-2 rounded-md transition-colors flex items-center gap-1 ${
                isActive('/map') ? 'text-amber-800 bg-amber-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Atlas</span>
            </Link>

            <Link
              to="/administration"
              className={`px-3 py-2 rounded-md transition-colors flex items-center gap-1 ${
                isActive('/administration') ? 'text-amber-800 bg-amber-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Administration</span>
            </Link>

            <Link
              to="/archive"
              className={`px-3 py-2 rounded-md transition-colors flex items-center gap-1 ${
                isActive('/archive') ? 'text-amber-800 bg-amber-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Archive className="w-3.5 h-3.5" />
              <span>Archive</span>
            </Link>

            {/* "More" Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className="px-2.5 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-1 transition-colors"
              >
                <span>Explorations</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {moreMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-lg bg-white border border-slate-200 shadow-2xl py-2 z-50 animate-fadeIn"
                  onMouseLeave={() => setMoreMenuOpen(false)}
                >
                  <Link
                    to="/artifacts-3d"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block px-4 py-2 text-xs text-amber-700 hover:bg-amber-50 font-semibold flex items-center justify-between"
                  >
                    <span>3D Museum &amp; Relics</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">GYRO 3D</span>
                  </Link>
                  <Link
                    to="/heritage"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block px-4 py-2 text-xs text-slate-700 hover:text-amber-800 hover:bg-slate-50"
                  >
                    Heritage &amp; Sacred Sites
                  </Link>
                  <Link
                    to="/built-changed-lost"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block px-4 py-2 text-xs text-slate-700 hover:text-amber-800 hover:bg-slate-50"
                  >
                    Built, Changed &amp; Lost
                  </Link>
                  <Link
                    to="/development"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block px-4 py-2 text-xs text-slate-700 hover:text-amber-800 hover:bg-slate-50"
                  >
                    Data &amp; Development Dashboard
                  </Link>
                  <Link
                    to="/myths"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block px-4 py-2 text-xs text-slate-700 hover:text-amber-800 hover:bg-slate-50"
                  >
                    Myths vs Documented Evidence
                  </Link>
                  <Link
                    to="/people"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block px-4 py-2 text-xs text-slate-700 hover:text-amber-800 hover:bg-slate-50"
                  >
                    People &amp; Oral History
                  </Link>
                  <div className="my-1 border-t border-slate-100" />
                  <Link
                    to="/methodology"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block px-4 py-2 text-xs text-amber-800 hover:bg-amber-50"
                  >
                    Research Methodology
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block px-4 py-2 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  >
                    About &amp; Disclaimers
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action: Search Trigger & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-mono text-slate-700 transition-colors"
              title="Search Archive (Cmd+K / Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Search Archive</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.2 bg-white rounded text-[10px] text-slate-500 border border-slate-300 shadow-sm">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 animate-fadeIn text-sm font-mono max-h-[calc(100vh-5rem)] overflow-y-auto">
          <Link
            to="/history"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 hover:text-amber-800"
          >
            History &amp; Timeline
          </Link>
          <Link
            to="/time-machine"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-amber-700 font-bold"
          >
            Time Machine (Interactive 2.5D)
          </Link>
          <Link
            to="/artifacts-3d"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-amber-700 font-bold flex items-center justify-between"
          >
            <span>3D Museum &amp; Relics</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">GYRO 3D</span>
          </Link>
          <Link
            to="/mining"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 hover:text-amber-800"
          >
            Coal Mines Explorer
          </Link>
          <Link
            to="/thermal-station"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 hover:text-amber-800"
          >
            Kalakote Thermal Power Station
          </Link>
          <Link
            to="/map"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 hover:text-amber-800"
          >
            Interactive Atlas
          </Link>
          <Link
            to="/administration"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 hover:text-amber-800"
          >
            Administration &amp; Agitations
          </Link>
          <Link
            to="/heritage"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 hover:text-amber-800"
          >
            Heritage &amp; Sacred Sites
          </Link>
          <Link
            to="/built-changed-lost"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 hover:text-amber-800"
          >
            Built, Changed &amp; Lost
          </Link>
          <Link
            to="/development"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 hover:text-amber-800"
          >
            Data &amp; Development Dashboard
          </Link>
          <Link
            to="/myths"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 hover:text-amber-800"
          >
            Myths vs Documented Evidence
          </Link>
          <Link
            to="/people"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 hover:text-amber-800"
          >
            People &amp; Oral History
          </Link>
          <Link
            to="/archive"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 hover:text-amber-800"
          >
            Historical Archive &amp; Sources
          </Link>
          <Link
            to="/methodology"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-amber-700"
          >
            Research Methodology
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700"
          >
            About &amp; Disclaimers
          </Link>
        </div>
      )}
    </header>
  );
};
