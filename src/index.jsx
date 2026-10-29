import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./screens/HomePage";
import { LandingPage, ThankYouPage } from "./screens/Landing";
import { SiteRedirect } from "./screens/Landing/components/SiteRedirect";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lp/:vertical" element={<LandingPage />} />
        <Route path="/lp/:vertical/merci" element={<ThankYouPage />} />
        <Route path="*" element={<SiteRedirect />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
