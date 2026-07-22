import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

import { services } from "../../data/services";

export default function Services() {
  return (
    <section className="py-20">
      <Container>
        <SectionTitle>Our Services</SectionTitle>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                {service.title}
              </h3>

              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}