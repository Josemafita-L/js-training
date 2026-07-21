//import Button from "../common/Button";

import type { Template } from "../../data/templates";

interface TemplateCardProps {
  template: Template;
}

export default function TemplateCard({
  template,
}: TemplateCardProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      <img
        src={template.image}
        alt={template.title}
        className="h-56 w-full object-cover"
      />

      <div className="p-6">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
          {template.category}
        </span>

        <h3 className="mt-4 text-2xl font-semibold">
          {template.title}
        </h3>

        <p className="mt-3 text-gray-600">
          {template.description}
        </p>
      </div>
    </div>
  );
}