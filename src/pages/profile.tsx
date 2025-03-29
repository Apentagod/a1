import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog } from "@/components/ui/dialog";
import { Sheet } from "@/components/ui/sheet";
import { userService, UserProfile, GeneratedLyric, BillingHistory } from "@/services/user";
import { Music, CreditCard, LogOut, Edit, Eye, User } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { EditProfileForm } from "@/components/profile/EditProfileForm";

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [lyrics, setLyrics] = useState<GeneratedLyric[]>([]);
  const [billingHistory, setBillingHistory] = useState<BillingHistory[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedLyric, setSelectedLyric] = useState<GeneratedLyric | null>(null);
  const [isBillingHistoryOpen, setIsBillingHistoryOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    const loadUserData = async () => {
      const userProfile = await userService.getUserProfile(user.uid);
      const userLyrics = await userService.getLyricsHistory(user.uid);
      const userBilling = await userService.getBillingHistory(user.uid);

      setProfile(userProfile);
      setLyrics(userLyrics);
      setBillingHistory(userBilling);
    };

    loadUserData();
  }, [user, router]);

  const handleLogout = async () => {
    await userService.logout();
    router.push("/auth/login");
  };

  const handleProfileUpdate = () => {
    setIsEditDialogOpen(false);
    if (user) {
      userService.getUserProfile(user.uid).then(setProfile);
    }
  };

  if (!profile) return null;

  return (
    <>
      <Head>
        <title>MuzsikaI – Profil</title>
        <meta name="description" content="Kezeld felhasználói fiókodat és tekintsd meg generált dalszövegeidet" />
      </Head>

      <main className="min-h-screen bg-gradient-to-r from-[#00C4FF] via-[#FF69B4] to-[#8B5CF6] animate-gradient-x">
        <div className="container mx-auto px-4 py-16">
          <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl border-none relative overflow-hidden mb-8 transform hover:scale-105 transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.photoURL} alt={profile.name} />
                <AvatarFallback>
                  <User className="w-12 h-12 text-[#1A2238]/50" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-[#1A2238] font-montserrat mb-2">{profile.name}</h1>
                <p className="text-[#1A2238]/70 font-montserrat">{profile.email}</p>
                <Button 
                  onClick={() => setIsEditDialogOpen(true)}
                  className="mt-4 bg-[#7B3FE4] hover:bg-[#00DDEB] text-white transition-colors duration-300"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Adatok szerkesztése
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl border-none relative overflow-hidden mb-8">
            <h2 className="text-2xl font-bold text-[#1A2238] font-montserrat mb-6 flex items-center">
              <Music className="w-6 h-6 mr-2 text-[#7B3FE4]" />
              Generált dalszövegek
            </h2>
            <div className="grid gap-4">
              {lyrics.map((lyric) => (
                <Card key={lyric.id} className="p-4 bg-white/50 hover:bg-white/80 transition-colors duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-[#1A2238] font-montserrat">{lyric.title}</h3>
                      <p className="text-sm text-[#1A2238]/70 font-montserrat">{lyric.artist}</p>
                      <p className="text-xs text-[#1A2238]/50 font-montserrat">
                        {new Date(lyric.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      onClick={() => setSelectedLyric(lyric)}
                      className="bg-[#7B3FE4] hover:bg-[#00DDEB] text-white transition-colors duration-300"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Megtekintés
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl border-none relative overflow-hidden mb-8">
            <h2 className="text-2xl font-bold text-[#1A2238] font-montserrat mb-6 flex items-center">
              <CreditCard className="w-6 h-6 mr-2 text-[#7B3FE4]" />
              Előfizetés és számlázás
            </h2>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-[#1A2238] font-montserrat">
                    {profile.subscription?.type === "basic" ? "Basic csomag" : "Pro csomag"}
                  </p>
                  <p className="text-sm text-[#1A2238]/70 font-montserrat">
                    Hátralévő kreditek: {profile.credits}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/subscription">
                    <Button className="bg-[#7B3FE4] hover:bg-[#00DDEB] text-white transition-colors duration-300">
                      Előfizetés kezelése
                    </Button>
                  </Link>
                  <Button
                    onClick={() => setIsBillingHistoryOpen(true)}
                    className="bg-[#7B3FE4] hover:bg-[#00DDEB] text-white transition-colors duration-300"
                  >
                    Számlázási előzmények
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Button
            onClick={handleLogout}
            className="bg-[#7B3FE4] hover:bg-[#00DDEB] text-white transition-colors duration-300 w-full md:w-auto"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Kijelentkezés
          </Button>
        </div>
      </main>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-[#1A2238] font-montserrat mb-4">
              Profil szerkesztése
            </h2>
            <EditProfileForm profile={profile} onSuccess={handleProfileUpdate} />
          </Card>
        </div>
      </Dialog>

      <Dialog open={!!selectedLyric} onOpenChange={() => setSelectedLyric(null)}>
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl bg-white p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-[#1A2238] font-montserrat mb-4">
              {selectedLyric?.title}
            </h2>
            <p className="text-[#1A2238]/70 font-montserrat whitespace-pre-line">
              {selectedLyric?.content}
            </p>
          </Card>
        </div>
      </Dialog>

      <Sheet open={isBillingHistoryOpen} onOpenChange={setIsBillingHistoryOpen}>
        <div className="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-[#1A2238] font-montserrat mb-6">
            Számlázási előzmények
          </h2>
          <div className="space-y-4">
            {billingHistory.map((item) => (
              <Card key={item.id} className="p-4 bg-white/50">
                <p className="font-semibold text-[#1A2238] font-montserrat">
                  {item.description}
                </p>
                <p className="text-sm text-[#1A2238]/70 font-montserrat">
                  {item.amount.toLocaleString()} Ft
                </p>
                <p className="text-xs text-[#1A2238]/50 font-montserrat">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Sheet>
    </>
  );
}
