import { BrowserRouter, Route, Routes } from "react-router-dom";
import FaqPage from "./pages/FaqPage";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/faqs" element={<FaqPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
