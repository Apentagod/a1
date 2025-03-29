import { useState } from "react";
import Head from "next/head";
import { PricingCard } from "@/components/subscription/PricingCard";
import { subscriptionPlans, getStripe } from "@/services/stripe";
import { useToast } from "@/hooks/use-toast";

export default function SubscriptionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (planId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId }),
      });

      const { sessionId } = await response.json();
      
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error("Stripe betöltése sikertelen");
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) {
        throw error;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hiba történt",
        description: "Nem sikerült elindítani a fizetési folyamatot.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Előfizetési csomagok - MuzsikaI</title>
        <meta name="description" content="Válassza ki az Önnek megfelelő chatbot előfizetési csomagot" />
      </Head>
      
      <main className="min-h-screen bg-gradient-to-b from-[#0A1A3B] to-[#1B0B45]">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#3CDFFF] to-[#4A7DFF] bg-clip-text text-transparent">
              Előfizetési csomagok
            </h1>
            <p className="text-2xl text-blue-100">
              Válaszd ki az igényeidnek megfelelő csomagot
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {subscriptionPlans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                onSubscribe={handleSubscribe}
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
