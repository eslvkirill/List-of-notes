import React from "react";
import { useNotes } from "../../containers/NotesContext/NotesContext";
import NotesCard from "./NotesCard/NotesCard";
import "./NotesList.scss";

const NotesCards = () => {
  const [notes, setNotes] = useNotes();

  return (
    <main className="notes-list">
      {notes.length ? (
        <NotesCard notes={notes} />
      ) : (
        <div className="notes-list__empty-notes">
          Создайте Вашу первую заметку!
        </div>
      )}
    </main>
  );
};

export default NotesCards;
