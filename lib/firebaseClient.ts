/* ============================================================
   GO AI — Firebase Web SDK (client) for /admin sign-in only.
   These config values are public identifiers by design (they are
   shipped to every browser); access control happens server-side
   (token verification + the ADMIN_ALLOWED_EMAILS whitelist).
   ============================================================ */
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDtWMMnoefD8D7oxVjugxqofyjRMbFcUw0',
  authDomain: 'go-ai-ce66b.firebaseapp.com',
  projectId: 'go-ai-ce66b',
  storageBucket: 'go-ai-ce66b.firebasestorage.app',
  messagingSenderId: '722088643942',
  appId: '1:722088643942:web:5376f3f5e69e9548e30ca7',
};

export function clientAuth() {
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return getAuth(app);
}
