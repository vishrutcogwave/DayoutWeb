import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./screens/LandingPage";
import PaymentPage from "./screens/PaymentPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;