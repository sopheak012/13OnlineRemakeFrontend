import { Link, Outlet, NavLink } from "react-router-dom";
import "../css/style.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/isLogin/isLoginSlice";

function Navbar() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin.isLogin);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <header>
        <nav>
          <h1>
            <NavLink className="HomePageLink" to="/">
              13Online
            </NavLink>
          </h1>

          {isLogin ? (
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Navbar;
