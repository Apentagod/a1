// services/stripe.ts
import { supabase } from '@/lib/supabaseClient';

// --- Checkout Session létrehozása (kliensről hívás) ---
export async function createCheckoutSession(priceId: string, quantity: number = 1) {
  // Firebase (régi - Cloud Function hívása)
  // import { getFunctions, httpsCallable } from "firebase/functions";
  // const functions = getFunctions();
  // const createCheckout = httpsCallable(functions, 'createCheckoutSession'); // Function neve
  // try {
  //   const response = await createCheckout({ priceId, quantity });
  //   const sessionId = response.data.id;
  //   // Redirect to Stripe Checkout using sessionId...
  //   return { sessionId, error: null };
  // } catch (error) {
  //   console.error("Error creating checkout session:", error);
  //   return { sessionId: null, error };
  // }

  // Supabase (új - Edge Function hívása)
  // A function neve legyen pl. 'create-checkout-session'
  const { data, error } = await supabase.functions.invoke('create-checkout-session', {
    body: { priceId, quantity }, // Adatok átadása a body-ban
  });

  if (error) {
    console.error('Error invoking Edge Function:', error);
    return { sessionId: null, error };
  }

  // Feltételezve, hogy az Edge Function visszaadja a session ID-t:
  const sessionId = data?.sessionId; // Igazítsd a válasz struktúrájához
  if (!sessionId) {
      console.error('Edge function did not return session ID');
      return { sessionId: null, error: new Error('Missing sessionId') }
  }

  // Innen a folyamat hasonló: redirect a Stripe Checkout-ra a sessionId-vel
  // (Ehhez általában a @stripe/stripe-js klienst használod)
  console.log('Received Stripe Session ID:', sessionId);
  return { sessionId, error: null };

  /* Példa a redirectre @stripe/stripe-js-sel:
  import { loadStripe } from '@stripe/stripe-js';
  const stripe = await loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');
  if (stripe) {
      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });
      if (stripeError) {
          console.error("Stripe redirect error:", stripeError);
          // Handle error display to user
      }
  }
  */
}

// Webhook kezelése NEM itt történik, hanem egy külön Supabase Edge Function-ben,
// amit a Stripe hív meg közvetlenül. Ez a függvény írná az adatbázist
// (pl. frissítené a 'subscriptions' táblát).