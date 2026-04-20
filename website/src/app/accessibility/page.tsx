"use client";

import Header from "@/components/Header";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export default function AccessibilityPage() {
  const router = useRouter();
  const { isSimpleUI, toggleSimpleUI } = useAppContext();

  return (
    <div className={`bg-surface text-on-surface min-h-screen ${isSimpleUI ? 'simple-ui' : ''}`}>
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight">Accessibility Mode</h1>
          <p className="text-xl text-on-surface-variant">Prioritizing barrier-free navigation for all guests.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
           <AccessibleFeature 
              icon="accessible_forward" 
              title="Wheelchair-Friendly Routes" 
              desc="Highlights ramps, elevators, and wide corridors across the venue."
              cta="Activate Map Overlay"
              onClick={() => router.push('/map')}
            />
            <AccessibleFeature 
              icon="airline_seat_recline_extra" 
              title="Reserved Seating" 
              desc="Find designated sections with easy entry/exit for accessibility needs."
              cta="View Seating Map"
              onClick={() => router.push('/map')}
            />
        </div>


        <div className="bg-surface-container-high p-8 rounded-3xl border border-outline-variant/20">
           <div className="flex items-center gap-6 mb-8">
             <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
               <span className="material-symbols-outlined text-on-primary-fixed text-4xl">travel_explore</span>
             </div>
             <h2 className="text-3xl font-bold">{isSimpleUI ? "Simple UI Active" : "Simple UI Mode"}</h2>
           </div>
           <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
             {isSimpleUI 
               ? "Simple mode is currently active. The interface has been simplified for better usability." 
               : "Enable a high-contrast, large-font interface for easier reading and interaction."}
           </p>
           <button 
              onClick={toggleSimpleUI}
              className={`w-full py-6 rounded-2xl text-xl font-bold hover:scale-[1.01] transition-transform ${isSimpleUI ? 'bg-error text-white' : 'bg-primary text-on-primary-fixed'}`}
           >
             {isSimpleUI ? "Deactivate Simple Interface" : "Switch to Simple Interface"}
           </button>
        </div>
      </main>
    </div>
  );
}


function AccessibleFeature({ icon, title, desc, cta, onClick }: { icon: string, title: string, desc: string, cta: string, onClick?: () => void }) {
  return (
    <div className="bg-surface-container-low p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 glass-panel border border-outline-variant/10 group hover:border-primary/40 transition-all">
       <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary-container transition-colors">
          <span className="material-symbols-outlined text-primary text-3xl">{icon}</span>
       </div>
       <div className="flex-1 text-center md:text-left">
          <h4 className="text-xl font-bold mb-2">{title}</h4>
          <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
       </div>
       <button 
          onClick={onClick}
          className="px-6 py-3 bg-primary text-on-primary-fixed rounded-xl font-bold text-sm active:scale-95 transition-all shadow-lg shadow-primary-container/20"
        >
          {cta}
       </button>
    </div>
  );
}
