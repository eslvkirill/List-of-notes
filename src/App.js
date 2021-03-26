import React from "react";
import { PopUpProvider } from "./containers/Contexts/PopUpContext";
import { FormProvider } from "./containers/Contexts/FormContext";
import { NotesProvider } from "./containers/Contexts/NotesContext";
import SearchPanel from "./components/SearchPanel/SearchPanel";
import NotesList from "./components/NotesList/NotesList";
import Layout from "./containers/Layout/Layout";
import PopUpWindow from "./components/PopUpWindow/PopUpWindow";

function App() {
  return (
    <Layout>
      <PopUpProvider>
        <FormProvider>
          <NotesProvider>
            <SearchPanel />
            <NotesList />
            <PopUpWindow />
          </NotesProvider>
        </FormProvider>
      </PopUpProvider>
    </Layout>
  );
}

export default App;
