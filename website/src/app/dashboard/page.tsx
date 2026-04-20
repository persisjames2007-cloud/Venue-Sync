"use client";

import Header from "@/components/Header";
import { useAppContext } from "@/context/AppContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { notifications, role, userProfile, isEmergency, events, isLoggedIn, registerForEvent, registeredEventIds } = useAppContext();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showPass, setShowPass] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [isLoggedIn, router]);

  const activeEvents = events.filter(e => e.status === "Active");
  const registeredEvents = events.filter(e => registeredEventIds.includes(e.id));

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Hero Welcome */}
          <section className="relative overflow-hidden bg-surface-container-low p-8 rounded-[40px] border border-outline-variant/10 shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <span className="material-symbols-outlined text-9xl">sync</span>
            </div>
            <div className="relative z-10 flex justify-between items-start">
              <div className="space-y-4">
                 <h1 className="text-4xl font-extrabold tracking-tight">Welcome back, <span className="text-primary">{userProfile.name}</span></h1>
                 <p className="text-on-surface-variant max-w-md">Your Venue Sync uplink is established. {registeredEvents.length} events registered in your pass archive.</p>
                 <div className="flex gap-4 pt-4">
                    <button onClick={() => router.push('/map')} className="cta-gradient text-on-primary-fixed px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined">near_me</span> Navigate Venue
                    </button>
                    <button onClick={() => router.push('/facilities')} className="bg-surface-container-high px-6 py-3 rounded-xl font-bold hover:bg-surface-bright transition-all border border-outline-variant/10">
                      Find Facilities
                    </button>
                 </div>
              </div>
            </div>
          </section>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickStat icon="nest_clock_farsight_analog" label="Current Time" value={currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} />
            <QuickStat icon="confirmation_number" label="My Tickets" value={registeredEvents.length.toString()} />
            <QuickStat icon="wifi" label="Signal" value="Ultra-Low" />
            <QuickStat icon="security" label="Auth Status" value="Verified" />
          </div>

          {/* Registered Events / Passes */}
          {registeredEvents.length > 0 && (
            <section className="space-y-6">
               <h3 className="text-2xl font-bold tracking-tight text-primary px-2">Your Event Passes</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {registeredEvents.map(event => (
                    <div key={event.id} className="bg-surface-container-high p-6 rounded-[32px] border border-outline-variant/10 flex flex-col justify-between gap-4">
                       <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">qr_code_2</span>
                          </div>
                          <div>
                            <h4 className="font-black text-lg leading-tight">{event.name}</h4>
                            <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">{event.venue}</p>
                          </div>
                       </div>
                       <button 
                        onClick={() => setShowPass(event.id)}
                        className="w-full py-3 bg-primary text-on-primary-fixed rounded-xl font-bold text-xs uppercase tracking-widest"
                       >
                         View Digital Pass
                       </button>
                    </div>
                  ))}
               </div>
            </section>
          )}

          {/* Available Events */}
          <section className="space-y-6">
            <div className="flex justify-between items-end px-2">
              <h3 className="text-2xl font-bold tracking-tight text-primary">Discover Events</h3>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Filter: All Access</p>
            </div>
            <div className="space-y-4">
              {activeEvents.length === 0 ? (
                <div className="bg-surface-container-low p-12 rounded-[32px] border border-outline-variant/10 text-center space-y-4">
                   <span className="material-symbols-outlined text-5xl opacity-20">event_busy</span>
                   <p className="text-on-surface-variant font-bold uppercase tracking-widest text-xs">No Active Events Found</p>
                   <p className="text-sm opacity-60 max-w-xs mx-auto text-on-surface-variant">Check back later for new broadcasted sessions from the organizer terminal.</p>
                </div>
              ) : (
                activeEvents.map((event) => (
                  <div key={event.id} className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-primary/40 transition-all">
                    <div className="flex gap-6 items-center">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex flex-col items-center justify-center text-primary border border-primary/20 shrink-0 overflow-hidden">
                         <img src={event.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-primary/20 text-primary text-[8px] font-black uppercase tracking-widest rounded-full">{event.category}</span>
                          <span className="px-2 py-0.5 bg-surface-container-highest text-[8px] font-black uppercase tracking-widest rounded-full">{event.type}</span>
                        </div>
                        <h4 className="text-xl font-black mb-1 group-hover:text-primary transition-colors">{event.name}</h4>
                        <div className="flex flex-wrap gap-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                          <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">schedule</span>{event.time}</span>
                          <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">location_on</span>{event.venue}</span>
                        </div>
                      </div>
                    </div>
                    {registeredEventIds.includes(event.id) ? (
                      <div className="px-6 py-3 bg-primary/10 text-primary rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">check_circle</span> Registered
                      </div>
                    ) : (
                      <button 
                        onClick={() => registerForEvent(event.id)}
                        className="px-6 py-3 bg-surface-container-high rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-on-primary-fixed transition-all"
                      >
                        Join Event
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4 flex flex-col gap-8">
          {/* Notifications Panel */}
          <section className="bg-surface-container-low border border-outline-variant/10 rounded-[40px] p-6 flex flex-col gap-6">
            <h3 className="text-xl font-bold tracking-tight">Live Updates</h3>
            <div className="flex flex-col gap-4">
              {notifications.slice(0, 5).map((n) => (
                <div key={n.id} className="flex gap-4 p-4 rounded-2xl bg-surface-container-high border border-outline-variant/10 animate-in slide-in-from-right">
                  <div className={`w-1 h-8 rounded-full bg-${n.color}`} />
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className={`text-[9px] font-black uppercase text-${n.color}`}>{n.type}</span>
                      <span className="text-[9px] opacity-40">{n.time}</span>
                    </div>
                    <p className="text-xs font-medium leading-relaxed">{n.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Emergency Alert Quick Access */}
          {isEmergency && (
            <div className="bg-error p-6 rounded-[40px] text-on-error space-y-4 animate-pulse shadow-2xl shadow-error/40 ring-4 ring-error/20">
               <div className="flex items-center gap-3">
                 <span className="material-symbols-outlined">report</span>
                 <h4 className="font-extrabold uppercase tracking-widest text-sm">Emergency Mode Active</h4>
               </div>
               <p className="text-xs font-medium animate-bounce">Click here for evacuation maps and emergency contact links.</p>
               <button onClick={() => router.push('/emergency')} className="w-full py-3 bg-white text-error rounded-xl font-black text-xs uppercase tracking-widest">Open SOS Terminal</button>
            </div>
          )}
        </aside>
      </main>

      {/* Digital Pass Modal */}
      {showPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-surface p-8 rounded-[48px] max-w-lg w-full relative border border-outline-variant/20 shadow-2xl animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <button onClick={() => setShowPass(null)} className="absolute top-6 right-6 p-2 hover:bg-surface-container-high rounded-full transition-all z-10">
                <span className="material-symbols-outlined">close</span>
              </button>
              
              <div className="space-y-8">
                <div className="text-center space-y-4">
                   <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                        <span className="material-symbols-outlined text-3xl">confirmation_number</span>
                      </div>
                      <h2 className="text-2xl font-black tracking-tight">Official Event Pass</h2>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Validated by VenueSync Tactical Terminal</p>
                   </div>
                   
                   <div className="p-6 bg-white rounded-3xl inline-flex items-center justify-center border-4 border-surface-container-high">
                      <div className="w-40 h-40 bg-black grid grid-cols-8 grid-rows-8 gap-1 p-2">
                         {Array.from({ length: 64 }).map((_, i) => (
                           <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'}`} />
                         ))}
                      </div>
                   </div>

                   <div className="space-y-1">
                      <div className="text-2xl font-black text-primary">{events.find(e => e.id === showPass)?.name}</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">{userProfile.name} • ID: {userProfile.uid}</div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-surface-container-high p-4 rounded-2xl">
                      <p className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-1">Venue & Timing</p>
                      <p className="text-xs font-bold">{events.find(e => e.id === showPass)?.venue}</p>
                      <p className="text-[10px] opacity-60">{events.find(e => e.id === showPass)?.time}</p>
                   </div>
                   <div className="bg-surface-container-high p-4 rounded-2xl">
                      <p className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-1">Access Level</p>
                      <p className="text-xs font-bold">Full Access</p>
                      <p className="text-[10px] opacity-60">Zone: Alpha-1</p>
                   </div>
                </div>

                {/* Venue Points */}
                {events.find(e => e.id === showPass)?.points && (events.find(e => e.id === showPass)?.points?.length ?? 0) > 0 && (
                  <div className="space-y-3">
                     <h4 className="text-[10px] font-black uppercase tracking-widest text-primary px-1">Tactical Venue Points</h4>
                     <div className="grid grid-cols-1 gap-2">
                        {events.find(e => e.id === showPass)?.points?.map((p: any) => (
                          <div key={p.id} className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl border border-outline-variant/10">
                             <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-sm opacity-60">
                                  {p.type === 'Gate' ? 'door_open' : p.type === 'Stall' ? 'storefront' : p.type === 'Food Court' ? 'restaurant' : p.type === 'Washroom' ? 'wc' : 'report'}
                                </span>
                                <span className="text-xs font-bold">{p.name}</span>
                             </div>
                             <span className="text-[10px] opacity-40 uppercase font-black">{p.location}</span>
                          </div>
                        ))}
                     </div>
                  </div>
                )}

                <div className="pt-6 border-t border-outline-variant/10 text-center">
                   <p className="text-[9px] font-medium text-on-surface-variant italic max-w-xs mx-auto">
                      Present this terminal uplink at any gate scanner. Encryption key expires at end of session.
                   </p>
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

function QuickStat({ icon, label, value }: { icon: string, label: string, value: string }) {
  return (
    <div className="bg-surface-container-low p-4 rounded-3xl border border-outline-variant/10 flex items-center gap-4">
       <div className="w-10 h-10 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
       </div>
       <div>
          <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest leading-none mb-1">{label}</p>
          <p className="text-sm font-black tracking-tight">{value}</p>
       </div>
    </div>
  );
}
