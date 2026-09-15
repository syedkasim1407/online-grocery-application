import AdminSidebar from "../components/AdminSidebar";
import { useAdmin } from "../../context/AdminContext";

function AdminUsers() {
  const {
    users,
    deleteUser,
    toggleUserStatus,
  } = useAdmin();

  return (
    <main className="min-h-screen bg-gray-50">

      <div className="flex">

        <AdminSidebar />

        <section className="flex-1 p-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Users
          </h1>

          <p className="mt-2 text-gray-600">
            View and manage registered users.
          </p>

          <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50">

                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Name
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Email
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Role
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Action
                    </th>
                  </tr>

                </thead>

                <tbody className="divide-y">

                  {users.map((user) => (

                    <tr key={user.id}>

                      <td className="px-6 py-4 font-medium text-gray-900">
                        {user.name}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {user.email}
                      </td>

                      <td className="px-6 py-4">

                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                          {user.role}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            user.status === "ACTIVE"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {user.status}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex gap-3">

                          <button
                            onClick={() =>
                              toggleUserStatus(user.id)
                            }
                            className="text-sm font-medium text-blue-600 hover:text-blue-800"
                          >
                            {user.status === "ACTIVE"
                              ? "Deactivate"
                              : "Activate"}
                          </button>

                          {user.role !== "ADMIN" && (
                            <button
                              onClick={() =>
                                deleteUser(user.id)
                              }
                              className="text-sm font-medium text-red-600 hover:text-red-800"
                            >
                              Delete
                            </button>
                          )}

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}

export default AdminUsers;