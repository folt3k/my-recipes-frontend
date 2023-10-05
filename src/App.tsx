import { Routes, Route, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LoginPage from "./pages/login.page";

import "./App.scss";
import { useEffect } from "react";
import Cockpit from "./modules/cockpit/cockipit.component";
import { ThemeProvider } from "@mui/material";
import { theme } from "./common/utils/theme-for-provider";

const queryClient = new QueryClient();

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Cockpit />} />
          </Routes>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
