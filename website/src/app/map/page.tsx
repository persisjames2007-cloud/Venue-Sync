"use client";

import Header from "@/components/Header";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";

const INTERIOR_POIS = {
  "Main Stage": { coords: [40.7588, -74.0024], type: "Stage", icon: "theater_comedy" },
  "Entrance Gate": { coords: [40.7565, -73.9995], type: "Gate", icon: "login" },
  "Neon Sushi": { coords: [40.7575, -74.0035], type: "Food", icon: "restaurant" },
};

function MapContent() {
  const searchParams = useSearchParams();
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [mapType, setMapType] = useState<"roadmap" | "satellite">("roadmap");
  const [isLoaded, setIsLoaded] = useState(false);
  const [destPoint, setDestPoint] = useState<string | null>(searchParams.get("poi"));

  const userLocation: [number, number] = [40.7572, -74.0040];

  const initMap = () => {
    if (!window.L || !mapContainer.current || mapInstance.current) return;
    const L = window.L;
    
    mapInstance.current = L.map(mapContainer.current, {
      center: [40.7585, -74.0025],
      zoom: 17,
      zoomControl: false,
      attributionControl: false
    });

    const roadmapTiles = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      subdomains:['mt0','mt1','mt2','mt3']
    });

    const satelliteTiles = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      subdomains:['mt0','mt1','mt2','mt3']
    });

    window.googleLayers = { roadmapTiles, satelliteTiles };
    roadmapTiles.addTo(mapInstance.current);

    // Official Google Markers
    Object.entries(INTERIOR_POIS).forEach(([name, data]) => {
      const pin = L.divIcon({ 
        className: 'm', 
        html: `<div class="g-pin"><div class="g-pin-dot"></div></div>` 
      });
      L.marker(data.coords, { icon: pin }).addTo(mapInstance.current).on('click', () => setDestPoint(name));
    });

    // Pulse User Marker
    L.circleMarker(userLocation, { radius: 10, color: '#4285F4', fillColor: '#4285F4', fillOpacity: 0.4 }).addTo(mapInstance.current);
    L.circleMarker(userLocation, { radius: 4, color: 'white', weight: 2, fillColor: '#4285F4', fillOpacity: 1 }).addTo(mapInstance.current);

    setIsLoaded(true);
  };

  useEffect(() => {
    if (!isLoaded) return;
    const { roadmapTiles, satelliteTiles } = window.googleLayers;
    if (mapType === 'roadmap') {
      mapInstance.current.removeLayer(satelliteTiles);
      roadmapTiles.addTo(mapInstance.current);
    } else {
      mapInstance.current.removeLayer(roadmapTiles);
      satelliteTiles.addTo(mapInstance.current);
    }
  }, [mapType, isLoaded]);

  return (
    <div className="bg-[#f8f9fa] text-[#202124] min-h-screen font-google-sans flex flex-col overflow-hidden">
      <Header />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" onLoad={initMap} />
      
      <main className="flex-1 relative">
        <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
        
        {/* Google Maps Search Bar UI */}
        <div className="absolute top-6 left-6 z-[2000] w-[400px]">
           <div className="bg-white shadow-[0_2px_4px_rgba(0,0,0,0.2),0_-1px_0_rgba(0,0,0,0.02)] rounded-lg flex items-center p-1 border-b border-gray-100">
              <button className="p-3 text-gray-500 hover:text-black"><span className="material-symbols-outlined">menu</span></button>
              <input 
                 placeholder="Search Google Maps"
                 className="flex-1 px-2 py-2 outline-none text-sm font-medium text-gray-700"
              />
              <button className="p-3 text-blue-600 border-l border-gray-100"><span className="material-symbols-outlined">search</span></button>
              <button className="p-3 text-gray-400 border-l border-gray-100"><span className="material-symbols-outlined">directions</span></button>
           </div>
           
           {/* Category chips */}
           <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-none">
              {['Restaurants', 'Hotels', 'Atm', 'Parking'].map(cat => (
                <button key={cat} className="bg-white shadow-sm border border-gray-300 px-4 py-1.5 rounded-full text-xs font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
                   {cat}
                </button>
              ))}
           </div>
        </div>

        {/* Google Maps Layer Toggle */}
        <div className="absolute bottom-10 left-6 z-[2000]">
           <button 
             onClick={() => setMapType(mapType === 'roadmap' ? 'satellite' : 'roadmap')}
             className="w-16 h-16 rounded-xl border-2 border-white shadow-lg overflow-hidden relative group"
           >
              <img 
                src={mapType === 'roadmap' ? "https://maps.gstatic.com/tactile/pane/satellite-2x.png" : "https://maps.gstatic.com/tactile/pane/terrain-2x.png"} 
                className="w-full h-full object-cover transition-transform group-hover:scale-110" 
              />
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white bg-black/20 shadow-inner">
                {mapType === 'roadmap' ? 'Satellite' : 'Map'}
              </span>
           </button>
        </div>

        {/* Google Maps Right Side Controls */}
        <div className="absolute bottom-24 right-4 z-[2000] flex flex-col gap-2">
           <div className="bg-white shadow-md rounded-md flex flex-col border border-gray-100 overflow-hidden">
              <button onClick={() => mapInstance.current.zoomIn()} className="p-2 border-b border-gray-100 hover:bg-gray-100"><span className="material-symbols-outlined text-gray-600">add</span></button>
              <button onClick={() => mapInstance.current.zoomOut()} className="p-2 hover:bg-gray-100"><span className="material-symbols-outlined text-gray-600">remove</span></button>
           </div>
           
           <button className="bg-white shadow-md rounded-md p-2 border border-gray-100 hover:bg-gray-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600">my_location</span>
           </button>
        </div>

        {/* Google Bottom Branding */}
        <div className="absolute bottom-2 right-2 z-[2000] flex items-center gap-4 text-[10px] text-gray-500 font-medium bg-white/60 backdrop-blur px-2 rounded-sm shadow-sm">
           <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" className="h-4 opacity-70" />
           <span>Map data ©2026 Google</span>
           <span>Terms</span>
           <span>Privacy</span>
        </div>

      </main>

      <style jsx global>{`
        .g-pin { width: 14px; height: 14px; background: #EA4335; border: 2px solid white; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 3px rgba(0,0,0,0.3); cursor: pointer; }
        .g-pin-dot { width: 5px; height: 5px; background: #B31412; border-radius: 50%; }
        .g-pin:hover { transform: rotate(-45deg) scale(1.3); }
        .leaflet-container { height: 100% !important; background: #e5e3df !important; font-family: 'Google Sans', sans-serif !important; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

export default function GoogleMapPage() {
  return (
    <Suspense fallback={<div className="bg-[#f8f9fa] h-screen" />}>
      <MapContent />
    </Suspense>
  );
}

declare global { interface Window { L: any; googleLayers: any; } }
