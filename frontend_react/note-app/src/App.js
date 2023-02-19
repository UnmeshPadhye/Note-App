import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

//URL for AWS Outlook Account
import { BACKEND_URL } from './URL';


function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/notes`)
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${BACKEND_URL}/notes`, newNote)
      .then((response) => {
        setNotes([...notes, response.data]);
        setNewNote({
          title: '',
          content: '',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {
    setNewNote({
      ...newNote,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="App">
      <h1>Notes App</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newNote.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={newNote.content}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit">Add Note</button>
      </form>
      <div className="notes">
        {notes.map((note) => (
          <div className="note" key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
