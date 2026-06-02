import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Activity, User, Shield } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-sec-dark bg-grid-pattern relative overflow-hidden font-sans text-white">
      {/* Background Glows */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sec-green rounded-full blur-[128px] opacity-10"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sec-green rounded-full blur-[128px] opacity-10"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/10 bg-sec-dark/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-sec-green" />
            <span className="text-2xl font-bold tracking-tighter text-white">
              SEC<span className="text-sec-green">opilot</span> Dashboard
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 mr-4 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <User size={16} className="text-sec-green" />
              <span className="text-sm font-medium">{user?.username || user?.email || 'Analyst'}</span>
            </div>
            <button 
              onClick={logout}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-sec-red/50 hover:bg-sec-red hover:text-white text-sec-red rounded-lg transition-all shadow-[0_0_10px_rgba(239,68,68,0.1)] hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16">
        <div className="bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 flex items-start gap-6">
          <div className="p-4 bg-emerald-500/10 rounded-full">
            <Shield className="w-12 h-12 text-sec-green" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Protected Route Accessed Successfully!</h1>
            <p className="text-gray-400 text-lg">
              You are currently authenticated as <strong className="text-white">{user?.email}</strong>. 
              If you reload this page, the <code className="bg-black/50 px-2 py-1 rounded text-sec-green">AuthContext</code> will silently refresh your session in the background using your HTTP-only cookie.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h3 className="text-xl font-bold mb-2 text-white">Agentic RAG Status</h3>
            <p className="text-gray-400">Offline. Ready to be integrated in the next phase.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h3 className="text-xl font-bold mb-2 text-white">Analyzed Filings</h3>
            <p className="text-gray-400">0 Total. Search for a ticker to begin analysis.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h3 className="text-xl font-bold mb-2 text-white">Session Security</h3>
            <p className="text-gray-400">Secured via short-lived JWTs and 64-byte rolling refresh tokens.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
