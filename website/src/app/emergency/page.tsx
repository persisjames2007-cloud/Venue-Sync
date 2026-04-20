"use client";

import Header from "@/components/Header";
import { useRouter } from "next/navigation";

export default function EmergencyPage() {
  const router = useRouter();

  return (
    <div className="bg-[#1a0000] text-white min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-12">
        <div className="p-8 bg-error/10 border-2 border-error rounded-3xl animate-pulse">
           <h1 className="text-5xl font-black uppercase tracking-tighter text-error mb-4">CRISIS PROTOCOL</h1>
           <p className="text-xl font-bold opacity-80">Immediate evacuation routes for Sector 4 & 5. Follow the illuminated floor markers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <AlertCard icon="stairs" label="Nearest Exit" value="120 meters" color="error" />
           <AlertCard icon="medical_services" label="First Aid" value="Stall B-12" color="primary" />
           <AlertCard icon="local_fire_department" label="Fire Panel" value="Hall A North" color="secondary" />
        </div>

        <button 
          onClick={() => router.push('/map')}
          className="w-full py-10 bg-error text-white text-3xl font-black rounded-3xl hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-error/40 flex items-center justify-center gap-6"
        >
           <span className="material-symbols-outlined text-5xl">directions_run</span>
           BEGIN EXIT SEQUENCE
        </button>

        <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-6">
           <h3 className="text-xl font-bold">Safe Zones</h3>
           {[1,2,3].map(i => (
             <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">{i}</div>
                   <span className="font-bold">West Perimeter Gathering Point {i}</span>
                </div>
                <button onClick={() => router.push('/map')} className="text-xs font-bold border-b border-white hover:opacity-100 opacity-60">Visualize</button>
             </div>
           ))}
        </div>
      </main>
    </div>
  );
}

function AlertCard({ icon, label, value, color }: { icon: string, label: string, value: string, color: string }) {
  return (
    <div className={`p-6 rounded-2xl border bg-white/5 border-${color}/20 text-center`}>
       <span className={`material-symbols-outlined text-3xl text-${color} mb-2`}>{icon}</span>
       <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">{label}</div>
       <div className="text-xl font-black">{value}</div>
    </div>
  );
}
