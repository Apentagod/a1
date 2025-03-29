import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import type { SubscriptionPlan } from "@/services/stripe";

interface PricingCardProps {
  plan: SubscriptionPlan;
  onSubscribe: (planId: string) => void;
  isLoading?: boolean;
}

export function PricingCard({ plan, onSubscribe, isLoading }: PricingCardProps) {
  return (
    <Card className="flex flex-col bg-[#0A1A3B]/90 border-[#1E3A6E] shadow-2xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-blue-100">{plan.name}</CardTitle>
        <CardDescription className="text-2xl font-semibold text-[#3CDFFF]">
          {plan.price.toLocaleString("hu-HU")} Ft / hó
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-lg text-blue-200 mb-6">
          Havonta {plan.messageLimit.toLocaleString("hu-HU")} chatbot üzenet
        </p>
        <ul className="space-y-4">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <Check className="h-6 w-6 text-[#3CDFFF]" />
              <span className="text-lg text-blue-100">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-[#4A7DFF] hover:bg-[#3CDFFF] text-white text-lg h-12" 
          onClick={() => onSubscribe(plan.id)}
          disabled={isLoading}
        >
          {isLoading ? "Feldolgozás..." : "Előfizetés"}
        </Button>
      </CardFooter>
    </Card>
  );
}
