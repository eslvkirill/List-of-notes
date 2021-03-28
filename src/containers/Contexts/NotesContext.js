import React, { useContext, useState } from "react";

const notesInitialState = [
  {
    id: 1,
    title: "Первая заметка",
    description: "Описание моей заметки",
    color: "#dcadff",
  },
  {
    id: 2,
    title: "Вторая заметка",
    description: "******\n######\n******\n######\n******\n######\n******",
    color: "#c1f5ff",
  },
];

const NotesContext = React.createContext();

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState(notesInitialState);
  const [filterNotes, setFilterNotes] = useState(notes);
  const [notesTextInput, setNotesTextInput] = useState("");

  const funcToSetState = (func) => {
    const isFuncExist = func ? func(notes) : notes;

    if (setFilterNotes) {
      setNotes(isFuncExist);
      setFilterNotes(isFuncExist);
      setNotesTextInput("");
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        filterNotes,
        setFilterNotes,
        notesTextInput,
        setNotesTextInput,
        funcToSetState,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
