import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import toast from "react-hot-toast";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const fetchUsers = async () => {
    try {
      const response = await axiosPrivate.get("/v1/customers");
      const allUsers = response.data || [];

      // Filter only customers
      const customers = allUsers.filter((user) => user.role === "Customer");
      setUsers(customers);
    } catch (err) {
      toast.error("Failed to load users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMakeAdmin = async (email, id) => {
    setProcessingId(id);
    try {
      await axiosPrivate.put("/v1/make-admin", { email });
      toast.success("User promoted to Admin successfully");
      // Remove user from customers list after role change
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      const msg = err.response?.data?.msg || "Failed to promote user to Admin";
      toast.error(msg);
    } finally {
      setProcessingId(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Customers</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white shadow-sm rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border-b">Name</th>
              <th className="text-left px-4 py-2 border-b">Email</th>
              <th className="text-left px-4 py-2 border-b">Role</th>
              <th className="text-left px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {!loading && users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{user.name}</td>
                  <td className="px-4 py-2 border-b">{user.email}</td>
                  <td className="px-4 py-2 border-b capitalize">{user.role}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleMakeAdmin(user.email, user._id)}
                      disabled={processingId === user._id}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1.5 rounded"
                    >
                      {processingId === user._id
                        ? "Processing..."
                        : "Make Admin"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  {loading ? "Loading users..." : "No customers found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
