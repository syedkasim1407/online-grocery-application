import { NavLink } from "react-router-dom";

function AdminSidebar() {
  const linkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-3 font-medium transition ${
      isActive
        ? "bg-green-600 text-white"
        : "text-gray-700 hover:bg-green-50 hover:text-green-600"
    }`;

  return (
    <aside className="w-64 shrink-0 bg-white p-5 shadow-sm">

      <h2 className="mb-6 text-xl font-bold text-gray-900">
        Admin Panel
      </h2>

      <nav className="space-y-2">

        <NavLink
          to="/admin"
          end
          className={linkClass}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={linkClass}
        >
          Users
        </NavLink>

        <NavLink
          to="/admin/products"
          className={linkClass}
        >
          Products
        </NavLink>

        <NavLink
          to="/admin/categories"
          className={linkClass}
        >
          Categories
        </NavLink>

      </nav>

    </aside>
  );
}

export default AdminSidebar;