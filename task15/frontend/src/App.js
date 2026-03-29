import React, { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [page, setPage] = useState(1);

  const usersPerPage = 3;

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.age) {
      alert("Fill all fields");
      return;
    }

    if (editId) {
      await fetch(`http://localhost:5000/users/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      setEditId(null);
    } else {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const newUser = await res.json();
      setUsers([...users, newUser]); // optimistic
    }

    setForm({ name: "", email: "", age: "" });
    fetchUsers();
  };

  const handleDelete = async (id) => {
    const oldUsers = [...users];
    setUsers(users.filter(u => u.id !== id)); // optimistic

    try {
      await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE"
      });
    } catch {
      setUsers(oldUsers);
    }
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditId(user.id);
  };

  const filtered = users
  .filter(u => (u.name || "").toLowerCase().includes(search.toLowerCase()))
  .sort((a, b) =>
    (a[sort] || "").toString().localeCompare((b[sort] || "").toString())
  );

  const indexLast = page * usersPerPage;
  const indexFirst = indexLast - usersPerPage;
  const currentUsers = filtered.slice(indexFirst, indexLast);

  return (
    <div className="app">

      <h1>: User Manager :</h1>

      <form onSubmit={handleSubmit} className="form">
        <input placeholder="Name" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Age" value={form.age}
          onChange={e => setForm({ ...form, age: e.target.value })} />
        <button>{editId ? "Update" : "Add"}</button>
      </form>

      <input placeholder="Search" onChange={e => setSearch(e.target.value)} />

      <select onChange={e => setSort(e.target.value)}>
        <option value="name">Sort by Name</option>
        <option value="age">Sort by Age</option>
      </select>

      <ul>
        {currentUsers.map(user => (
          <li key={user.id}>
            {user.name} ({user.age}) - {user.email}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div>
        <button onClick={() => setPage(page - 1)}>Prev</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>

    </div>
  );
}

export default App;
