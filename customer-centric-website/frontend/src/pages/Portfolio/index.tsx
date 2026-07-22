import Container from "../../components/common/Container";
import SectionTitle from "../../components/common/SectionTitle";
import PortfolioCard from "../../components/portfolio/PortfolioCard";

import { portfolioProjects } from "../../data/portfolio";

export default function Portfolio() {
  return (
    <section className="bg-gray-50 py-20">
      <Container>
        <SectionTitle>Our Portfolio</SectionTitle>

        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-600">
          Explore some of the websites we've designed for businesses across
          different industries.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioProjects.map((project) => (
            <PortfolioCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}