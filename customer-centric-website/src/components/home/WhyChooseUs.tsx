const reasons = [
  "Responsive Design",
  "SEO Friendly",
  "Affordable Pricing",
  "Fast Delivery",
  "Maintenance Support",
];

export default function WhyChooseUs() {
  return (
    <section>
      <h2>Why Choose Us?</h2>

      <ul>
        {reasons.map((reason) => (
          <li key={reason}>{reason}</li>
        ))}
      </ul>
    </section>
  );
}