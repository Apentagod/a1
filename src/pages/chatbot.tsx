import { useState, useEffect } from "react";
import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage, Message } from "@/components/chatbot/ChatMessage";
import { Artist, getArtists } from "@/services/artists";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import Image from "next/image";
import { getCreditSettings, calculateCreditCost, updateUserCredits, LyricsRequest, CreditSettings } from '@/services/credits';
import { generateLyrics } from '@/services/lyrics';
import { useAuth } from '@/contexts/AuthContext';

export default function ChatbotPage() {
  const [artists, setArtists] = useState<Artist[]>([
    { 
      id: 'missh', 
      name: 'Missh', 
      genre: 'hip-hop', 
      imageUrl: 'https://i.ibb.co/BK3HF9JV/channels4-profile.jpg',
      context: ''
    },
    { 
      id: 'manuel', 
      name: 'Manuel', 
      genre: 'pop', 
      imageUrl: 'https://i.ibb.co/ynY0Kxkw/IMG-3513.png',
      context: ''
    },
    { 
      id: 'tdanny', 
      name: 'T. Danny', 
      genre: 'rap', 
      imageUrl: 'https://i.ibb.co/FpFwf4g/dani.png',
      context: ''
    }
  ]);
  const [selectedArtist, setSelectedArtist] = useState<string>('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [credits, setCredits] = useState<number>(1000);
  const [creditSettings, setCreditSettings] = useState<CreditSettings | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const settings = await getCreditSettings();
        setCreditSettings(settings);
        setCredits(settings.initialCredits);

        const fetchedArtists = await getArtists();
        setArtists(fetchedArtists);

        setMessages([{
          id: 'welcome',
          content: 'Szia! 🎵 Én a MuzsikaI, a te személyes dalszövegíró asszisztensed. Válassz egy előadót a fenti menüből, és írd meg, miről szóljon a dalod – én pedig megírom neked a következő slágeredet! 😊',
          isBot: true,
          timestamp: new Date()
        }]);
      } catch (error) {
        console.error('Error loading initial data:', error);
        toast({
          variant: 'destructive',
          title: 'Hiba történt',
          description: 'Nem sikerült betölteni a kezdeti adatokat. Kérlek, próbáld újra később.',
        });
      }
    };

    loadInitialData();
  }, [toast]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!selectedArtist || !input.trim()) {
      toast({
        variant: 'destructive',
        title: 'Hiányzó adatok',
        description: 'Kérlek válassz előadót és írd meg a kérésed!',
      });
      return;
    }

    const selectedArtistData = artists.find(a => a.id === selectedArtist);
    if (!selectedArtistData) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const processingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: 'Köszönöm a kérést! Dolgozom a dalszövegen...',
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, processingMessage]);

    try {
      const lyrics = generateLyrics('basic', selectedArtistData);
      
      const responseMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: lyrics,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => 
        prev.map(msg => msg.id === processingMessage.id ? responseMessage : msg)
      );
    } catch (error) {
      console.error('Error generating lyrics:', error);
      toast({
        variant: 'destructive',
        title: 'Hiba történt',
        description: 'Nem sikerült legenerálni a dalszöveget. Kérlek, próbáld újra később.',
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <Head>
        <title>Dalszövegíró Chatbot - MuzsikaI</title>
        <meta name='description' content='Generálj egyedi dalszövegeket magyar előadók stílusában a MuzsikaI chatbottal' />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main 
        className="min-h-screen bg-gradient-to-r from-[#00DDEB] via-[#FF69B4] to-[#7B3FE4] font-montserrat"
        role="main"
        aria-label="MuzsikaI Dalszövegíró"
      >
        <div className="container mx-auto px-4 py-8 md:py-12">
          <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-2xl border-none animate-fadeIn">
            <CardHeader className="border-b border-gray-100 pb-6">
              <div className="text-center space-y-2">
                <CardTitle className="text-3xl md:text-4xl font-bold text-[#1A2238] font-montserrat">
                  MuzsikaI Dalszövegíró
                </CardTitle>
                <p className="text-lg text-[#1A2238]/80 font-montserrat">
                  Generálj egyedi slágereket magyar előadók stílusában, pillanatok alatt! 🎵
                </p>
              </div>

              <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <Select 
                  value={selectedArtist} 
                  onValueChange={setSelectedArtist}
                  aria-label="Válassz előadót"
                >
                  <SelectTrigger className="w-full md:w-72 bg-white border-2 border-gray-100 focus:border-[#00DDEB] rounded-xl h-12 text-lg">
                    <SelectValue placeholder="Válassz előadót" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-[#00DDEB] rounded-xl">
                    {artists.map((artist) => (
                      <SelectItem 
                        key={artist.id} 
                        value={artist.id}
                        className="flex items-center gap-3 py-3 px-4 text-lg hover:bg-gray-50 focus:bg-gray-50 cursor-pointer group"
                      >
                        <div className="relative w-8 h-8 group-hover:scale-110 transition-transform duration-200">
                          <Image
                            src={artist.imageUrl}
                            alt={artist.name}
                            width={32}
                            height={32}
                            className="rounded-full group-hover:border-2 group-hover:border-[#00DDEB]"
                          />
                        </div>
                        <span className={selectedArtist === artist.id ? "text-[#7B3FE4] font-medium" : "text-gray-700"}>
                          {artist.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Card className="bg-[#7B3FE4] px-4 py-2 rounded-xl">
                  <span className="text-[#00DDEB] font-medium">
                    Kreditek: {credits}
                  </span>
                </Card>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              <ScrollArea className="h-[500px] rounded-xl border-2 border-gray-100 bg-gray-50/50 p-6">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </ScrollArea>

              <form onSubmit={handleSubmit} className='flex gap-3 mt-6'>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='Írd meg, miről szóljon a dalod... 🎤'
                  className='bg-white border-2 border-gray-100 focus:border-[#00DDEB] rounded-xl h-12 text-lg font-montserrat placeholder:text-gray-400'
                  onKeyDown={handleKeyDown}
                  aria-label='Dalszöveg témájának megadása'
                />
                <Button 
                  type='submit'
                  className='bg-[#7B3FE4] hover:bg-[#00DDEB] text-white px-6 h-12 rounded-xl transition-colors duration-200'
                  aria-label='Üzenet küldése'
                >
                  <Send className='h-6 w-6' />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
