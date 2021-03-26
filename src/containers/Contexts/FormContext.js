import React, { useContext, useState } from "react";
import { formFields } from "../../exportFunctions/createField/createField";

const FormContext = React.createContext();

export const useForm = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [form, setForm] = useState(formFields());
  const [isFormValid, setFormValid] = useState(false);

  // const changePopUpWindow = () => setPopUp(!popUp);
  const clearForm = () => setForm(formFields());

  return (
    <FormContext.Provider
      value={{
        notesFields: form,
        setNotesFields: setForm,
        isFormValid,
        setFormValid,
        clearForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
