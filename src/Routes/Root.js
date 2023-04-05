import { useState } from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import "../css/style.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
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

          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
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
