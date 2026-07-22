import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ROUTES } from "./constants/routes";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Templates from "./pages/Templates";
import Pricing from "./pages/Pricing";
import Portfolio from "./pages/Portfolio";
import Reviews from "./pages/Reviews";
import PlanWebsite from "./pages/PlanWebsite";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.TEMPLATES} element={<Templates />} />
          <Route path={ROUTES.PRICING} element={<Pricing />} />
          <Route path={ROUTES.PORTFOLIO} element={<Portfolio />} />
          <Route path={ROUTES.REVIEWS} element={<Reviews />} />
          <Route path={ROUTES.PLAN_WEBSITE} element={<PlanWebsite />} />
          <Route path={ROUTES.BOOK_CALL} element={<Booking />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;