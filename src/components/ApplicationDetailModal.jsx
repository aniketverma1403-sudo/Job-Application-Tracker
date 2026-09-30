import React from 'react';
import { X, MapPin, DollarSign, Calendar, Link as LinkIcon, FileText, Trash2, Laptop, ShieldAlert } from 'lucide-react';

export default function ApplicationDetailModal({ isOpen, onClose, job, onDelete }) {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-lg">
              {job.company.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{job.position}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{job.company}</span>
                {job.priority && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    job.priority === 'High' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' :
                    job.priority === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                    'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    {job.priority} Priority
                  </span>
                )}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="py-6 space-y-6">
          
          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Current Status</span>
            <span className={`text-xs font-bold px-3.5 py-1.5 rounded-full ${
              job.status === 'Offer' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
              job.status === 'Interview' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
              job.status === 'Applied' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' :
              'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
            }`}>
              {job.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Location</span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{job.location || 'Remote'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <Laptop className="w-5 h-5 text-slate-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Work Mode</span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{job.workMode || 'Remote'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <DollarSign className="w-5 h-5 text-slate-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Salary / CTC</span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{job.salary || 'Negotiable'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <Calendar className="w-5 h-5 text-slate-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Next Interview</span>
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{job.interviewDate || 'Not scheduled'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 sm:col-span-2">
              <LinkIcon className="w-5 h-5 text-slate-400 shrink-0" />
              <div className="overflow-hidden w-full">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Job Portal Link</span>
                {job.jobUrl ? (
                  <a href={job.jobUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline truncate block">
                    {job.jobUrl} ↗
                  </a>
                ) : (
                  <span className="text-sm font-medium text-slate-400">No URL provided</span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <FileText className="w-4 h-4" />
              <span>Interview Notes & Remarks</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300 min-h-[80px] whitespace-pre-wrap">
              {job.notes || 'No notes added for this application.'}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button 
            onClick={() => {
              onDelete(job.id);
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 text-sm font-medium transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
          
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}