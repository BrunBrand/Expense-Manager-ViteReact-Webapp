import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSignout } from "../hooks/useSignout";

const Navbar = () => {
  const { isAuthenticated, updateAuth } = useAuthContext();
  const { logout } = useSignout();

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Logo />
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav">
              {isAuthenticated ? (
                <>
                  <NavLink className="nav-link" to="/">
                    Dashboard
                  </NavLink>
                  <NavLink className="nav-link" to="/new">
                    New Expense
                  </NavLink>
                  <NavLink className="nav-link" to="/reports">
                    Reports
                  </NavLink>
                </>
              ) : null}
            </div>
          </div>
          <div className="d-flex" role="search">
            {!isAuthenticated ? (
              <>
                <NavLink className="btn btn-sm btn-outline-light" to="/login">
                  Login
                </NavLink>
                <NavLink
                  className="btn btn-sm btn-outline-light mx-1"
                  to="/register"
                >
                  Register
                </NavLink>
              </>
            ) : null}

            {isAuthenticated ? (
              <button
                className="btn btn-sm app-primary-bg-color btn-outline-light"
                onClick={logout}
              >
                Logout
              </button>
            ) : null}

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle activation"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
