import React, { useState } from "react";
import Input from "../UiItems/Input/Input";
import Textarea from "../UiItems/Textarea/Textarea";
import Button from "../UiItems/Button/Button";
import {
  // validate,
  validateFields,
} from "../../validation/validation";
import { usePopUp } from "../../containers/Contexts/PopUpContext";
import { useForm } from "../../containers/Contexts/FormContext";
import { useNotes } from "../../containers/Contexts/NotesContext";
import "./PopUpWindow.scss";

const defaultErrorMessage = "Заполните хотя бы одно поле";

const PopUpWindow = () => {
  const {
    notesFields,
    setNotesFields,
    isFormValid,
    setFormValid,
    clearForm,
  } = useForm();
  const { popUp, changePopUpWindow, popUpType } = usePopUp();
  const { checkNotesData, setCheckNotesData } = useNotes();
  const [errorMessage, setErrorMessage] = useState(defaultErrorMessage);

  const createNotes = () => {
    const newNotes = {
      id: Math.random().toString(26),
      title: notesFields.title.value,
      description: notesFields.description.value,
      color: notesFields.color.value,
    };
    setCheckNotesData([{ ...newNotes }, ...checkNotesData]);
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
    changePopUpWindow();
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
    // field.valid = validate(field.value, field.validation);

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
          className={`notes-info__${fieldName} notes-info__field ${
            !isFormValid && fieldName !== "color"
              ? "notes-info__field-error"
              : null
          }`}
          onChange={(event) => onChangeFieldsHandler(event, fieldName)}
        />
      );
    });
  };

  return (
    <>
      <div className={`pop-up-window__showing-${popUp}`} onClick={resetAll}>
        <form
          className={`pop-up-window__notes-form notes-form ${
            popUpType === "create" ? "create" : "save"
          }-form`}
          onSubmit={submitNewNotes}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="notes-form__notes-info notes-info">
            {renderFields()}
          </div>
          <div
            className={
              !isFormValid ? "notes-form__buttons-section" : "buttons-section"
            }
          >
            {!isFormValid ? (
              <div className="error-message">*{errorMessage}</div>
            ) : null}
            <div className="buttons-section__wrapper">
              <Button
                type="submit"
                disabled={!isFormValid}
                className="buttons-section__create-button"
                onClick={popUpType === "create" ? createNotes : editNote}
              >
                {popUpType === "create" ? "Создать" : "Сохранить"}
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

export default PopUpWindow;
