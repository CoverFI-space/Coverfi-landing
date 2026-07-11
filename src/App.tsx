import { BrowserRouter, Route, Routes } from "react-router-dom";
import FaqPage from "./pages/FaqPage";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<LandingPage />} />
        <Route path="/contact" element={<LandingPage />} />
        <Route path="/get-started" element={<LandingPage />} />
        <Route path="/login" element={<LandingPage />} />
        <Route path="/dashboard" element={<LandingPage />} />
        <Route path="/terms" element={<LandingPage />} />
        <Route path="/asset-cover" element={<LandingPage />} />
        <Route path="/live-prices" element={<LandingPage />} />
        <Route path="/faqs" element={<FaqPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
