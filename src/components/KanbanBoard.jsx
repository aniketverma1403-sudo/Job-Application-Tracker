import React from 'react';
import { Building2, MapPin, ExternalLink, Trash2, Eye } from 'lucide-react';

export default function KanbanBoard({ jobs, onDeleteJob, onStatusChange, onViewJob }) {
  const columns = ['Applied', 'Interview', 'Offer', 'Rejected'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
      {columns.map((columnStatus) => {
        const columnJobs = jobs.filter(job => job.status === columnStatus);

        return (
          <div 
            key={columnStatus} 
            className="bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col gap-4 min-h-[500px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${
                  columnStatus === 'Applied' ? 'bg-blue-500' :
                  columnStatus === 'Interview' ? 'bg-amber-500' :
                  columnStatus === 'Offer' ? 'bg-emerald-500' : 'bg-rose-500'
                }`} />
                <h4 className="font-bold text-sm tracking-tight">{columnStatus}</h4>
              </div>
              <span className="text-xs font-bold bg-slate-200 dark:bg-slate-800 px-2.5 py-0.5 rounded-full text-slate-600 dark:text-slate-300">
                {columnJobs.length}
              </span>
            </div>

            {/* Cards Container */}
            <div className="space-y-3 flex-1">
              {columnJobs.length === 0 ? (
                <div className="h-32 flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-800 rounded-xl">
                  <p className="text-xs text-slate-400 font-medium">No applications</p>
                </div>
              ) : (
                columnJobs.map((job) => (
                  <div 
                    key={job.id} 
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-all space-y-3 group"
                  >
                    {/* Top Row: Company & Actions */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                          {job.company}
                        </span>
                        <h5 className="font-bold text-sm text-slate-800 dark:text-slate-100 mt-0.5">
                          {job.position}
                        </h5>
                      </div>
                      <div className="flex items-center gap-1">
                        {/* View Details Button */}
                        <button 
                          onClick={() => onViewJob(job)}
                          className="p-1 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {/* Delete Button */}
                        <button 
                          onClick={() => onDeleteJob(job.id)}
                          className="p-1 hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-500 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{job.location || 'Remote'}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="font-medium text-slate-700 dark:text-slate-300">{job.salary || 'Negotiable'}</span>
                        <span className="text-[10px] text-slate-400">{job.applicationDate}</span>
                      </div>
                    </div>

                    {/* Footer: Quick Status Switcher */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-medium">Move to:</span>
                      <select 
                        value={job.status} 
                        onChange={(e) => onStatusChange(job.id, e.target.value)}
                        className="text-[11px] font-medium px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                      >
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>

                  </div>
                ))
              )}
            </div>

          </div>
        );
      })}
    </div>
  );
}