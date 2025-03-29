// services/user.ts
import { supabase } from '@/lib/supabaseClient';

// Feltételezzük, hogy van egy 'profiles' táblád, 'id' (ami a auth.users.id FK), 'username', 'avatar_url' oszlopokkal.
// **FONTOS: Állíts be RLS policy-kat a 'profiles' táblára!**
/* Példa RLS policy-k (SQL-ben a Supabase felületén):
-- Felhasználók olvashatják a saját profiljukat
CREATE POLICY "Users can view own profile." ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Felhasználók frissíthetik a saját profiljukat
CREATE POLICY "Users can update own profile." ON profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Felhasználók létrehozhatják a saját profiljukat (ha nem trigger csinálja)
CREATE POLICY "Users can insert own profile." ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- (Opcionális) Mindenki olvashatja a profilokat (ha publikus)
CREATE POLICY "Public profiles are viewable by everyone." ON profiles
  FOR SELECT USING (true);
*/

// --- Felhasználói profil lekérdezése ---
export async function getUserProfile(userId: string) {
  // Firebase (régi - Firestore)
  // import { doc, getDoc } from "firebase/firestore";
  // const docRef = doc(db, "users", userId); // vagy "profiles"
  // const docSnap = await getDoc(docRef);
  // if (docSnap.exists()) {
  //   return { profile: { id: docSnap.id, ...docSnap.data() }, error: null };
  // } else {
  //   return { profile: null, error: 'Profile not found' };
  // }

  // Supabase (új)
  const { data, error } = await supabase
    .from('profiles')
    .select('username, avatar_url, full_name') // Csak a szükséges oszlopok
    .eq('id', userId)
    .single(); // Csak egy sort várunk

  if (error && error.code !== 'PGRST116') { // PGRST116: No rows found (nem feltétlen hiba)
     console.error('Error fetching profile:', error);
  }

  return { profile: data, error: error?.code === 'PGRST116' ? null : error }; // Adjuk vissza a profilt, hibát csak valós hiba esetén
}

// --- Felhasználói profil frissítése ---
export async function updateUserProfile(userId: string, updates: { username?: string; avatar_url?: string; full_name?: string }) {
  // Firebase (régi - Firestore)
  // import { doc, updateDoc } from "firebase/firestore";
  // const userRef = doc(db, "users", userId);
  // try {
  //   await updateDoc(userRef, updates);
  //   return { error: null };
  // } catch(error) {
  //   return { error: error };
  // }

  // Supabase (új)
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId); // Csak a saját profilját frissítheti (RLS miatt!)

  if (error) {
      console.error('Error updating profile:', error);
  }
  return { error };
}

// --- Profil létrehozása (ha nem trigger végzi signup után) ---
// Ezt ritkábban hívod közvetlenül, lehet a signup része vagy trigger
export async function createProfile(userId: string, profileData: { username: string; full_name?: string }) {
    // Firebase (régi - Firestore)
    // import { doc, setDoc } from "firebase/firestore";
    // await setDoc(doc(db, "users", userId), { id: userId, ...profileData });

    // Supabase (új)
     const { error } = await supabase
        .from('profiles')
        .insert({ id: userId, ...profileData }); // Az 'id' legyen a user auth ID-ja

     if (error) {
      console.error('Error creating profile:', error);
     }
     return { error };
}