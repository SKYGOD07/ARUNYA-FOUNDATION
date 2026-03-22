import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { FIREBASE_CONFIG } from '../config';

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let googleProvider: GoogleAuthProvider | null = null;

// Only initialize Firebase if we have a valid config
const hasValidConfig = FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.projectId;

if (hasValidConfig) {
    try {
        app = initializeApp(FIREBASE_CONFIG);
        auth = getAuth(app);
        db = getFirestore(app);
        googleProvider = new GoogleAuthProvider();
    } catch (error) {
        console.warn('Firebase initialization failed:', error);
    }
}

export { app, auth, db, googleProvider };
export default app;
