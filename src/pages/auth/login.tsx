import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PasswordResetDialog } from "@/components/auth/PasswordResetDialog";
import authService from "@/services/auth";
import { Music, LogIn, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.login({ email, password });
      toast({
        title: "Sikeres bejelentkezés",
        description: "Üdvözlünk újra!",
      });
      router.push("/chatbot");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hiba történt",
        description: "A bejelentkezés sikertelen. Kérjük, ellenőrizd az adataidat.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>MuzsikaI – Bejelentkezés</title>
        <meta name="description" content="Jelentkezz be a MuzsikaI fiókodba és kezdj el dalszövegeket írni AI segítségével." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00DDEB" />
      </Head>
      <main 
        className="min-h-screen bg-gradient-muzsikaI animate-gradient-x overflow-hidden relative py-16 px-4"
      >
        {/* Background Music Notes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <Music
              key={i}
              className="music-note absolute text-white/10"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 2 + 1}rem`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>

        <div className="max-w-md mx-auto">
          <Link 
            href="/" 
            className="flex items-center justify-center gap-2 mb-8 group animate-fadeIn"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00DDEB] to-[#FF69B4] rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-black/5 backdrop-blur-sm rounded-lg p-2">
                <Music className="h-6 w-6 text-white" />
              </div>
            </div>
            <span className="text-2xl font-bold text-white font-montserrat">MuzsikaI</span>
          </Link>

          <div className="relative group animate-fadeInUp">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00DDEB] via-[#FF69B4] to-[#7B3FE4] rounded-xl blur-md opacity-70 group-hover:opacity-100 transition duration-500"></div>
            <Card className="glass-card border-none rounded-xl overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00DDEB] via-[#FF69B4] to-[#7B3FE4]"></div>
              
              <CardHeader className="space-y-1 pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-white/10 backdrop-blur-sm rounded-lg">
                    <LogIn className="h-5 w-5 text-[#00DDEB]" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white font-montserrat">
                    Bejelentkezés
                  </CardTitle>
                </div>
                <CardDescription className="text-white/70 font-inter">
                  Jelentkezz be a MuzsikaI fiókodba
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
                    <div className="text-right">
                      <PasswordResetDialog />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="btn-muzsikaI w-full py-5 rounded-lg group relative overflow-hidden"
                    disabled={isLoading}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? "Bejelentkezés..." : "Bejelentkezés"}
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
                  onClick={() => authService.loginWithGoogle()}
                  className="w-full bg-white/10 hover:bg-white/15 text-white border-white/20 hover:border-white/30
                    transition-all duration-300 py-5 rounded-lg"
                >
                  Bejelentkezés Google fiókkal
                </Button>
                
                <p className="text-sm text-white/70 text-center font-inter">
                  Még nincs fiókod?{" "}
                  <Link 
                    href="/auth/register" 
                    className="text-[#00DDEB] hover:text-white transition-colors duration-300 font-medium"
                  >
                    Regisztrálj
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-8 text-center animate-fadeInUp animate-delay-300">
            <Link 
              href="/"
              className="text-white/70 hover:text-white text-sm font-inter transition-colors duration-300"
            >
              Vissza a főoldalra
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
