import React from 'react';

export default function StatCard({ title, value, icon: Icon, trend, trendColor }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
        <div className="mt-2 flex items-baseline gap-3">
          <span className="text-3xl font-bold text-slate-800 dark:text-slate-100">{value}</span>
          {trend && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${trendColor}`}>
              {trend}
            </span>
          )}
        </div>
      </div>
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}