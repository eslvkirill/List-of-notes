import React, { useContext, useState } from "react";

const NotesContext = React.createContext();

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  return (
    <NotesContext.Provider value={[notes, setNotes]}>
      {children}
    </NotesContext.Provider>
  );
};
