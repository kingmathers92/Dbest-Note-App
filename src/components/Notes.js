import Editor from "./Editor";
import Sidebar from "./Sidebar";
import { React, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Split from "react-split";
import { nanoid } from "nanoid";

export default function Notes() {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );

  const params = useParams();
  const navigate = useNavigate();
  const [currentNoteId, setCurrentNoteId] = useState(
    params.noteId || (notes[0] && notes[0].id) || ""
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function getDateString() {
    const date = new Date();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "Write a note..",
      date: getDateString(),
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
    navigate(`/notes/${newNote.id}`);
  }

  function updateNote(text) {
    setNotes((prev) => {
      let index = prev.findIndex((elem) => elem.id === currentNoteId);
      let updatedNote = { ...prev[index], body: text };
      let newNotes = [...prev];
      newNotes.splice(index, 1);
      newNotes.unshift(updatedNote);
      return newNotes;
    });
  }

  function deleteNote(event, noteId, noteIndex, nextId) {
    event.stopPropagation();
    setNotes((prev) => prev.filter((elem) => elem.id != noteId));
    navigate(`/notes/${nextId}`);
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  function findCurrentNoteIndex() {
    let index = notes.findIndex((note) => note.id === currentNoteId);
    return index == -1 ? 0 : index;
  }

  function handleClickOnNote(id) {
    setCurrentNoteId(id);
    navigate(`/notes/${id}`);
  }

  return (
    <main className="notes--wrapper">
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            currentNoteIndex={findCurrentNoteIndex()}
            handleClickOnNote={handleClickOnNote}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="button no-notes--button" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
