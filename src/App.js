import React from "react";
import { NotesProvider } from "./containers/NotesContext/NotesContext";
import SearchPanel from "./components/SearchPanel/SearchPanel";
import NotesList from "./components/NotesList/NotesList";
import CreateNotesButton from "./components/CreateNotesButton/CreateNotesButton";
import Layout from "./containers/Layout/Layout";

function App() {
  return (
    <Layout>
      <NotesProvider>
        <SearchPanel />
        <NotesList />
        <CreateNotesButton />
      </NotesProvider>
    </Layout>
  );
}

export default App;
