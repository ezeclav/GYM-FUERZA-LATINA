import { Routes, Route } from "react-router-dom";
import Profile from "../pages/Profile";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="profile" element={<Profile />} />
    </Routes>
  );
};

export default AuthRoutes;
