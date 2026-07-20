export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
}

export const workflow: WorkflowStep[] = [
  {
    step: 1,
    title: "Share Your Idea",
    description:
      "Tell us about your business, goals, and website requirements.",
  },
  {
    step: 2,
    title: "Planning & Design",
    description:
      "We prepare wireframes and design a modern user interface.",
  },
  {
    step: 3,
    title: "Development",
    description:
      "We build your website using modern technologies and best practices.",
  },
  {
    step: 4,
    title: "Launch & Support",
    description:
      "After testing, we launch your website and provide ongoing support.",
  },
];