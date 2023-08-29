import { Routes, Route, useNavigate } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import LoginPage from "./pages/login.page";

import "./App.scss";
import { useEffect } from "react";

const queryClient = new QueryClient();

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log(token);

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
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
