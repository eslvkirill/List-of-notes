import React, { useContext, useState } from "react";

const PopUpContext = React.createContext();

export const usePopUp = () => useContext(PopUpContext);

export const PopUpProvider = ({ children }) => {
  const [popUp, setPopUp] = useState(false);
  const [popUpType, setPopUpType] = useState("create");

  const changePopUpWindow = () => setPopUp(!popUp);

  return (
    <PopUpContext.Provider
      value={{ popUp, changePopUpWindow, popUpType, setPopUpType }}
    >
      {children}
    </PopUpContext.Provider>
  );
};
