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

  const isFirstPage = page === 1;
  const isLastPage = page * itemsPerPage >= filteredUsers.length;

  return (
    <div style={{ padding: "30px", backgroundColor: "#f9f9f9", minHeight: "100vh", fontFamily: "Arial" }}>
      
      <h1 style={{ color: "#000" }}>User List</h1>

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
          border: "1px solid #ccc",
          borderRadius: "5px"
        }}
      />

      {/* USER DETAILS (TOP) */}
      {selectedUser && (
        <div
          style={{
            marginBottom: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#fff"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2 style={{ color: "#000" }}>User Details</h2>

            <button
              onClick={() => setSelectedUser(null)}
              style={{
                backgroundColor: "#ff4d4d",
                color: "#fff",
                border: "none",
                padding: "6px 10px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Close
            </button>
          </div>

          <p style={{ color: "#333" }}>
            <b>Name:</b> {selectedUser.firstName} {selectedUser.lastName}
          </p>
          <p style={{ color: "#333" }}>
            <b>Email:</b> {selectedUser.email}
          </p>
          <p style={{ color: "#333" }}>
            <b>Phone:</b> {selectedUser.phone}
          </p>
          <p style={{ color: "#333" }}>
            <b>Age:</b> {selectedUser.age}
          </p>
        </div>
      )}

      {/* USER LIST */}
      {paginatedUsers.map(user => (
        <div
          key={user.id}
          onClick={() => setSelectedUser(user)}
          style={{
            marginBottom: "10px",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            backgroundColor: "#fff",
            cursor: "pointer"
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold", color: "#000" }}>
            {user.firstName} {user.lastName}
          </p>
          <p style={{ margin: 0, color: "#555" }}>{user.email}</p>
        </div>
      ))}

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        
        {!isFirstPage && (
          <button
            onClick={() => setPage(p => p - 1)}
            style={{
              padding: "8px 14px",
              marginRight: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Prev
          </button>
        )}

        <span>Page {page}</span>

        {!isLastPage && (
          <button
            onClick={() => setPage(p => p + 1)}
            style={{
              padding: "8px 14px",
              marginLeft: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Next
          </button>
        )}
      </div>

    </div>
  );
}

export default App;