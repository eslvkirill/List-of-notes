import React, { useState } from "react";
import { validateFields } from "../../exportFunctions/validation/validation";
import { useModal } from "../../containers/Contexts/ModalContext";
import { useForm } from "../../containers/Contexts/FormContext";
import { useNotes } from "../../containers/Contexts/NotesContext";
import Input from "../UiItems/Input/Input";
import Textarea from "../UiItems/Textarea/Textarea";
import Button from "../UiItems/Button/Button";
import "./Modal.scss";

const defaultErrorMessage = "Заполните хотя бы одно поле";

const Modal = () => {
  const {
    notesFields,
    setNotesFields,
    isFormValid,
    setFormValid,
    clearForm,
  } = useForm();
  const { modal, changeModal, modalType } = useModal();
  const {
    notes,
    setNotes,
    setFilterNotes,
    checkNotesData,
    setCheckNotesData,
  } = useNotes();
  const [errorMessage, setErrorMessage] = useState(defaultErrorMessage);

  const createNotes = () => {
    const newNotes = {
      id: Math.random().toString(26),
      title: notesFields.title.value,
      description: notesFields.description.value,
      color: notesFields.color.value,
    };
    const setNewNotice = (storage) => [{ ...newNotes }, ...storage];

    setCheckNotesData(setNewNotice(checkNotesData));
    if (setCheckNotesData === setFilterNotes) setNotes(setNewNotice(notes));
  };

  const editNote = () => {
    checkNotesData.map((note) => {
      Object.keys(notesFields).map((formField) => {
        if (note.id === notesFields[formField].noteId) {
          note[formField] = notesFields[formField].value;
          checkNotesData.splice(
            0,
            0,
            checkNotesData.splice(
              checkNotesData.findIndex((v) => v.id === note.id),
              1
            )[0]
          );
        }
        return checkNotesData;
      });
      return note;
    });
    setCheckNotesData(checkNotesData);
  };

  const resetAll = () => {
    setErrorMessage("Заполните хотя бы одно поле");
    setFormValid(false);
    changeModal();
    clearForm();
  };

  const submitNewNotes = (event) => {
    event.preventDefault();
    resetAll();
  };

  const onChangeFieldsHandler = (event, fieldName) => {
    const field = notesFields[fieldName];
    const titleMaxValue = notesFields["title"].value.length < 30;

    field.value = event.target.value;

    if (!titleMaxValue) {
      setErrorMessage("Длина заголовка не должна превышать 30 символов");
    } else setErrorMessage(defaultErrorMessage);

    setFormValid(validateFields(notesFields) && titleMaxValue);
    field.valid = isFormValid;

    notesFields[fieldName] = field;
    setNotesFields((prevState) => ({ ...prevState, ...notesFields }));
  };

  const renderFields = () => {
    return Object.keys(notesFields).map((fieldName, index) => {
      const field = notesFields[fieldName];
      const FormField = fieldName === "description" ? Textarea : Input;
      return (
        <FormField
          key={index}
          type={field.type}
          placeholder={field.placeholder}
          value={field.value}
          valid={field.valid}
          className={`form-items__${fieldName} form-items__field form-items__fields${
            !isFormValid && fieldName !== "color" ? "_onError" : ""
          }`}
          onChange={(event) => onChangeFieldsHandler(event, fieldName)}
        />
      );
    });
  };

  return (
    <>
      <div
        className={`modal-window${modal ? "_active" : ""}`}
        onClick={resetAll}
      >
        <form
          className={`modal-window__notes-form notes-form notes-form${
            modalType === "create" ? "_create" : "_save"
          }`}
          onSubmit={submitNewNotes}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="notes-form__form-items form-items">
            {renderFields()}
          </div>
          <div
            className={`notes-form__buttons-section${
              !isFormValid ? "_onError" : ""
            } buttons-section`}
          >
            {!isFormValid ? (
              <div className="notes-form__error-message error-message">
                *{errorMessage}
              </div>
            ) : null}
            <div className="buttons-section__wrapper">
              <Button
                type="submit"
                disabled={!isFormValid}
                className="buttons-section__create-button"
                onClick={modalType === "create" ? createNotes : editNote}
              >
                {modalType === "create" ? "Создать" : "Сохранить"}
              </Button>
              <Button
                type="button"
                className="buttons-section__close-button"
                onClick={resetAll}
              >
                Закрыть
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Modal;
