// services/auth.ts

// Importáld a Supabase klienst
import { supabase } from '@/lib/supabaseClient'; // Igazítsd az útvonalat
import { AuthError, Session, User } from '@supabase/supabase-js';

// --- Bejelentkezés ---
export async function signInWithEmail(email, password) {
  // Firebase (régi)
  // import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  // const auth = getAuth();
  // try {
  //   const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //   return { user: userCredential.user, error: null };
  // } catch (error) {
  //   return { user: null, error: error };
  // }

  // Supabase (új)
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  return { session: data.session, user: data.user, error }; // Visszaadja a sessiont és usert
}

// --- Regisztráció ---
export async function signUpWithEmail(email, password, additionalData = {}) {
  // Firebase (régi)
  // import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  // const auth = getAuth();
  // try {
  //   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //   // Itt kellett volna külön menteni a profil adatokat Firestore-ba
  //   return { user: userCredential.user, error: null };
  // } catch (error) {
  //   return { user: null, error: error };
  // }

  // Supabase (új)
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: additionalData // Pl.: { full_name: 'John Doe' } - ezek a profiles táblába kerülhetnek triggerrel vagy külön inserttel
    }
  });
   // Fontos: Supabase alapértelmezetten email megerősítést kérhet.
   // Sikeres regisztráció után data.user létezik, de data.session lehet null, amíg nincs megerősítve.
  return { user: data.user, session: data.session, error };
}

// --- Kijelentkezés ---
export async function signOut() {
  // Firebase (régi)
  // import { getAuth, signOut } from "firebase/auth";
  // const auth = getAuth();
  // await signOut(auth);

  // Supabase (új)
  const { error } = await supabase.auth.signOut();
  return { error };
}

// --- Aktuális felhasználó/session lekérdezése ---
export async function getCurrentSession(): Promise<{ session: Session | null, error: AuthError | null }> {
    // Firebase (régi - szinkron példa, de általában listener kell)
    // import { getAuth } from "firebase/auth";
    // const auth = getAuth();
    // return auth.currentUser; // Nem ad sessiont, csak usert

    // Supabase (új)
    const { data, error } = await supabase.auth.getSession();
    return { session: data.session, error };
}

// --- Auth állapot figyelése (pl. UI frissítéshez) ---
export function onAuthStateChange(callback: (session: Session | null) => void) {
    // Firebase (régi)
    // import { getAuth, onAuthStateChanged } from "firebase/auth";
    // const auth = getAuth();
    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //   callback(user); // Csak user objektumot ad
    // });
    // return unsubscribe;

    // Supabase (új)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        // event lehet 'SIGNED_IN', 'SIGNED_OUT', 'USER_UPDATED', stb.
        callback(session); // Teljes session objektumot ad
    });

    return () => {
        subscription?.unsubscribe();
    };
}