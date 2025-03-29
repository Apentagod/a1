import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Music } from "lucide-react";

const navLinks = [
  { name: "KEZDŐLAP", href: "#home", ariaLabel: "Navigáció a Kezdőlapra" },
  { name: "HOGYAN MŰKÖDIK", href: "#features", ariaLabel: "Navigáció a funkciók szekcióhoz" },
  { name: "ÁRAK", href: "#pricing", ariaLabel: "Navigáció az árak szekcióhoz" },
  { name: "MIÉRT HASZNÁLD?", href: "#benefits", ariaLabel: "Navigáció az előnyök szekcióhoz" },
  { name: "KAPCSOLAT", href: "#contact", ariaLabel: "Navigáció a kapcsolat szekcióhoz" }
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      }`}
      role="banner"
    >
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="relative">
          <div
            className="absolute inset-0 bg-white/10 backdrop-blur-[10px] rounded-2xl shadow-lg"
            style={{
              backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))"
            }}
          />
          <nav className="relative z-10 flex items-center justify-between h-16 px-6">
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  aria-label={link.ariaLabel}
                  className="text-white hover:text-white font-montserrat font-semibold text-lg
                    transition-all duration-300 relative cursor-pointer
                    hover:text-shadow-glow"
                  style={{
                    transition: "text-shadow 300ms ease-in-out"
                  }}
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] bg-white/95 backdrop-blur-[10px]">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navLinks.map((link) => (
                      <button
                        key={link.name}
                        onClick={() => {
                          scrollToSection(link.href);
                        }}
                        aria-label={link.ariaLabel}
                        className="text-white hover:text-white font-montserrat font-semibold text-lg
                          transition-all duration-300 text-left px-4 py-2 rounded-lg hover:bg-white/20 cursor-pointer
                          hover:text-shadow-glow"
                        style={{
                          transition: "text-shadow 300ms ease-in-out"
                        }}
                      >
                        {link.name}
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  className="text-white hover:text-white font-montserrat font-semibold text-lg
                    transition-all duration-300 hover:text-shadow-glow"
                >
                  Belépés
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button
                  className="bg-white hover:bg-white text-[#00DDEB] font-montserrat font-semibold text-lg
                    px-4 py-2 border-2 border-[#00DDEB] transition-all duration-300
                    hover:shadow-[0_0_10px_#00DDEB]"
                >
                  Regisztráció
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 -z-10 overflow-hidden pointer-events-none">
        <div className="relative w-full h-24">
          {[...Array(3)].map((_, i) => (
            <Music
              key={i}
              className={`absolute text-white opacity-20 animate-float-${i + 1}
                transform rotate-${i * 45}`}
              style={{
                left: `${30 + i * 25}%`,
                top: `${20 + i * 15}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .text-shadow-glow {
          text-shadow: 0 0 10px #FFFFFF, 0 0 20px #FFFFFF;
        }
      `}</style>
    </header>
  );
}
