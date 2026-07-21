import { Link } from "react-router-dom";

import Button from "../common/Button";
import Container from "../common/Container";

import heroImage from "../../assets/images/hero.png";
import { ROUTES } from "../../constants/routes";

export default function Hero() {
  return (
    <section className="bg-gray-50 py-20">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-3 font-semibold text-blue-600">
              Custom Websites for Modern Businesses
            </p>

            <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900">
              Build a Website That Helps Your Business Grow
            </h1>

            <p className="mb-8 text-lg leading-8 text-gray-600">
              We design and develop fast, responsive, and user-friendly
              websites tailored to your business needs. Whether you're a
              startup, small business, or entrepreneur, we're here to help
              you establish a strong online presence.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to={ROUTES.PLAN_WEBSITE}>
                <Button>Plan My Website</Button>
              </Link>

              <Link to={ROUTES.PORTFOLIO}>
                <Button className="bg-gray-800 hover:bg-gray-900">
                  View Portfolio
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <img
              src={heroImage}
              alt="Website development illustration"
              className="mx-auto w-full max-w-lg"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}