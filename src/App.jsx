import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  const itemsPerPage = 10; // ✅ 10 users now

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
          border: "1px solid #ddd",
          borderRadius: "5px",
          color: "#999",          // light text
        }}
      />

      {/* USER LIST */}
      {paginatedUsers.map(user => (
        <div key={user.id}>
          
          {/* ✅ SHOW DETAILS ABOVE CLICKED USER */}
          {selectedUser && selectedUser.id === user.id && (
            <div
              style={{
                marginBottom: "10px",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                backgroundColor: "#fff"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ margin: 0 }}>User Details</h3>

                <button
                  onClick={() => setSelectedUser(null)}
                  style={{
                    backgroundColor: "#ff4d4d",
                    color: "#fff",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Close
                </button>
              </div>

              <p style={{ color: "#333" }}>
                <b>Name:</b> {user.firstName} {user.lastName}
              </p>
              <p style={{ color: "#333" }}>
                <b>Email:</b> {user.email}
              </p>
              <p style={{ color: "#333" }}>
                <b>Phone:</b> {user.phone}
              </p>
              <p style={{ color: "#333" }}>
                <b>Age:</b> {user.age}
              </p>
            </div>
          )}

          {/* USER CARD */}
          <div
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
            <p style={{ margin: 0, fontWeight: "bold" }}>
              {user.firstName} {user.lastName}
            </p>
            <p style={{ margin: 0, color: "#555" }}>{user.email}</p>
          </div>

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