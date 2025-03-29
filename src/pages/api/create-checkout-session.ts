import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { planId } = req.body;

    const prices = {
      basic: process.env.STRIPE_BASIC_PRICE_ID,
      pro: process.env.STRIPE_PRO_PRICE_ID,
    };

    const priceId = prices[planId as keyof typeof prices];

    if (!priceId) {
      return res.status(400).json({ message: "Érvénytelen előfizetési csomag" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/subscription`,
      metadata: {
        planId,
      },
      locale: "hu",
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe API error:", error);
    res.status(500).json({ message: "Hiba történt a fizetés során" });
  }
}
