import React, { useState } from "react";
import { useNotes } from "../../containers/Contexts/NotesContext";
import { useModal } from "../../containers/Contexts/ModalContext";
import { useForm } from "../../containers/Contexts/FormContext";
import CreateNotesButton from "../CreateNotesButton/CreateNotesButton";
import NotesCard from "./NotesCard/NotesCard";
import "./NotesList.scss";

const NotesCards = () => {
  const [scaleButton, setScaleButton] = useState(false);
  const { notes, filterNotes, funcToSetState } = useNotes();
  const { changeModal, modalType, setModalType } = useModal();
  const { notesFields, setNotesFields, setFormValid } = useForm();

  const removeNotesCard = (event, noteId) => {
    event.stopPropagation();
    const confirm = window.confirm(
      "Вы действительно хотите удалить эту заметку?"
    );

    funcToSetState((storage) =>
      confirm ? storage.filter((note) => note.id !== noteId) : storage
    );
  };

  const editNotesCard = (noteId) => {
    changeModal();
    setModalType("save");
    setScaleButton(true);

    filterNotes.map((note) => {
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
      {filterNotes.length ? (
        <NotesCard
          notes={filterNotes}
          modalType={modalType}
          removeNotesCard={removeNotesCard}
          editNotesCard={editNotesCard}
        />
      ) : (
        <div className="notes-list__empty-notes">
          {filterNotes.length === 0 && notes.length !== 0
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
