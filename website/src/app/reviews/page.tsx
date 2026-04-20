"use client";

import Header from "@/components/Header";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";

export default function ReviewsPage() {
  const { reviews, addReview, userProfile } = useAppContext();
  const [activeTab, setActiveTab] = useState("Event");
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, text: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.text.trim()) {
      addReview({
        user: userProfile.name,
        rating: newReview.rating,
        category: activeTab,
        text: newReview.text,
        time: "Just now"
      });
      setNewReview({ rating: 5, text: "" });
      setShowForm(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
           <div>
              <h1 className="text-4xl font-extrabold tracking-tight">Community Insights</h1>
              <p className="text-on-surface-variant">Your feedback fuels the next generation of event tech.</p>
           </div>
           <button 
              onClick={() => setShowForm(!showForm)}
              className="cta-gradient text-on-primary-fixed px-8 py-4 rounded-xl font-bold shadow-xl shadow-primary-container/20"
            >
             {showForm ? "Cancel Entry" : "Write a Review"}
           </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-surface-container-low p-8 rounded-2xl glass-panel border border-primary/20 animate-in zoom-in-95 duration-300">
             <h3 className="text-xl font-bold mb-6">Contributing to: {activeTab}</h3>
             <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase">Rating</label>
                   <div className="flex gap-2">
                      {[1,2,3,4,5].map(r => (
                        <button 
                          key={r} type="button" 
                          onClick={() => setNewReview({...newReview, rating: r})}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${newReview.rating >= r ? 'bg-primary text-white' : 'bg-surface-container-high'}`}
                        >
                          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                        </button>
                      ))}
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase">Your Experience</label>
                   <textarea 
                      required
                      value={newReview.text}
                      onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                      className="w-full bg-surface-container-high p-4 rounded-xl border-none outline-none h-32 resize-none"
                      placeholder={`Tell us about the ${activeTab.toLowerCase()}...`}
                   />
                </div>
                <button type="submit" className="w-full py-4 bg-primary text-on-primary-fixed font-bold rounded-xl">Post Review</button>
             </div>
          </form>
        )}

        <div className="flex gap-2 p-1 bg-surface-container-low rounded-xl w-fit">
           {["Event", "Food", "Facilities"].map((tab) => (
             <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab ? 'bg-primary text-on-primary-fixed shadow-lg' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
               {tab}
             </button>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           <div className="lg:col-span-8 flex flex-col gap-6">
              {reviews.filter(r => r.category === activeTab).map((review, i) => (
                <div key={i} className="bg-surface-container-low p-8 rounded-2xl glass-panel border border-outline-variant/10 animate-in slide-in-from-bottom duration-500">
                  <div className="flex justify-between items-center mb-4">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-primary">
                          {review.user[0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{review.user}</h4>
                          <div className="flex text-primary">
                             {[...Array(5)].map((_, i) => (
                               <span key={i} className="material-symbols-outlined text-xs" style={{ fontVariationSettings: i < review.rating ? '"FILL" 1' : '' }}>star</span>
                             ))}
                          </div>
                        </div>
                     </div>
                     <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">{review.time}</span>
                  </div>
                  <p className="text-on-surface-variant leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                </div>
              ))}
           </div>
        </div>
      </main>
    </div>
  );
}

