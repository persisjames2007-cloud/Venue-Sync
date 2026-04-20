"use client";

import Header from "@/components/Header";
import { useAppContext } from "@/context/AppContext";

export default function NotificationsPage() {
  const { notifications } = useAppContext();

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex justify-between items-end border-b border-outline-variant/10 pb-8 mb-10">
          <div>
            <h1 className="text-5xl font-black tracking-tighter italic uppercase"><span className="text-primary">Live</span> Broadcast</h1>
            <p className="text-on-surface-variant font-medium opacity-60">Synchronized transmissions from the event command center.</p>
          </div>
          <div className="flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-2xl border border-primary/20">
             <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
             <span className="text-[10px] font-black uppercase tracking-widest text-primary">Live Sync Active</span>
          </div>
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="p-20 border border-dashed border-outline-variant/20 rounded-[48px] text-center opacity-30 flex flex-col items-center gap-4">
               <span className="material-symbols-outlined text-6xl">inbox</span>
               <p className="text-xs font-black uppercase tracking-[0.3em]">No signals detected in this sector.</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className="group bg-surface-container-low p-8 rounded-[32px] border border-outline-variant/10 flex gap-8 items-start hover:border-primary/40 transition-all hover:shadow-2xl animate-in slide-in-from-right">
                <div className={`
                  w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border
                  ${n.type === 'Emergency' ? 'bg-error text-white shadow-lg shadow-error/20 border-error' : 
                    n.type === 'Announcement' ? 'bg-primary/10 text-primary border-primary/20' : 
                    'bg-surface-container-high text-on-surface-variant border-outline-variant/20'}
                `}>
                  <span className="material-symbols-outlined text-3xl">
                    {n.type === 'Emergency' ? 'report' : n.type === 'Announcement' ? 'campaign' : n.type === 'Logistics' ? 'inventory_2' : 'notifications'}
                  </span>
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${n.type === 'Emergency' ? 'text-error' : 'text-primary opacity-60'}`}>
                      {n.type} // Transmission Code: {n.id.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-bold opacity-30">{n.time}</span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">{n.content}</h3>
                  <div className="pt-4 flex gap-3">
                    <button className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-surface-container-high rounded-xl hover:bg-primary hover:text-white transition-all">Acknowledge</button>
                    <button className="text-[10px] font-black uppercase tracking-widest px-4 py-2 opacity-40 hover:opacity-100 transition-all">Report</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Global Alert Legend */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
           {['Emergency', 'Announcement', 'Logistics', 'Community'].map(type => (
             <div key={type} className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/10 flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${type === 'Emergency' ? 'bg-error' : type === 'Announcement' ? 'bg-primary' : type === 'Logistics' ? 'bg-secondary' : 'bg-tertiary'}`}></div>
                <span className="text-[9px] font-black uppercase tracking-widest opacity-40">{type}</span>
             </div>
           ))}
        </div>
      </main>
    </div>
  );
}
