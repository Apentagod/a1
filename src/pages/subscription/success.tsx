import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PartyPopper } from "lucide-react";
import Head from "next/head";
import Link from "next/link";

export default function SubscriptionSuccessPage() {
  return (
    <>
      <Head>
        <title>Sikeres Előfizetés - MuzsikaI</title>
        <meta name="description" content="Sikeres előfizetés a MuzsikaI dalszövegíró chatbotra" />
      </Head>
      
      <main className="min-h-screen bg-gradient-to-r from-[#00DDEB] via-[#FF69B4] to-[#7B3FE4]">
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
            rounded-2xl border-none relative overflow-hidden
            before:content-[''] before:absolute before:inset-0 before:z-10 
            before:bg-gradient-to-r before:from-white/40 before:to-transparent
            before:rounded-2xl">
            <CardHeader className="text-center relative z-20">
              <PartyPopper className="h-16 w-16 mx-auto mb-4 text-[#7B3FE4]" />
              <CardTitle className="text-3xl font-bold text-[#1A2238] font-montserrat">
                Sikeres Fizetés!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center relative z-20">
              <p className="text-xl text-[#1A2238] font-montserrat">
                Köszönjük a vásárlást! Az előfizetésed aktiválva lett. Most már használhatod a MuzsikaI dalszövegíró chatbotot.
              </p>
              <div className="bg-white/50 p-6 rounded-xl">
                <p className="text-lg text-[#1A2238] font-montserrat">
                  Kezdéshez válassz egy előadót a legördülő menüből, és írd meg, miről szóljon a dalod!
                </p>
              </div>
              <Link href="/chatbot">
                <Button 
                  size="lg"
                  className="bg-[#7B3FE4] hover:bg-[#00DDEB] text-white font-semibold
                    py-6 px-8 rounded-xl transform hover:scale-105 transition-all duration-300"
                >
                  Ugrás a chatbotra
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
