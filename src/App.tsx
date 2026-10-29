import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/search/SearchModal';
import { SourceModal } from './components/common/SourceModal';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Pages
import { Home } from './pages/Home';
import { TimeMachine } from './pages/TimeMachine';
import { History } from './pages/History';
import { Mining } from './pages/Mining';
import { ThermalPlant } from './pages/ThermalPlant';
import { AtlasMap } from './pages/AtlasMap';
import { Administration } from './pages/Administration';
import { Heritage } from './pages/Heritage';
import { BuiltChangedLost } from './pages/BuiltChangedLost';
import { Development } from './pages/Development';
import { MythsEvidence } from './pages/MythsEvidence';
import { PeopleOralHistory } from './pages/PeopleOralHistory';
import { ArchivePage } from './pages/Archive';
import { Methodology } from './pages/Methodology';
import { About } from './pages/About';
import { Artifacts3D } from './pages/Artifacts3D';

// Scroll to top component on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSourceId, setActiveSourceId] = useState<string | null>(null);

  // Global keyboard shortcut for Search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <div className="min-h-screen bg-[#080B09] text-[#F4F1E8] flex flex-col font-sans selection:bg-[#C5A56A]/30 selection:text-[#F4F1E8]">
        {/* Navigation */}
        <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

        {/* Page Content Wrapped in ErrorBoundary */}
        <main className="flex-1">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home onOpenSourceModal={setActiveSourceId} />} />
              <Route path="/time-machine" element={<TimeMachine onOpenSourceModal={setActiveSourceId} />} />
              <Route path="/history" element={<History onOpenSourceModal={setActiveSourceId} />} />
              <Route path="/mining" element={<Mining onOpenSourceModal={setActiveSourceId} />} />
              <Route path="/thermal-station" element={<ThermalPlant onOpenSourceModal={setActiveSourceId} />} />
              <Route path="/map" element={<AtlasMap onOpenSourceModal={setActiveSourceId} />} />
              <Route path="/administration" element={<Administration onOpenSourceModal={setActiveSourceId} />} />
              <Route path="/heritage" element={<Heritage onOpenSourceModal={setActiveSourceId} />} />
              <Route path="/artifacts-3d" element={<Artifacts3D onOpenSourceModal={setActiveSourceId} />} />
              <Route path="/artifacts" element={<Artifacts3D onOpenSourceModal={setActiveSourceId} />} />
              <Route path="/built-changed-lost" element={<BuiltChangedLost onOpenSourceModal={setActiveSourceId} />} />
              <Route path="/development" element={<Development />} />
              <Route path="/myths" element={<MythsEvidence />} />
              <Route path="/people" element={<PeopleOralHistory />} />
              <Route path="/archive" element={<ArchivePage onOpenSourceModal={setActiveSourceId} />} />
              <Route path="/methodology" element={<Methodology />} />
              <Route path="/about" element={<About />} />
              {/* Catch-all fallback */}
              <Route path="*" element={<Home onOpenSourceModal={setActiveSourceId} />} />
            </Routes>
          </ErrorBoundary>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Global Modals */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectSource={(sourceId) => {
            setIsSearchOpen(false);
            setActiveSourceId(sourceId);
          }}
        />

        <SourceModal
          sourceId={activeSourceId}
          onClose={() => setActiveSourceId(null)}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
