import React from "react";
import { usePopUp } from "../../containers/Contexts/PopUpContext";
import Button from "../UiItems/Button/Button";
import "./CreateNotesButton.scss";

const CreateNotesButton = (props) => {
  const { popUp, changePopUpWindow, setPopUpType } = usePopUp();

  const onClickHandler = () => {
    setPopUpType("create");
    props.setScaleButton(false);
    changePopUpWindow();
  };

  return (
    <Button
      className={`create-notes-button${
        popUp && !props.scaleButton ? "__popup-open" : ""
      }`}
      onClick={onClickHandler}
    >
      +
    </Button>
  );
};

export default CreateNotesButton;
