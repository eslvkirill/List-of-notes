import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SearchPanel.scss";

const SearchPanel = () => (
  <header className="header">
    <hr className="line header__line" />
    <form action="" method="get" className="search-form header__search-form">
      <button type="submit" className="search-form__button">
        <FontAwesomeIcon icon={faSearch} className="search-form__icon-logo" />
      </button>
      <input
        type="search"
        name="search"
        placeholder="Поиск"
        autoComplete="off"
        className="search-form__input"
      />
    </form>
    <hr className="line header__line" />
  </header>
);

export default SearchPanel;
