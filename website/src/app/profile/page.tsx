"use client";

import Header from "@/components/Header";
import { useAppContext } from "@/context/AppContext";

export default function ProfilePage() {
  const { userProfile, role } = useAppContext();

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-12">
        <div className="flex flex-col md:flex-row items-center gap-8 bg-surface-container-low p-10 rounded-3xl border border-outline-variant/10 glass-panel">
           <div className="w-32 h-32 rounded-full cta-gradient p-1">
              <div className="bg-surface w-full h-full rounded-full flex items-center justify-center overflow-hidden">
                 <span className="material-symbols-outlined text-6xl text-primary">person</span>
              </div>
           </div>
           <div className="flex-1 text-center md:text-left space-y-2">
              <h1 className="text-4xl font-extrabold tracking-tight">{userProfile.name}</h1>
              <p className="text-primary font-bold uppercase tracking-widest text-sm flex items-center justify-center md:justify-start gap-2">
                 <span className="material-symbols-outlined text-sm">verified</span>
                 Tier: Platinum {role === 'organizer' ? 'Organizer' : 'Attendee'}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-4 text-on-surface-variant font-medium text-sm">
                 <div className="flex items-center gap-2">
                   <span className="material-symbols-outlined text-xs">alternate_email</span>
                   {userProfile.email}
                 </div>
                 <div className="flex items-center gap-2">
                   <span className="material-symbols-outlined text-xs">call</span>
                   {userProfile.phone}
                 </div>
              </div>
           </div>
           <button className="px-6 py-3 bg-surface-container-high rounded-xl font-bold border border-outline-variant/10 hover:bg-surface-bright transition-colors text-sm">
              Edit Metadata
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-6">
              <h3 className="text-2xl font-bold tracking-tight px-2">{role === 'organizer' ? 'Security Clearance' : 'Access Credentials'}</h3>
              <div className={`${role === 'organizer' ? 'bg-error/5 border-error/20' : 'bg-primary/5 border-primary/20'} p-6 rounded-2xl border space-y-4`}>
                 {role === 'organizer' ? (
                    <div className="space-y-4">
                       <div className="bg-surface p-4 rounded-xl border border-outline-variant/10 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <span className="material-symbols-outlined text-error">admin_panel_settings</span>
                             <div>
                                <h4 className="font-bold text-sm">Full Venue Access</h4>
                                <p className="text-[10px] opacity-60">Level 4 Admin Clearance</p>
                             </div>
                          </div>
                       </div>
                       <div className="bg-surface p-4 rounded-xl border border-outline-variant/10 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <span className="material-symbols-outlined text-error">broadcast_on_home</span>
                             <div>
                                <h4 className="font-bold text-sm">Broadcast Authority</h4>
                                <p className="text-[10px] opacity-60">Global Notification Rights</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 ) : (
                    <>
                    {[...Array(userProfile.tickets)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between bg-surface p-4 rounded-xl border border-outline-variant/10 group">
                           <div className="flex items-center gap-4">
                              <span className="material-symbols-outlined text-primary">confirmation_number</span>
                              <div>
                                 <h4 className="font-bold text-sm">Digital Ticket #00{i+1}</h4>
                                 <p className="text-[10px] opacity-60">General Admission • Hall A Access</p>
                              </div>
                           </div>
                           <button className="text-primary material-symbols-outlined group-hover:scale-110 transition-transform">qr_code_2</button>
                        </div>
                     ))}
                     </>
                 )}
              </div>
           </div>


           <div className="space-y-6">
              <h3 className="text-2xl font-bold tracking-tight px-2">Sync Preferences</h3>
              <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 space-y-4">
                 <PreferenceToggle label="High Contrast Mode" icon="contrast" />
                 <PreferenceToggle label="Push Notifications" icon="notifications_active" active />
                 <PreferenceToggle label="Biometric Access" icon="fingerprint" active />
                 <PreferenceToggle label="Shared Heatmap Data" icon="query_stats" />
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

function PreferenceToggle({ label, icon, active }: { label: string, icon: string, active?: boolean }) {
  return (
    <div className="flex items-center justify-between p-2">
       <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-on-surface-variant text-lg">{icon}</span>
          <span className="text-sm font-medium">{label}</span>
       </div>
       <div className={`w-12 h-6 rounded-full relative transition-colors ${active ? 'bg-primary' : 'bg-surface-container-highest'}`}>
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'left-7' : 'left-1'}`}></div>
       </div>
    </div>
  );
}
