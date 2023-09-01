import { Routes, Route, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LoginPage from "./pages/login.page";

import "./App.scss";
import { useEffect } from "react";
import Cockpit from "./modules/cockpit/cockipit.component";

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
      <div className='App'>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<Cockpit />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
