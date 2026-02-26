import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layout/MainLayout";
import TicketPage from "./pages/TicketPages";
import DashboardHome from "./pages/DashboardHome";
import CreateTicketPage from "./pages/CreateTicketPage";
import DeleteTicketPage from "./pages/DeleteTicketPage";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout>
                <DashboardHome />
              </MainLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/ticket"
          element={
            <PrivateRoute>
              <MainLayout>
                <TicketPage />
              </MainLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/ticket/create"
          element={
            <PrivateRoute>
              <MainLayout>
                <CreateTicketPage />
              </MainLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/ticket/delete"
          element={
            <PrivateRoute>
              <MainLayout>
                <DeleteTicketPage />
              </MainLayout>
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
