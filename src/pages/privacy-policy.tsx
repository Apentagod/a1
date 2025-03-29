import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getMarkdownContent } from "@/lib/markdown";

interface PrivacyPolicyPageProps {
  content: string;
}

export async function getStaticProps() {
  const content = getMarkdownContent("privacy-policy.md");
  return {
    props: {
      content,
    },
  };
}

export default function PrivacyPolicyPage({ content }: PrivacyPolicyPageProps) {
  return (
    <>
      <Head>
        <title>Adatvédelmi Tájékoztató - MuzsikaI</title>
        <meta 
          name="description" 
          content="MuzsikaI Adatvédelmi Tájékoztató - Ismerje meg, hogyan védjük és kezeljük személyes adatait" 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main 
        className="min-h-screen bg-gradient-to-r from-[#00DDEB] via-[#FF69B4] to-[#7B3FE4] py-16 px-4"
        role="main"
      >
        <div className="container mx-auto max-w-4xl">
          <Card 
            className="p-6 mb-8 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
              rounded-2xl border-none relative overflow-hidden w-fit mx-auto
              before:content-[''] before:absolute before:inset-0 before:z-10 
              before:bg-gradient-to-r before:from-white/40 before:to-transparent
              before:rounded-2xl"
          >
            <h1 
              className="text-3xl md:text-4xl font-bold text-[#1A2238] font-montserrat relative z-20"
              role="heading"
              aria-level={1}
            >
              Adatvédelmi Tájékoztató
            </h1>
          </Card>

          <Card 
            className="p-8 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
              rounded-2xl border-none relative overflow-hidden mb-8
              before:content-[''] before:absolute before:inset-0 before:z-10 
              before:bg-gradient-to-r before:from-white/40 before:to-transparent
              before:rounded-2xl"
          >
            <div className="prose prose-lg max-w-none relative z-20">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-3xl font-bold text-[#1A2238] font-montserrat mb-6" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-2xl font-bold text-[#1A2238] font-montserrat mt-8 mb-4" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="text-[#1A2238] font-montserrat mb-4" {...props} />
                  ),
                  a: ({ node, ...props }) => (
                    <a 
                      className="text-[#00DDEB] hover:text-[#7B3FE4] transition-colors duration-300" 
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-6 mb-4" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="text-[#1A2238] font-montserrat mb-2" {...props} />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
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
