// services/artists.ts (lyrics.ts, credits.ts hasonló lenne)
import { supabase } from '@/lib/supabaseClient';

// Feltételezve egy 'artists' táblát 'id', 'name', 'bio' oszlopokkal.
// **FONTOS: Állíts be RLS policy-kat!** Pl. publikus olvasás, admin írás.
/* Példa RLS:
CREATE POLICY "Allow public read access" ON artists FOR SELECT USING (true);
CREATE POLICY "Allow admins to insert/update/delete" ON artists
  FOR ALL USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));
  -- Kell egy is_admin() SQL függvény vagy egy 'role' oszlop ellenőrzése
*/


// --- Összes előadó lekérdezése ---
export async function getAllArtists() {
  // Firebase (régi - Firestore)
  // import { collection, getDocs } from "firebase/firestore";
  // const querySnapshot = await getDocs(collection(db, "artists"));
  // const artists = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  // return { artists, error: null };

  // Supabase (új)
  const { data: artists, error } = await supabase
    .from('artists')
    .select('*'); // Vagy specifikus oszlopok: 'id, name'

  if (error) console.error('Error fetching artists:', error);
  return { artists, error };
}

// --- Egy előadó lekérdezése ID alapján ---
export async function getArtistById(artistId: string) {
  // Firebase (régi - Firestore)
  // import { doc, getDoc } from "firebase/firestore";
  // const docRef = doc(db, "artists", artistId);
  // const docSnap = await getDoc(docRef);
  // return { artist: docSnap.exists() ? { id: docSnap.id, ...docSnap.data()} : null, error: null };

  // Supabase (új)
  const { data: artist, error } = await supabase
    .from('artists')
    .select('*')
    .eq('id', artistId)
    .single();

  if (error && error.code !== 'PGRST116') console.error('Error fetching artist:', error);
  return { artist, error: error?.code === 'PGRST116' ? null : error };
}

// --- Új előadó hozzáadása (ha van jogosultságod - RLS!) ---
export async function addArtist(artistData: { name: string; bio?: string; /*...*/ }) {
    // Firebase (régi - Firestore)
    // import { collection, addDoc } from "firebase/firestore";
    // const docRef = await addDoc(collection(db, "artists"), artistData);
    // return { id: docRef.id, error: null };

    // Supabase (új)
    const { data, error } = await supabase
        .from('artists')
        .insert(artistData)
        .select(); // Visszakérjük a beszúrt adatot (opcionális)

    if (error) console.error('Error adding artist:', error);
    return { data, error }; // data itt egy tömb a beszúrt sor(okk)al
}