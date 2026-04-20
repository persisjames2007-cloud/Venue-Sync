"use client";

import Header from "@/components/Header";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";

export default function FacilitiesPage() {
  const { facilities } = useAppContext();

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-10">
        <div className="flex justify-between items-end border-b border-outline-variant/10 pb-8">
          <div>
            <h1 className="text-5xl font-black tracking-tighter">Facility <span className="text-primary">Monitor</span></h1>
            <p className="text-on-surface-variant font-medium italic">Real-time status, occupancy levels, and maintenance updates.</p>
          </div>
          <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-2xl border border-outline-variant/10">
             <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
             <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Fleet Healthy</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {facilities.map((f) => (
            <div key={f.id} className="bg-surface-container-low p-8 rounded-[32px] border border-outline-variant/10 flex items-start gap-8 group hover:border-primary/40 transition-all hover:shadow-2xl">
              <div className={`
                w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 border
                ${f.status === 'Operational' ? 'bg-primary/5 border-primary/20 text-primary shadow-lg shadow-primary/5' : 'bg-surface-container-high border-outline-variant/20 text-on-surface-variant opacity-40'}
              `}>
                <span className="material-symbols-outlined text-4xl">
                  {f.type === 'Venue' ? 'stadium' : f.type === 'Dining' ? 'restaurant' : 'transit_enterexit'}
                </span>
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-black text-xl tracking-tight">{f.name}</h3>
                  <div className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border ${
                    f.status === 'Operational' ? 'bg-primary/10 text-primary border-primary/20' : 
                    f.status === 'Maintenance' ? 'bg-tertiary/10 text-tertiary border-tertiary/20' : 
                    'bg-error/10 text-error border-error/20'
                  }`}>
                    {f.status}
                  </div>
                </div>
                
                <div className="flex flex-col gap-1">
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-30">{f.type} // {f.location}</p>
                   {f.status === 'Operational' && (
                     <div className="flex items-center gap-3">
                        <div className="flex-1 h-1 bg-surface-container-high rounded-full overflow-hidden">
                           <div className="h-full bg-primary" style={{ width: `${f.load}%` }} />
                        </div>
                        <span className="text-[10px] font-bold text-primary">{f.load}% LOAD</span>
                     </div>
                   )}
                </div>

                <div className="flex gap-4 pt-2">
                  <Link 
                    href={`/map?poi=${encodeURIComponent(f.name)}`}
                    className="bg-surface-container-high px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-on-primary-fixed transition-all border border-outline-variant/10"
                  >
                    Locate on Mesh
                  </Link>
                  <button className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">report_problem</span> Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 p-10 rounded-[40px] border border-primary/10 flex items-center gap-10 shadow-inner">
           <div className="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center shrink-0 border border-primary/20">
             <span className="material-symbols-outlined text-3xl">psychology</span>
           </div>
           <div>
             <h4 className="font-black text-2xl tracking-tighter mb-2">Predictive <span className="text-primary">Load Management</span></h4>
             <p className="text-sm text-on-surface-variant font-medium leading-relaxed max-w-2xl opacity-80 italic">Sector Analysis: Washroom B occupancy is projected to diminish within 12 minutes. System suggests utilizing Restroom A (8% load) for immediate access.</p>
           </div>
           <button className="ml-auto bg-primary text-on-primary-fixed px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all">Optimize Route</button>
        </div>
      </main>
    </div>
  );
}
