import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  const itemsPerPage = 5;

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then(res => res.json())
      .then(data => setUsers(data.users));
  }, []);

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f5f7fb",
        minHeight: "100vh",
        fontFamily: "Arial"
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>User List</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        style={{
          marginBottom: "20px",
          padding: "10px",
          width: "250px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      {/* User List */}
      {paginatedUsers.map(user => (
        <div
          key={user.id}
          onClick={() => setSelectedUser(user)}
          style={{
            marginBottom: "12px",
            border: "1px solid #ddd",
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}
        >
          <p style={{ margin: 0 }}>
            <b>{user.firstName} {user.lastName}</b>
          </p>
          <p style={{ margin: 0, color: "#555" }}>{user.email}</p>
        </div>
      ))}

      {/* User Details */}
      {selectedUser && (
        <div
          style={{
            marginTop: "25px",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}
        >
          <h2>User Details</h2>
          <p><b>Name:</b> {selectedUser.firstName} {selectedUser.lastName}</p>
          <p><b>Email:</b> {selectedUser.email}</p>
          <p><b>Phone:</b> {selectedUser.phone}</p>
          <p><b>Age:</b> {selectedUser.age}</p>
        </div>
      )}

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setPage(p => p - 1)}
          disabled={page === 1}
          style={{ padding: "8px 12px", marginRight: "10px" }}
        >
          Prev
        </button>

        <span>Page {page}</span>

        <button
          onClick={() => setPage(p => p + 1)}
          disabled={page * itemsPerPage >= filteredUsers.length}
          style={{ padding: "8px 12px", marginLeft: "10px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;