import React, { useState } from "react";
import { useNotes } from "../../containers/Contexts/NotesContext";
import { usePopUp } from "../../containers/Contexts/PopUpContext";
import { useForm } from "../../containers/Contexts/FormContext";
import CreateNotesButton from "../CreateNotesButton/CreateNotesButton";
import NotesCard from "./NotesCard/NotesCard";
import "./NotesList.scss";

const NotesCards = () => {
  const [scaleButton, setScaleButton] = useState(false);
  const [notes, setNotes] = useNotes();
  const { changePopUpWindow, setPopUpType } = usePopUp();
  const { notesFields, setNotesFields, setFormValid } = useForm();

  const removeNotesCard = (event, noteId) => {
    event.stopPropagation();
    const confirm = window.confirm(
      "Вы действительно хотите удалить эту заметку?"
    );
    setNotes(confirm ? notes.filter((note) => note.id !== noteId) : notes);
  };

  const editNotesCard = (noteId) => {
    changePopUpWindow();
    setPopUpType("save");
    setScaleButton(true);

    notes.map((note) => {
      if (note.id === noteId) {
        Object.keys(notesFields).map((formField) => {
          notesFields[formField].noteId = note.id;
          notesFields[formField].value = note[formField];
          setFormValid(true);

          return formField;
        });
      }
      return notesFields;
    });
    setNotesFields(notesFields);
  };

  return (
    <main className="notes-list">
      {notes.length ? (
        <NotesCard
          notes={notes}
          removeNotesCard={removeNotesCard}
          editNotesCard={editNotesCard}
        />
      ) : (
        <div className="notes-list__empty-notes">
          Создайте Вашу первую заметку!
        </div>
      )}
      <CreateNotesButton
        scaleButton={scaleButton}
        setScaleButton={setScaleButton}
      />
    </main>
  );
};

export default NotesCards;
