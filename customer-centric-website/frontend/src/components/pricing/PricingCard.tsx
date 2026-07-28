import Button from "../common/Button";
import type { PricingPlan } from "../../data/pricing";

interface PricingCardProps {
  plan: PricingPlan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl border bg-white p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl ${
        plan.popular
          ? "border-blue-600 ring-2 ring-blue-200"
          : "border-gray-200"
      }`}
    >
      {plan.popular && (
        <span className="absolute right-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
          Most Popular
        </span>
      )}

      <h3 className="text-3xl font-bold">{plan.name}</h3>

      <p className="mt-2 text-gray-600">
        {plan.description}
      </p>

      <p className="my-6 text-5xl font-bold text-blue-600">
        {plan.price}
      </p>

      <ul className="mb-8 space-y-3">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2"
          >
            <span className="text-green-600">✔</span>
            {feature}
          </li>
        ))}
      </ul>

      <Button className="w-full">
        Choose Plan
      </Button>
    </div>
  );
}