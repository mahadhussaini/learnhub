import Swal from "sweetalert2";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await (async () => {
      try {
        // Attempt to log in with the localhost URL
        return await fetch("http://localhost:4000/api/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
      } catch (error) {
        console.error(
          "Localhost login request failed, trying fallback URL:",
          error
        );
        // If the first fetch fails, attempt the fallback URL
        return await fetch(
          "https://learnhub-qf74.onrender.com/api/user/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );
      }
    })();

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      //update authcontext
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };
  return { login, isLoading, error };
};
