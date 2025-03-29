import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { marked } from "marked";

interface TermsOfServiceProps {
  content: string;
}

export default function TermsOfService({ content }: TermsOfServiceProps) {
  return (
    <>
      <Head>
        <title>Általános Szerződési Feltételek - MuzsikaI</title>
        <meta name="description" content="MuzsikaI szolgáltatás használatának feltételei és szabályai" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main 
        className="min-h-screen bg-gradient-to-r from-[#00DDEB] via-[#FF69B4] to-[#7B3FE4] py-16 px-4"
        role="main"
      >
        <div className="container mx-auto max-w-4xl">
          <Card 
            className="p-6 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
              mb-8 rounded-2xl border-none relative overflow-hidden w-fit mx-auto
              before:content-[''] before:absolute before:inset-0 before:z-10 
              before:bg-gradient-to-r before:from-white/40 before:to-transparent
              before:rounded-2xl"
          >
            <h1 
              className="text-3xl md:text-4xl font-bold text-[#1A2238] font-montserrat relative z-20"
              role="heading"
              aria-level={1}
            >
              Általános Szerződési Feltételek
            </h1>
          </Card>

          <Card 
            className="p-8 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
              rounded-2xl border-none relative overflow-hidden mb-8
              before:content-[''] before:absolute before:inset-0 before:z-10 
              before:bg-gradient-to-r before:from-white/40 before:to-transparent
              before:rounded-2xl"
          >
            <div 
              className="prose prose-lg max-w-none relative z-20 font-montserrat text-[#1A2238]
                prose-headings:font-bold prose-headings:text-[#1A2238] prose-headings:font-montserrat
                prose-a:text-[#00DDEB] prose-a:no-underline hover:prose-a:text-[#7B3FE4]
                prose-strong:text-[#1A2238] prose-strong:font-bold"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </Card>

          <div className="flex justify-center">
            <Link href="/">
              <Button 
                className="bg-[#7B3FE4] hover:bg-[#00DDEB] text-white font-montserrat font-medium
                  px-8 py-6 rounded-xl transform hover:scale-105 transition-all duration-300"
              >
                Vissza a Főoldalra
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "src/content/terms-of-service.md");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const htmlContent = marked(fileContent);

  return {
    props: {
      content: htmlContent,
    },
  };
}
