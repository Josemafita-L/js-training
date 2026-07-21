import { Link } from "react-router-dom";

import Button from "../common/Button";
import Container from "../common/Container";

import { ROUTES } from "../../constants/routes";

export default function CTA() {
  return (
    <section className="bg-blue-600 py-20 text-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-4xl font-bold">
            Ready to Build Your Dream Website?
          </h2>

          <p className="mb-10 text-lg text-blue-100">
            Let's discuss your ideas and build a professional website
            that helps your business grow.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to={ROUTES.PLAN_WEBSITE}>
              <Button className="bg-gray-900 text-blue-600 hover:bg-gray-100">
                Plan My Website
              </Button>
            </Link>

            <Link to={ROUTES.BOOK_CALL}>
              <Button className="bg-gray-900 hover:bg-black">
                Book Discovery Call
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}