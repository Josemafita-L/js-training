import Container from "../common/Container";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-10 text-white">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h2 className="text-2xl font-bold">
              Web Studio
            </h2>

            <p className="mt-2 text-gray-400">
              We build modern, responsive websites
              for businesses of every size.
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-400">
              © 2026 Web Studio.
            </p>

            <p className="text-gray-500">
              All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}