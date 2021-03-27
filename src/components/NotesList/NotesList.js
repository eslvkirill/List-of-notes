import React, { useState } from "react";
import { useNotes } from "../../containers/Contexts/NotesContext";
import { usePopUp } from "../../containers/Contexts/PopUpContext";
import { useForm } from "../../containers/Contexts/FormContext";
import CreateNotesButton from "../CreateNotesButton/CreateNotesButton";
import NotesCard from "./NotesCard/NotesCard";
import "./NotesList.scss";

const NotesCards = () => {
  const [scaleButton, setScaleButton] = useState(false);
  const {
    notes,
    setNotes,
    filterNotes,
    setFilterNotes,
    checkNotesData,
    setCheckNotesData,
  } = useNotes();
  const { changePopUpWindow, popUpType, setPopUpType } = usePopUp();
  const { notesFields, setNotesFields, setFormValid } = useForm();

  const removeNotesCard = (event, noteId) => {
    event.stopPropagation();
    const confirm = window.confirm(
      "Вы действительно хотите удалить эту заметку?"
    );

    const removeData = (storage) =>
      confirm ? storage.filter((note) => note.id !== noteId) : storage;

    if (setCheckNotesData === setFilterNotes) {
      setCheckNotesData(removeData(checkNotesData));
      setNotes(removeData(notes));
    }
  };

  const editNotesCard = (noteId) => {
    changePopUpWindow();
    setPopUpType("save");
    setScaleButton(true);

    checkNotesData.map((note) => {
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
      {checkNotesData.length ? (
        <NotesCard
          notes={checkNotesData}
          popUpType={popUpType}
          removeNotesCard={removeNotesCard}
          editNotesCard={editNotesCard}
        />
      ) : (
        <div className="notes-list__empty-notes">
          {filterNotes !== null &&
          filterNotes.length === 0 &&
          notes.length !== 0
            ? "Ничего не найдено :("
            : "Создайте Вашу первую заметку!"}
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
