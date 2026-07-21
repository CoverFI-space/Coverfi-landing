import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./landingpage";
import FaqPage from "./FaqPage";
import { ContactPage, StatusPage, WhitepaperPage } from "./InfoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/faqs" element={<FaqPage />} />
        <Route path="/faq" element={<Navigate to="/faqs" replace />} />
        <Route path="/whitepaper" element={<WhitepaperPage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
