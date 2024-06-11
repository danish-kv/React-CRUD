import React, { useEffect, useState } from "react";
import api from "../api";
import '../styles/Note.css'
import Note from "../components/Note";
import '../styles/Home.css'

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => {
        setNotes(res.data);
        console.log(res.data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}`)
      .then((res) => {
        if (res.status === 204) {
          alert("Note deleted!");
          getNotes();
        } else {
          alert("Failed to delete note.");
        }
      })
      .catch((err) => alert(err.response.data));
  };

  const createNotes = (e) => {
    e.preventDefault();
    api
        .post("/api/notes/", { content, title })
        .then((res) => {
            if (res.status === 201) alert("Note created!");
            else alert("Failed to make note.");
            getNotes();
        })
        .catch((err) => alert(err));
};

  return (
    <div>
      <div>
        <h1>Notes</h1>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <h2>Create new Note</h2>
      <form onSubmit={createNotes}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          name="title"
          id="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          name="content"
          id="content"
          required
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Home;
