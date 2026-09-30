import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Bell, Plus, Sparkles, Clock, ExternalLink, Menu } from 'lucide-react';

export default function Navbar({ darkMode, setDarkMode, onOpenAddModal, jobs, onViewJob, onToggleMobileSidebar }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  const generateNotifications = () => {
    if (!jobs || jobs.length === 0) return [];
    const dynamicNotifs = [];
    jobs.forEach((job) => {
      if (job.status === 'Interview') {
        dynamicNotifs.push({
          id: `notif-int-${job.id}`,
          title: 'Upcoming Interview',
          desc: `${job.company} is reviewing your ${job.position} pipeline.`,
          time: 'Active',
          unread: true,
          jobRef: job
        });
      } else if (job.status === 'Offer') {
        dynamicNotifs.push({
          id: `notif-off-${job.id}`,
          title: '🎉 Offer Received!',
          desc: `${job.company} extended an offer for ${job.position}.`,
          time: 'Action Required',
          unread: true,
          jobRef: job
        });
      }
    });

    if (dynamicNotifs.length === 0) {
      dynamicNotifs.push({
        id: 'notif-default-1',
        title: 'Pipeline Update',
        desc: `You have ${jobs.length} applications tracked. Keep applying!`,
        time: 'Today',
        unread: false,
      });
    }
    return dynamicNotifs;
  };

  const [notifications, setNotifications] = useState(generateNotifications());

  useEffect(() => {
    setNotifications(generateNotifications());
  }, [jobs]);

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const handleNotificationItemClick = (notification) => {
    setNotifications(notifications.map(n => n.id === notification.id ? { ...n, unread: false } : n));
    if (notification.jobRef && onViewJob) {
      onViewJob(notification.jobRef);
      setShowNotifications(false);
    }
  };

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 transition-colors duration-200 gap-2">
      
      {/* Left Title & Mobile Hamburger Trigger */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Hamburger Button */}
        <button 
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent truncate">
              Dashboard Overview
            </h1>
            <span className="hidden lg:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50 shrink-0">
              <Sparkles className="w-3 h-3 animate-pulse" /> Live Tracker
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
            Monitor your career pipeline & applications.
          </p>
        </div>
      </div>

      {/* Right Action Controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          title="Toggle Theme"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="font-bold text-sm">Actionable Alerts</span>
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead} className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                    Mark all read
                  </button>
                )}
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto mt-2 space-y-1">
                {notifications.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">No new notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div 
                      key={n.id} 
                      onClick={() => handleNotificationItemClick(n)}
                      className={`py-3 px-2 rounded-xl transition-all ${n.jobRef ? 'cursor-pointer group hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40' : ''} ${n.unread ? 'bg-indigo-50/30 dark:bg-indigo-950/20' : ''}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-semibold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5 group-hover:text-indigo-600">
                          {n.unread && <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0"></span>}
                          {n.title}
                        </h5>
                        <span className="text-[10px] text-slate-400 shrink-0 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {n.time}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 pl-3.5">
                        {n.desc}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={onOpenAddModal}
          className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 text-white font-medium text-xs px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden xs:inline">Add Job</span>
        </button>

      </div>
    </header>
  );
}