import { useEffect, useContext } from "react";

import { AuthContext } from "../context/authContext";

const useLoadUser = (user) => {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      dispatch({
        type: "USER_LOADED",
        payload: user,
      });
    }
  }, []);

  return null;
};

export default useLoadUser;
