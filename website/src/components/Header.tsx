"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { role, isEmergency, logout } = useAppContext();

  const attendeeLinks = [
    { name: "Dashboard", path: "/dashboard", icon: "dashboard" },
    { name: "Map", path: "/map", icon: "map" },
    { name: "Food", path: "/food", icon: "restaurant" },
    { name: "Facilities", path: "/facilities", icon: "info" },
    { name: "Alerts", path: "/notifications", icon: "notifications" },
    { name: "Support", path: "/support", icon: "support_agent" },
    { name: "Feedback", path: "/reviews", icon: "chat_bubble" },
  ];

  const staffLinks = [
    { name: "Ops Hub", path: "/staff", icon: "engineering" },
    { name: "Map", path: "/map", icon: "explore" },
    { name: "Facilities", path: "/facilities", icon: "room_preferences" },
    { name: "Alerts", path: "/notifications", icon: "notifications" },
  ];

  const organizerLinks = [
    { name: "Terminal", path: "/admin", icon: "terminal" },
    { name: "Create Event", path: "/admin/events", icon: "add_circle" },
    { name: "Ops Hub", path: "/staff", icon: "engineering" },
    { name: "Crowd", path: "/admin", icon: "groups" },
  ];

  let links = attendeeLinks;
  if (role === "organizer") links = organizerLinks;
  else if (role === "staff") links = staffLinks;

  return (
    <header className={`sticky top-0 z-[100] w-full border-b transition-colors duration-500 ${isEmergency ? 'bg-error-container/80 border-error/20' : 'border-outline-variant/10 bg-surface/80'} backdrop-blur-xl`}>
      {isEmergency && (
        <div className="bg-error text-on-error py-2 px-4 text-center text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
          ⚠️ Critical Alert: Emergency Mode Active - Follow Evacuation Routes ⚠️
        </div>
      )}
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-black italic">V</div>
            <span className="font-headline text-2xl font-black tracking-tighter hidden md:block">VENUE<span className="text-primary">SYNC</span></span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  pathname === link.path 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
           <Link href="/emergency" className="flex items-center gap-2 px-4 py-2 rounded-full bg-error/10 text-error text-xs font-black uppercase hover:bg-error hover:text-white transition-all">
             <span className="material-symbols-outlined text-[18px]">warning</span>
             SOS
           </Link>
           <div className="w-[1px] h-6 bg-outline-variant/30 hidden md:block mx-1"></div>
           <button 
             onClick={() => logout()}
             className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-error/10 hover:text-error transition-all"
           >
             <span className="material-symbols-outlined">power_settings_new</span>
           </button>
           <Link href="/profile" className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant/20 flex items-center justify-center overflow-hidden hover:border-primary transition-all">
             <span className="material-symbols-outlined text-on-surface-variant">person</span>
           </Link>
        </div>
      </div>
    </header>
  );
}
