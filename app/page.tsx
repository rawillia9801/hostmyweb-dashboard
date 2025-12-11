"use client";

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Send, 
  CheckCircle2, 
  Clock, 
  Globe,
  UploadCloud,
  Menu,
  X
} from 'lucide-react';

export default function ConciergeDashboard() {
  // --- STATE MANAGEMENT (The "Wizard of Oz" Logic) ---
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [requestInput, setRequestInput] = useState('');
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      role: 'ai', 
      text: 'Hello! I am your HostMyWeb Concierge. I have access to your server. What would you like to update on your site today?',
      time: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // --- HANDLERS ---
  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestInput.trim()) return;

    // 1. Add User Message
    const newUserMsg = { id: Date.now(), role: 'user', text: requestInput, time: 'Now' };
    setMessages(prev => [...prev, newUserMsg]);
    setRequestInput('');
    setIsTyping(true);

    // 2. Simulate AI "Thinking" (Wizard of Oz)
    setTimeout(() => {
      setIsTyping(false);
      const newAiMsg = { 
        id: Date.now() + 1, 
        role: 'ai', 
        text: 'I have received your request. I am generating the code updates now. You will receive a confirmation once the changes are live on the server.', 
        time: 'Now' 
      };
      setMessages(prev => [...prev, newAiMsg]);
      
      // In a real app, this is where you would trigger the API to email YOU the request.
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 font-sans overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-[#0B1120] border-r border-slate-800 transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0
        `}
      >
        <div className="flex items-center gap-3 h-16 px-6 border-b border-slate-800">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-sky-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <span className="font-bold text-slate-900">H</span>
          </div>
          <span className="font-bold text-slate-100 tracking-wide">HostMyWeb</span>
        </div>

        <nav className="p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === 'overview' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'hover:bg-slate-800 text-slate-400'}`}
          >
            <LayoutDashboard size={18} />
            <span>Overview</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('concierge')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === 'concierge' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'hover:bg-slate-800 text-slate-400'}`}
          >
            <MessageSquare size={18} />
            <span>Concierge Chat</span>
            <span className="ml-auto bg-cyan-500 text-[#020617] text-[10px] font-bold px-2 py-0.5 rounded-full">AI</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 rounded-xl hover:bg-slate-800 transition-all">
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 text-sm text-slate-500 hover:text-red-400 transition-colors">
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>


      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#020617] relative">
        
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-800 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="md:hidden text-slate-400">
              {isSidebarOpen ? <X /> : <Menu />}
            </button>
            <h1 className="text-lg font-semibold text-slate-100">
              {activeTab === 'overview' ? 'Dashboard' : 'Request Assistant'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-medium text-emerald-400">Server Online</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-cyan-400">
              CL
            </div>
          </div>
        </header>

        {/* --- TAB: OVERVIEW --- */}
        {activeTab === 'overview' && (
          <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 animate-in fade-in zoom-in-95 duration-300">
            
            {/* Site Status Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-[#0B1120] border border-slate-800 p-6 sm:p-8 shadow-xl">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Globe size={120} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-white">Your Website</h2>
                  <a href="#" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
                    example.com <span className="text-[10px]">↗</span>
                  </a>
                </div>
                <p className="text-slate-400 text-sm max-w-lg mb-6">
                  [cite_start]Hosted on North American Servers[cite: 6]. Managed by HostMyWeb Concierge.
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Status</p>
                    <p className="text-emerald-400 font-medium flex items-center gap-2 mt-1">
                      <CheckCircle2 size={14} /> Active
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">SSL</p>
                    <p className="text-emerald-400 font-medium flex items-center gap-2 mt-1">
                      <CheckCircle2 size={14} /> Secured
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Plan</p>
                    <p className="text-cyan-400 font-medium mt-1">Concierge ($10)</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Updates</p>
                    <p className="text-slate-300 font-medium mt-1">Up to date</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <div className="rounded-2xl border border-slate-800 bg-[#0B1120]/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => setActiveTab('concierge')}
                    className="w-full text-left p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-cyan-400 font-medium text-sm">Request Site Update</p>
                      <p className="text-cyan-400/60 text-xs">Text update, new photo, hours change</p>
                    </div>
                    <MessageSquare size={18} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                  </button>

                  <button className="w-full text-left p-3 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-between group">
                    <div>
                      <p className="text-slate-300 font-medium text-sm">Upload Files</p>
                      <p className="text-slate-500 text-xs">Send images or documents to us</p>
                    </div>
                    <UploadCloud size={18} className="text-slate-400 group-hover:text-white transition-colors" />
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="rounded-2xl border border-slate-800 bg-[#0B1120]/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="mt-1"><CheckCircle2 size={16} className="text-emerald-500" /></div>
                    <div>
                      <p className="text-sm text-slate-300">Site Maintenance Completed</p>
                      <p className="text-xs text-slate-500">Yesterday, 2:00 PM</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="mt-1"><Clock size={16} className="text-slate-500" /></div>
                    <div>
                      <p className="text-sm text-slate-300">Weekly Backup Created</p>
                      <p className="text-xs text-slate-500">Dec 08, 4:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB: CONCIERGE CHAT --- */}
        {activeTab === 'concierge' && (
          <div className="flex-1 flex flex-col animate-in slide-in-from-bottom-4 duration-300">
            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`
                    max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed shadow-md
                    ${msg.role === 'user' 
                      ? 'bg-cyan-600 text-white rounded-tr-none' 
                      : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'}
                  `}>
                    <p>{msg.text}</p>
                    <p className={`text-[10px] mt-2 opacity-50 ${msg.role === 'user' ? 'text-cyan-100' : 'text-slate-400'}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-none p-4 flex gap-1">
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#020617] border-t border-slate-800">
              <form onSubmit={handleSendRequest} className="relative max-w-4xl mx-auto">
                <input
                  type="text"
                  value={requestInput}
                  onChange={(e) => setRequestInput(e.target.value)}
                  placeholder="Describe the update (e.g., 'Change my hours to 9-5')"
                  className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-sm rounded-xl pl-4 pr-12 py-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-2xl"
                />
                <button 
                  type="submit"
                  disabled={!requestInput.trim()}
                  className="absolute right-2 top-2 p-2 bg-cyan-500 text-slate-950 rounded-lg hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={18} />
                </button>
              </form>
              <p className="text-center text-[10px] text-slate-500 mt-2">
                Your request is handled by a human operator assisted by AI.
              </p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
} 