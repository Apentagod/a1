import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import authService from "@/services/auth";

export function PasswordResetDialog() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.resetPassword(email);
      toast({
        title: "Email elküldve",
        description: "A jelszó-visszaállítási linket elküldtük az email címedre.",
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hiba történt",
        description: "Nem sikerült elküldeni a jelszó-visszaállítási emailt. Kérjük, próbáld újra.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="text-sm text-[#00DDEB] hover:text-[#FFD700] transition-colors duration-300 p-0 h-auto font-normal"
        >
          Elfelejtetted a jelszavad?
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white/95 backdrop-blur-sm border-none">
        <DialogHeader>
          <DialogTitle className="text-[#1A2238]">Jelszó visszaállítása</DialogTitle>
          <DialogDescription className="text-[#1A2238]/70">
            Add meg az email címed, és küldünk egy jelszó-visszaállítási linket.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <Input
            type="email"
            placeholder="Email cím"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-[#00DDEB] focus:ring-[#00DDEB] bg-white/50"
            required
          />
          <Button
            type="submit"
            className="w-full bg-[#7B3FE4] hover:bg-[#00DDEB] transition-colors duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Küldés..." : "Jelszó-visszaállítási link küldése"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
