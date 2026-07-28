import { NavLink, Link } from "react-router-dom";

import Container from "../common/Container";
import Button from "../common/Button";

import { ROUTES } from "../../constants/routes";

export default function Navbar() {
  const token = localStorage.getItem("token");

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "font-semibold text-blue-600"
      : "text-gray-700 hover:text-blue-600 transition-colors";

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <Container>
        <nav className="flex h-20 items-center justify-between">
          {/* Logo */}
          <NavLink
            to={ROUTES.HOME}
            className="text-2xl font-bold text-blue-600"
          >
            Web Studio
          </NavLink>

          {/* Navigation Links */}
          <ul className="hidden items-center gap-8 md:flex">
            <li>
              <NavLink
                to={ROUTES.HOME}
                className={navLinkClass}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to={ROUTES.TEMPLATES}
                className={navLinkClass}
              >
                Templates
              </NavLink>
            </li>

            <li>
              <NavLink
                to={ROUTES.PRICING}
                className={navLinkClass}
              >
                Pricing
              </NavLink>
            </li>

            <li>
              <NavLink
                to={ROUTES.PORTFOLIO}
                className={navLinkClass}
              >
                Portfolio
              </NavLink>
            </li>

            <li>
              <NavLink
                to={ROUTES.REVIEWS}
                className={navLinkClass}
              >
                Reviews
              </NavLink>
            </li>

            <li>
              <NavLink
                to={ROUTES.PLAN_WEBSITE}
                className={navLinkClass}
              >
                Plan My Website
              </NavLink>
            </li>

            

            <li>
              <NavLink
                to={ROUTES.BOOK_CALL}
                className={navLinkClass}
              >
                Book Call
              </NavLink>
            </li>
          </ul>

          {/* Show Admin Login only if not logged in */}
            {!token && (
              
                <Link
                  to="/login"
                  className="rounded-md border border-blue-600 px-4 py-2 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                >
                  Admin Login
                </Link>
              
            )}

          {/* CTA Button */}
          <NavLink to={ROUTES.BOOK_CALL}>
            <Button className="hidden md:block">
              Book Discovery Call
            </Button>
          </NavLink>
        </nav>
      </Container>
    </header>
  );
}