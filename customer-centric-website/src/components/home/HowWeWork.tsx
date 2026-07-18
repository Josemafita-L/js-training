const steps = [
  "Tell us your requirements",
  "We design your website",
  "We develop it",
  "Launch your website",
];

export default function HowWeWork() {
  return (
    <section>
      <h2>How We Work</h2>

      <ol>
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </section>
  );
}