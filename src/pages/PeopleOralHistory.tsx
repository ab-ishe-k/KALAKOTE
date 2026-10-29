import React, { useState } from 'react';
import { ORAL_HISTORIES_DATA } from '../data/oralHistory';
import { Users, Send, CheckCircle2, Calendar, MapPin } from 'lucide-react';

export const PeopleOralHistory: React.FC = () => {
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    relationship: '',
    narrative: '',
    consent: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.narrative || !formData.consent) return;
    setSubmissionSuccess(true);
    setFormData({ name: '', role: '', relationship: '', narrative: '', consent: false });
  };

  return (
    <div className="min-h-screen bg-[#080B09] text-[#F4F1E8] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Page Header */}
      <div className="border-b border-white/10 pb-6 space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A] flex items-center gap-2">
          <Users className="w-4 h-4" />
          Living Memory & Worker Testimonies
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F4F1E8]">
          People & Oral History
        </h1>
        <p className="text-xs sm:text-sm text-[#A4ADA5] max-w-3xl leading-relaxed">
          Documenting the lived experiences of former underground miners, power plant technicians, and civic organizers. In strict compliance with archival guidelines, oral testimony is presented as personal memory, distinct from independently verified records.
        </p>
      </div>

      {/* Oral Testimonies List */}
      <div className="space-y-8">
        {ORAL_HISTORIES_DATA.map((record) => (
          <div
            key={record.id}
            className="p-6 sm:p-8 rounded-xl bg-[#111713] border border-white/10 space-y-5 shadow-xl hover:border-[#C5A56A]/40 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/5 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#C5A56A] uppercase tracking-wider">
                  Testimony Record &bull; {record.id}
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F4F1E8]">
                  {record.narratorName}
                </h2>
                <p className="text-xs font-mono text-[#A4ADA5]">{record.roleOrBackground}</p>
              </div>

              <span className="px-3 py-1 rounded-full bg-[#20392C] text-[#C5A56A] border border-[#C5A56A]/30 text-xs font-mono">
                {record.thematicCategory}
              </span>
            </div>

            <p className="text-xs text-[#A4ADA5] italic">
              Context: {record.summary}
            </p>

            <blockquote className="p-4 sm:p-5 rounded-lg bg-black/50 border-l-2 border-[#C5A56A] text-sm sm:text-base text-[#F4F1E8]/90 font-serif italic leading-relaxed">
              "{record.excerpt}"
            </blockquote>

            {/* Evidential Cross-Verification Note */}
            <div className="p-3 bg-[#161F1A] rounded border border-white/5 text-xs font-mono text-[#A4ADA5] space-y-1">
              <strong className="text-white block text-[11px] uppercase">
                Archival Qualification & Corroboration:
              </strong>
              <p>{record.verificationNotes}</p>
            </div>

            <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-white/50">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C5A56A]" />
                  Recorded: {record.interviewDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A56A]" />
                  Location: {record.location}
                </span>
              </div>
              <span className="text-emerald-400 font-bold">Formal Consent Verified &bull; Identity Protected</span>
            </div>
          </div>
        ))}
      </div>

      {/* Community Contribution & Submission Workflow */}
      <div className="p-6 sm:p-8 rounded-xl bg-gradient-to-r from-[#111713] to-[#161F1A] border border-[#C5A56A]/30 space-y-6 shadow-2xl">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C5A56A]">
            Archival Contribution Workflow
          </span>
          <h2 className="text-2xl font-serif font-bold text-[#F4F1E8]">
            Contribute a First-Hand Memory or Document
          </h2>
          <p className="text-xs sm:text-sm text-[#A4ADA5] max-w-2xl leading-relaxed">
            Are you a former JKML employee, retired power station worker, or local family with historical photographs, pay slips, or records from Kalakote? Submissions undergo academic review before inclusion.
          </p>
        </div>

        {submissionSuccess ? (
          <div className="p-4 rounded-lg bg-emerald-950/60 border border-emerald-700/60 text-emerald-200 text-xs font-mono space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-300">
              <CheckCircle2 className="w-4 h-4" />
              <span>Submission Received for Moderation</span>
            </div>
            <p>
              Thank you for contributing to the Kalakote Overlook archive. Our research team will review the submitted testimony against public records and verify consent before publication.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#A4ADA5] mb-1">Your Full Name / Pen Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Baldev Raj"
                  className="w-full bg-black/60 border border-white/10 rounded p-2.5 text-white focus:outline-none focus:border-[#C5A56A]"
                />
              </div>

              <div>
                <label className="block text-[#A4ADA5] mb-1">Historical Role or Association *</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Former JKML adit worker (1982-1994)"
                  className="w-full bg-black/60 border border-white/10 rounded p-2.5 text-white focus:outline-none focus:border-[#C5A56A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#A4ADA5] mb-1">Documentary Account or Personal Memory *</label>
              <textarea
                rows={4}
                required
                value={formData.narrative}
                onChange={(e) => setFormData({ ...formData, narrative: e.target.value })}
                placeholder="Describe specific dates, names of mines/machinery, shift routines, or observed changes..."
                className="w-full bg-black/60 border border-white/10 rounded p-2.5 text-white focus:outline-none focus:border-[#C5A56A]"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="consentCheck"
                required
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="rounded bg-black border-white/20 text-[#C5A56A] focus:ring-0"
              />
              <label htmlFor="consentCheck" className="text-white/80 cursor-pointer">
                I confirm that this submission is based on personal memory or family possession and consent to its inclusion in the non-commercial digital archive.
              </label>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#C5A56A] hover:bg-[#DFC38E] text-[#080B09] font-bold flex items-center gap-2 transition-colors shadow-lg"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit for Archival Moderation</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
