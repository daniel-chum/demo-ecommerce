import React, { useReducer, useMemo } from "react";

const initialState = {
  displaySidebar: false,
  displayDropdown: false,
  displayModal: false,
  modalView: "LOGIN_VIEW",
  displayToast: false,
  toastText: "",
};

//type MODAL_VIEWS = "SIGNUP_VIEW" | "LOGIN_VIEW" | "FORGOT_VIEW";

export const UIContext = React.createContext(initialState);

UIContext.displayName = "UIContext";

function uiReducer(state, action) {
  switch (action.type) {

    case "OPEN_MODAL": {
      return {
        ...state,
        displayModal: true,
        displaySidebar: false,
      };
    }
    case "CLOSE_MODAL": {
      return {
        ...state,
        displayModal: false,
      };
    }
    case "SET_MODAL_VIEW": {
      return {
        ...state,
        modalView: action.view,
      };
    }
  }
}

export const UIProvider = (props) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);


  const openModal = () => dispatch({ type: "OPEN_MODAL" });
  const closeModal = () => dispatch({ type: "CLOSE_MODAL" });

  const setModalView = (view) => dispatch({ type: "SET_MODAL_VIEW", view });

  const value = useMemo(
    () => ({
      ...state,
      openModal,
      closeModal,
      setModalView,
    }),
    [state]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export const ManagedUIContext = ({ children }) => (
  <UIProvider>{children}</UIProvider>
);
