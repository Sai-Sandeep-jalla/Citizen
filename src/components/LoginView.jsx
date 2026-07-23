import React, { useState } from 'react';
import { Lock, User, LogIn, Crown } from 'lucide-react';
import adminLogo from '../assets/admin_logo.png';

export default function LoginView({ onLogin }) {
  const [adminId, setAdminId] = useState('ADM-MASTER-001');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 p-6 text-white text-center border-b border-orange-500/50">
          <img 
            src={adminLogo} 
            alt="Admin Portal Emblem Logo" 
            className="w-14 h-14 rounded-2xl object-cover mx-auto shadow-lg border-2 border-orange-400 mb-3"
          />
          <h2 className="text-xl font-black text-white tracking-tight flex items-center justify-center space-x-2">
            <Crown className="w-5 h-5 text-orange-400" />
            <span>Admin Portal</span>
          </h2>
          <p className="text-xs text-blue-200 mt-1 font-medium">
            Central Administrative Monitoring & System Escalation Portal
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Admin User ID
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                required
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-xs font-bold rounded-xl pl-9 pr-3 py-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none text-blue-950"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Admin Security Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 mt-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In to Admin Portal</span>
          </button>

        </form>

      </div>
    </div>
  );
}
