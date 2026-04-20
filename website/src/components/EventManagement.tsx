"use client";

import { useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

export default function EventManagement() {
  const { events, addEvent, updateEvent, deleteEvent } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    endTime: "",
    venue: "",
    capacity: 100,
    category: "Technology",
    price: 0,
    type: "Free" as "Free" | "Paid",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800",
    status: "Draft" as "Active" | "Draft" | "Completed",
    layoutUrl: "",
    points: [] as { id: string; name: string; type: "Emergency" | "Gate" | "Stall" | "Food Court" | "Washroom"; location: string }[]
  });

  const [pointName, setPointName] = useState("");
  const [pointType, setPointType] = useState<"Emergency" | "Gate" | "Stall" | "Food Court" | "Washroom">("Gate");
  const [pointLocation, setPointLocation] = useState("");

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      date: "",
      time: "",
      endTime: "",
      venue: "",
      capacity: 100,
      category: "Technology",
      price: 0,
      type: "Free",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800",
      status: "Draft",
      layoutUrl: "",
      points: []
    });
    setEditingId(null);
    setIsAdding(false);
  };

  const handleEdit = (event: typeof events[0]) => {
    setFormData({
      ...event,
      points: event.points || [],
      layoutUrl: event.layoutUrl || "",
    });
    setEditingId(event.id);
    setIsAdding(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateEvent(editingId, formData);
    } else {
      addEvent({ ...formData, sessions: [] });
    }
    resetForm();
  };

  const addPoint = () => {
    if (pointName && pointLocation) {
      const newPoint = {
        id: Math.random().toString(36).substr(2, 9),
        name: pointName,
        type: pointType,
        location: pointLocation
      };
      setFormData(prev => ({ ...prev, points: [...prev.points, newPoint] }));
      setPointName(""); setPointLocation("");
    }
  };

  const removePoint = (id: string) => {
    setFormData(prev => ({ ...prev, points: prev.points.filter((p) => p.id !== id) }));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold tracking-tight">Managed Events</h3>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 bg-primary text-on-primary-fixed rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">{isAdding ? 'close' : 'add'}</span>
          {isAdding ? 'Cancel' : 'Create New Event'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-surface-container-high p-8 rounded-3xl border border-outline-variant/10 space-y-6 animate-in slide-in-from-top duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Event Name</label>
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-surface p-4 rounded-xl outline-none border border-outline-variant/20 focus:border-primary" placeholder="Cyber Summit 2026" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Category</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-surface p-4 rounded-xl outline-none border border-outline-variant/20 focus:border-primary">
                <option>Technology</option>
                <option>Music</option>
                <option>Business</option>
                <option>Health</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Date</label>
              <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-surface p-4 rounded-xl outline-none border border-outline-variant/20 focus:border-primary" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Start Time</label>
                <input required value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full bg-surface p-4 rounded-xl outline-none border border-outline-variant/20 focus:border-primary" placeholder="09:00 AM" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">End Time</label>
                <input required value={formData.endTime} onChange={e => setFormData({...formData, endTime: e.target.value})} className="w-full bg-surface p-4 rounded-xl outline-none border border-outline-variant/20 focus:border-primary" placeholder="05:00 PM" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Venue Name</label>
              <input required value={formData.venue} onChange={e => setFormData({...formData, venue: e.target.value})} className="w-full bg-surface p-4 rounded-xl outline-none border border-outline-variant/20 focus:border-primary" placeholder="Grand Hall A" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Venue Layout URL</label>
              <input value={formData.layoutUrl} onChange={e => setFormData({...formData, layoutUrl: e.target.value})} className="w-full bg-surface p-4 rounded-xl outline-none border border-outline-variant/20 focus:border-primary" placeholder="https://maps.com/layout.jpg" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Description</label>
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-surface p-4 rounded-xl outline-none border border-outline-variant/20 focus:border-primary h-24" placeholder="Event details..." />
          </div>

          {/* Points Management */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Venue Points (Gates, Stalls, etc.)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <input value={pointName} onChange={e => setPointName(e.target.value)} placeholder="Point Name" className="bg-surface p-3 rounded-lg text-xs" />
              <select value={pointType} onChange={e => setPointType(e.target.value as "Emergency" | "Gate" | "Stall" | "Food Court" | "Washroom")} className="bg-surface p-3 rounded-lg text-xs">
                <option>Gate</option>
                <option>Stall</option>
                <option>Food Court</option>
                <option>Washroom</option>
                <option>Emergency</option>
              </select>
              <input value={pointLocation} onChange={e => setPointLocation(e.target.value)} placeholder="Location Info" className="bg-surface p-3 rounded-lg text-xs" />
              <button type="button" onClick={addPoint} className="bg-surface-container-highest p-3 rounded-lg text-[10px] font-bold uppercase">Add Point</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {formData.points.map((p) => (
                <div key={p.id} className="bg-surface p-2 px-3 rounded-full border border-outline-variant/30 flex items-center gap-2 text-[10px] font-medium">
                  <span className="opacity-60">{p.type}:</span> {p.name}
                  <button type="button" onClick={() => removePoint(p.id)} className="material-symbols-outlined text-xs text-error">close</button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-outline-variant/10">
             <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.status === 'Active'} onChange={e => setFormData({...formData, status: e.target.checked ? 'Active' : 'Draft'})} className="w-4 h-4 accent-primary" />
                  <span className="text-xs font-bold uppercase tracking-widest">Publish Immediately</span>
                </label>
             </div>
             <div className="flex gap-4">
                <button type="button" onClick={resetForm} className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-surface transition-all">Discard</button>
                <button type="submit" className="px-10 py-3 bg-primary text-on-primary-fixed rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-primary/20">
                  {editingId ? 'Update Event' : 'Broadcast Event'}
                </button>
             </div>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 gap-4">
        {events.length === 0 ? (
          <div className="p-12 text-center bg-surface-container-low rounded-[32px] border border-dashed border-outline-variant/40">
            <p className="text-on-surface-variant font-medium">No events registered in the terminal yet.</p>
          </div>
        ) : (
          events.map(event => (
            <div key={event.id} className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6 group">
              <div className="flex gap-6 items-center">
                <div className="w-16 h-16 relative rounded-2xl bg-surface-container-high overflow-hidden border border-outline-variant/10">
                  <Image src={event.imageUrl} alt="" fill className="object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${event.status === 'Active' ? 'bg-primary/20 text-primary' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                      {event.status}
                    </span>
                    <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{event.category}</span>
                  </div>
                  <h4 className="text-xl font-black">{event.name}</h4>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{event.date} • {event.time} • {event.venue}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(event)} className="p-3 rounded-xl bg-surface-container-high hover:bg-primary/10 hover:text-primary transition-all">
                  <span className="material-symbols-outlined text-sm">edit</span>
                </button>
                <button 
                  onClick={() => updateEvent(event.id, { status: event.status === 'Active' ? 'Draft' : 'Active' })}
                  className={`p-3 rounded-xl transition-all ${event.status === 'Active' ? 'bg-surface-container-high text-on-surface-variant' : 'bg-primary/10 text-primary'}`}
                >
                  <span className="material-symbols-outlined text-sm">{event.status === 'Active' ? 'visibility_off' : 'visibility'}</span>
                </button>
                <button onClick={() => deleteEvent(event.id)} className="p-3 rounded-xl bg-surface-container-high hover:bg-error/10 hover:text-error transition-all">
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
