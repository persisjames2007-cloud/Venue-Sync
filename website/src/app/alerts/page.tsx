"use client";

import Header from "@/components/Header";
import { useAppContext } from "@/context/AppContext";

export default function AlertsPage() {
  const { notifications } = useAppContext();

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Security & Alerts</h1>
            <p className="text-on-surface-variant">Real-time broadcast history and emergency protocols.</p>
          </div>
          <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold border border-primary/20">
             {notifications.length} Unread
          </span>
        </div>

        <div className="grid gap-4">
          {notifications.map((n) => (
            <div 
              key={n.id} 
              className={`
                bg-surface-container-low p-6 rounded-2xl border-l-8 glass-panel
                ${n.color === 'error' ? 'border-error' : n.color === 'primary' ? 'border-primary' : 'border-tertiary'}
              `}
            >
              <div className="flex justify-between items-start mb-3">
                 <div className="flex items-center gap-3">
                   <span className={`material-symbols-outlined ${n.color === 'error' ? 'text-error' : 'text-primary'}`}>
                     {n.type === 'Emergency' ? 'report' : 'notifications_active'}
                   </span>
                   <span className="font-bold text-sm uppercase tracking-widest">{n.type}</span>
                 </div>
                 <span className="text-xs text-on-surface-variant font-mono tabular-nums">{n.time}</span>
              </div>
              <p className="text-on-surface leading-relaxed">{n.content}</p>
              <div className="mt-4 flex gap-4">
                 <button className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">Mark as Read</button>
                 <button className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface">View Protocol</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
