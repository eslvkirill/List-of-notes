import React from "react";
import { useModal } from "../../containers/Contexts/ModalContext";
import Button from "../UiItems/Button/Button";
import "./CreateNotesButton.scss";

const CreateNotesButton = (props) => {
  const { modal, changeModal, setModalType } = useModal();

  const onClickHandler = () => {
    setModalType("create");
    props.setScaleButton(false);
    changeModal();
  };

  return (
    <Button
      className={`create-notes-button${
        modal && !props.scaleButton ? "_modal_open" : ""
      }`}
      onClick={onClickHandler}
    >
      +
    </Button>
  );
};

export default CreateNotesButton;
