import { Link, Outlet, NavLink } from "react-router-dom";
import "../css/style.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/user/user";

function Navbar() {
  const dispatch = useDispatch();
  const { isLogin, username } = useSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
  };

  return (
    <div>
      <header>
        <nav>
          <h1>
            <NavLink className="HomePageLink" to={`/user/${username}`}>
              13Online
            </NavLink>
          </h1>

          {isLogin ? (
            <>
              <p>{username}</p>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="login">Login</Link>
              <Link to="signup">Signup</Link>
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
