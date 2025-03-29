import { X } from "lucide-react";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PopupMessageProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  autoClose?: boolean;
}

export function PopupMessage({ message, type, onClose, autoClose = true }: PopupMessageProps) {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  return (
    <div 
      className="fixed inset-0 bg-[#1A2238]/50 flex items-center justify-center z-50
        animate-[fadeIn_0.3s_ease-in-out]"
      role="dialog"
      aria-modal="true"
      aria-label={type === "success" ? "Sikeres küldés" : "Hiba történt"}
    >
      <Card 
        className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl relative
          shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-none
          animate-[scaleUp_0.3s_ease-in-out] origin-center
          before:content-[''] before:absolute before:inset-0
          before:bg-gradient-to-r before:from-white/40 before:to-transparent
          before:rounded-2xl"
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 text-[#00DDEB] hover:text-[#7B3FE4] 
            transition-colors duration-200"
          onClick={onClose}
          aria-label="Bezárás"
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="relative z-10">
          <p 
            className={`font-montserrat text-lg ${
              type === "success" ? "text-[#1A2238]" : "text-red-500"
            }`}
          >
            {message}
            {type === "success" && (
              <span className="text-red-500 ml-1" role="img" aria-label="szerető szív">
                ❤️
              </span>
            )}
          </p>
        </div>
      </Card>
    </div>
  );
}
