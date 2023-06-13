import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import { RootState } from "./store/store";
import Chat from "./views/Chat";
import Enter from "./views/Enter";
import ErrorPage from "./views/ErrorPage";
import SomethingWentWrong from "./views/SomethingWentWrong";

function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return (
    <Routes>
      <Route path="/" element={<Enter />} />
      <Route
        path="/chat/:id"
        element={isAuth ? <Chat /> : <Navigate to="/" />}
      />
      <Route path="/wrong" element={<SomethingWentWrong />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
