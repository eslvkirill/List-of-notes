import React, { useState } from "react";
import PopUpWindow from "../PopUpWindow/PopUpWindow";
import Button from "../UiItems/Button/Button";
import "./CreateNotesButton.scss";

const CreateNotesButton = () => {
  const [active, setActive] = useState(false);

  const changePopUpWindow = () => setActive(!active);

  return (
    <>
      <div className="create-notes">
        <Button
          className={`create-notes__button${
            active ? "__popup-open" : ""
          } footer__create-notes-button`}
          onClick={() => changePopUpWindow()}
        >
          +
        </Button>
      </div>
      <PopUpWindow active={active} changePopUpWindow={changePopUpWindow} />
    </>
  );
};

export default CreateNotesButton;
