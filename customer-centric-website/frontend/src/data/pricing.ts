export interface PricingPlan {
  id: number;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: "Starter",
    price: "₹9,999",
    description: "Perfect for startups and personal websites.",
    popular: false,
    features: [
      "Up to 5 Pages",
      "Responsive Design",
      "Contact Form",
      "Basic SEO",
      "1 Month Support",
    ],
  },
  {
    id: 2,
    name: "Pro",
    price: "₹19,999",
    description: "Best for growing businesses.",
    popular: true,
    features: [
      "Up to 10 Pages",
      "Booking System",
      "WhatsApp Integration",
      "Advanced SEO",
      "3 Months Support",
    ],
  },
  {
    id: 3,
    name: "Growth",
    price: "₹39,999",
    description: "Complete business solution.",
    popular: false,
    features: [
      "Unlimited Pages",
      "E-Commerce",
      "Payment Gateway",
      "Custom Features",
      "6 Months Support",
    ],
  },
];