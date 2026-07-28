import { useState } from "react";

import Container from "../../components/common/Container";
import SectionTitle from "../../components/common/SectionTitle";
import TemplateCard from "../../components/templates/TemplateCard";

import { templates } from "../../data/templates";

const categories = [
  "All",
  "Business",
  "Portfolio",
  "Restaurant",
  "E-Commerce",
  "Healthcare",
  "Education",
];

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTemplates =
    selectedCategory === "All"
      ? templates
      : templates.filter(
          (template) => template.category === selectedCategory
        );

  return (
    <section className="bg-gray-50 py-20">
      <Container>
        <SectionTitle>Website Templates</SectionTitle>

        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-600">
          Explore our professionally designed website templates. Every
          template can be fully customized to match your brand and business
          requirements.
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2 font-medium transition ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredTemplates.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h3 className="text-2xl font-semibold text-gray-700">
              No Templates Found
            </h3>

            <p className="mt-2 text-gray-500">
              There are currently no templates available in this category.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}