import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
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
              {/* Logged in user */}

              <div className="rounded-xl border p-2 shadow-md">

                <span className="font-medium">
                  Hi, {user.email}
                </span>

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

              {/* Customer Orders */}

              {user.role === "CUSTOMER" && (
                <Link
                  to="/orders"
                  className="hover:text-green-200"
                >
                  Orders
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