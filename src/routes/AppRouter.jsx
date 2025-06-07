import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import NewApplicationPage from "../pages/NewApplicationPage";
import { Routes, Route, Navigate } from "react-router-dom";

const AppRouter = ({ mode, setMode }) => (
  <Routes>
    <Route path="/" element={<Layout mode={mode} setMode={setMode} />}>
      <Route index element={<Home />} />
      <Route path="NewApplication" element={<NewApplicationPage />} />
      {/* Catch-all route for unknown paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);

export default AppRouter;
