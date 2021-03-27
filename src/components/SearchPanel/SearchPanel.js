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
    setNotes,
    filterNotes,
    setFilterNotes,
    setFilterNotesText,
    filterNotesText,
  } = useNotes();
  const [filteredData, setFilteredData] = useState([]);

  const searchHandler = (event) => {
    event.preventDefault();

    if (filterNotesText !== "") {
      setFilterNotes(filteredData);
      setNotes(notes);
      console.log("filterNotes ", filterNotes);
      console.log("notes ", notes);
    } else {
      setFilterNotes(notes);
    }
  };

  const onChangeInputHandler = (event) => {
    const value = event.target.value.toLowerCase().trim();
    const excludeFields = ["id", "color"];
    setFilterNotesText(value);

    if (value !== "") {
      const filteredNotes = notes.filter((note) => {
        return Object.keys(note).some((field) =>
          excludeFields.includes(field)
            ? false
            : note[field].toLowerCase().includes(value)
        );
      });
      setFilteredData(filteredNotes);
    }
  };

  return (
    <header className="header">
      <hr className="line header__line" />
      <form action="" method="get" className="search-form header__search-form">
        <Button
          type="submit"
          className="search-form__button"
          onClick={(event) => searchHandler(event)}
        >
          <FontAwesomeIcon icon={faSearch} className="search-form__icon-logo" />
        </Button>
        <Input
          type="search"
          placeholder="Поиск"
          autoComplete="off"
          className="search-form__input"
          onChange={(event) => onChangeInputHandler(event)}
        />
      </form>
      <hr className="line header__line" />
    </header>
  );
};
export default SearchPanel;
