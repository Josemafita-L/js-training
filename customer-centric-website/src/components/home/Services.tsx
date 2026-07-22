const services = [
  "Business Website",
  "Portfolio Website",
  "Landing Page",
  "E-commerce Website",
  "Booking Website",
  "Blog Website",
];

export default function Services() {
  return (
    <section>
      <h2>Our Services</h2>

      <ul>
        {services.map((service) => (
          <li key={service}>{service}</li>
        ))}
      </ul>
    </section>
  );
}