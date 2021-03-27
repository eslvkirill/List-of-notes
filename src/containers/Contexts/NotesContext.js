import React, { useContext, useState } from "react";

const NotesContext = React.createContext();

const notesExample = [
  {
    id: 1,
    title: "Первая заметка",
    description: "Описание моей заметки",
    color: "#c1f5ff",
  },
  {
    id: 2,
    title: "Вторая заметка",
    description: "Самая\nбольшая\nбольшая\nбольшая\nзаметка",
    color: "#dcadff",
  },
];

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState(notesExample);
  const [filterNotes, setFilterNotes] = useState(notes);
  const [filterNotesText, setFilterNotesText] = useState("");

  const condition =
    filterNotes !== null &&
    (filterNotes.length !== 0 || filterNotes.length === 0);

  const checkNotesData = condition ? filterNotes : notes;
  const setCheckNotesData = condition ? setFilterNotes : setNotes;

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        filterNotes,
        setFilterNotes,
        filterNotesText,
        setFilterNotesText,
        checkNotesData,
        setCheckNotesData,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
