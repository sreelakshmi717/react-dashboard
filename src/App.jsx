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
    <div style={{ padding: "20px", backgroundColor: "white", minHeight: "100vh" }}>
      <h1>User List</h1>

      <input
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        style={{ marginBottom: "20px", padding: "8px" }}
      />

      {/* User List */}
      {paginatedUsers.map(user => (
        <div
          key={user.id}
          onClick={() => setSelectedUser(user)}
          style={{
            marginBottom: "10px",
            border: "1px solid #ccc",
            padding: "10px",
            cursor: "pointer"
          }}
        >
          <p><b>{user.firstName} {user.lastName}</b></p>
          <p>{user.email}</p>
        </div>
      ))}

      {/* User Details */}
      {selectedUser && (
        <div style={{ marginTop: "20px", padding: "10px", border: "2px solid black" }}>
          <h2>User Details</h2>
          <p><b>Name:</b> {selectedUser.firstName} {selectedUser.lastName}</p>
          <p><b>Email:</b> {selectedUser.email}</p>
          <p><b>Phone:</b> {selectedUser.phone}</p>
          <p><b>Age:</b> {selectedUser.age}</p>
        </div>
      )}

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>Page {page}</span>

        <button
          onClick={() => setPage(p => p + 1)}
          disabled={page * itemsPerPage >= filteredUsers.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;