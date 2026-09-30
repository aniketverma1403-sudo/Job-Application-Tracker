import React from 'react';
import { ExternalLink, Trash2, Eye, SearchX, Laptop } from 'lucide-react';

export default function ApplicationTable({ jobs, allJobsCount, onDeleteJob, onStatusChange, onViewJob, onResetFilters }) {
  
  if (!jobs || jobs.length === 0) {
    const isSearchingOrFiltering = allJobsCount > 0;

    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center shadow-sm">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          {isSearchingOrFiltering ? <SearchX className="w-8 h-8" /> : <ExternalLink className="w-8 h-8" />}
        </div>
        <h3 className="text-lg font-bold">
          {isSearchingOrFiltering ? "No matching applications found" : "No job applications yet"}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
          {isSearchingOrFiltering 
            ? "Try adjusting your search query or status filter." 
            : "Get started by adding your first job application using the button above."}
        </p>
        
        {isSearchingOrFiltering && onResetFilters && (
          <button 
            onClick={onResetFilters}
            className="mt-5 px-4 py-2 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs font-semibold transition-colors"
          >
            Clear Search & Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <th className="py-3.5 px-6">Position & Company</th>
              <th className="py-3.5 px-6">Work Mode</th>
              <th className="py-3.5 px-6">Status</th>
              <th className="py-3.5 px-6">Priority</th>
              <th className="py-3.5 px-6">Salary</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm shrink-0">
                      {job.company.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-100">{job.position}</div>
                      {job.jobUrl ? (
                        <a href={job.jobUrl} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                          {job.company} <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400">{job.company}</span>
                      )}
                    </div>
                  </div>
                </td>

                <td className="py-4 px-6 text-slate-500 dark:text-slate-400 text-xs">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-medium">
                    <Laptop className="w-3 h-3 text-slate-400" /> {job.workMode || 'Remote'}
                  </span>
                </td>

                <td className="py-4 px-6">
                  <select 
                    value={job.status} 
                    onChange={(e) => onStatusChange(job.id, e.target.value)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-xl border transition-colors focus:outline-none ${
                      job.status === 'Offer' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300' :
                      job.status === 'Interview' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300' :
                      job.status === 'Applied' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300' :
                      'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300'
                    }`}
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>

                <td className="py-4 px-6 text-xs">
                  <span className={`font-semibold px-2.5 py-1 rounded-full ${
                    job.priority === 'High' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' :
                    job.priority === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                    'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    {job.priority || 'Medium'}
                  </span>
                </td>

                <td className="py-4 px-6 font-medium text-slate-700 dark:text-slate-300 text-xs">
                  {job.salary || 'Negotiable'}
                </td>

                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onViewJob(job)}
                      className="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-xl transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDeleteJob(job.id)}
                      className="p-2 hover:bg-rose-50 dark:hover:bg-rose-950/50 text-rose-500 rounded-xl transition-colors"
                      title="Delete Application"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}