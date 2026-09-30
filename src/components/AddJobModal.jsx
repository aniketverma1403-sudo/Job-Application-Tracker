import React, { useState } from 'react';
import { X, Building2, Briefcase, MapPin, DollarSign, Calendar, Link as LinkIcon, FileText, AlertCircle, Laptop } from 'lucide-react';

export default function AddJobModal({ isOpen, onClose, onAddJob, existingJobs }) {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [status, setStatus] = useState('Applied');
  const [jobUrl, setJobUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [workMode, setWorkMode] = useState('Remote');
  const [priority, setPriority] = useState('Medium');
  const [interviewDate, setInterviewDate] = useState('');
  const [applicationDate, setApplicationDate] = useState(new Date().toISOString().split('T')[0]);

  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmedCompany = company.trim();
    const trimmedPosition = position.trim();
    const trimmedSalary = salary.trim();
    const trimmedUrl = jobUrl.trim();

    // 1. Empty Field Validation
    if (!trimmedCompany || !trimmedPosition) {
      setError('Company Name and Position are required fields.');
      return;
    }

    // 2. Length Constraints (Prevent UI breaking from excessively long text)
    if (trimmedCompany.length > 50) {
      setError('Company name cannot exceed 50 characters.');
      return;
    }

    if (trimmedPosition.length > 60) {
      setError('Position title cannot exceed 60 characters.');
      return;
    }

    // 3. URL Format Validation (if provided)
    if (trimmedUrl) {
      try {
        const urlObj = new URL(trimmedUrl);
        if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
          throw new Error();
        }
      } catch {
        setError('Please enter a valid Job URL starting with http:// or https://');
        return;
      }
    }

    // 4. Date Validation (Cannot apply in the future)
    const todayStr = new Date().toISOString().split('T')[0];
    if (applicationDate > todayStr) {
      setError('Application date cannot be in the future.');
      return;
    }

    // 5. Duplicate Application Check (Same company and same position already exists)
    const isDuplicate = existingJobs?.some(
      job => job.company.toLowerCase() === trimmedCompany.toLowerCase() && 
             job.position.toLowerCase() === trimmedPosition.toLowerCase()
    );

    if (isDuplicate) {
      setError(`An application for "${trimmedPosition}" at "${trimmedCompany}" already exists in your tracker.`);
      return;
    }

    // Construct new job object securely
    const newJob = {
      id: Date.now().toString(),
      company: trimmedCompany,
      position: trimmedPosition,
      location: location.trim() || 'Remote',
      salary: trimmedSalary || 'Negotiable',
      status,
      jobUrl: trimmedUrl,
      notes: notes.trim(),
      workMode,
      priority,
      interviewDate: interviewDate || 'Not scheduled',
      applicationDate: applicationDate || todayStr,
    };

    onAddJob(newJob);
    
    // Reset Form Fields
    setCompany('');
    setPosition('');
    setLocation('');
    setSalary('');
    setStatus('Applied');
    setJobUrl('');
    setNotes('');
    setWorkMode('Remote');
    setPriority('Medium');
    setInterviewDate('');
    setApplicationDate(todayStr);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold">Add New Job Application</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Validated tracking for your career pipeline.</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mt-4 p-3.5 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-xl flex items-center gap-2.5 text-xs font-medium text-rose-700 dark:text-rose-300 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="py-6 space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Company Name *</label>
              <input 
                type="text" 
                placeholder="e.g. Google (Max 50 chars)" 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Position / Role *</label>
              <input 
                type="text" 
                placeholder="e.g. Frontend Engineer (Max 60 chars)" 
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Location</label>
              <input 
                type="text" 
                placeholder="e.g. Bangalore" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Salary / CTC</label>
              <input 
                type="text" 
                placeholder="e.g. 24 LPA" 
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Initial Status</label>
              <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Work Mode</label>
              <select 
                value={workMode} 
                onChange={(e) => setWorkMode(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Priority</label>
              <select 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="High">🔥 High Priority</option>
                <option value="Medium">⚡ Medium Priority</option>
                <option value="Low">💤 Low Priority</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Date Applied *</label>
              <input 
                type="date" 
                value={applicationDate}
                max={new Date().toISOString().split('T')[0]} // Prevents future dates in native picker
                onChange={(e) => setApplicationDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Job URL / Link</label>
            <input 
              type="text" 
              placeholder="https://company.com/careers/job-123" 
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Interview Notes / Remarks</label>
            <textarea 
              rows="3"
              placeholder="Add recruiter feedback or technical round notes..." 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button 
              type="button" 
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all"
            >
              Save Application
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}