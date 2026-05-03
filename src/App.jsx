import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then(res => res.json())
      .then(data => setUsers(data.users));
  }, []);

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        color: "#000" // ✅ FORCE ALL TEXT BLACK
      }}
    >
      <h1>User List</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search users"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        style={{
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#fff",
          color: "#000"
        }}
      />

      {paginatedUsers.map(user => (
        <div key={user.id}>

          {/* DETAILS */}
          {selectedUser && selectedUser.id === user.id && (
            <div
              style={{
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                backgroundColor: "#fff",
                color: "#000"
              }}
            >
              <p style={{ color: "#000" }}>
                <b>Name:</b> {user.firstName} {user.lastName} |{" "}
                <b>Email:</b> {user.email} |{" "}
                <b>Phone:</b> {user.phone} |{" "}
                <b>Age:</b> {user.age}
              </p>

              <button onClick={() => setSelectedUser(null)}>Close</button>
            </div>
          )}

          {/* USER CARD */}
          <div
            onClick={() => setSelectedUser(user)}
            style={{
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ddd",
              backgroundColor: "#fff",
              cursor: "pointer"
            }}
          >
            <p style={{ margin: 0, fontWeight: "bold", color: "#000" }}>
              {user.firstName} {user.lastName}
            </p>

            {/* ✅ FORCE EMAIL BLACK */}
            <p style={{ margin: 0, color: "#000" }}>
              {user.email}
            </p>
          </div>

        </div>
      ))}

      {/* Pagination */}
      <div>
        {page > 1 && (
          <button onClick={() => setPage(page - 1)}>Prev</button>
        )}

        <span> Page {page} / {totalPages} </span>

        {page < totalPages && (
          <button onClick={() => setPage(page + 1)}>Next</button>
        )}
      </div>
    </div>
  );
}

export default App;