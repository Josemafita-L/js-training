export interface PortfolioProject {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  projectUrl: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: "Restaurant Website",
    category: "Restaurant",
    description:
      "Modern responsive website with menu, reservations and gallery.",
    image: "/images/restaurant-template.png",
    technologies: ["React", "Tailwind CSS", "Node.js"],
    projectUrl: "#",
  },
  {
    id: 2,
    title: "Business Website",
    category: "Business",
    description:
      "Corporate website designed for a consulting company.",
    image: "/images/business-template.png",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    projectUrl: "#",
  },
  {
    id: 3,
    title: "E-Commerce Store",
    category: "E-Commerce",
    description:
      "Online shopping website with payment integration.",
    image: "/images/ecommerce-template.png",
    technologies: ["React", "Node.js", "MongoDB"],
    projectUrl: "#",
  },
  {
    id: 4,
    title: "Portfolio Website",
    category: "Portfolio",
    description:
      "Personal portfolio website for a UI/UX designer.",
    image: "/images/portfolio-template.png",
    technologies: ["React", "Tailwind CSS"],
    projectUrl: "#",
  },
];