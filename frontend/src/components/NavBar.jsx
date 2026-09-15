import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-green-700 px-6 py-4 text-white">

      <div className="mx-auto flex max-w-7xl items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold"
        >
          Online Grocery
        </Link>

        {/* Search */}
        <div>
          <input
            type="text"
            placeholder="Search"
            className="h-10 w-48 rounded-md bg-white p-2 text-black outline-none"
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-5">

          <Link
            to="/"
            className="hover:text-green-200"
          >
            Home
          </Link>

          <Link
            to="/categories"
            className="hover:text-green-200"
          >
            Categories
          </Link>

          <Link
            to="/products"
            className="hover:text-green-200"
          >
            Products
          </Link>

          {/* Authentication */}
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="hover:text-green-200"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-green-200"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {/* Customer */}
              <div className="p-2 border rounded-xl shadow-md transition hover:-translate-y-1 shadow-lg">
              {user.role === "CUSTOMER" && (
                <span className="font-medium">
                  Hi, {user.name}
                </span>
              )}
              </div>

              {/* Admin */}
              {user.role === "ADMIN" && (
                <Link
                  to="/admin"
                  className="font-medium hover:text-green-200"
                >
                  Admin
                </Link>
                  )}

              <button
                onClick={logout}
                className="hover:text-red-200"
              >
                Logout
              </button>
            </>
          )}

          {/* Cart */}
          {user?.role === "CUSTOMER" && (
            <Link
              to="/cart"
              className="hover:text-green-200"
            >
              Cart
            </Link>
          )}

        </div>

      </div>

    </nav>
  );
}

export default NavBar;