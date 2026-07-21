import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export default function Navbar() {
  return (
    <nav>
      <h2>Web Studio</h2>

      <ul>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>

        <li>
          <Link to={ROUTES.TEMPLATES}>Templates</Link>
        </li>

        <li>
          <Link to={ROUTES.PRICING}>Pricing</Link>
        </li>

        <li>
          <Link to={ROUTES.PORTFOLIO}>Portfolio</Link>
        </li>

        <li>
          <Link to={ROUTES.REVIEWS}>Reviews</Link>
        </li>

        <li>
          <Link to={ROUTES.PLAN_WEBSITE}>Plan My Website</Link>
        </li>

        <li>
          <Link to={ROUTES.BOOK_CALL}>Book Call</Link>
        </li>
      </ul>
    </nav>
  );
}