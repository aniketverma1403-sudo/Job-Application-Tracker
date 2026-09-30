import React from 'react';
import { Settings, Shield, User, Bell, Database } from 'lucide-react';

export default function SettingsView({ jobsCount }) {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Workspace Settings</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Manage your account preferences and local database records.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xl">
            AV
          </div>
          <div>
            <h3 className="font-bold text-base">Aniket Verma</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Frontend Developer Candidate • Pro Workspace</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div>
              <h4 className="font-semibold text-sm">Local Storage Database</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Currently storing {jobsCount} job application records securely on your browser.</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 rounded-full">
              Synced Active
            </span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div>
              <h4 className="font-semibold text-sm">Theme Mode</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Controlled globally from top navbar theme toggle.</p>
            </div>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Active Sync
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}