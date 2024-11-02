import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save to localStorage
      return { user: action.payload };
    case "LOGOUT":
      localStorage.removeItem("user"); // Remove from localStorage
      return { user: null };
    default:
      return state;
  }
};

// Initialize state from localStorage
const initAuthState = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return { user: user || null };
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {}, initAuthState);

  useEffect(() => {
    // Sync changes to localStorage whenever the user state changes
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }

    // Check if token is expired and logout if it is
    const checkTokenExpiration = () => {
      if (state.user && state.user.token) {
        const { exp } = JSON.parse(atob(state.user.token.split(".")[1])); // Decode JWT
        if (Date.now() >= exp * 1000) {
          logout(); // Token is expired, log out
        }
      }
    };

    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 60000); // Check every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, [state.user]);

  // Logout function to clear user data
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, dispatch, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
