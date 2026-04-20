"use client";

import Header from "@/components/Header";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StaffPage() {
  const { role, isLoggedIn, orders, updateOrderStatus, complaints, resolveComplaint } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn || (role !== 'staff' && role !== 'organizer')) {
      router.push("/");
    }
  }, [isLoggedIn, role, router]);

  if (!isLoggedIn || (role !== 'staff' && role !== 'organizer')) return null;

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12 flex flex-col gap-8">
          <div className="flex justify-between items-end border-b border-outline-variant/10 pb-6">
            <div>
              <h1 className="text-5xl font-black tracking-tighter">Staff <span className="text-primary">Operations</span></h1>
              <p className="text-on-surface-variant italic font-medium">Real-time attendee request fulfillment & synchronized resolution.</p>
            </div>
            <div className="flex gap-4">
               <div className="px-6 py-3 bg-primary/10 rounded-2xl border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse inline-block mr-2"></span>
                  Active Uplink: Terminal 4
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Orders Section */}
            <section className="space-y-6">
               <div className="flex justify-between items-center px-2">
                  <h3 className="text-2xl font-black flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">restaurant</span>
                    Food Fulfillment
                  </h3>
                  <span className="px-3 py-1 bg-surface-container-high rounded-full text-[10px] font-black opacity-60 tracking-widest">{orders.length} QUEUED</span>
               </div>
               
               <div className="space-y-4">
                  {orders.length === 0 ? (
                    <div className="p-20 bg-surface-container-low rounded-[40px] border border-dashed border-outline-variant/20 text-center opacity-40">
                       <span className="material-symbols-outlined text-4xl mb-2">inventory_2</span>
                       <p className="text-[10px] font-black uppercase tracking-widest">No pending transmissions.</p>
                    </div>
                  ) : (
                    orders.map(order => (
                      <div key={order.id} className="bg-surface-container-low p-8 rounded-[32px] border border-outline-variant/10 flex flex-col gap-6 group hover:border-primary/30 transition-all hover:shadow-2xl">
                         <div className="flex justify-between items-start">
                            <div className="space-y-1">
                               <div className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Order Segment #{order.id.slice(0,4)}</div>
                               <h4 className="text-2xl font-black tracking-tight">{order.item} <span className="text-sm opacity-40">x{order.quantity}</span></h4>
                            </div>
                            <div className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest border ${
                               order.status === 'Preparing' ? 'bg-primary/10 text-primary border-primary/20' : 
                               order.status === 'Ready' ? 'bg-tertiary/10 text-tertiary border-tertiary/20' : 'bg-surface-container-highest opacity-50'
                            }`}>
                               {order.status.toUpperCase()}
                            </div>
                         </div>
                         <div className="flex items-center gap-6 text-[10px] font-bold opacity-50 uppercase tracking-widest">
                            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">person</span>{order.user}</span>
                            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">location_on</span>{order.location}</span>
                            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">schedule</span>{order.time}</span>
                         </div>
                         <div className="flex gap-4">
                            {order.status === 'Preparing' && (
                              <button onClick={() => updateOrderStatus(order.id, 'Ready')} className="flex-1 py-4 bg-primary text-on-primary-fixed rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">Mark Ready</button>
                            )}
                            {order.status === 'Ready' && (
                              <button onClick={() => updateOrderStatus(order.id, 'Delivered')} className="flex-1 py-4 bg-tertiary text-on-tertiary-fixed rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-tertiary/20 hover:scale-[1.02] transition-all">Confirm Delivery</button>
                            )}
                            <button className="px-6 py-4 bg-surface-container-high rounded-2xl text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-all">Details</button>
                         </div>
                      </div>
                    ))
                  )}
               </div>
            </section>

            {/* Complaints Section */}
            <section className="space-y-6">
               <div className="flex justify-between items-center px-2">
                  <h3 className="text-2xl font-black flex items-center gap-3">
                    <span className="material-symbols-outlined text-error">warning</span>
                    Support Tickets
                  </h3>
                  <span className="px-3 py-1 bg-surface-container-high rounded-full text-[10px] font-black opacity-60 tracking-widest">
                    {complaints.filter(c => c.status !== 'Resolved').length} CRITICAL
                  </span>
               </div>

               <div className="space-y-4">
                  {complaints.length === 0 ? (
                    <div className="p-20 bg-surface-container-low rounded-[40px] border border-dashed border-outline-variant/20 text-center opacity-40">
                       <span className="material-symbols-outlined text-4xl mb-2">checklist</span>
                       <p className="text-[10px] font-black uppercase tracking-widest">Queue Clear.</p>
                    </div>
                  ) : (
                    complaints.map(complaint => (
                      <div key={complaint.id} className="bg-surface-container-low p-8 rounded-[32px] border border-outline-variant/10 space-y-6 hover:shadow-2xl transition-all">
                         <div className="flex justify-between items-start">
                            <div className="space-y-1">
                               <div className="text-[9px] font-black text-error uppercase tracking-[0.2em]">{complaint.type}</div>
                               <h4 className="text-xl font-bold tracking-tight leading-snug">{complaint.text}</h4>
                            </div>
                            <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border ${
                               complaint.status === 'Pending' ? 'bg-error/10 text-error border-error/20' :
                               complaint.status === 'In Progress' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-tertiary/10 text-tertiary border-tertiary/20'
                            }`}>
                              {complaint.status}
                            </span>
                         </div>
                         <div className="flex justify-between items-center">
                            <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest italic flex items-center gap-2">
                               <span className="material-symbols-outlined text-sm">location_on</span>
                               {complaint.location} // Submitted {complaint.time}
                            </p>
                            <div className="flex gap-2">
                               {complaint.status === 'Pending' && (
                                  <button onClick={() => resolveComplaint(complaint.id, 'In Progress')} className="px-6 py-3 bg-primary/10 text-primary border border-primary/20 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Assign</button>
                               )}
                               {complaint.status === 'In Progress' && (
                                  <button onClick={() => resolveComplaint(complaint.id, 'Resolved')} className="px-6 py-3 bg-tertiary/10 text-tertiary border border-tertiary/20 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-tertiary hover:text-white transition-all">Resolve</button>
                               )}
                               <button className="p-3 bg-surface-container-high rounded-xl hover:text-primary transition-all"><span className="material-symbols-outlined text-sm">more_horiz</span></button>
                            </div>
                         </div>
                      </div>
                    ))
                  )}
               </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
