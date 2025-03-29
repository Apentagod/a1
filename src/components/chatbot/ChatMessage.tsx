import { Card } from "@/components/ui/card";

export interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div 
      className={`flex ${message.isBot ? "justify-start animate-slideInLeft" : "justify-end animate-slideInRight"} mb-8`}
      role="listitem"
      aria-label={message.isBot ? "Chatbot üzenet" : "Felhasználói üzenet"}
    >
      <Card 
        className={`max-w-[80%] p-6 shadow-lg backdrop-blur-sm rounded-2xl ${
          message.isBot 
            ? "bg-[#7B3FE4] text-white" 
            : "bg-[#00DDEB] text-white"
        }`}
      >
        <p className="text-lg font-montserrat font-normal leading-relaxed tracking-wide">
          {message.content}
        </p>
        <span className="text-xs text-gray-200/70 mt-4 block font-montserrat">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </Card>
    </div>
  );
}
