import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userService, UserProfile } from "@/services/user";
import { useAuth } from "@/contexts/AuthContext";

interface EditProfileFormProps {
  profile: UserProfile;
  onSuccess: () => void;
}

export function EditProfileForm({ profile, onSuccess }: EditProfileFormProps) {
  const { user } = useAuth();
  const [name, setName] = useState(profile.name);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      const updates: Partial<UserProfile> = { name };

      if (file) {
        const photoURL = await userService.uploadProfilePhoto(user.uid, file);
        updates.photoURL = photoURL;
      }

      await userService.updateUserProfile(user.uid, updates);
      onSuccess();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Név</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="focus:ring-[#00DDEB]"
        />
      </div>
      <div>
        <Label htmlFor="photo">Profilkép</Label>
        <Input
          id="photo"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="focus:ring-[#00DDEB]"
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#7B3FE4] hover:bg-[#00DDEB] text-white transition-colors duration-300"
      >
        {isLoading ? "Mentés..." : "Mentés"}
      </Button>
    </form>
  );
}
