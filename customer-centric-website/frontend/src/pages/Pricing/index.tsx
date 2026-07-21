import Container from "../../components/common/Container";
import SectionTitle from "../../components/common/SectionTitle";
import PricingCard from "../../components/pricing/PricingCard";

import { pricingPlans } from "../../data/pricing";

export default function Pricing() {
  return (
    <section className="bg-gray-50 py-20">
      <Container>
        <SectionTitle>Pricing Plans</SectionTitle>

        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-600">
          Choose a pricing plan that fits your business needs. Every package
          can be customized based on your requirements.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}