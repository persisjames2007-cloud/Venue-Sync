// Mock Firebase Implementation for Tactical Sync
// Transitioning to Firebase Realtime Database & Auth model per Strategic Requirement

const mockLatency = () => new Promise(res => setTimeout(res, 300));

export const firebaseAuth = {
  async createUserWithEmailAndPassword(email: string, _pass: string) {
    await mockLatency();
    console.log("[Firebase Auth] Creating User:", email);
    return { user: { email, uid: Math.random().toString(36).substr(2, 9) } };
  },
  async signInWithEmailAndPassword(email: string, _pass: string) {
    await mockLatency();
    console.log("[Firebase Auth] Signing In:", email);
    return { user: { email, uid: "404-505-606" } };
  },
  async signOut() {
    await mockLatency();
    console.log("[Firebase Auth] Signed Out");
  }
};

export const firestore = {
  collection(name: string) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      add: async (data: any) => {
        await mockLatency();
        console.log(`[Firestore] Document added to ${name}:`, data);
        return { id: Math.random().toString(36).substr(2, 9) };
      },
      doc: (id: string) => ({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        update: async (data: any) => {
          await mockLatency();
          console.log(`[Firestore] Document ${id} in ${name} updated:`, data);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSnapshot: (callback: (data: any) => void) => {
          console.log(`[Firestore] Live Listener Active on ${name}/${id}`);
          // Simulate a live update after 2s
          setTimeout(() => callback({ id, data: () => ({ status: "Synced" }) }), 2000);
        }
      })
    };
  }
};

export const firebaseMessaging = {
  async getToken() {
    return "TACTICAL-PUSH-TOKEN-001-SYNCHRONIZED";
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMessage(_callback: (msg: any) => void) {
    console.log("[FCM] Push Listener Initialized");
  }
};

export const crashlytics = {
  log: (msg: string) => console.log(`[Crashlytics] LOG: ${msg}`),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recordError: (err: any) => console.error(`[Crashlytics] ERROR CAPTURED:`, err)
};

export const googleAnalytics = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logEvent: (name: string, params: any) => {
    console.log(`[Google Analytics] Event: ${name}`, params);
  }
};
