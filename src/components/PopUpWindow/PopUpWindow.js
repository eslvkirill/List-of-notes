import React, { useState } from "react";
import Input from "../UiItems/Input/Input";
import Textarea from "../UiItems/Textarea/Textarea";
import Button from "../UiItems/Button/Button";
import { createField } from "./createField/createField";
import { validate, validateFields } from "../../validation/validation";
import { useNotes } from "../../containers/NotesContext/NotesContext";
import "./PopUpWindow.scss";

const colorInputDefaultValue = "#e9e4eb";

function createNewFormFields(
  placeholder,
  maxLength,
  type = "text",
  value = "",
  errorMessage = null
) {
  return createField(
    {
      placeholder,
      errorMessage: "*" + errorMessage,
      type,
      value,
    },
    { required: true, minLength: 1, maxLength }
  );
}

function formFields() {
  return {
    title: createNewFormFields(
      "Введите заголовок",
      // "Поле не должно превышать 30 символов",
      30
    ),
    color: createNewFormFields(
      "Цвет заметки",
      7,
      "color",
      colorInputDefaultValue
    ),
    description: createNewFormFields("Текст заметки"),
  };
}

const PopUpWindow = (props) => {
  const [notesFields, setNotesFields] = useState(formFields());
  const [isFormValid, setFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Заполните хотя бы одно поле"
  );
  const [notes, setNotes] = useNotes();

  const createNotes = () => {
    const newNotes = {
      id: Math.random().toString(26).slice(2),
      title: notesFields.title.value,
      description: notesFields.description.value,
      color: notesFields.color.value,
    };
    setNotes([{ ...newNotes }, ...notes]);
  };

  const resetAllFields = () => {
    setNotesFields(formFields());
    setErrorMessage("Заполните хотя бы одно поле");
    setFormValid(false);
    props.changePopUpWindow();
  };

  const submitNewNotes = (event) => {
    event.preventDefault();
    resetAllFields();
  };

  const onChangeFieldsHandler = (event, fieldName) => {
    const field = notesFields[fieldName];
    const titleMaxValue = notesFields["title"].value.length <= 30;

    field.value = event.target.value;
    // field.valid = validate(field.value, field.validation);

    if (!titleMaxValue)
      setErrorMessage("Длина заголовка не должна превышать 30 символов");

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
          errorMessage={field.errorMessage}
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
    <div
      className={`pop-up-window__showing-${props.active}`}
      onClick={resetAllFields}
    >
      <form
        className="pop-up-window__create-notes-form create-notes-form"
        onSubmit={submitNewNotes}
        onClick={(event) => event.stopPropagation()}
        // style={{
        //   backgroundColor: notesFields.color.value,
        // }}
      >
        <div className="create-notes-form__notes-info notes-info">
          {renderFields()}
        </div>
        <div
          className={
            !isFormValid
              ? "create-notes-form__buttons-section"
              : "buttons-section"
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
              onClick={createNotes}
            >
              Создать
            </Button>
            <Button
              type="button"
              className="buttons-section__close-button"
              onClick={resetAllFields}
            >
              Закрыть
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PopUpWindow;
