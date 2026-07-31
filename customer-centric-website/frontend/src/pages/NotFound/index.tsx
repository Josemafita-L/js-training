import { NavLink } from "react-router-dom";

import Container from "../../components/common/Container";
import Button from "../../components/common/Button";

import { ROUTES } from "../../constants/routes";
//import { Review } from '../../data/reviews';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <Container>
        <nav className="flex h-20 items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">
            Web Studio
          </h1>

          <ul className="hidden items-center gap-8 text-gray-700 md:flex">
            <li>
             <NavLink
  to={ROUTES.HOME}
  className={({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700"
  }
/>
            </li>

            <li>
              <NavLink
  to={ROUTES.TEMPLATES}
  className={({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700"
  }
>
  Templates
</NavLink>
            </li>

            <li>
              <NavLink
  to={ROUTES.PRICING}
  className={({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700"
  }
>
  Pricing
</NavLink>
            </li>

            <li>
              <NavLink
  to={ROUTES.PORTFOLIO}
  className={({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700"
  }
>
  Portfolio
</NavLink>
            </li>

            <li>
              <NavLink
  to={ROUTES.REVIEWS}
  className={({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700"
  }
>
  Review
</NavLink>
            </li>
          </ul>

          <Button className="hidden md:block">
            Book Discovery Call
          </Button>
        </nav>
      </Container>
    </header>
  );
}