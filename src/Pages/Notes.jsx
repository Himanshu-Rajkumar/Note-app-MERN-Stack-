// ✅ Notes.jsx (Full Version with Animation, Instant Add, and Alerts)
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Navigate } from "react-router-dom";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchNotes = async () => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await fetch("https://note-making-app-1vom.onrender.com/myNotes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setNotes(data);
    } catch (error) {
      console.error("Fetch Notes Error:", error.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

 const handleAddOrUpdate = async () => {
  if (!title || !description) return;

  const url = editId
    ? `https://notes-app-1-f94h.onrender.com/updateNote/${editId}`
    : "https://notes-app-1-f94h.onrender.com/addNote";

  try {
    const response = await fetch(url, {
      method: editId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    let data;
    try {
      data = await response.json();         // try JSON
    } catch (e) {
      data = await response.text();         // fallback to string
    }

    if (!response.ok) throw new Error(data.message || data);

    if (editId) {
      setNotes((prev) =>
        prev.map((note) =>
          note._id === editId ? { ...note, title, description } : note
        )
      );
      alert("Note updated successfully");
    } else {
      setNotes((prev) => [...prev, { _id: Date.now(), title, description }]);
      alert("Note added successfully");
    }

    setTitle("");
    setDescription("");
    setEditId(null);
  } catch (error) {
   alert('Please Refress the page to see notes')
  }
};


  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://notes-app-1-f94h.onrender.com/deleteNote/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      alert("Note deleted successfully");
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Delete Note Error:", error.message);
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setDescription(note.description);
    setEditId(note._id);
  };

  return (
    <Wrapper>
      <h1>📝 My Notes</h1>

      <NoteForm>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button onClick={handleAddOrUpdate}>
          {editId ? "Update Note" : "Add Note"}
        </button>
      </NoteForm>

      <NoteList>
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteCard key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <button onClick={() => handleEdit(note)}>Edit</button>
              <button onClick={() => handleDelete(note._id)}>Delete</button>
            </NoteCard>
          ))
        ) : (
          <p>No notes found.</p>
        )}
      </NoteList>
    </Wrapper>
  );
};

export default Notes;

// ✅ Styled Components
const Wrapper = styled.div`
  padding: 1rem;
  max-width: 700px;
  margin: auto;
`;

const NoteForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  input,
  textarea {
    padding: 0.5rem;
    font-size: 1rem;
  }

  button {
    padding: 0.5rem;
    background: teal;
    color: white;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: darkcyan;
    }

    &:active {
      transform: scale(0.96);
    }
  }
`;

const NoteList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NoteCard = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;

  button {
    margin-right: 1rem;
    padding: 0.3rem 0.6rem;
    background: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #0056b3;
    }

    &:active {
      transform: scale(0.96);
    }
  }

  button:last-child {
    background: crimson;

    &:hover {
      background: darkred;
    }
  }
`;