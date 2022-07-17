import Editor from "./Editor";
import Sidebar from "./Sidebar";
import { React, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Split from "react-split";
import { nanoid } from "nanoid";
import { db } from "../../firebase-config";
//import { useAuth } from "../../context/Auth";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

export default function Notes() {
  //const { currentUser } = useAuth();
  const notesRef = collection(db, "notes");
  const orderedNotes = query(notesRef, orderBy("createdAt", "desc"));

  useEffect(() => {
    onSnapshot(orderedNotes, async () => {
      const data = await getDocs(orderedNotes);
      const notesArray = data.docs.map((doc) => doc.data());
      setNotes(notesArray);
    });
  }, [orderedNotes]);

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

  // function getDateString() {
  //   const date = new Date();
  //   const months = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];
  //   return `${
  //     months[date.getMonth()]
  //   } ${date.getDate()}, ${date.getFullYear()}`;
  // }

  const createNewNote = async () => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const date = new Date();
    const id = nanoid();
    const newNote = {
      id: id,
      title: `New Note ${notes.length + 1}`,
      body: "Compose an epic...",
      date: `${new Intl.DateTimeFormat("en-US", options).format(date)}`,
      createdAt: serverTimestamp(),
    };
    await setDoc(doc(db, "notes", id), newNote);
    setCurrentNoteId(newNote.id);
  };

  const updateNote = async (text) => {
    const userDoc = doc(db, "notes", currentNoteId);
    const update =
      typeof text === "string" ? { body: text } : { title: text.target.value };
    await updateDoc(userDoc, update);
  };

  const deleteNote = async (event, noteId) => {
    event.stopPropagation();
    const userDoc = doc(db, "notes", noteId);
    await deleteDoc(userDoc);
  };

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
