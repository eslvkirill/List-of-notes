import React from "react";
import { ModalProvider } from "./containers/Contexts/ModalContext";
import { FormProvider } from "./containers/Contexts/FormContext";
import { NotesProvider } from "./containers/Contexts/NotesContext";
import SearchPanel from "./components/SearchPanel/SearchPanel";
import NotesList from "./components/NotesList/NotesList";
import Layout from "./containers/Layout/Layout";
import Modal from "./components/Modal/Modal";

function App() {
  return (
    <Layout>
      <ModalProvider>
        <FormProvider>
          <NotesProvider>
            <SearchPanel />
            <NotesList />
            <Modal />
          </NotesProvider>
        </FormProvider>
      </ModalProvider>
    </Layout>
  );
}

export default App;
