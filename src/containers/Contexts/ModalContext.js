import React, { useContext, useState } from "react";

const ModalContext = React.createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState("create");

  const changeModal = () => setModal(!modal);

  return (
    <ModalContext.Provider
      value={{ modal, changeModal, modalType, setModalType }}
    >
      {children}
    </ModalContext.Provider>
  );
};
