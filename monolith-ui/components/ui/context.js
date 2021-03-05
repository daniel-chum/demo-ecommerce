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
    case "OPEN_SIDEBAR": {
      return {
        ...state,
        displaySidebar: true,
      };
    }
    case "CLOSE_SIDEBAR": {
      return {
        ...state,
        displaySidebar: false,
      };
    }
    case "OPEN_DROPDOWN": {
      return {
        ...state,
        displayDropdown: true,
      };
    }
    case "CLOSE_DROPDOWN": {
      return {
        ...state,
        displayDropdown: false,
      };
    }
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
    case "OPEN_TOAST": {
      return {
        ...state,
        displayToast: true,
      };
    }
    case "CLOSE_TOAST": {
      return {
        ...state,
        displayToast: false,
      };
    }
    case "SET_MODAL_VIEW": {
      return {
        ...state,
        modalView: action.view,
      };
    }
    case "SET_TOAST_TEXT": {
      return {
        ...state,
        toastText: action.text,
      };
    }
    case "SET_USER_AVATAR": {
      return {
        ...state,
        userAvatar: action.value,
      };
    }
  }
}

export const UIProvider = (props) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const openSidebar = () => dispatch({ type: "OPEN_SIDEBAR" });
  const closeSidebar = () => dispatch({ type: "CLOSE_SIDEBAR" });
  const toggleSidebar = () =>
    state.displaySidebar
      ? dispatch({ type: "CLOSE_SIDEBAR" })
      : dispatch({ type: "OPEN_SIDEBAR" });
  const closeSidebarIfPresent = () =>
    state.displaySidebar && dispatch({ type: "CLOSE_SIDEBAR" });

  const openDropdown = () => dispatch({ type: "OPEN_DROPDOWN" });
  const closeDropdown = () => dispatch({ type: "CLOSE_DROPDOWN" });

  const openModal = () => dispatch({ type: "OPEN_MODAL" });
  const closeModal = () => dispatch({ type: "CLOSE_MODAL" });

  const openToast = () => dispatch({ type: "OPEN_TOAST" });
  const closeToast = () => dispatch({ type: "CLOSE_TOAST" });

  const setUserAvatar = (value) => dispatch({ type: "SET_USER_AVATAR", value });

  const setModalView = (view) => dispatch({ type: "SET_MODAL_VIEW", view });

  const value = useMemo(
    () => ({
      ...state,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      closeSidebarIfPresent,
      openDropdown,
      closeDropdown,
      openModal,
      closeModal,
      setModalView,
      openToast,
      closeToast,
      setUserAvatar,
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
