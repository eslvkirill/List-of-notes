import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNotes } from "../../containers/Contexts/NotesContext";
import Input from "../UiItems/Input/Input";
import Button from "../UiItems/Button/Button";
import "./SearchPanel.scss";

const SearchPanel = () => {
  const {
    notes,
    filterNotes,
    setNotes,
    setFilterNotes,
    setNotesTextInput,
    notesTextInput,
  } = useNotes();
  const [filteredData, setFilteredData] = useState([]);

  const searchHandler = (event) => {
    event.preventDefault();

    if (notesTextInput.trim() !== "") {
      setFilterNotes(filteredData);
      setNotes(notes);
    } else setFilterNotes(notes);
  };

  const onChangeInputHandler = (event) => {
    const eValue = event.target.value;
    const value = eValue.toLowerCase().trim();
    const excludeFields = ["id", "color"];
    setNotesTextInput(eValue);

    if (value !== "") {
      const filteredNotes = notes.filter((note) => {
        return Object.keys(note).some((field) =>
          excludeFields.includes(field)
            ? false
            : note[field].toLowerCase().includes(value)
        );
      });
      setFilteredData(filteredNotes);
    } else setFilterNotes(notes);
  };

  return (
    <header className="header">
      <hr className="header__hr-line hr-line" />
      <form action="" method="get" className="header__search-form search-form">
        <Button
          type="submit"
          className="search-form__search-button"
          onClick={(event) => searchHandler(event)}
        >
          <FontAwesomeIcon icon={faSearch} className="search-form__icon-logo" />
        </Button>
        <Input
          type="search"
          placeholder="Поиск"
          autoComplete="off"
          value={notesTextInput}
          className="search-form__input"
          onChange={(event) => onChangeInputHandler(event)}
        />
      </form>
      {(filterNotes.length === 0 || filterNotes.length !== notes.length) &&
      notes.length !== 0 ? (
        <div className="header_notes-not-found">
          Очистите поле ввода, чтобы увидеть все Ваши заметки
        </div>
      ) : (
        ""
      )}
      <hr className="header__hr-line hr-line" />
    </header>
  );
};
export default SearchPanel;
