import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./screens/LandingPage";
import PaymentPage from "./screens/PaymentPage";
import SuccessPage from "./screens/SuccessPage";

import PrivacyPolicyPage from "./screens/PrivacyPolicyPage";
import TermsAndConditionsPage from "./screens/TermsAndConditionsPage";
import ContactPage from "./screens/ContactPage";
import RefundPolicyPage from "./screens/RefundPolicyPage";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Main Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/success" element={<SuccessPage />} />

          {/* Policy Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsAndConditionsPage />} />

          {/* Contact */}
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;