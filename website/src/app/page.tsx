"use client";

import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { role, setRole, login, register, isLoggedIn } = useAppContext();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Form states
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnecting(true);
    setError("");
    
    // Allow for UI transition
    await new Promise(res => setTimeout(res, 800));

    if (isSignup) {
      const success = await register({ userId, password, email, name, phone, role });
      if (success) {
        setIsSignup(false);
        setIsConnecting(false);
        alert("Account created successfully! Use your new UserID to log in.");
      } else {
        setError("Identifier Collision: This User ID is already registered in the synchronized database.");
        setIsConnecting(false);
      }
    } else {
      const success = await login(userId, password);
      if (success) {
        router.push("/dashboard");
      } else {
        setError("Access Denied: Invalid UserID or Password.");
        setIsConnecting(false);
      }
    }
  };

  return (
    <main className="grid lg:grid-cols-2 min-h-screen bg-surface">
      {/* Left: Branding */}
      <section className="hidden lg:flex flex-col justify-between p-12 bg-surface-container-lowest relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img className="w-full h-full object-cover" alt="map" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp9keT5LO--LxcnqrU__ptZ_k2h-vxfNVjTgT5lPF0t6ZIpryxY6_2pv50j7FuhCGt6kdjfNFXvW4n1sRznXGTVCKidw5PgykCQzyd9OurU_L3FBOjHu5hVWbImUn1DbK_Ap2eB-61l1UKtXnsGrwSMPRasAUoPgOlqAL57ILQ-CBsYd1zSbiD912fJVs9l-dnmFAg5ZdALYpwiuqCuH3fpO4RCz78AV4zoNFZ45t2KyJ9JITvhdWQestkBGJrzewC0eOGuoJL7fBk" />
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 cta-gradient rounded flex items-center justify-center">
            <span className="material-symbols-outlined text-white">explore</span>
          </div>
          <span className="font-headline text-2xl font-black text-primary">VenueSync</span>
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl font-black tracking-tight leading-none mb-6">Forge the <span className="text-primary italic">Live</span> Experience.</h1>
          <p className="text-on-surface-variant text-lg max-w-sm">The decentralized operating system for global event orchestration.</p>
        </div>
      </section>

      {/* Right: Auth */}
      <section className="flex flex-col justify-center items-center p-8 lg:p-24 bg-surface max-w-xl mx-auto w-full">
        <div className="w-full space-y-8 animate-in slide-in-from-bottom duration-500">
           <div className="space-y-2">
             <h2 className="text-3xl font-bold tracking-tight">{isSignup ? 'Register New Link' : 'Secure Uplink'}</h2>
             <p className="text-on-surface-variant">
               {isSignup ? 'Create your unique identifier and protocol password.' : 'Enter your credentials to access the venue terminal.'}
             </p>
           </div>

           <div className="p-1 bg-surface-container-low rounded-xl flex">
              <button 
                onClick={() => setRole("attendee")}
                className={`flex-1 py-3 rounded-lg text-xs font-bold transition-all ${role === 'attendee' ? 'bg-surface-container-high text-primary shadow-lg' : 'text-on-surface-variant'}`}
              >
                Attendee
              </button>
              <button 
                onClick={() => setRole("staff")}
                className={`flex-1 py-3 rounded-lg text-xs font-bold transition-all ${role === 'staff' ? 'bg-surface-container-high text-primary shadow-lg' : 'text-on-surface-variant'}`}
              >
                Staff
              </button>
              <button 
                onClick={() => setRole("organizer")}
                className={`flex-1 py-3 rounded-lg text-xs font-bold transition-all ${role === 'organizer' ? 'bg-surface-container-high text-primary shadow-lg' : 'text-on-surface-variant'}`}
              >
                Organizer
              </button>
           </div>

           <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">User ID</label>
                    <input 
                      required
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="w-full bg-surface-container-high p-4 rounded-xl outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium"
                      placeholder="Your unique ID"
                     />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Protocol Password</label>
                    <input 
                      required
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-surface-container-high p-4 rounded-xl outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium"
                      placeholder="••••••••"
                     />
                 </div>
                 {isSignup && (
                    <>
                      <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Full Name</label>
                          <input 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-surface-container-high p-4 rounded-xl outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium"
                            placeholder="Enter your name"
                          />
                      </div>
                      <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Email Archive</label>
                          <input 
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-surface-container-high p-4 rounded-xl outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium"
                            placeholder="name@domain.com"
                          />
                      </div>
                    </>
                 )}
              </div>

              {error && <p className="text-error text-xs font-bold animate-shake">{error}</p>}

              <button 
                disabled={isConnecting}
                type="submit"
                className="w-full py-4 cta-gradient text-on-primary-fixed font-bold rounded-xl active:scale-95 transition-all shadow-xl shadow-primary/10 flex items-center justify-center gap-3"
              >
                {isConnecting ? (
                  <><span className="animate-spin material-symbols-outlined">sync</span> Processing...</>
                ) : (
                  isSignup ? "Create Connection" : "Initiate Terminal"
                )}
              </button>
           </form>

           <div className="text-center">
              <button 
                onClick={() => setIsSignup(!isSignup)}
                className="text-sm font-bold text-primary hover:underline"
              >
                {isSignup ? "Already registered? Login here" : "No account? Register now"}
              </button>
           </div>
        </div>
      </section>
      
      {/* Network status toast */}
      <div className="fixed bottom-6 right-6 p-4 glass-panel rounded-xl border border-outline-variant/20 shadow-2xl flex items-center gap-4 animate-in slide-in-from-right">
         <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
           <span className="material-symbols-outlined text-primary text-sm">security</span>
         </div>
         <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Network: Encrypted</div>
      </div>
    </main>
  );
}
