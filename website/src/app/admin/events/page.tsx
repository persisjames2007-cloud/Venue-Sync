"use client";

import Header from "@/components/Header";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ComprehensiveEventPage() {
  const { role, isLoggedIn, events, addEvent } = useAppContext();
  const router = useRouter();
  const [isPreview, setIsPreview] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "2026-04-18",
    time: "10:00",
    endTime: "12:00",
    venue: "",
    capacity: 100,
    category: "Technology",
    type: "Free" as "Free" | "Paid",
    price: 0,
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800",
    sessions: [{ title: "", time: "" }],
    zones: [] as string[]
  });

  const availableZones = ["Main Arena", "Exhibitor Hall", "Networking Lounge", "Vip Sector", "Workshop Wing"];

  useEffect(() => {
    if (!isLoggedIn || role !== 'organizer') {
      router.push("/");
    }
  }, [isLoggedIn, role, router]);

  if (!isLoggedIn || role !== 'organizer') return null;

  const handleAddSession = () => {
    setFormData({ ...formData, sessions: [...formData.sessions, { title: "", time: "" }] });
  };

  const handleSessionChange = (index: number, field: string, value: string) => {
    const newSessions = [...formData.sessions];
    newSessions[index] = { ...newSessions[index], [field]: value };
    setFormData({ ...formData, sessions: newSessions });
  };

  const toggleZone = (zone: string) => {
    const newZones = formData.zones.includes(zone) 
      ? formData.zones.filter(z => z !== zone) 
      : [...formData.zones, zone];
    setFormData({ ...formData, zones: newZones });
  };

  const validate = () => {
    if (!formData.name || !formData.venue || !formData.description) {
      alert("Encryption Error: All core metadata fields are required.");
      return false;
    }
    return true;
  };

  const handlePublish = () => {
    if (!validate()) return;
    addEvent({
      ...formData,
      status: "Active"
    });
    router.push("/admin");
  };

  if (isPreview) {
    return (
      <div className="bg-surface text-on-surface min-h-screen">
        <Header />
        <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
           <div className="flex justify-between items-center bg-surface-container-high p-6 rounded-3xl border border-primary/20">
              <h2 className="text-xl font-black uppercase tracking-widest text-primary">Preview Mode</h2>
              <button onClick={() => setIsPreview(false)} className="px-6 py-2 bg-surface text-xs font-bold rounded-xl">Return to Editor</button>
           </div>
           
           <div className="bg-surface-container-low rounded-[40px] overflow-hidden border border-outline-variant/10 shadow-2xl">
              <div className="h-80 relative">
                 <img src={formData.imageUrl} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0d] via-transparent" />
                 <div className="absolute bottom-8 left-8 right-8">
                    <span className="bg-primary/20 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-primary border border-primary/20 mb-4 inline-block">
                       {formData.category} // {formData.type}
                    </span>
                    <h1 className="text-5xl font-black tracking-tighter text-white">{formData.name}</h1>
                 </div>
              </div>
              <div className="p-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
                 <div className="lg:col-span-8 space-y-8">
                    <div className="space-y-4">
                       <h3 className="text-xl font-bold">About the Session</h3>
                       <p className="text-on-surface-variant leading-relaxed italic">{formData.description}</p>
                    </div>
                    <div className="space-y-4">
                       <h3 className="text-xl font-bold">Synchronized Schedule</h3>
                       <div className="space-y-3">
                          {formData.sessions.map((s, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-surface-container-high rounded-2xl border border-outline-variant/10">
                               <div className="text-primary font-black text-xs">{s.time}</div>
                               <div className="font-bold text-sm">{s.title || "Session Detail Pending"}</div>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
                 <div className="lg:col-span-4 space-y-6">
                    <div className="bg-surface-container-high p-6 rounded-3xl border border-outline-variant/10 space-y-4">
                       <div className="flex justify-between items-center text-xs font-bold uppercase opacity-50">
                          <span>Capacity</span>
                          <span>{formData.capacity} slots</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-xs font-bold uppercase">Pricing</span>
                          <span className="text-2xl font-black text-primary">{formData.type === 'Free' ? 'FREE' : `$${formData.price}`}</span>
                       </div>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase opacity-50 px-2 tracking-widest">Authorized Zones</label>
                       <div className="flex flex-wrap gap-2">
                          {formData.zones.map(z => (
                             <span key={z} className="px-3 py-1 bg-surface-container-highest rounded-lg text-[10px] font-bold border border-outline-variant/10">{z}</span>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           </div>
           
           <button onClick={handlePublish} className="w-full py-6 cta-gradient text-on-primary-fixed font-black uppercase text-sm tracking-[0.3em] rounded-3xl shadow-xl shadow-primary/30 active:scale-[0.98] transition-all">
              Confirm & Publish Broadcast
           </button>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-12 border-b border-outline-variant/10 pb-8">
          <div>
            <h1 className="text-5xl font-black tracking-tighter">Event <span className="text-primary">Architect</span></h1>
            <p className="text-on-surface-variant italic font-medium">Design deep-engagement experiences with full logistical control.</p>
          </div>
          <button onClick={() => setIsPreview(true)} className="px-8 py-3 bg-primary/10 text-primary border border-primary/20 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
             Preview Deployment
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
             {/* Section 1: Identity */}
             <section className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-1 bg-primary rounded-full"></div>
                   <h2 className="text-xl font-black uppercase tracking-wider">01. Identity & Narrative</h2>
                </div>
                <div className="grid grid-cols-1 gap-6">
                   <div className="space-y-2">
                     <label className="text-xs font-black uppercase tracking-widest opacity-50 ml-2">Event Title</label>
                     <input 
                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                        placeholder="Define the session identifier..."
                        className="w-full bg-surface-container-low p-5 rounded-3xl outline-none border border-outline-variant/10 focus:border-primary transition-all text-lg font-bold"
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-black uppercase tracking-widest opacity-50 ml-2">Narrative Description</label>
                     <textarea 
                        value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                        placeholder="What is the mission of this event?"
                        className="w-full bg-surface-container-low p-5 rounded-3xl outline-none border border-outline-variant/10 focus:border-primary transition-all text-sm font-medium h-40 resize-none"
                     />
                   </div>
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest opacity-50 ml-2">Banner Asset URL</label>
                        <input 
                          value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                          placeholder="Link to tactical imagery..."
                          className="w-full bg-surface-container-low p-5 rounded-3xl border border-outline-variant/10 text-xs font-mono"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest opacity-50 ml-2">Sector Classification</label>
                        <select 
                          value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                          className="w-full bg-surface-container-low p-5 rounded-3xl border border-outline-variant/10 text-sm font-bold outline-none"
                        >
                           <option>Technology</option>
                           <option>Innovation</option>
                           <option>Logistics</option>
                           <option>Community</option>
                           <option>Keynote</option>
                        </select>
                      </div>
                   </div>
                </div>
             </section>

             {/* Section 2: Logistics */}
             <section className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-1 bg-primary rounded-full"></div>
                   <h2 className="text-xl font-black uppercase tracking-wider">02. Spatiotemporal Config</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                   <FormInput label="Deployment Date" type="date" value={formData.date} onChange={v => setFormData({...formData, date: v})} />
                   <FormInput label="Sync Start" type="time" value={formData.time} onChange={v => setFormData({...formData, time: v})} />
                   <FormInput label="Sync End" type="time" value={formData.endTime} onChange={v => setFormData({...formData, endTime: v})} />
                   <FormInput label="Venue ID" type="text" placeholder="e.g. Hall Alpha" value={formData.venue} onChange={v => setFormData({...formData, venue: v})} />
                </div>

                <div className="bg-surface-container-low p-8 rounded-[40px] border border-outline-variant/10 space-y-6">
                   <h3 className="font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-primary">view_timeline</span>
                      Module Sessions
                   </h3>
                   <div className="space-y-4">
                      {formData.sessions.map((s, i) => (
                        <div key={i} className="flex gap-4">
                           <input 
                              placeholder="Session Title" value={s.title} onChange={e => handleSessionChange(i, 'title', e.target.value)}
                              className="flex-1 bg-surface-container-high p-4 rounded-2xl text-xs font-bold outline-none"
                           />
                           <input 
                              placeholder="00:00" value={s.time} onChange={e => handleSessionChange(i, 'time', e.target.value)}
                              className="w-32 bg-surface-container-high p-4 rounded-2xl text-xs font-bold outline-none"
                           />
                        </div>
                      ))}
                      <button onClick={handleAddSession} className="text-[10px] font-black uppercase text-primary tracking-widest ml-2">+ Append Session</button>
                   </div>
                </div>
             </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
             {/* Section 3: Economy */}
             <section className="bg-surface-container-low p-8 rounded-[40px] border border-outline-variant/10 space-y-8">
                <h3 className="font-black uppercase tracking-widest text-xs opacity-50">Operational Economy</h3>
                <div className="flex gap-4 p-1 bg-surface-container-high rounded-2xl">
                   <button 
                      onClick={() => setFormData({...formData, type: 'Free', price: 0})}
                      className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.type === 'Free' ? 'bg-primary text-white' : 'opacity-40'}`}
                   >
                     Free Pass
                   </button>
                   <button 
                      onClick={() => setFormData({...formData, type: 'Paid'})}
                      className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.type === 'Paid' ? 'bg-primary text-white' : 'opacity-40'}`}
                   >
                     Paid Access
                   </button>
                </div>

                {formData.type === 'Paid' && (
                  <div className="space-y-2 animate-in slide-in-from-top duration-300">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50 px-2">Access Price (USD)</label>
                    <input 
                      type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                      className="w-full bg-surface-container-high p-5 rounded-3xl text-2xl font-black outline-none border border-outline-variant/20 focus:border-primary"
                    />
                  </div>
                )}

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest opacity-50 px-2">Unit Capacity</label>
                   <input 
                      type="number" value={formData.capacity} onChange={e => setFormData({...formData, capacity: Number(e.target.value)})}
                      className="w-full bg-surface-container-high p-5 rounded-3xl text-2xl font-black outline-none border border-outline-variant/20"
                   />
                </div>
             </section>

             {/* Section 4: Zoning */}
             <section className="bg-surface-container-low p-8 rounded-[40px] border border-outline-variant/10 space-y-6">
                <h3 className="font-black uppercase tracking-widest text-xs opacity-50">Zoning Protocol</h3>
                <div className="space-y-3">
                   {availableZones.map(zone => (
                     <button 
                        key={zone} 
                        onClick={() => toggleZone(zone)}
                        className={`w-full flex justify-between items-center p-4 rounded-2xl border transition-all ${
                          formData.zones.includes(zone) ? 'bg-primary/10 border-primary text-primary' : 'bg-surface border-outline-variant/10 opacity-60'
                        }`}
                     >
                        <span className="text-xs font-bold">{zone}</span>
                        {formData.zones.includes(zone) && <span className="material-symbols-outlined text-sm">check_circle</span>}
                     </button>
                   ))}
                </div>
             </section>

             <button onClick={handlePublish} className="w-full py-6 cta-gradient text-on-primary-fixed font-black uppercase text-sm tracking-[0.3em] rounded-3xl shadow-xl shadow-primary/30 active:scale-[0.98] transition-all">
                Publish Event
             </button>
          </aside>
        </div>
      </main>
    </div>
  );
}

function FormInput({ label, type, value, onChange, placeholder }: { label: string, type: string, value: any, onChange: (v: any) => void, placeholder?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-2">{label}</label>
      <input 
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-surface-container-low p-4 rounded-2xl border border-outline-variant/10 focus:border-primary outline-none text-sm font-bold transition-all"
      />
    </div>
  );
}
