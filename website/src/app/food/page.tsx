"use client";

import Header from "@/components/Header";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { useState } from "react";

export default function FoodPage() {
  const { addOrder, addNotification } = useAppContext();
  const [activeVendor, setActiveVendor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [orderedItem, setOrderedItem] = useState<string | null>(null);

  const vendors = [
    { name: "Neon Sushi", cuisine: "Japanese Fusion", time: "15-20 min", rating: "4.9", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAp9keT5LO--LxcnqrU__ptZ_k2h-vxfNVjTgT5lPF0t6ZIpryxY6_2pv50j7FuhCGt6kdjfNFXvW4n1sRznXGTVCKidw5PgykCQzyd9OurU_L3FBOjHu5hVWbImUn1DbK_Ap2eB-61l1UKtXnsGrwSMPRasAUoPgOlqAL57ILQ-CBsYd1zSbiD912fJVs9l-dnmFAg5ZdALYpwiuqCuH3fpO4RCz78AV4zoNFZ45t2KyJ9JITvhdWQestkBGJrzewC0eOGuoJL7fBk" },
    { name: "Burger Protocol", cuisine: "American Tactical", time: "10-15 min", rating: "4.7", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuANG2d4zFnKLecAbTzQMflDHYDarlg7Zkit5bjHZcd7Z8itpbPbXRLr9LprYyDC5rz7xTP6yfzjsUjtp7dPLLbuNWCPF2C56C-I0ISCtm0J4U4vKG3RVy_5Yy2sq4B45P-47nzn0JtXHSI9YP66GVTIYZD_7EjKVDHT3wA6XLOjLFlZQPhIMjlepT-akt-VM3FkqktXmfKvLU2KFtZOha29lt-Sx5mertj2b7RkP0my5Sat8s7sJPnosGKCLHZb_WFcOZCp8xFQsQ2l" },
    { name: "Greens Unit", cuisine: "Organic Logistics", time: "5-10 min", rating: "4.8", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAp9keT5LO--LxcnqrU__ptZ_k2h-vxfNVjTgT5lPF0t6ZIpryxY6_2pv50j7FuhCGt6kdjfNFXvW4n1sRznXGTVCKidw5PgykCQzyd9OurU_L3FBOjHu5hVWbImUn1DbK_Ap2eB-61l1UKtXnsGrwSMPRasAUoPgOlqAL57ILQ-CBsYd1zSbiD912fJVs9l-dnmFAg5ZdALYpwiuqCuH3fpO4RCz78AV4zoNFZ45t2KyJ9JITvhdWQestkBGJrzewC0eOGuoJL7fBk" },
  ];

  const handleOrder = (vendorName: string) => {
    setLoading(true);
    setActiveVendor(vendorName);
    
    // Process Order
    setTimeout(() => {
      addOrder({
        item: vendorName,
        quantity: 1,
        location: "Section 7-B (Main Hall)"
      });
      setLoading(false);
      setOrderedItem(vendorName);
      
      addNotification({
        type: "Logistics",
        time: "Just Now",
        content: `Order for ${vendorName} received. Tracking in Ops Hub.`,
        color: "primary",
      });

      // Reset UI state after 4 seconds
      setTimeout(() => {
        setOrderedItem(null);
        setActiveVendor(null);
      }, 4000);
    }, 1500);
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col gap-2 mb-12">
           <h1 className="text-5xl font-black tracking-tight uppercase">Food <span className="text-primary">Logistics</span></h1>
           <p className="text-on-surface-variant font-medium text-lg italic">Nutritional fuel for maximum performance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors.map((vendor) => (
            <div key={vendor.name} className="group bg-surface-container-low rounded-[40px] border border-outline-variant/10 overflow-hidden hover:border-primary/40 transition-all duration-500 shadow-xl hover:shadow-primary/5">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={vendor.image} 
                  alt={vendor.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 grayscale group-hover:grayscale-0" 
                />
                <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black tracking-widest text-primary border border-primary/20">
                   {vendor.time}
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-black">{vendor.name}</h3>
                    <p className="text-xs font-bold opacity-50 uppercase tracking-widest">{vendor.cuisine}</p>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="text-xs font-black">{vendor.rating}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    disabled={loading || orderedItem === vendor.name}
                    onClick={() => handleOrder(vendor.name)}
                    className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                      orderedItem === vendor.name 
                        ? 'bg-tertiary text-on-tertiary-fixed' 
                        : 'cta-gradient text-on-primary-fixed active:scale-95'
                    }`}
                  >
                    {loading && activeVendor === vendor.name ? (
                      <><span className="animate-spin material-symbols-outlined text-sm">sync</span> Processing...</>
                    ) : orderedItem === vendor.name ? (
                      <><span className="material-symbols-outlined text-sm">check_circle</span> Order Routed</>
                    ) : "Initialize Order"}
                  </button>
                  <Link 
                    href={`/map?poi=${encodeURIComponent(vendor.name)}`}
                    className="w-full py-4 border border-outline-variant/30 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-center hover:bg-surface-container-high transition-all"
                  >
                    Locate on Tactical Map
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {orderedItem && (
         <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-surface-container-highest border border-primary/20 p-6 rounded-3xl shadow-2xl animate-in slide-in-from-bottom duration-500 flex items-center gap-6 max-w-md w-full mx-auto z-50">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
               <span className="material-symbols-outlined animate-bounce">local_shipping</span>
            </div>
            <div className="flex-1">
               <h4 className="font-black text-sm uppercase tracking-tight">Order Sync Successful</h4>
               <p className="text-xs opacity-60 italic">Your request is being fulfilled by the logistics team.</p>
            </div>
         </div>
      )}
    </div>
  );
}
