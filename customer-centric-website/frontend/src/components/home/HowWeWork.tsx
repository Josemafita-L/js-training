import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

import { workflow } from "../../data/workflow";

export default function HowWeWork() {
  return (
    <section className="py-20">
      <Container>
        <SectionTitle>How We Work</SectionTitle>

        <div className="space-y-8">
          {workflow.map((item) => (
            <div
              key={item.step}
              className="flex gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                {item.step}
              </div>

              <div>
                <h3 className="mb-2 text-2xl font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}