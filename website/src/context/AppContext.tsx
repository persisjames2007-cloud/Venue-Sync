"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { firebaseAuth, firestore, firebaseMessaging, crashlytics, googleAnalytics } from "@/lib/firebase";

type Role = "attendee" | "organizer" | "staff";

interface Order {
  id: string;
  item: string;
  quantity: number;
  location: string;
  status: "Preparing" | "Ready" | "Delivered";
  time: string;
  user: string;
}

interface Complaint {
  id: string;
  user: string;
  location: string;
  type: string;
  text: string;
  status: "Pending" | "In Progress" | "Resolved";
  time: string;
}

interface Facility {
  id: string;
  name: string;
  type: string;
  location: string;
  status: "Operational" | "Maintenance" | "Restricted";
  load: number;
}

interface Notification {
  id: string;
  type: "Announcement" | "Potential Delay" | "Logistics" | "Community" | "Emergency";
  content: string;
  time: string;
  color: "primary" | "error" | "tertiary" | "secondary";
}

interface VenuePoint {
  id: string;
  name: string;
  type: "Gate" | "Stall" | "Food Court" | "Washroom" | "Emergency";
  location: string;
}

interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  endTime: string;
  venue: string;
  capacity: number;
  category: string;
  price: number;
  type: "Free" | "Paid";
  imageUrl: string;
  status: "Active" | "Draft" | "Completed";
  sessions: { title: string; time: string }[];
  zones?: string[];
  layoutUrl?: string;
  points?: VenuePoint[];
}

interface User {
  userId: string;
  password: string;
  email: string;
  phone: string;
  role: Role;
  name: string;
}

