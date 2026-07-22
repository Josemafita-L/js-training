//import Button from "../common/Button";

import type { PortfolioProject } from "../../data/portfolio";

interface PortfolioCardProps {
  project: PortfolioProject;
}

export default function PortfolioCard({
  project,
}: PortfolioCardProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      <img
        src={project.image}
        alt={project.title}
        className="h-56 w-full object-cover"
      />

      <div className="p-6">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
          {project.category}
        </span>

        <h3 className="mt-4 text-2xl font-semibold">
          {project.title}
        </h3>

        <p className="mt-3 text-gray-600">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded bg-gray-100 px-3 py-1 text-sm"
            >
              {technology}
            </span>
          ))}
        </div>

        <a
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          
        </a>
      </div>
    </div>
  );
}