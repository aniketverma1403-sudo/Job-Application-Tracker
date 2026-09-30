import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import StatCard from './components/common/StatCard';
import AddJobModal from './components/AddJobModal';
import ApplicationTable from './components/ApplicationTable';
import SearchFilterBar from './components/SearchFilterBar';
import KanbanBoard from './components/KanbanBoard';
import ApplicationDetailModal from './components/ApplicationDetailModal';
import LoadingSpinner from './components/common/LoadingSpinner';
import SettingsView from './components/SettingsView';
import AuthModal from './components/AuthModal';
import { initialJobs } from './data/mockJobs';
import { Briefcase, TrendingUp, CheckCircle2, XCircle, Table, Kanban, AlertCircle } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('jobtrack_dark_mode');
      return savedTheme ? JSON.parse(savedTheme) : false;
    } catch {
      return false;
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const session = localStorage.getItem('jobtrack_session');
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  
  // Mobile Sidebar Drawer State
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedJobs = localStorage.getItem('jobtrack_applications');
        setJobs(savedJobs ? JSON.parse(savedJobs) : initialJobs);
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load your job applications from storage.");
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('jobtrack_applications', JSON.stringify(jobs));
      } catch (err) {
        console.error("Error saving data:", err);
        setError("Failed to save changes to storage.");
      }
    }
  }, [jobs, isLoading]);

  useEffect(() => {
    try {
      localStorage.setItem('jobtrack_dark_mode', JSON.stringify(darkMode));
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (err) {
      console.error("Theme error:", err);
    }
  }, [darkMode]);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('jobtrack_session', JSON.stringify(user));
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out of your workspace?')) {
      setCurrentUser(null);
      localStorage.removeItem('jobtrack_session');
    }
  };

  const handleAddJob = (newJob) => {
    setJobs([newJob, ...jobs]);
  };

  const handleDeleteJob = (id) => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, status: newStatus } : job));
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setIsDetailModalOpen(true);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
  };

  // Derived Metrics
  const totalApplications = jobs.length;
  const interviewCount = jobs.filter(j => j.status === 'Interview').length;
  const offerCount = jobs.filter(j => j.status === 'Offer').length;
  const rejectedCount = jobs.filter(j => j.status === 'Rejected').length;

  // Filter & Sort Logic
  const filteredAndSortedJobs = jobs
    .filter(job => {
      const matchesSearch = job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            job.position.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.applicationDate) - new Date(a.applicationDate);
      if (sortBy === 'date-asc') return new Date(a.applicationDate) - new Date(b.applicationDate);
      if (sortBy === 'company-asc') return a.company.localeCompare(b.company);
      return 0;
    });

  if (!currentUser) {
    return <AuthModal onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex transition-colors duration-200">
      
      {/* Sidebar with Mobile Drawer support */}
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        onLogout={handleLogout} 
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Navbar 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          onOpenAddModal={() => setIsModalOpen(true)} 
          jobs={jobs}
          onViewJob={handleViewJob}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6 sm:space-y-8">
          
          {error && (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-2xl flex items-center gap-3 text-rose-700 dark:text-rose-300">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div className="text-sm font-medium">{error}</div>
            </div>
          )}

          {isLoading ? (
            <LoadingSpinner text="Loading your career pipeline..." />
          ) : (
            <>
              {/* 1. DASHBOARD VIEW */}
              {activeSection === 'dashboard' && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    <StatCard title="Total Applications" value={totalApplications} icon={Briefcase} trend="+12% this mo" trendColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400" />
                    <StatCard title="Interviews Active" value={interviewCount} icon={TrendingUp} trend="In Progress" trendColor="bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400" />
                    <StatCard title="Offers Received" value={offerCount} icon={CheckCircle2} trend="Success" trendColor="bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400" />
                    <StatCard title="Rejected / Closed" value={rejectedCount} icon={XCircle} />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base sm:text-lg font-bold">Recent Applications Overview</h3>
                      <button 
                        onClick={() => setActiveSection('applications')}
                        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        View all records →
                      </button>
                    </div>
                    <ApplicationTable 
                      jobs={filteredAndSortedJobs.slice(0, 3)} 
                      allJobsCount={jobs.length}
                      onDeleteJob={handleDeleteJob} 
                      onStatusChange={handleStatusChange} 
                      onViewJob={handleViewJob}
                      onResetFilters={handleResetFilters}
                    />
                  </div>
                </div>
              )}

              {/* 2. APPLICATIONS TABLE VIEW */}
              {activeSection === 'applications' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold">All Applications Database</h3>
                    <p className="text-xs text-slate-400">Search, filter and manage your complete job search history.</p>
                  </div>

                  <SearchFilterBar 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                  />

                  <ApplicationTable 
                    jobs={filteredAndSortedJobs} 
                    allJobsCount={jobs.length}
                    onDeleteJob={handleDeleteJob} 
                    onStatusChange={handleStatusChange} 
                    onViewJob={handleViewJob}
                    onResetFilters={handleResetFilters}
                  />
                </div>
              )}

              {/* 3. KANBAN BOARD VIEW */}
              {activeSection === 'kanban' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold">Kanban Pipeline Board</h3>
                    <p className="text-xs text-slate-400">Visual stage-by-stage progression of your job hunt.</p>
                  </div>

                  <KanbanBoard 
                    jobs={filteredAndSortedJobs} 
                    onDeleteJob={handleDeleteJob} 
                    onStatusChange={handleStatusChange} 
                    onViewJob={handleViewJob}
                  />
                </div>
              )}

              {/* 4. SETTINGS VIEW */}
              {activeSection === 'settings' && (
                <div className="animate-in fade-in duration-200">
                  <SettingsView jobsCount={jobs.length} />
                </div>
              )}
            </>
          )}

        </main>
      </div>

      {/* Modals */}
     <AddJobModal 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)} 
  onAddJob={handleAddJob} 
  existingJobs={jobs} // <-- Pass this so duplication check works!
/>

      <ApplicationDetailModal 
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        job={selectedJob}
        onDelete={handleDeleteJob}
      />

    </div>
  );
}