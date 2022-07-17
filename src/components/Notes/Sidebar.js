import { useState } from "react";

export default function Sidebar(props) {
  const [isCollapsed, setCollapsed] = useState(false);

  function toggleCollapsed() {
    setCollapsed((prev) => !prev);
  }

  function truncDescription(text) {
    if (!text) return "";
    return text.length < 50 ? text : `${text.substr(0, 49)}...`;
  }

  const noteElements = props.notes.map((note, index) => (
    <div className="sidebar--note" key={note.id}>
      <div
        className={`sidebar--noteContainer ${
          note.id === props.currentNote.id ? "selected-note" : ""
        }`}
        onClick={() => props.handleClickOnNote(note.id)}
      >
        <h4 className="sidebar--noteTitle">{note.body.split("\n")[0]}</h4>
        <p className="sidebar--noteDescription">
          {truncDescription(note.body.split("\n")[1])}
        </p>
        <p className="sidebar--noteDate">{note.date}</p>
        <button
          className="delete-btn"
          onClick={(e) =>
            props.deleteNote(
              e,
              note.id,
              props.currentNoteIndex,
              props.notes.length <= 1
                ? ""
                : props.currentNoteIndex == 0
                ? props.notes[1].id
                : props.notes[0].id
            )
          }
        >
          <i className="gg-trash trash-icon"> </i>
        </button>
      </div>
    </div>
  ));

  console.log(props.notes[0].body);
  console.log(props.notes[0].body.split("\n"));

  return (
    <section className={`pane sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar--mainContainer">
        <div className="sidebar--buttonsContainer">
          <button className="button new-note" onClick={props.newNote}>
            Create Note
          </button>
          <button
            className={`sidebar--collapseButton ${isCollapsed ? "closed" : ""}`}
            onClick={toggleCollapsed}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              width="4px"
              height="8px"
            >
              <path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z" />
            </svg>
          </button>
        </div>
        <div className="sidebar--header">
          <h3>Notes</h3>
        </div>

        {noteElements}
      </div>
      <div className="sidebar--gutter"></div>
    </section>
  );
}
