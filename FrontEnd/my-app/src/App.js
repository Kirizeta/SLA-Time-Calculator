
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import TicketPage from "./pages/TicketPages";
import DashboardHome from "./pages/DashboardHome";
import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <MainLayout>

        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/ticket" element={<TicketPage />} />
        </Routes>

      </MainLayout>

    </BrowserRouter>
  );
}
export default App;