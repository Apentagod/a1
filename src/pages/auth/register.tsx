import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import authService from "@/services/auth";
import { Music, UserPlus, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.register({ email, password, acceptedTerms });
      toast({
        title: "Sikeresen regisztráltál!",
        description: "A fiókodat sikeresen létrehoztuk. Kérjük, erősítsd meg az email címedet a kiküldött levélben található linkre kattintva.",
      });
      router.push("/chatbot");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hiba történt",
        description: "A regisztráció sikertelen. Kérjük, próbáld újra.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    if (!acceptedTerms) {
      toast({
        variant: "destructive",
        title: "ÁSZF elfogadása szükséges",
        description: "A regisztrációhoz el kell fogadnod az ÁSZF-et és az Adatvédelmi tájékoztatót.",
      });
      return;
    }

    setIsLoading(true);
    try {
      await authService.loginWithGoogle();
      toast({
        title: "Sikeresen regisztráltál!",
        description: "Üdvözlünk a MuzsikaI közösségében!",
      });
      router.push("/chatbot");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hiba történt",
        description: "A Google regisztráció sikertelen. Kérjük, próbáld újra.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>MuzsikaI – Regisztráció</title>
        <meta name="description" content="Regisztrálj a MuzsikaI-ba és kezdj el dalszövegeket írni AI segítségével." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00DDEB" />
        <meta name="keywords" content="regisztráció, fiók létrehozás, MuzsikaI, dalszöveg, AI" />
      </Head>
      <main 
        className="min-h-screen bg-gradient-to-r from-[#00DDEB] via-[#FF69B4] to-[#7B3FE4] animate-gradient-x overflow-hidden relative py-16 px-4"
        role="main"
        aria-label="Regisztrációs oldal"
      >
        {/* Background Music Notes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <Music
              key={i}
              className="absolute text-white animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.5,
                fontSize: `${Math.random() * 2 + 1}rem`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
              aria-hidden="true"
            />
          ))}
        </div>

        <div className="max-w-md mx-auto">
          <Link 
            href="/" 
            className="flex items-center justify-center gap-2 mb-8 group animate-fadeIn"
            aria-label="Vissza a főoldalra"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00DDEB] to-[#FF69B4] rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-black/5 backdrop-blur-sm rounded-lg p-2">
                <Music className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
            </div>
            <span className="text-2xl font-bold text-white font-montserrat">MuzsikaI</span>
          </Link>

          <div className="relative group animate-fadeIn">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00DDEB] via-[#FF69B4] to-[#7B3FE4] rounded-xl blur-md opacity-70 group-hover:opacity-100 transition duration-500"></div>
            <Card className="card-neon-glow border-none rounded-xl overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00DDEB] via-[#FF69B4] to-[#7B3FE4]"></div>
              
              <CardHeader className="space-y-1 pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-white/10 backdrop-blur-sm rounded-lg">
                    <UserPlus className="h-5 w-5 text-[#00DDEB]" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white font-montserrat">
                    Regisztráció
                  </CardTitle>
                </div>
                <CardDescription className="text-white/70 font-inter">
                  Hozd létre MuzsikaI fiókodat
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Email cím"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/10 border-white/20 focus:border-white/30 text-white placeholder:text-white/50 rounded-lg h-11"
                      required
                      aria-label="Email cím"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder="Jelszó"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/10 border-white/20 focus:border-white/30 text-white placeholder:text-white/50 rounded-lg h-11"
                      required
                      aria-label="Jelszó"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={acceptedTerms}
                      onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                      className="border-white/30 data-[state=checked]:bg-[#00DDEB] data-[state=checked]:border-[#00DDEB]"
                      aria-label="ÁSZF és Adatvédelmi tájékoztató elfogadása"
                    />
                    <label htmlFor="terms" className="text-sm text-white/70">
                      Elfogadom az{" "}
                      <Link 
                        href="/terms-of-service" 
                        className="text-[#00DDEB] hover:text-white transition-colors duration-300"
                      >
                        ÁSZF-et
                      </Link>{" "}
                      és az{" "}
                      <Link 
                        href="/privacy-policy" 
                        className="text-[#00DDEB] hover:text-white transition-colors duration-300"
                      >
                        Adatvédelmi tájékoztatót
                      </Link>
                    </label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#00DDEB] to-[#7B3FE4] hover:from-[#7B3FE4] hover:to-[#00DDEB] text-white font-medium
                      py-5 rounded-lg group relative overflow-hidden transition-all duration-300
                      disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={isLoading || !acceptedTerms}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? "Regisztráció..." : "Regisztráció"}
                      {!isLoading && (
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      )}
                    </span>
                  </Button>
                </form>
              </CardContent>
              
              <CardFooter className="flex flex-col gap-4 pt-2">
                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10"></span>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-black/20 backdrop-blur-md px-2 text-white/60 rounded">vagy</span>
                  </div>
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleRegister}
                  className="w-full bg-white/10 hover:bg-white/15 text-white border-white/20 hover:border-white/30
                    transition-all duration-300 py-5 rounded-lg"
                  disabled={isLoading || !acceptedTerms}
                >
                  Regisztráció Google fiókkal
                </Button>
                
                <p className="text-sm text-white/70 text-center font-inter">
                  Már van fiókod?{" "}
                  <Link 
                    href="/auth/login" 
                    className="text-[#00DDEB] hover:text-white transition-colors duration-300 font-medium"
                  >
                    Jelentkezz be
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-8 text-center animate-fadeIn animate-delay-300">
            <Link 
              href="/"
              className="text-white/70 hover:text-white text-sm font-inter transition-colors duration-300"
              aria-label="Vissza a főoldalra"
            >
              Vissza a főoldalra
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
