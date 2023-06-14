import { Routes, Route, Navigate } from "react-router-dom";

import { useAppSelector } from "./store/store";
import Chat from "./views/Chat";
import Enter from "./views/Enter";
import ErrorPage from "./views/ErrorPage";
import SomethingWentWrong from "./views/SomethingWentWrong";

function App() {
  const isAuthenticated = useAppSelector(state => state.auth.isAuth);

  return (
    <Routes>
      <Route path="/" element={<Enter />} />
      <Route
        path="/chat/:id"
        element={isAuthenticated ? <Chat /> : <Navigate to="/" />}
      />
      <Route path="/wrong" element={<SomethingWentWrong />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
