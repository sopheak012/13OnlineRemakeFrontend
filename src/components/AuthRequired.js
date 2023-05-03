import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthRequired() {
  const user = useSelector((state) => state.user.user);

  if (!user.isLogin) {
    console.log(user);
    // Redirect them to the /login route
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
