import { Fragment, useState, useEffect } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { Welcome } from "./pages/Welcome";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Context } from "./Context";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
const queryClient = new QueryClient();
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [baseApiUrl, setBaseApiUrl] = useState(
    import.meta.env.VITE_BASE_API_URL
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Context.Provider value={[baseApiUrl]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Welcome />}></Route>
            <Route path="/login" exact element={<Login />}></Route>
            <Route path="/register" exact element={<Register />}></Route>
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </QueryClientProvider>
  );
}

export default App;
