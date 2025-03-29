import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rocket, MessageSquare, Music, Wand2, Check, Zap, Palette, Lightbulb, Layout, User } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { ContactForm } from '@/components/contact/ContactForm';
import { getMarkdownContent } from '@/lib/markdown';
import { Header } from '@/components/layout/Header';

export async function getStaticProps() {
  const footerContent = getMarkdownContent('footer-content.md');
  return {
    props: {
      footerContent,
    },
  };
}

interface HomePageProps {
  footerContent: string;
}

export default function HomePage({ footerContent }: HomePageProps) {
  return (
    <>
      <Head>
        <title>MuzsikaI – Főoldal</title>
        <meta name="description" content="Generálj egyedi dalszövegeket AI segítségével, népszerű magyar előadók stílusában. Változatos lírai stílusok és testreszabható dalszövegek." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00DDEB" />
        <meta name="keywords" content="dalszöveg, dalszövegírás, lírai stílus, magyar előadók, AI dalszöveg, dalszöveg generátor" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <main 
        className="min-h-screen bg-gradient-to-r from-[#00DDEB] via-[#FF69B4] to-[#7B3FE4]"
        role="main"
        aria-label="MuzsikaI kezdőoldal"
      >
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <section id="home" className="flex flex-col items-center justify-center min-h-[80vh]">
            <Card 
              className="p-6 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                transform hover:scale-105 transition-transform duration-300 mb-12 rounded-2xl
                border-none relative overflow-hidden
                before:content-[''] before:absolute before:inset-0 before:z-10 
                before:bg-gradient-to-r before:from-white/40 before:to-transparent
                before:rounded-2xl"
              role="banner"
            >
              <div className="flex items-center gap-6 relative z-20">
                <div className="relative">
                  <Rocket 
                    className="h-12 w-12 bg-gradient-to-r from-[#FF69B4] to-[#00DDEB] rounded-lg p-1"
                    aria-hidden="true"
                  />
                </div>
                <h1 
                  className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#FF69B4] to-[#00DDEB] 
                    bg-clip-text text-transparent font-sans tracking-tight"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  MuzsikaI
                </h1>
              </div>
            </Card>

            <div className="text-center space-y-8 mb-12">
              <h2 
                className="text-[2.75rem] md:text-[3.3rem] font-bold text-balance px-4
                  font-montserrat bg-gradient-to-r from-[#FF69B4] to-[#00DDEB]
                  bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(26,34,56,0.5)]
                  animate-fadeIn"
                role="heading"
                aria-level={2}
              >
                Alkosd meg a következő slágeredet AI-val!
              </h2>
              <div className="flex justify-center items-center">
                <p 
                  className="text-base sm:text-lg md:text-xl lg:text-xl font-montserrat font-medium text-white/90 
                    px-4 drop-shadow-[0_2px_2px_rgba(0,221,235,0.5)] tracking-tight
                    md:whitespace-nowrap"
                  role="contentinfo"
                >
                  Generálj egyedi dalszövegeket AI segítségével, népszerű magyar előadók stílusában
                </p>
              </div>
            </div>

            <Link 
              href="/auth/register"
              aria-label="Regisztráció kezdése"
            >
              <Button 
                size="lg"
                className="bg-[#00DDEB] hover:bg-[#7B3FE4] text-white text-lg px-8 py-6 
                  rounded-xl transform hover:scale-105 transition-all duration-300 
                  shadow-lg font-semibold"
              >
                Kezdés
              </Button>
            </Link>
          </section>

          {/* Features Section */}
          <section id="features" className="py-24">
            <Card 
              className="p-6 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                mb-16 rounded-2xl border-none relative overflow-hidden w-fit mx-auto
                before:content-[''] before:absolute before:inset-0 before:z-10 
                before:bg-gradient-to-r before:from-white/40 before:to-transparent
                before:rounded-2xl"
            >
              <h2 
                className="text-3xl md:text-4xl font-bold text-[#1A2238] font-montserrat relative z-20"
                role="heading"
                aria-level={2}
              >
                Hogyan működik a MuzsikaI?
              </h2>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
              <Card 
                className="p-6 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                  rounded-2xl border-none relative overflow-hidden
                  before:content-[''] before:absolute before:inset-0 before:z-10 
                  before:bg-gradient-to-r before:from-white/40 before:to-transparent
                  before:rounded-2xl transform hover:scale-105 transition-transform duration-300"
                aria-label="Előadó kiválasztása funkció leírása"
              >
                <div className="flex items-start gap-4 relative z-20">
                  <User className="h-8 w-8 text-[#00DDEB]" aria-hidden="true" />
                  <div>
                    <h3 className="text-xl font-bold text-[#1A2238] font-montserrat mb-2">
                      Válaszd ki az előadót
                    </h3>
                    <p className="text-[#1A2238] font-montserrat">
                      Válaszd ki az előadót a chatbot tetején
                    </p>
                  </div>
                </div>
              </Card>

              <Card 
                className="p-6 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                  rounded-2xl border-none relative overflow-hidden
                  before:content-[''] before:absolute before:inset-0 before:z-10 
                  before:bg-gradient-to-r before:from-white/40 before:to-transparent
                  before:rounded-2xl transform hover:scale-105 transition-transform duration-300"
                aria-label="Dalszöveg generálás funkció leírása"
              >
                <div className="flex items-start gap-4 relative z-20">
                  <MessageSquare className="h-8 w-8 text-[#00DDEB]" aria-hidden="true" />
                  <div>
                    <h3 className="text-xl font-bold text-[#1A2238] font-montserrat mb-2">
                      Dalszöveg Generálás
                    </h3>
                    <p className="text-[#1A2238] font-montserrat">
                      Kezdj el chattelni a dalszövegíró bottal
                    </p>
                  </div>
                </div>
              </Card>

              <Card 
                className="p-6 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                  rounded-2xl border-none relative overflow-hidden
                  before:content-[''] before:absolute before:inset-0 before:z-10 
                  before:bg-gradient-to-r before:from-white/40 before:to-transparent
                  before:rounded-2xl transform hover:scale-105 transition-transform duration-300"
                aria-label="Szöveg finomítása és testreszabása funkció leírása"
              >
                <div className="flex items-start gap-4 relative z-20">
                  <Wand2 className="h-8 w-8 text-[#7B3FE4]" aria-hidden="true" />
                  <div>
                    <h3 className="text-xl font-bold text-[#1A2238] font-montserrat mb-2">
                      Szöveg Finomítása és Testreszabása
                    </h3>
                    <p className="text-[#1A2238] font-montserrat">
                      Testreszabd a generált szövegeket különböző stílusokkal vagy változtatásokkal
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-24">
            <Card 
              className="p-6 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                mb-16 rounded-2xl border-none relative overflow-hidden w-fit mx-auto
                before:content-[''] before:absolute before:inset-0 before:z-10 
                before:bg-gradient-to-r before:from-white/40 before:to-transparent
                before:rounded-2xl"
            >
              <h2 
                className="text-3xl md:text-4xl font-bold text-[#1A2238] font-montserrat relative z-20"
                role="heading"
                aria-level={2}
              >
                Előfizetési Csomagok
              </h2>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
              {/* Basic Plan */}
              <Card 
                className="p-8 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                  rounded-2xl border-none relative overflow-hidden
                  before:content-[''] before:absolute before:inset-0 before:z-10 
                  before:bg-gradient-to-r before:from-white/40 before:to-transparent
                  before:rounded-2xl transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative z-20 space-y-6">
                  <h3 className="text-2xl font-bold text-[#1A2238] font-montserrat">
                    Alap
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-[#00DDEB] font-montserrat">
                      2.990 Ft.
                    </span>
                    <span className="text-lg text-[#1A2238]/70 font-montserrat">/hó</span>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "1000 chat üzenet havonta",
                      "Magyar előadók stílusa",
                      "Alapvető finomítások",
                      "Email támogatás"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-[#00DDEB]" aria-hidden="true" />
                        <span className="text-[#1A2238] font-montserrat">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/subscription">
                    <Button 
                      className="w-full bg-[#7B3FE4] hover:bg-[#00DDEB] text-white font-semibold
                        py-6 rounded-xl transform transition-all duration-300"
                    >
                      Csomag Megvásárlása
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Pro Plan */}
              <Card 
                className="p-8 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                  rounded-2xl border-none relative overflow-hidden
                  before:content-[''] before:absolute before:inset-0 before:z-10 
                  before:bg-gradient-to-r before:from-white/40 before:to-transparent
                  before:rounded-2xl transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative z-20 space-y-6">
                  <h3 className="text-2xl font-bold text-[#1A2238] font-montserrat">
                    Pro
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-[#00DDEB] font-montserrat">
                      6.990 Ft.
                    </span>
                    <span className="text-lg text-[#1A2238]/70 font-montserrat">/hó</span>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "5000 chat üzenet havonta",
                      "Részletes finomítások",
                      "Egyedi funkciók támogatása",
                      "Prioritásos email támogatás"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-[#00DDEB]" aria-hidden="true" />
                        <span className="text-[#1A2238] font-montserrat">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/subscription">
                    <Button 
                      className="w-full bg-[#7B3FE4] hover:bg-[#00DDEB] text-white font-semibold
                        py-6 rounded-xl transform transition-all duration-300"
                    >
                      Csomag Megvásárlása
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </section>

          {/* Benefits Section */}
          <section id="benefits" className="py-24">
            <Card 
              className="p-6 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                mb-16 rounded-2xl border-none relative overflow-hidden w-fit mx-auto
                before:content-[''] before:absolute before:inset-0 before:z-10 
                before:bg-gradient-to-r before:from-white/40 before:to-transparent
                before:rounded-2xl"
            >
              <h2 
                className="text-3xl md:text-4xl font-bold text-[#1A2238] font-montserrat relative z-20"
                role="heading"
                aria-level={2}
              >
                Miért válaszd a MuzsikaI-t?
              </h2>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
              {/* Benefit Cards */}
              <Card 
                className="p-8 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                  rounded-2xl border-none relative overflow-hidden
                  before:content-[''] before:absolute before:inset-0 before:z-10 
                  before:bg-gradient-to-r before:from-white/40 before:to-transparent
                  before:rounded-2xl transform hover:scale-105 transition-transform duration-300"
                aria-label="Villámgyors dalszövegírás funkció leírása"
              >
                <div className="flex items-start gap-4 relative z-20">
                  <Zap className="h-8 w-8 text-[#00DDEB]" aria-hidden="true" />
                  <div>
                    <h3 className="text-xl font-bold text-[#1A2238] font-montserrat mb-2">
                      Villámgyors Dalszövegírás
                    </h3>
                    <p className="text-[#1A2238] font-montserrat">
                      Generálj profi szintű dalszövegeket másodpercek alatt.
                    </p>
                  </div>
                </div>
              </Card>

              <Card 
                className="p-8 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                  rounded-2xl border-none relative overflow-hidden
                  before:content-[''] before:absolute before:inset-0 before:z-10 
                  before:bg-gradient-to-r before:from-white/40 before:to-transparent
                  before:rounded-2xl transform hover:scale-105 transition-transform duration-300"
                aria-label="Egyedi lírai stílus választás funkció leírása"
              >
                <div className="flex items-start gap-4 relative z-20">
                  <Palette className="h-8 w-8 text-[#FF69B4]" aria-hidden="true" />
                  <div>
                    <h3 className="text-xl font-bold text-[#1A2238] font-montserrat mb-2">
                      Egyedi stílus
                    </h3>
                    <p className="text-[#1A2238] font-montserrat">
                      Válaszd ki, melyik magyar előadó lírai stílusa inspiráljon!
                    </p>
                  </div>
                </div>
              </Card>

              <Card 
                className="p-8 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                  rounded-2xl border-none relative overflow-hidden
                  before:content-[''] before:absolute before:inset-0 before:z-10 
                  before:bg-gradient-to-r before:from-white/40 before:to-transparent
                  before:rounded-2xl transform hover:scale-105 transition-transform duration-300"
                aria-label="Alkotói inspiráció funkció leírása"
              >
                <div className="flex items-start gap-4 relative z-20">
                  <Lightbulb className="h-8 w-8 text-[#7B3FE4]" aria-hidden="true" />
                  <div>
                    <h3 className="text-xl font-bold text-[#1A2238] font-montserrat mb-2">
                      Alkotói inspiráció
                    </h3>
                    <p className="text-[#1A2238] font-montserrat">
                      Legyen a MuzsikaI a dalokhoz való új ötleteid forrása
                    </p>
                  </div>
                </div>
              </Card>

              <Card 
                className="p-8 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                  rounded-2xl border-none relative overflow-hidden
                  before:content-[''] before:absolute before:inset-0 before:z-10 
                  before:bg-gradient-to-r before:from-white/40 before:to-transparent
                  before:rounded-2xl transform hover:scale-105 transition-transform duration-300"
                aria-label="Egyszerű használhatóság funkció leírása"
              >
                <div className="flex items-start gap-4 relative z-20">
                  <Layout className="h-8 w-8 text-[#00DDEB]" aria-hidden="true" />
                  <div>
                    <h3 className="text-xl font-bold text-[#1A2238] font-montserrat mb-2">
                      Egyszerű használhatóság
                    </h3>
                    <p className="text-[#1A2238] font-montserrat">
                      Felhasználóbarát felület, amely bármilyen tudásszinttel működik
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-24">
            <Card 
              className="p-6 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                mb-16 rounded-2xl border-none relative overflow-hidden w-fit mx-auto
                before:content-[''] before:absolute before:inset-0 before:z-10 
                before:bg-gradient-to-r before:from-white/40 before:to-transparent
                before:rounded-2xl"
            >
              <div className="relative z-20 text-center">
                <h2 
                  className="text-3xl md:text-4xl font-bold text-[#1A2238] font-montserrat"
                  role="heading"
                  aria-level={2}
                >
                  Kapcsolat
                </h2>
                <p className="mt-2 text-[#1A2238] font-montserrat">
                  Kérdésed van? Írj nekünk, hamarosan válaszolunk!
                </p>
              </div>
            </Card>

            <div className="max-w-2xl mx-auto px-4">
              <Card 
                className="p-8 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                  rounded-2xl border-none relative overflow-hidden
                  before:content-[''] before:absolute before:inset-0 before:z-10 
                  before:bg-gradient-to-r before:from-white/40 before:to-transparent
                  before:rounded-2xl"
              >
                <div className="relative z-20">
                  <ContactForm />
                </div>
              </Card>
            </div>
          </section>

          {/* Footer Section */}
          <footer className="py-12">
            <Card 
              className="p-6 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                rounded-2xl border-none relative overflow-hidden w-full mx-auto max-w-4xl
                before:content-[''] before:absolute before:inset-0 before:z-10 
                before:bg-gradient-to-r before:from-white/40 before:to-transparent
                before:rounded-2xl"
            >
              <div className="relative z-20 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                <p className="text-[#1A2238] font-montserrat font-normal">
                  © 2025 MuzsikaI. Minden jog fenntartva.
                </p>
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                  <Link 
                    href="/privacy-policy"
                    className="text-[#00DDEB] hover:text-[#7B3FE4] transition-colors duration-300 font-montserrat font-normal"
                    aria-label="Adatvédelmi Tájékoztató megtekintése"
                  >
                    Adatvédelmi Tájékoztató
                  </Link>
                  <Link 
                    href="/terms-of-service"
                    className="text-[#00DDEB] hover:text-[#7B3FE4] transition-colors duration-300 font-montserrat font-normal"
                    aria-label="Általános Szerződési Feltételek megtekintése"
                  >
                    Általános Szerződési Feltételek
                  </Link>
                </div>
              </div>
            </Card>
          </footer>
        </div>
      </main>
    </>
  );
}