interface Review {
  user: string;
  rating: number;
  category: string;
  text: string;
  time: string;
}

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  isLoggedIn: boolean;
  login: (userId: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (user: User) => Promise<boolean>;
  events: Event[];
  addEvent: (event: Omit<Event, "id">) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  registeredEventIds: string[];
  registerForEvent: (eventId: string) => void;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id">) => void;
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "time" | "status" | "user">) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  complaints: Complaint[];
  addComplaint: (complaint: Omit<Complaint, "id" | "time" | "status" | "user">) => void;
  resolveComplaint: (id: string, status: Complaint["status"]) => void;
  facilities: Facility[];
  updateFacilityStatus: (id: string, status: Facility["status"]) => void;
  userProfile: { name: string; email: string; phone: string; uid: string, tickets: number };
  isEmergency: boolean;
  toggleEmergency: () => void;
  firebaseStatus: "connected" | "syncing" | "offline";
  reviews: Review[];
  addReview: (review: Review) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // 1. ALL STATE DECLARATIONS FIRST (To avoid ReferenceErrors during effect runs)
  const [role, setRole] = useState<Role>("attendee");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEmergency, setIsEmergency] = useState(false);
  const [firebaseStatus, setFirebaseStatus] = useState<"connected" | "syncing" | "offline">("connected");
  
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]);
  const [userProfile, setUserProfile] = useState({ name: "User", email: "", phone: "", uid: "", tickets: 0 });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([
    { id: "1", name: "Main Arena", type: "Venue", location: "Sector Alpha-1", status: "Operational", load: 65 },
    { id: "2", name: "Food Court", type: "Dining", location: "Sector Beta-4", status: "Operational", load: 88 },
    { id: "3", name: "Hall A Elevator", type: "Transit", location: "East Wing", status: "Maintenance", load: 0 },
  ]);
  const [reviews, setReviews] = useState<Review[]>([
    { user: "Alex J.", rating: 5, category: "Event", text: "The Mapbox 3D navigation is game-changing.", time: "2h ago" },
    { user: "Maya K.", rating: 4, category: "Food", text: "Neon Sushi has the best tactical rolls.", time: "1h ago" },
  ]);

  // 2. PERSISTENCE EFFECTS
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedUsers = localStorage.getItem("vs_users");
    const savedEvents = localStorage.getItem("vs_events");
    const savedRegs = localStorage.getItem("vs_regs");
    const savedRole = localStorage.getItem("vs_role");
    const savedLoggedIn = localStorage.getItem("vs_isLoggedIn");
    const savedProfile = localStorage.getItem("vs_profile");
    
    if (savedUsers) setUsers(JSON.parse(savedUsers));
    if (savedEvents) setEvents(JSON.parse(savedEvents));
    if (savedRegs) setRegisteredEventIds(JSON.parse(savedRegs));
    if (savedRole) setRole(JSON.parse(savedRole) as Role);
    if (savedLoggedIn) setIsLoggedIn(JSON.parse(savedLoggedIn));
    if (savedProfile) setUserProfile(JSON.parse(savedProfile));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("vs_users", JSON.stringify(users));
    localStorage.setItem("vs_events", JSON.stringify(events));
    localStorage.setItem("vs_regs", JSON.stringify(registeredEventIds));
    localStorage.setItem("vs_role", JSON.stringify(role));
    localStorage.setItem("vs_isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("vs_profile", JSON.stringify(userProfile));
  }, [users, events, registeredEventIds, role, isLoggedIn, userProfile]);

  // 3. OPERATIONAL EFFECTS
  useEffect(() => {
    if (isLoggedIn) {
      const interval = setInterval(() => {
        crashlytics.log("Background location heartbeat pulse sent to Firebase Realtime Database.");
        googleAnalytics.logEvent("location_update", { uid: userProfile.uid, accuracy: "high" });
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn, userProfile.uid]);

  // 4. HANDLERS
  const login = async (userId: string, password: string) => {
    setFirebaseStatus("syncing");
    const user = users.find(u => u.userId === userId && u.password === password);
    if (user) {
      await firebaseAuth.signInWithEmailAndPassword(user.email, password);
      setRole(user.role);
      setIsLoggedIn(true);
      setUserProfile({ name: user.name, email: user.email, phone: user.phone, uid: "404-firebase-001", tickets: 2 });
      setFirebaseStatus("connected");
      return true;
    }
    setFirebaseStatus("connected");
    return false;
  };

  const logout = () => {
    localStorage.removeItem("vs_isLoggedIn");
    localStorage.removeItem("vs_role");
    localStorage.removeItem("vs_profile");
    setIsLoggedIn(false);
    setRole("attendee");
    window.location.href = "/";
  };

  const register = async (user: User) => {
    if (users.find(u => u.userId === user.userId)) return false;
    await firebaseAuth.createUserWithEmailAndPassword(user.email, user.password);
    setUsers(prev => [...prev, user]);
    return true;
  };

  const addEvent = async (e: Omit<Event, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    await firestore.collection("events").add({ id, ...e });
    setEvents(prev => [...prev, { id, ...e }]);
    if (e.status === "Active") {
      addNotification({ type: "Announcement", time: "Just Now", content: `New Event: ${e.name} is now live!`, color: "primary" });
    }
  };

  const updateEvent = async (id: string, e: Partial<Event>) => {
    await firestore.collection("events").doc(id).update(e);
    setEvents(prev => prev.map(ev => ev.id === id ? { ...ev, ...e } : ev));
  };

  const deleteEvent = async (id: string) => {
    setEvents(prev => prev.filter(ev => ev.id !== id));
  };

  const registerForEvent = (eventId: string) => {
    if (!registeredEventIds.includes(eventId)) {
      setRegisteredEventIds(prev => [...prev, eventId]);
      const event = events.find(e => e.id === eventId);
      addNotification({ type: "Logistics", time: "Just Now", content: `Registration Confirmed: ${event?.name}. Pass generated.`, color: "secondary" });
    }
  };

  const addNotification = (n: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications((prev) => [{ id, ...n }, ...prev]);
  };

  const addOrder = async (o: Omit<Order, "id" | "time" | "status" | "user">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newOrder: Order = { id, ...o, status: "Preparing", time: "Just Now", user: userProfile.name };
    await firestore.collection("orders").add(newOrder);
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = async (id: string, status: Order["status"]) => {
    await firestore.collection("orders").doc(id).update({ status });
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const addComplaint = async (c: Omit<Complaint, "id" | "time" | "status" | "user">) => {
     const id = Math.random().toString(36).substr(2, 9);
     const newComplaint: Complaint = { id, ...c, status: "Pending", time: "Just Now", user: userProfile.name };
     setComplaints(prev => [newComplaint, ...prev]);
  };

  const resolveComplaint = (id: string, status: Complaint["status"]) => {
     setComplaints(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  const updateFacilityStatus = (id: string, status: Facility["status"]) => {
     setFacilities(prev => prev.map(f => f.id === id ? { ...f, status } : f));
  };

  const toggleEmergency = () => {
    const newState = !isEmergency;
    setIsEmergency(newState);
    if (newState) addNotification({ type: "Emergency", time: "CRITICAL", content: "FCM Alert: EMERGENCY PROTOCOL ACTIVE.", color: "error" });
  };

  const addReview = (r: Review) => {
    setReviews(prev => [r, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        role, setRole,
        isLoggedIn, login, logout, register, 
        events, addEvent, updateEvent, deleteEvent,
        registeredEventIds, registerForEvent,
        notifications, addNotification,
        orders, addOrder, updateOrderStatus,
        complaints, addComplaint, resolveComplaint,
        facilities, updateFacilityStatus,
        userProfile,
        isEmergency, toggleEmergency,
        firebaseStatus,
        reviews, addReview
      }}
    >
      <div className={`${isEmergency ? 'emergency-glow' : ''}`}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error("useAppContext must be used within an AppProvider");
  return context;
}
