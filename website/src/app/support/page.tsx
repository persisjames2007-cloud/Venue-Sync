"use client";

import Header from "@/components/Header";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";

export default function SupportPage() {
  const { complaints, addComplaint } = useAppContext();
  const [text, setText] = useState("");
  const [type, setType] = useState("Technical Issue");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addComplaint({ 
        text, 
        type, 
        location: "Current Location" 
      });
      setText("");
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-10">
           <div>
              <h1 className="text-4xl font-extrabold tracking-tight">Support Signal</h1>
              <p className="text-on-surface-variant font-medium">Broadcast authorized tickets directly to the Tactical Hub.</p>
           </div>

           <form onSubmit={handleSubmit} className="bg-surface-container-low p-8 rounded-[32px] glass-panel border border-outline-variant/10 space-y-6 shadow-xl">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-1">Inquiry Vector</label>
                 <select 
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-surface-container-high p-4 rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm font-bold"
                 >
                    <option>Technical Issue</option>
                    <option>Facility Complaint</option>
                    <option>General Query</option>
                    <option>Lost & Found</option>
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-1">Problem Description</label>
                 <textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Briefly outline the operational variance..."
                    className="w-full bg-surface-container-high p-4 rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm font-medium h-32 resize-none"
                   />
              </div>
              <button 
                type="submit"
                className="w-full py-5 cta-gradient text-on-primary-fixed font-black uppercase text-xs tracking-[0.2em] rounded-2xl active:scale-[0.98] transition-all shadow-xl shadow-primary/20"
              >
                Launch Tactical Ticket
              </button>
           </form>

           <div className="bg-tertiary-container/5 p-8 rounded-[32px] border border-tertiary/10 flex items-center gap-6">
              <div className="w-14 h-14 bg-tertiary/20 text-tertiary rounded-2xl flex items-center justify-center shrink-0 border border-tertiary/20">
                 <span className="material-symbols-outlined text-2xl">support_agent</span>
              </div>
              <div>
                 <h4 className="font-extrabold text-lg tracking-tight">Direct Agent Uplink</h4>
                 <p className="text-xs text-on-surface-variant font-medium italic opacity-60">Avg. sync time: 04:12m</p>
              </div>
              <button className="ml-auto bg-surface-container-high px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-tertiary hover:text-white transition-all">Chat</button>
           </div>
        </div>

        <div className="space-y-8">
           <div className="flex justify-between items-end px-2">
              <h3 className="text-2xl font-black tracking-tighter uppercase italic text-primary">Live Queue</h3>
              <span className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em]">Transmission Status</span>
           </div>
           
           <div className="flex flex-col gap-4">
              {complaints.length === 0 ? (
                <div className="p-20 border border-dashed border-outline-variant/20 rounded-[40px] text-center opacity-30">
                   <span className="material-symbols-outlined text-4xl mb-2">inbox</span>
                   <p className="text-[10px] font-bold uppercase tracking-widest">No Active Vectors Found</p>
                </div>
              ) : (
                complaints.map((c) => (
                  <div key={c.id} className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/10 group animate-in slide-in-from-right">
                    <div className="flex justify-between items-center mb-4">
                       <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${c.status === 'Resolved' ? 'bg-tertiary text-white' : 'bg-primary/20 text-primary animate-pulse border border-primary/20'}`}>
                          {c.status}
                       </span>
                       <span className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">{c.time}</span>
                    </div>
                    <div className="text-[8px] font-black text-primary uppercase tracking-widest mb-1">{c.type}</div>
                    <h4 className="font-bold text-sm leading-relaxed mb-4">{c.text}</h4>
                    <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
                       <div className={`h-full transition-all duration-1000 ${c.status === 'Resolved' ? 'bg-tertiary w-full' : 'bg-primary w-1/3'}`}></div>
                    </div>
                  </div>
                ))
              )}
           </div>
        </div>
      </main>
    </div>
  );
}
