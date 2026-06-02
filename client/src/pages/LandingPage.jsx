import React from 'react';
import { TrendingUp, TrendingDown, Activity, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-sec-dark bg-grid-pattern relative overflow-hidden font-sans">
      
      {/* Abstract Background Graph Lines */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg viewBox="0 0 1000 500" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,400 L100,380 L200,420 L300,300 L400,320 L500,200 L600,250 L700,100 L800,150 L900,50 L1000,80" 
                fill="none" stroke="#10B981" strokeWidth="4" className="drop-shadow-lg" />
          <path d="M0,450 L150,400 L250,430 L350,350 L450,380 L550,280 L650,300 L750,200 L850,250 L1000,150" 
                fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
        </svg>
        {/* Glow Effects */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sec-green rounded-full blur-[128px] opacity-10"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-sec-red rounded-full blur-[128px] opacity-10"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/10 bg-sec-dark/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-sec-green" />
            <span className="text-2xl font-bold tracking-tighter text-white">
              SEC<span className="text-sec-green">opilot</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Log in
            </Link>
            <Link to="/register" className="px-5 py-2.5 text-sm font-medium bg-sec-green hover:bg-emerald-400 text-sec-darker rounded-lg transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]">
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-sec-green animate-pulse"></span>
          AI-Powered Financial Analyst
        </div>
        
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-8">
          Decode Wall Street with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sec-green to-emerald-300">
            Agentic Precision
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-12 leading-relaxed">
          Instantly analyze SEC 10-K filings, uncover hidden risks, and track year-over-year trends using advanced autonomous AI. 
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/register" className="w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-white text-sec-darker hover:bg-gray-100 rounded-xl transition-all shadow-lg hover:-translate-y-1 text-center">
            Create an Account
          </Link>
          <Link to="/login" className="w-full sm:w-auto px-8 py-4 text-lg font-semibold border border-white/20 hover:bg-white/5 rounded-xl transition-all hover:-translate-y-1 text-center">
            Sign In
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-32 text-left">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.05] transition-colors">
            <TrendingUp className="w-10 h-10 text-sec-green mb-4" />
            <h3 className="text-xl font-bold mb-2">Deep Financial Context</h3>
            <p className="text-gray-400">Lock into a single company's annual report for pinpoint accuracy without hallucinations.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.05] transition-colors">
            <Zap className="w-10 h-10 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Instant Retrieval</h3>
            <p className="text-gray-400">Powered by LangGraph and vector search to find the exact paragraph you need in milliseconds.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.05] transition-colors">
            <Shield className="w-10 h-10 text-sec-red mb-4" />
            <h3 className="text-xl font-bold mb-2">Risk Detection</h3>
            <p className="text-gray-400">Automatically highlight shifting risk factors and legal proceedings from previous years.</p>
          </div>
        </div>
      </main>
      
    </div>
  );
}

export default LandingPage;
