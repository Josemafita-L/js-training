import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

import { features } from "../../data/whyChooseUs";

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-50 py-20">
      <Container>
        <SectionTitle>Why Choose Us?</SectionTitle>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <Icon className="mb-4 text-4xl text-blue-600" />

                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}