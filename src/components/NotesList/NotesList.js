import React, { useState } from "react";
import { useNotes } from "../../containers/Contexts/NotesContext";
import { useModal } from "../../containers/Contexts/ModalContext";
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
  const { changeModal, modalType, setModalType } = useModal();
  const { notesFields, setNotesFields, setFormValid } = useForm();

  const removeNotesCard = (event, noteId) => {
    event.stopPropagation();
    const confirm = window.confirm(
      "Вы действительно хотите удалить эту заметку?"
    );

    const removeData = (storage) =>
      confirm ? storage.filter((note) => note.id !== noteId) : storage;

    setCheckNotesData(removeData(checkNotesData));

    if (setCheckNotesData === setFilterNotes) {
      setNotes(removeData(notes));
    }
  };

  const editNotesCard = (noteId) => {
    changeModal();
    setModalType("save");
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
          modalType={modalType}
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
