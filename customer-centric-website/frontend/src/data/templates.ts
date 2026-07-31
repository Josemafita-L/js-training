export interface Template {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

export const templates: Template[] = [
  {
    id: 1,
    title: "Business Website",
    description:
      "A professional website for companies and service providers.",
    image: "/images/business-template.png",
    category: "Business",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description:
      "Showcase your projects and skills with a clean portfolio.",
    image: "/images/portfolio-template.png",
    category: "Portfolio",
  },
  {
    id: 3,
    title: "Restaurant Website",
    description:
      "Display menus, reservations, and customer reviews.",
    image: "/images/restaurant-template.png",
    category: "Restaurant",
  },
  {
    id: 4,
    title: "E-Commerce Store",
    description:
      "Sell products online with a secure shopping experience.",
    image: "/images/ecommerce-template.png",
    category: "E-Commerce",
  },
  {
    id: 5,
    title: "Healthcare Website",
    description:
      "Perfect for clinics, hospitals, and medical professionals.",
    image: "/images/healthcare-template.png",
    category: "Healthcare",
  },
  {
    id: 6,
    title: "Education Website",
    description:
      "Ideal for schools, coaching centres, and online learning.",
    image: "/images/education-template.png",
    category: "Education",
  },
];