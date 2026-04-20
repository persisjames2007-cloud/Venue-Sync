"use client";

import Header from "@/components/Header";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import EventManagement from "@/components/EventManagement";

export default function AdminPage() {
  const router = useRouter();
  const { role, isEmergency, toggleEmergency, facilities, updateFacilityStatus } = useAppContext();

  if (role !== "organizer") {
    return (
      <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center justify-center p-6 text-center gap-6">
         <span className="material-symbols-outlined text-error text-6xl">lock_open</span>
         <h1 className="text-3xl font-bold">Unauthorized Access</h1>
         <p className="text-on-surface-variant max-w-sm">This terminal is restricted to Venue Sync Organizers.</p>
         <button onClick={() => router.push('/')} className="px-8 py-3 bg-surface-container-high rounded-xl font-bold">Return to Base</button>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-8">
           <div className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight">Command Center</h1>
                <p className="text-on-surface-variant italic">Operational Overview & Response Hub</p>
              </div>
              <div className={`px-4 py-2 rounded-lg border flex items-center gap-3 transition-colors ${isEmergency ? 'bg-error/20 border-error text-error' : 'bg-primary/10 border-primary text-primary'}`}>
                 <span className={`w-2 h-2 rounded-full ${isEmergency ? 'bg-error animate-ping' : 'bg-primary animate-ping'}`}></span>
                 <span className="text-xs font-bold uppercase tracking-widest">{isEmergency ? 'CRITICAL ALERT ACTIVE' : 'System Link: Active'}</span>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard label="Live Attendance" value="12,482" trend="+124 since last hour" icon="groups" />
              <StatCard label="Avg. Density" value="64%" trend="Nominal" icon="leaderboard" />
              <StatCard label="Active Alerts" value={isEmergency ? "03" : "01"} trend={isEmergency ? "Emergency Active" : "1 Urgent"} icon="notifications_active" color={isEmergency ? "error" : "primary"} />
           </div>

           <div className="bg-surface-container-low rounded-[32px] p-8 border border-outline-variant/10">
              <EventManagement />
           </div>

           <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10">
              <h3 className="text-xl font-bold mb-6">Facility Override</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {facilities.map(f => (
                   <div key={f.id} className="flex items-center justify-between p-4 bg-surface-container-high rounded-xl">
                      <div>
                        <div className="text-xs font-bold opacity-60 uppercase">{f.type}</div>
                        <div className="font-bold">{f.name}</div>
                      </div>
                      <select 
                        value={f.status}
                        onChange={(e) => updateFacilityStatus(f.id, e.target.value as any)}
                        className="bg-surface border-none rounded-lg text-xs font-bold p-2 outline-none"
                      >
                         <option value="Operational">Operational</option>
                         <option value="Maintenance">Maintenance</option>
                         <option value="Restricted">Restricted</option>
                      </select>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <aside className="lg:col-span-4 flex flex-col gap-6">
           <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 flex flex-col gap-6 sticky top-24">
              <h3 className="text-xl font-bold">Protocol Actions</h3>
              <div className="flex flex-col gap-3">
                 <button onClick={toggleEmergency} className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all active:scale-[0.98] border ${isEmergency ? 'bg-error text-white border-white' : 'bg-error/10 text-error border-error/20 shadow-xl shadow-error/10'}`}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-white/20">
                      <span className="material-symbols-outlined">report</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{isEmergency ? 'Deactivate Emergency' : 'Trigger Emergency'}</h4>
                      <p className="text-[10px] opacity-80 italic">Global broadcast & layout shift</p>
                    </div>
                 </button>
                 <ActionButton icon="broadcast_on_personal" label="Send Global Alert" sub="Standard Announcement" color="primary" />
                 <ActionButton icon="settings_input_component" label="Network Diagnostics" sub="Venue mesh status" color="secondary" />
              </div>

              <div className="mt-4 p-4 bg-surface-container-high rounded-xl border border-outline-variant/10">
                 <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-2">Venue Map Terminal</h4>
                 <div onClick={() => router.push('/map')} className="h-40 bg-surface-container-highest rounded-lg overflow-hidden relative group cursor-pointer">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuANG2d4zFnKLecAbTzQMflDHYDarlg7Zkit5bjHZcd7Z8itpbPbXRLr9LprYyDC5rz7xTP6yfzjsUjtp7dPLLbuNWCPF2C56C-I0ISCtm0J4U4vKG3RVy_5Yy2sq4B45P-47nzn0JtXHSI9YP66GVTIYZD_7EjKVDHT3wA6XLOjLFlZQPhIMjlepT-akt-VM3FkqktXmfKvLU2KFtZOha29lt-Sx5mertj2b7RkP0my5Sat8s7sJPnosGKCLHZb_WFcOZCp8xFQsQ2l" 
                      alt="Map"
                      className="w-full h-full object-cover opacity-30 contrast-125 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <span className="bg-primary text-on-primary-fixed px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">Live Feed</span>
                    </div>
                 </div>
              </div>
           </div>
        </aside>
      </main>
    </div>
  );
}

function StatCard({ label, value, trend, icon, color = 'primary' }: { label: string, value: string, trend: string, icon: string, color?: string }) {
  return (
    <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10">
       <div className="flex justify-between items-start mb-4">
          <div className={`w-10 h-10 rounded-xl bg-${color}/10 flex items-center justify-center`}>
            <span className={`material-symbols-outlined text-${color}`}>{icon}</span>
          </div>
       </div>
       <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">{label}</h4>
       <div className="text-3xl font-black mb-2 tracking-tighter">{value}</div>
       <p className={`text-[10px] font-bold ${color === 'error' ? 'text-error' : 'text-tertiary'}`}>{trend}</p>
    </div>
  );
}

function ActionButton({ icon, label, sub, color }: { icon: string, label: string, sub: string, color: string }) {
  return (
    <button className={`flex items-center gap-4 p-4 rounded-xl bg-surface-container-high border border-outline-variant/10 hover:border-${color} text-left transition-all active:scale-[0.98]`}>
       <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-${color}/10 text-${color}`}>
         <span className="material-symbols-outlined">{icon}</span>
       </div>
       <div>
          <h4 className="text-sm font-bold">{label}</h4>
          <p className="text-[10px] opacity-60 italic">{sub}</p>
       </div>
    </button>
  );
}
