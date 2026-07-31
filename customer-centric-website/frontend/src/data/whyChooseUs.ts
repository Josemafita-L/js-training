import {
  FaMobileAlt,
  FaRocket,
  FaSearch,
  FaMoneyBillWave,
  FaHeadset,
  FaCode,
} from "react-icons/fa";

export interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
}

export const features: Feature[] = [
  {
    title: "Responsive Design",
    description: "Looks perfect on mobile, tablet, and desktop.",
    icon: FaMobileAlt,
  },
  {
    title: "Fast Delivery",
    description: "Quick turnaround without compromising quality.",
    icon: FaRocket,
  },
  {
    title: "SEO Optimized",
    description: "Built with best practices for better search visibility.",
    icon: FaSearch,
  },
  {
    title: "Affordable Pricing",
    description: "Transparent pricing with no hidden costs.",
    icon: FaMoneyBillWave,
  },
  {
    title: "Ongoing Support",
    description: "We're here even after your website goes live.",
    icon: FaHeadset,
  },
  {
    title: "Custom Solutions",
    description: "Every website is tailored to your business goals.",
    icon: FaCode,
  },
];